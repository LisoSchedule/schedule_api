-- CreateEnum
CREATE TYPE "UserStep" AS ENUM ('ChooseNickname', 'ChoosingNickname', 'ChooseGroup', 'ChooseSubGroup', 'MainMenu');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "chat_id" BIGINT NOT NULL,
    "username" TEXT,
    "nickname" TEXT,
    "group_id" INTEGER NOT NULL,
    "step" "UserStep" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Group" (
    "group_id" SERIAL NOT NULL,
    "sub_group" INTEGER NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("group_id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;
