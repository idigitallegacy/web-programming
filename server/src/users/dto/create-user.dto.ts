import { IsBoolean, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  password: string;

  @ApiProperty()
  @IsString()
  @MaxLength(1024)
  picture_link: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  group?: number;
}