-- CreateTable
CREATE TABLE IF NOT EXISTS `Actor`  (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `WishList` (
    `id` VARCHAR(191) NOT NULL,
    `movieId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `likes` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
