import { Type } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  name: string;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  price: number;

  @IsString()
  description: string;

  @IsString()
  imageURL: string;
}
