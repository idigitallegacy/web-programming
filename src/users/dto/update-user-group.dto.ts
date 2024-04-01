import { IsBoolean, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserGroupDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  userId: number;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  newGroupId: number;
}