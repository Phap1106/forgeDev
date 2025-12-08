import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from './entities/tool.entity';
import { ToolRentalPackage } from './entities/tool-rental-package.entity';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tool, ToolRentalPackage])],
  providers: [ToolsService],
  controllers: [ToolsController],
  exports: [ToolsService],
})
export class ToolsModule {}
