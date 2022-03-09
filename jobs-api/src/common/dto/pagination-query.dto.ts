import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPositive, IsString } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: "1 | 2 | 3 | 4 . . . . " })
  limit?: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: "1 | 2 | 3 | 4 . . . . " })
  offset?: number;


  @ApiProperty({ description: "address | company |  id  | description | experience | listdate | title | technology" })
  @IsOptional()
  @IsString()
  sort?: string;
}
