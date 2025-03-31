/*
  Warnings:

  - You are about to drop the column `cover_image` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "cover_image",
DROP COLUMN "images",
ADD COLUMN     "cover_image_id" TEXT,
ADD COLUMN     "images_id" TEXT[];
