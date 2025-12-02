-- CreateTable
CREATE TABLE `ServicoRelatorio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `servicoId` INTEGER NOT NULL,
    `estrutura` JSON NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServicoRelatorio_servicoId_key`(`servicoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RelatorioConsulta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultaId` INTEGER NOT NULL,
    `servicoRelatorioId` INTEGER NOT NULL,
    `dados` JSON NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RelatorioConsulta_consultaId_key`(`consultaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServicoRelatorio` ADD CONSTRAINT `ServicoRelatorio_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatorioConsulta` ADD CONSTRAINT `RelatorioConsulta_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatorioConsulta` ADD CONSTRAINT `RelatorioConsulta_servicoRelatorioId_fkey` FOREIGN KEY (`servicoRelatorioId`) REFERENCES `ServicoRelatorio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
