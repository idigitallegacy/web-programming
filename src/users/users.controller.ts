import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateUserDto, createUserExample } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserGroupDto } from "./dto/update-user-group.dto";
import { users } from '@prisma/client'
import { PrismaClient } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<users[] | null> {
    return await this.prisma.users.findMany();
  }

  @Get('/id/:id')
  @ApiOperation({ summary: 'Get user by id' })
  async findById(@Param('id') id: number): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: {
        id: Number(id),
      }
    })
  }

  @Get('/username/:username')
  @ApiOperation({ summary: 'Get user by id' })
  async findByUsername(@Param('username') username: string): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: {
        username: username,
      }
    })
  }

  @Post('add')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Successfully created' })
  @ApiBody({
    type: CreateUserDto,
    examples: createUserExample,
  })
  async add(@Body() createUserDto: CreateUserDto): Promise<users | null> {
    return await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
        is_active: createUserDto.is_active,
        group: createUserDto.group
      }
    })
  }

  @Put('block/:id')
  @ApiOperation({ summary: 'Block user by id' })
  @ApiResponse({ status: 200, description: 'Successfully blocked' })
  async block(@Param('id') id: number): Promise<users | null> {
    return await this.prisma.users.update({
      where: {
        id: Number(id)
      },
      data: {
        is_active: false
      }
    })
  }

  @Put('unblock/:id')
  @ApiOperation({ summary: 'Block user by id' })
  @ApiResponse({ status: 200, description: 'Successfully blocked' })
  async unblock(@Param('id') id: number): Promise<users | null> {
    return await this.prisma.users.update({
      where: {
        id: Number(id)
      },
      data: {
        is_active: true
      }
    })
  }

  @Put('update_group')
  @ApiOperation({ summary: 'Enroll user with {uid} in a new group with {ngid}' })
  @ApiResponse({ status: 200, description: 'Successfully blocked' })
  async update_group(@Body() updateGroup: UpdateUserGroupDto): Promise<users | null> {
    return await this.prisma.users.update({
      where: {
        id: updateGroup.userId
      },
      data: {
        group: updateGroup.newGroupId
      }
    })
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'Successfully deleted' })
  async delete(@Param('id') id: number): Promise<users | null> {
    return await this.prisma.users.delete({
      where: {
        id: Number(id)
      }
    })
  }
}
