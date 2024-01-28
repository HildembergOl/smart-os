/*
  Warnings:

  - You are about to alter the column `codeOS` on the `tborderservice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `amountDiscount` on the `tborderserviceitem` table. All the data in the column will be lost.
  - You are about to drop the column `amountService` on the `tborderserviceitem` table. All the data in the column will be lost.
  - Added the required column `discount` to the `tbOrderServiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `tbOrderServiceItem` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE `tborderservice` MODIFY `codeOS` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `tborderserviceitem` DROP COLUMN `amountDiscount`,
    DROP COLUMN `amountService`,
    ADD COLUMN `discount` DOUBLE NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;

