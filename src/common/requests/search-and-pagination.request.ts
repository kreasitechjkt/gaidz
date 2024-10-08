import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class ApiPaginationRequest {
  @ApiPropertyOptional({})
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageNumber: number;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize: number;
}

export class ApiSearchPaginationRequest extends ApiPaginationRequest {
  @ApiPropertyOptional()
  @IsOptional()
  search: string;
}
