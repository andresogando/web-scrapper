import { IsString } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class LocationQueryDto extends PaginationQueryDto {
  @IsString()
  location: string;

  
}
