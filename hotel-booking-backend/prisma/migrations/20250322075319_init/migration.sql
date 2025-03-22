/*
  Warnings:

  - You are about to drop the column `coverImage` on the `listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "coverImage",
ADD COLUMN     "cover_image" TEXT;
