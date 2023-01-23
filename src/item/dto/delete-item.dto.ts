import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class DeleteItemDto {
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  deleted: boolean;
}
