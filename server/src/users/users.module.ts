import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { GroupsController } from "./groups.controller";
import { HttpModule } from "@nestjs/axios";
import { EventsModule } from "../events/events.module";

@Module({
  imports: [HttpModule, EventsModule],
  controllers: [UsersController, GroupsController],
})
export class UsersModule {}