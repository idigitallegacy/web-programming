import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { GroupsController } from "./groups.controller";

@Module({
  controllers: [UsersController, GroupsController]
})
export class UsersModule {}