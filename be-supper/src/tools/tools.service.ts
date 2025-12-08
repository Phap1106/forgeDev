import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from './entities/tool.entity';
import { ToolRentalPackage } from './entities/tool-rental-package.entity';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool) private readonly toolRepo: Repository<Tool>,
    @InjectRepository(ToolRentalPackage)
    private readonly pkgRepo: Repository<ToolRentalPackage>,
  ) {}

  findAll() {
    return this.toolRepo.find({ relations: ['rentalPackages'] });
  }

  findOne(id: number) {
    return this.toolRepo.findOne({
      where: { id },
      relations: ['rentalPackages'],
    });
  }

  async create(data: Partial<Tool>) {
    const tool = this.toolRepo.create(data);
    return this.toolRepo.save(tool);
  }

  async update(id: number, data: Partial<Tool>) {
    const old = await this.toolRepo.findOne({ where: { id } });
    if (!old) throw new NotFoundException('Tool không tồn tại');
    const merged = this.toolRepo.merge(old, data);
    return this.toolRepo.save(merged);
  }

  async remove(id: number) {
    await this.toolRepo.delete(id);
    return { success: true };
  }
}
