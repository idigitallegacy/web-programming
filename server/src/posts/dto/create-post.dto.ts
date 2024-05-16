import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(1024)
  picture_link: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(4194304)
  body: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  author_id: number;
}

export const createPostExample = Object.freeze({
  sample_1: {
    summary: 'Simple example',
    value: {
      id: 0,
      picture_link: "www.example.com",
      title: "string",
      body_json_link: "www.example.com",
      date: "2024-03-15",
      author: 0
    },
  },
});