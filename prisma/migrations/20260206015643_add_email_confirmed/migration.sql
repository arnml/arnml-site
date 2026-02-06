-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emailConfirmedAt" TIMESTAMP(3);
