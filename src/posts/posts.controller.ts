import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto, createPostExample } from "./dto/create-post.dto";
import { posts } from "@prisma/client"
import { PrismaClient } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('api/posts')
export class PostsController {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

  @Get('all')
  @ApiOperation({ summary: 'Get all posts' })
  async findAll(): Promise<posts[] | null> {
    return await this.prisma.posts.findMany()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  async findById(@Param('id') id: number): Promise<posts | null> {
    return await this.prisma.posts.findUnique({
      where: {
        id: Number(id)
      }
    })
  }

  @Get('amount')
  @ApiOperation({ summary: 'Get posts amount' })
  async getAmount(): Promise<number | null> {
    return await this.prisma.posts.count()
  }

  @Get('range/:skip/:take')
  @ApiOperation({ summary: 'Get post by id' })
  async findRange(@Param('skip') skip: number, @Param('take') take: number): Promise<posts[] | null> {
    return await this.prisma.posts.findMany({
      skip: Number(skip),
      take: Number(take)
    })
  }

  @Post('add')
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 200, description: 'Successfully created' })
  @ApiBody({
    type: CreatePostDto,
    examples: createPostExample,
  })
  async add(@Body() createPostDto: CreatePostDto): Promise<posts | null> {
    return await this.prisma.posts.create({
      data: {
        picture_link: createPostDto.picture_link,
        title: createPostDto.title,
        body: createPostDto.body,
        date: createPostDto.date,
        author_id: createPostDto.authorId
      }
    })
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete post by id' })
  @ApiResponse({ status: 200, description: 'Successfully deleted' })
  async delete(@Param('id') id: number): Promise<posts | null> {
    return await this.prisma.posts.delete({
      where: {
        id: Number(id)
      }
    })
  }
}
