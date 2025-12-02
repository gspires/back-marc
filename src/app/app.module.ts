import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-suth.guard';
import { PacienteModule } from 'src/paciente/paciente.module';
import { ProfissionalModule } from 'src/profissional/profissional.module';
import { ServicoModule } from 'src/servico/servico.module';
import { AgendaProfissionalModule } from 'src/agenda-profissional/agenda-profissional.module';
import { ConsultaModule } from 'src/consulta/consulta.module';
import { ServicoRelatorioModule } from 'src/servico-relatorio/servico-relatorio.module';
import { RelatorioConsultaModule } from 'src/relatorio-consulta/relatorio-consulta.module';


@Module({
  imports: [PrismaModule, UserModule, AuthModule, PacienteModule, ProfissionalModule, ServicoModule, AgendaProfissionalModule,ConsultaModule, ServicoRelatorioModule, RelatorioConsultaModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
