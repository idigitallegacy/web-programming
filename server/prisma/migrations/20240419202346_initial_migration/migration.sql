/*
  Warnings:

  - You are about to drop the column `body_json_link` on the `posts` table. All the data in the column will be lost.
  - Added the required column `link` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "body_json_link",
ADD COLUMN     "link" VARCHAR(1024) NOT NULL;
