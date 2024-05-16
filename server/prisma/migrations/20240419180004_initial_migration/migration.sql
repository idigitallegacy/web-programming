/*
  Warnings:

  - A unique constraint covering the columns `[group_name]` on the table `user_groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_groups_group_name_key" ON "user_groups"("group_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
