import { Module } from '@nestjs/common';
import { AgendaProfissionalService } from './agenda-profissional.service';
import { AgendaProfissionalController } from './agenda-profissional.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AgendaProfissionalController],
  providers: [AgendaProfissionalService],
})
export class AgendaProfissionalModule { }
