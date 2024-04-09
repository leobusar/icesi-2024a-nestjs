import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @IsString()
    @IsOptional()
    readonly id?: string;
}
