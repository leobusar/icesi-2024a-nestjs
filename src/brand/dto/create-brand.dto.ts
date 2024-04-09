import { IsOptional, IsString, Length } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @Length(3, 50)
    readonly name: string;

    @IsString()
    @IsOptional()
    @Length(3, 1000)
    readonly description: string;

    @IsString()
    @IsOptional()
    @Length(3, 50)
    readonly slug: string;

}
