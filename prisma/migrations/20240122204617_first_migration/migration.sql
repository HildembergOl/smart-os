-- CreateTable
CREATE TABLE `Groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `name` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbTenancy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `situationId` INTEGER NOT NULL,
    `document` VARCHAR(20) NOT NULL,
    `corporateName` VARCHAR(150) NOT NULL,
    `socialName` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `zipCode` VARCHAR(8) NULL,
    `address` VARCHAR(50) NULL,
    `numberAddress` VARCHAR(10) NULL,
    `complement` VARCHAR(45) NULL,
    `district` VARCHAR(50) NULL,
    `city` VARCHAR(60) NULL,
    `state` VARCHAR(2) NULL,
    `codeIBGE` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `situationId` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbUserTenancy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenancyId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbTypeOs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `description` VARCHAR(50) NOT NULL,
    `invoice` BOOLEAN NOT NULL DEFAULT false,
    `tenancyId` INTEGER NOT NULL,
    `situationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbPerson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `tenancyId` INTEGER NOT NULL,
    `situationId` INTEGER NOT NULL,
    `reference` VARCHAR(20) NULL,
    `corporateName` VARCHAR(150) NOT NULL,
    `socialName` VARCHAR(150) NOT NULL,
    `document` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `zipCode` VARCHAR(8) NULL,
    `address` VARCHAR(50) NULL,
    `numberAddress` VARCHAR(10) NULL,
    `complement` VARCHAR(45) NULL,
    `district` VARCHAR(50) NULL,
    `city` VARCHAR(60) NULL,
    `state` VARCHAR(2) NULL,
    `codeIBGE` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `tenancyId` INTEGER NOT NULL,
    `situationId` INTEGER NOT NULL,
    `reference` VARCHAR(20) NULL,
    `description` VARCHAR(80) NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbOrderService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `tenancyId` INTEGER NOT NULL,
    `situationId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `typeOsId` INTEGER NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateAppoint` DATETIME(3) NULL,
    `dateService` DATETIME(3) NULL,
    `codeOS` VARCHAR(191) NOT NULL,
    `amountService` DOUBLE NOT NULL DEFAULT 0,
    `amountDiscount` DOUBLE NOT NULL DEFAULT 0,
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `note` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbOrderServiceItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `orderServiceId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `amountService` DOUBLE NOT NULL,
    `amountDiscount` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL,
    `situationId` INTEGER NOT NULL,
    `note` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbIbgeState` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `acronym` VARCHAR(2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbIbgeCity` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `stateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbIbgeDistrict` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `cityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Groups` ADD CONSTRAINT `Groups_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbTenancy` ADD CONSTRAINT `tbTenancy_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbTenancy` ADD CONSTRAINT `tbTenancy_codeIBGE_fkey` FOREIGN KEY (`codeIBGE`) REFERENCES `tbIbgeDistrict`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbUser` ADD CONSTRAINT `tbUser_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbUserTenancy` ADD CONSTRAINT `tbUserTenancy_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbUserTenancy` ADD CONSTRAINT `tbUserTenancy_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbUser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbTypeOs` ADD CONSTRAINT `tbTypeOs_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbTypeOs` ADD CONSTRAINT `tbTypeOs_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbPerson` ADD CONSTRAINT `tbPerson_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbPerson` ADD CONSTRAINT `tbPerson_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbPerson` ADD CONSTRAINT `tbPerson_codeIBGE_fkey` FOREIGN KEY (`codeIBGE`) REFERENCES `tbIbgeDistrict`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbService` ADD CONSTRAINT `tbService_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbService` ADD CONSTRAINT `tbService_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbOrderService` ADD CONSTRAINT `tbOrderService_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbOrderService` ADD CONSTRAINT `tbOrderService_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbOrderService` ADD CONSTRAINT `tbOrderService_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `tbPerson`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbOrderService` ADD CONSTRAINT `tbOrderService_typeOsId_fkey` FOREIGN KEY (`typeOsId`) REFERENCES `tbTypeOs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbOrderServiceItem` ADD CONSTRAINT `tbOrderServiceItem_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbIbgeCity` ADD CONSTRAINT `tbIbgeCity_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `tbIbgeState`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbIbgeDistrict` ADD CONSTRAINT `tbIbgeDistrict_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `tbIbgeCity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
