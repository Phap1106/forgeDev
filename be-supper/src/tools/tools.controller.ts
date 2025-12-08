import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('admin/tools')
@UseGuards(JwtAuthGuard)
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  list() {
    return this.toolsService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.toolsService.findOne(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.toolsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.toolsService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.toolsService.remove(+id);
  }
}
