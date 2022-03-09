import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { PaginationQueryDto } from "./pagination-query.dto";

export class LocationQueryDto extends PaginationQueryDto {
  @IsString()
  @ApiProperty({ description: "Brampton, Ontario, Canada | Burnaby, British Columbia, Canada | Calgary, Alberta, Canada | Mississauga, Ontario, Canada | Toronto | London " })
  location: string;
}
