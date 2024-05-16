import { IsBoolean, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  uuid: string;
}