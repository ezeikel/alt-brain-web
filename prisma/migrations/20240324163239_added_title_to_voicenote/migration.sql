/*
  Warnings:

  - Added the required column `title` to the `VoiceNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoiceNote" ADD COLUMN     "title" TEXT NOT NULL;
