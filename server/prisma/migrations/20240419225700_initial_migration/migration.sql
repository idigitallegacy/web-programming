/*
  Warnings:

  - You are about to drop the column `data_link` on the `posts` table. All the data in the column will be lost.
  - Added the required column `body` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "data_link",
ADD COLUMN     "body" VARCHAR(4194304) NOT NULL;
