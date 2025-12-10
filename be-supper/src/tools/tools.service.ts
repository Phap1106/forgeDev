// src/tools/tools.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Tool } from './entities/tool.entity';
import { ToolRentalPackage } from './entities/tool-rental-package.entity';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import slugify from 'slugify';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool) private readonly toolRepo: Repository<Tool>,
    @InjectRepository(ToolRentalPackage)
    private readonly pkgRepo: Repository<ToolRentalPackage>,
  ) {}

  findAll() {
    return this.toolRepo.find({
      relations: ['rentalPackages'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const tool = await this.toolRepo.findOne({
      where: { id },
      relations: ['rentalPackages'],
    });
    if (!tool) throw new NotFoundException('Tool không tồn tại');
    return tool;
  }

  private buildSlug(name: string, slug?: string) {
    const base = (slug || name).trim();
    return slugify(base, { lower: true, strict: true });
  }

  // ================== CREATE ==================
  async create(dto: CreateToolDto) {
    const { rentalPackages, ...toolData } = dto;

    // Chuẩn hoá dữ liệu, bỏ null cho các field string
    const cleaned: any = {
      ...toolData,
      slug: this.buildSlug(dto.name, (dto as any).slug),
    };

    const nullableStringFields = [
      'category',
      'description',
      'priceLabel',
      'heroImageUrl',
      'liveBadgeText',
      'difficulty',
      'environment',
      'updatePolicy',
      'suitedFor',
      'visibility',
      'status',
      'rentalStrategy',
    ];

    for (const key of nullableStringFields) {
      if (cleaned[key] === null) {
        cleaned[key] = undefined;
      }
    }

    // Ép kiểu DeepPartial để khỏi lỗi TS
    const tool = this.toolRepo.create(cleaned as DeepPartial<Tool>);

    const savedTool = await this.toolRepo.save(tool); // Tool

    if (Array.isArray(rentalPackages) && rentalPackages.length > 0) {
      const pkgs: ToolRentalPackage[] = rentalPackages.map((p) =>
        this.pkgRepo.create(
          {
            ...(p as any),
            tool: savedTool,
          } as DeepPartial<ToolRentalPackage>,
        ),
      );

      await this.pkgRepo.save(pkgs);
      (savedTool as any).rentalPackages = pkgs;
    } else {
      (savedTool as any).rentalPackages = [];
    }

    return savedTool;
  }

  // ================== UPDATE ==================
  async update(id: number, dto: UpdateToolDto) {
    const tool = await this.toolRepo.findOne({
      where: { id },
      relations: ['rentalPackages'],
    });
    if (!tool) throw new NotFoundException('Tool không tồn tại');

    const { rentalPackages, slug, ...toolData } = dto;

    // Gộp các field cơ bản
    Object.assign(tool, toolData as any);

    // Cập nhật slug nếu đổi name hoặc slug
    if (dto.name || slug) {
      tool.slug = this.buildSlug(dto.name ?? tool.name, slug ?? tool.slug);
    }

    // Chuẩn hoá null về undefined cho các field string
    const nullableStringFields = [
      'category',
      'description',
      'priceLabel',
      'heroImageUrl',
      'liveBadgeText',
      'difficulty',
      'environment',
      'updatePolicy',
      'suitedFor',
      'visibility',
      'status',
      'rentalStrategy',
    ];

    for (const key of nullableStringFields) {
      if ((tool as any)[key] === null) {
        (tool as any)[key] = undefined;
      }
    }

    const updatedTool = await this.toolRepo.save(tool); // Tool

    // Nếu FE có gửi rentalPackages thì xử lý lại gói thuê
    if (rentalPackages) {
      // Xoá toàn bộ gói cũ của tool này
      await this.pkgRepo.delete({ tool: { id } as any });

      if (rentalPackages.length > 0) {
        const pkgs: ToolRentalPackage[] = rentalPackages.map((p) =>
          this.pkgRepo.create(
            {
              ...(p as any),
              tool: updatedTool,
            } as DeepPartial<ToolRentalPackage>,
          ),
        );

        await this.pkgRepo.save(pkgs);
        (updatedTool as any).rentalPackages = pkgs;
      } else {
        (updatedTool as any).rentalPackages = [];
      }
    }

    return updatedTool;
  }

  // ================== REMOVE ==================
  async remove(id: number) {
    await this.toolRepo.delete(id);
    return { success: true };
  }
}
