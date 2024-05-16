/*
  Warnings:

  - You are about to drop the column `link` on the `posts` table. All the data in the column will be lost.
  - Added the required column `data_link` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "link",
ADD COLUMN     "data_link" VARCHAR(1024) NOT NULL;
