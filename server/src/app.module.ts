import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import * as process from "process";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [UsersModule, PostsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
