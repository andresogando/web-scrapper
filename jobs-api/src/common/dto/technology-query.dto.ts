import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class TechnologyQueryDto extends PaginationQueryDto {
  @ApiProperty({ description: "Javascript | Typescript | AWS | Redis | Kafka | GraphQl | NodeJS | React | etc . . . " })
  @IsString()
  technology: string;
}
