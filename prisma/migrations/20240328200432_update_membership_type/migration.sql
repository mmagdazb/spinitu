-- AlterTable
ALTER TABLE "MembershipType" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 300.00,
ADD COLUMN     "validity" INTEGER NOT NULL DEFAULT 1;
