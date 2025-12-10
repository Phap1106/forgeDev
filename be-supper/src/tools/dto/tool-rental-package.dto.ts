// src/tools/dto/tool-rental-package.dto.ts
export class ToolRentalPackageDto {
  code: string;
  label: string;
  durationHours: number;
  priceVnd: number;
  isDefault?: boolean;
}
