import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from "@nestjs/common";
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { PrismaClient, user_groups } from "@prisma/client";
import { SessionContainer } from "supertokens-node/recipe/session";

@ApiTags('User groups')
@Controller('api/users/groups')
export class GroupsController {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });


  @Get('all')
  @ApiOperation({ summary: 'Get all groups' })
  async findAll(): Promise<user_groups[] | null> {
    return await this.prisma.user_groups.findMany()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group by id' })
  async findById(@Param('id') id: number): Promise<user_groups | null> {
    return await this.prisma.user_groups.findUnique({
      where: {
        id: Number(id)
      }
    })
  }

  @Post('add')
  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({ status: 200, description: 'Successfully created' })
  async add(@Param('name') name: string): Promise<user_groups | null> {
    return await this.prisma.user_groups.create({
      data: {
        group_name: name
      }
    })
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete group by id' })
  @ApiResponse({ status: 200, description: 'Successfully deleted' })
  async delete(@Param('id') id: number): Promise<user_groups | null> {
    return await this.prisma.user_groups.delete({
      where: {
        id: Number(id)
      }
    })
  }
}
