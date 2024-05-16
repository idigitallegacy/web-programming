import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  Req, Res
} from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserGroupDto } from "./dto/update-user-group.dto";
import { users } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { request } from "express";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs";
import { TokenDto } from "./dto/token.dto";
import * as process from "process";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("api/users")
export class UsersController {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"]
  });

  httpService = new HttpService();

  api_ver = 5.199;

  @Get("all")
  @ApiOperation({ summary: "Get all users" })
  async findAll(): Promise<users[] | null> {
    return await this.prisma.users.findMany();
  }

  @Get("/id/:id")
  @ApiOperation({ summary: "Get user by id" })
  async findById(@Param("id") id: number): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  @Get("/username/:username")
  @ApiOperation({ summary: "Get user by id" })
  async findByUsername(@Param("username") username: string): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: {
        username: username
      }
    });
  }

  @Get("authorize?")
  async exchangeToken(@Req() request: Request, @Res() response: Response, @Query("method") method: string, @Query("token") token?: string, @Query("uuid") uuid?: string, @Query("access_token") access_token?: string) {
    switch (method) {
      case "vk": {
        if (!token || !uuid) {
          response.status(400).send();
        }

        let request_string = "https://api.vk.com/method/auth.exchangeSilentAuthToken" +
          "?v=" + this.api_ver +
          "&token=" + token +
          "&access_token=8f025fd28f025fd28f025fd20b8c1a466b88f028f025fd2e924c6c17e192639a884d888" +
          "&uuid=" + uuid;

        this.httpService.get(request_string).pipe(
          map(r => r.data)
        ).subscribe(async (exchangedToken) => {
          if (exchangedToken.error) {
            if (exchangedToken.error.error_code === 104) {
              response.status(400).send()
              return
            }
            console.log(exchangedToken.error.error_msg)
          }

          switch (process.env.ENVIRONMENT) {
            case "DEV": {
              response.cookie("vk_access_token", exchangedToken.response.access_token, { maxAge: exchangedToken.response.expires_in, secure: true, httpOnly: true, domain: "localhost", path: "/" });
              break
            }
            case "PROD": {
              response.cookie("vk_access_token", exchangedToken.response.access_token, { maxAge: exchangedToken.response.expires_in, secure: true, httpOnly: true, domain: "web-y25-makarov.onrender.com", sameSite: "none", path: "/" });
              break
            }
          }

          let user = await this.prisma.users.findUnique({
            where: {
              id: Number(exchangedToken.response.user_id)
            }
          });

          if (user) {
            response.write(JSON.stringify(user));
            response.send();
            return;
          }

          request_string = "https://api.vk.com/method/account.getProfileInfo" +
            "?v=" + +this.api_ver +
            "&access_token=" + exchangedToken.response.access_token;
          this.httpService.get(request_string).pipe(
            map(r => r.data)
          ).subscribe(async (userInfo) => {
            if (userInfo.response.screen_name.length > 0) {
              user = await this.prisma.users.create({
                data: {
                  id: userInfo.response.id,
                  username: userInfo.response.screen_name,
                  is_active: true,
                  group: 2,
                  picture_link: userInfo.response.photo_200
                }
              });
            } else {
              user = await this.prisma.users.create({
                data: {
                  id: userInfo.response.id,
                  username: "id" + userInfo.response.id,
                  is_active: true,
                  group: 2,
                  picture_link: userInfo.response.photo_200
                }
              });
            }

            response.write(JSON.stringify(user));
            response.send();
          });
        });
        break;
      }

      case "cookies": {
        let user = null
        let request_string = "https://api.vk.com/method/account.getProfileInfo" +
          "?v=" + +this.api_ver +
          "&access_token=" + request.cookies["vk_access_token"]
        this.httpService.get(request_string).pipe(
          map(r => r.data)
        ).subscribe(async (userInfo) => {
          user = await this.prisma.users.findUnique({
            where: {
              id: userInfo.response.id
            }
          });
          response.write(JSON.stringify(user))
          response.send()
        })


        break
      }
    }
    // const request_string = "https://api.vk.com/method/auth.exchangeSilentAuthToken" +
    //   "?v=5.131" +
    //   "&token=" + param.token +
    //   "&access_token=8f025fd28f025fd28f025fd20b8c1a466b88f028f025fd2e924c6c17e192639a884d888" +
    //   "&uuid=" + param.uuid
    // this.httpService.get(request_string).pipe(
    //   map(response => response.data)
    // )
    // response.write(token)
    // response.send()
  }

  @Post("add")
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, description: "Successfully created" })
  @ApiBody({
    type: CreateUserDto,
  })
  async add(@Body() createUserDto: CreateUserDto): Promise<users | null> {
    return await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        is_active: createUserDto.is_active,
        group: createUserDto.group,
        picture_link: createUserDto.picture_link
      }
    });
  }

  @Put("block/:id")
  @ApiOperation({ summary: "Block user by id" })
  @ApiResponse({ status: 200, description: "Successfully blocked" })
  async block(@Param("id") id: number): Promise<users | null> {
    return await this.prisma.users.update({
      where: {
        id: Number(id)
      },
      data: {
        is_active: false
      }
    });
  }

  @Put("unblock/:id")
  @ApiOperation({ summary: "Block user by id" })
  @ApiResponse({ status: 200, description: "Successfully blocked" })
  async unblock(@Param("id") id: number): Promise<users | null> {
    return await this.prisma.users.update({
      where: {
        id: Number(id)
      },
      data: {
        is_active: true
      }
    });
  }

  @Put("update_group")
  @ApiOperation({ summary: "Enroll user with {uid} in a new group with {ngid}" })
  @ApiResponse({ status: 200, description: "Successfully blocked" })
  async update_group(@Body() updateGroup: UpdateUserGroupDto): Promise<users | null> {
    return await this.prisma.users.update({
      where: {
        id: updateGroup.userId
      },
      data: {
        group: updateGroup.newGroupId
      }
    });
  }

  @Delete("delete/:id")
  @ApiOperation({ summary: "Delete user by id" })
  @ApiResponse({ status: 200, description: "Successfully deleted" })
  async delete(@Param("id") id: number): Promise<users | null> {
    return await this.prisma.users.delete({
      where: {
        id: Number(id)
      }
    });
  }
}
