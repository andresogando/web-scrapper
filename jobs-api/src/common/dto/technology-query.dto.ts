import { IsString } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class TechnologyQueryDto extends PaginationQueryDto {
  @IsString()
  technology: string;
}
