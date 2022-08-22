-- CreateTable
CREATE TABLE "UserVotesOnPost" (
    "vote" INTEGER NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserVotesOnPost_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "UserVotesOnReply" (
    "vote" INTEGER NOT NULL,
    "replyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserVotesOnReply_pkey" PRIMARY KEY ("replyId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVotesOnPost_userId_key" ON "UserVotesOnPost"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserVotesOnReply_userId_key" ON "UserVotesOnReply"("userId");

-- AddForeignKey
ALTER TABLE "UserVotesOnPost" ADD CONSTRAINT "UserVotesOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVotesOnPost" ADD CONSTRAINT "UserVotesOnPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVotesOnReply" ADD CONSTRAINT "UserVotesOnReply_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVotesOnReply" ADD CONSTRAINT "UserVotesOnReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
