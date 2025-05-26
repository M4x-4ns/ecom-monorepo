-- DropForeignKey
ALTER TABLE `productoncart` DROP FOREIGN KEY `ProductOnCart_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `productoncart` DROP FOREIGN KEY `ProductOnCart_productId_fkey`;

-- DropIndex
DROP INDEX `ProductOnCart_cartId_fkey` ON `productoncart`;

-- DropIndex
DROP INDEX `ProductOnCart_productId_fkey` ON `productoncart`;

-- AddForeignKey
ALTER TABLE `ProductOnCart` ADD CONSTRAINT `ProductOnCart_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnCart` ADD CONSTRAINT `ProductOnCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
