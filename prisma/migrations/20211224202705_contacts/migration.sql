/*
  Warnings:

  - You are about to drop the column `name` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `type` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `value` on the `Contact` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ContactEnum" AS ENUM ('PHONE', 'EMAIL', 'FACEBOOK', 'TWITTER', 'INSTAGRAM', 'LINKEDIN', 'GITHUB', 'WEBSITE');

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "name",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" "ContactEnum" NOT NULL;
