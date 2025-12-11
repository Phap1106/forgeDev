// src/tools/dto/create-tool.dto.ts
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

// Các giá trị cho một số field string
export const BILLING_MODES = ['one_time', 'rental'] as const;
export type BillingMode = (typeof BILLING_MODES)[number];

export const DELIVERY_TYPES = ['online', 'download'] as const;
export type DeliveryType = (typeof DELIVERY_TYPES)[number];

export const VISIBILITIES = ['public', 'admin'] as const;
export type Visibility = (typeof VISIBILITIES)[number];

export const TOOL_STATUSES = ['draft', 'active', 'archived'] as const;
export type ToolStatus = (typeof TOOL_STATUSES)[number];

export class CreateToolRentalPackageDto {
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
  @IsBoolean()
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

  // giá chính dùng cho hiển thị / billing
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  priceVnd?: number;

  // nếu muốn dùng thêm base_price_vnd thì thêm field khác

  @IsOptional()
  @IsString()
  displayPriceLabel?: string;

  @IsOptional()
  @IsString()
  priceLabel?: string;

  @IsOptional()
  @IsIn(BILLING_MODES as readonly string[])
  billingMode?: BillingMode;

  @IsOptional()
  @IsIn(DELIVERY_TYPES as readonly string[])
  deliveryType?: DeliveryType;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  hourlyPrice?: number;

  @IsOptional()
  @IsString()
  rentalStrategy?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  heroImageUrl?: string;

  @IsOptional()
  @IsString()
  liveBadgeText?: string;

  @IsOptional()
  @IsString()
  heroBadge?: string;

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
  @IsIn(VISIBILITIES as readonly string[])
  visibility?: Visibility;

  @IsOptional()
  @IsIn(TOOL_STATUSES as readonly string[])
  status?: ToolStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateToolRentalPackageDto)
  rentalPackages?: CreateToolRentalPackageDto[];
}
