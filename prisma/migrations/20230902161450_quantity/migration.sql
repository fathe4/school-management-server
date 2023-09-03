/*
  Warnings:

  - Added the required column `quantity` to the `OrderedBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderedBook" ADD COLUMN     "quantity" INTEGER NOT NULL;
