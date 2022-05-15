/*
  Warnings:

  - You are about to drop the `_Votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Votes" DROP CONSTRAINT "_Votes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Votes" DROP CONSTRAINT "_Votes_B_fkey";

-- DropTable
DROP TABLE "_Votes";

-- CreateTable
CREATE TABLE "_Upvotes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Downvotes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Upvotes_AB_unique" ON "_Upvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_Upvotes_B_index" ON "_Upvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Downvotes_AB_unique" ON "_Downvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_Downvotes_B_index" ON "_Downvotes"("B");

-- AddForeignKey
ALTER TABLE "_Upvotes" ADD CONSTRAINT "_Upvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Upvotes" ADD CONSTRAINT "_Upvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Downvotes" ADD CONSTRAINT "_Downvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Downvotes" ADD CONSTRAINT "_Downvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
