import { Injectable } from '@nestjs/common';
import { CreateRelatorioConsultaDto } from './dto/create-relatorio-consulta.dto';
import { UpdateRelatorioConsultaDto } from './dto/update-relatorio-consulta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RelatorioConsultaService {

  constructor(private readonly prisma: PrismaService) { }

  create(createRelatorioConsultaDto: CreateRelatorioConsultaDto) {
    return this.prisma.relatorioConsulta.create({
      data: createRelatorioConsultaDto
    })
  }

  findAll() {
    return `This action returns all relatorioConsulta`;
  }

  findOne(id: number) {
    return this.prisma.relatorioConsulta.findFirst({
      where: {
        consultaId: id
      }
    });
  }

  update(id: number, updateRelatorioConsultaDto: UpdateRelatorioConsultaDto) {
    return `This action updates a #${id} relatorioConsulta`;
  }

  remove(id: number) {
    return `This action removes a #${id} relatorioConsulta`;
  }
}
