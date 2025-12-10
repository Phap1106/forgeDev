// src/tools/dto/create-tool.dto.ts
import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ToolBillingMode,
  ToolDeliveryType,
  ToolVisibility,
  ToolStatus,
} from '../entities/tool.entity';

class CreateToolRentalPackageDto {
  @IsString()
  code: string;

  @IsString()
  label: string;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  durationHours: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  priceVnd: number;

  @IsOptional()
  isDefault?: boolean;
}

export class CreateToolDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  priceVnd?: number;

  @IsOptional()
  @IsEnum(ToolBillingMode)
  billingMode?: ToolBillingMode;

  @IsOptional()
  @IsEnum(ToolDeliveryType)
  deliveryType?: ToolDeliveryType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  priceLabel?: string;

  @IsOptional()
  @IsString()
  heroImageUrl?: string;

  @IsOptional()
  @IsString()
  liveBadgeText?: string;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsOptional()
  @IsString()
  environment?: string;

  @IsOptional()
  @IsString()
  updatePolicy?: string;

  @IsOptional()
  @IsString()
  suitedFor?: string;

  @IsOptional()
  @IsEnum(ToolVisibility)
  visibility?: ToolVisibility;

  @IsOptional()
  @IsEnum(ToolStatus)
  status?: ToolStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateToolRentalPackageDto)
  rentalPackages?: CreateToolRentalPackageDto[];
}
