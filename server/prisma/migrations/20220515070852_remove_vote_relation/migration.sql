/*
  Warnings:

  - You are about to drop the `_Downvotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Upvotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Downvotes" DROP CONSTRAINT "_Downvotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Downvotes" DROP CONSTRAINT "_Downvotes_B_fkey";

-- DropForeignKey
ALTER TABLE "_Upvotes" DROP CONSTRAINT "_Upvotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Upvotes" DROP CONSTRAINT "_Upvotes_B_fkey";

-- DropTable
DROP TABLE "_Downvotes";

-- DropTable
DROP TABLE "_Upvotes";
