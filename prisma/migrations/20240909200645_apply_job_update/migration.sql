-- AlterTable
ALTER TABLE `AppliedJobs` MODIFY `userId` INTEGER NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `surname` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phoneCode` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Live` MODIFY `content` VARCHAR(65535) NOT NULL;
