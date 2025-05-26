/*
  Warnings:

  - You are about to drop the column `stripePaymenId` on the `order` table. All the data in the column will be lost.
  - Added the required column `stripePaymentId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `stripePaymenId`,
    ADD COLUMN `stripePaymentId` VARCHAR(191) NOT NULL;
