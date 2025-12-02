import { Injectable } from '@nestjs/common';
import { CreateServicoRelatorioDto } from './dto/create-servico-relatorio.dto';
import { UpdateServicoRelatorioDto } from './dto/update-servico-relatorio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicoRelatorioService {

  constructor(private readonly prisma: PrismaService) { }

  create(createServicoRelatorioDto: CreateServicoRelatorioDto) {
    return this.prisma.servicoRelatorio.create({
      data: createServicoRelatorioDto
    });
  }

  findAll() {
    return `This action returns all servicoRelatorio`;
  }

  findOne(id: number) {
    return this.prisma.servicoRelatorio.findFirst({
      where: {
        servicoId: id
      }
    });
  }

  update(id: number, updateServicoRelatorioDto: UpdateServicoRelatorioDto) {
    return this.prisma.servicoRelatorio.update({
      where: {
        servicoId: id
      },
      data: updateServicoRelatorioDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} servicoRelatorio`;
  }
}
