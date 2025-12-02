import { Module } from '@nestjs/common';
import { ServicoRelatorioService } from './servico-relatorio.service';
import { ServicoRelatorioController } from './servico-relatorio.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServicoRelatorioController],
  providers: [ServicoRelatorioService],
})
export class ServicoRelatorioModule {}
