import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCommentDto, createCommentExample } from "./dto/create-comment.dto";
import { comments } from "@prisma/client"
import { PrismaClient } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('api/comments')
export class CommentsController {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

  @Get(':id')
  @ApiOperation({ summary: 'Get comment by id' })
  findById(@Param('id') id: number): Promise<comments | null> {
    return this.prisma.comments.findUnique({
      where: {
        id: Number(id)
      }
    })
  }

  @Get('post/:pid')
  @ApiOperation({ summary: 'Get comments by post id' })
  findByPostId(@Param('pid') pid: number): Promise<comments[] | null> {
    return this.prisma.comments.findMany({
      where: {
        post: Number(pid)
      }
    })
  }

  @Get('author/:aid')
  @ApiOperation({ summary: 'Get comments by author id' })
  findByAuthorId(@Param('aid') aid: number): Promise<comments[] | null> {
    return this.prisma.comments.findMany({
      where: {
        author: Number(aid)
      }
    })
  }

  @Post('add')
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 200, description: 'Successfully created' })
  @ApiBody({
    type: CreateCommentDto,
    examples: createCommentExample,
  })
  add(@Body() createCommentDto: CreateCommentDto): Promise<comments | null> {
    return this.prisma.comments.create({
      data: {
        post: createCommentDto.post,
        author: createCommentDto.author,
        date: createCommentDto.date,
        text: createCommentDto.text
      }
    })
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete comment by id' })
  @ApiResponse({ status: 200, description: 'Successfully deleted' })
  delete(@Param('id') id: number): Promise<comments | null> {
    return this.prisma.comments.delete({
      where: {
        id: Number(id)
      }
    })
  }
}
