// src/tools/tools.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ToolsService } from './tools.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
// ❌ bỏ dòng này đi
// import { Express } from 'express';

function editFileName(_req: any, file: any, cb: any) {
  const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
  cb(null, randomName + extname(file.originalname));
}

@Controller('admin/tools')
@UseGuards(JwtAuthGuard)
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(+id);
  }

  @Post()
  create(@Body() body: CreateToolDto) {
    return this.toolsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateToolDto) {
    return this.toolsService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.toolsService.remove(+id);
  }

  // Upload ảnh cover
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', 'uploads', 'tools'),
        filename: editFileName,
      }),
    }),
  )
  uploadImage(@UploadedFile() file: any) {
    const url = `/uploads/tools/${file.filename}`;
    return { url };
  }
}
