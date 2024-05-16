import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  controllers: [PostsController],
})
export class PostsModule {}