import { Module } from '@nestjs/common';
import { RelatorioConsultaService } from './relatorio-consulta.service';
import { RelatorioConsultaController } from './relatorio-consulta.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RelatorioConsultaController],
  providers: [RelatorioConsultaService],
})
export class RelatorioConsultaModule {}
