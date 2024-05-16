import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
  Query, Res, UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto, createPostExample } from "./dto/create-post.dto";
import { posts } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { writeFile, readFile } from "fs";
import { join } from "path";
import * as bcrypt from "bcrypt";

@ApiBearerAuth()
@ApiTags("Posts")
@Controller("api/posts")
export class PostsController {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"]
  });

  @Get("all")
  @ApiOperation({ summary: "Get all posts" })
  async findAll(): Promise<posts[] | null> {
    return this.prisma.posts.findMany();
  }

  @Get("/post/:id")
  @ApiOperation({ summary: "Get post by id" })
  async findById(@Param("id") id: number): Promise<posts | null> {
    return this.prisma.posts.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  @Get("amount")
  @ApiOperation({ summary: "Get posts amount" })
  async getAmount(): Promise<number | null> {
    return this.prisma.posts.count();
  }

  @Get("range/:skip/:take")
  @ApiOperation({ summary: "Get post by id" })
  async findRange(@Param("skip") skip: number, @Param("take") take: number): Promise<posts[] | null> {
    return this.prisma.posts.findMany({
      skip: Number(skip),
      take: Number(take),
      orderBy: [
        {
          date: "desc"
        }
      ]
    });
  }

  @Get("picture")
  @ApiOperation({ summary: "Get post by id" })
  async getPicture(@Res() response: Response, @Query('file_path') file_path: string): Promise<Buffer | null> {
    readFile(file_path, (err, data) => {
      if (err) {
        response.write("{}")
        response.send()
        return
      }
      response.write(JSON.stringify({"data": Buffer.from(data).toString('base64')}))
      response.send()
    })
    return null
  }

  @Post("upload")
  @ApiOperation({ summary: "Upload picture" })
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length) || file.originalname;
    const hash = (await bcrypt.hash(file.originalname, 10)).replace(/[^a-zA-Z0-9]/g, "") + extension;
    writeFile(join(process.cwd(), "public", "static", hash), file.buffer, () => {
    });
    return JSON.stringify({ path: join(process.cwd(), "public", "static", hash) });
  }


  @Post("add")
  @ApiOperation({ summary: "Create post" })
  @ApiResponse({ status: 200, description: "Successfully created" })
  @ApiBody({
    type: CreatePostDto,
    examples: createPostExample
  })
  async add(@Body() createPostDto: CreatePostDto): Promise<posts | null> {
    return this.prisma.posts.create({
      data: {
        picture_link: createPostDto.picture_link,
        title: createPostDto.title,
        body: createPostDto.body,
        date: createPostDto.date,
        author_id: createPostDto.author_id
      }
    });
  }

  @Delete("delete/:id")
  @ApiOperation({ summary: "Delete post by id" })
  @ApiResponse({ status: 200, description: "Successfully deleted" })
  async delete(@Param("id") id: number): Promise<posts | null> {
    return this.prisma.posts.delete({
      where: {
        id: Number(id)
      }
    });
  }
}
