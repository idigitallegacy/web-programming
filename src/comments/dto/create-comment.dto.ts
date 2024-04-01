import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  post: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  author: number;

  @ApiProperty()
  @IsDate()
  date: Date

  @ApiProperty()
  @IsString()
  text: string;
}

export const createCommentExample = Object.freeze({
  sample_1: {
    summary: 'Simple example',
    value: {
      id: 0,
      post: 0,
      author: 0,
      date: "2024-03-15",
      text: "string"
    },
  },
});