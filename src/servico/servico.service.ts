import { Injectable } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicoService {

  constructor(private readonly prisma: PrismaService) {}

  create(createServicoDto: CreateServicoDto) {
    return this.prisma.servico.create({
      data: createServicoDto
    });
  }

  findAll() {
    return this.prisma.servico.findMany();
  }

  findOne(id: number) {
    return this.prisma.servico.findFirst({
      where:{
        id
      }
    });
  }

  update(id: number, updateServicoDto: UpdateServicoDto) {
    return this.prisma.servico.update({
      where: {
        id
      },
      data: updateServicoDto
    })
  }

  remove(id: number) {
    return `This action removes a #${id} servico`;
  }
}
