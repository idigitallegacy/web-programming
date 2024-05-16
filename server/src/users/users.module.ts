import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { GroupsController } from "./groups.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [UsersController, GroupsController],
})
export class UsersModule {}