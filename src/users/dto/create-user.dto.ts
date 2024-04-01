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

export const createUserExample = Object.freeze({
  sample_1: {
    summary: 'Simple example',
    value: {
      username: "string",
      password: "hashed_string",
      is_active: true,
      group: 1
    },
  },
});