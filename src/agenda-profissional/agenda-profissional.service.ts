import { Injectable } from '@nestjs/common';
import { CreateAgendaProfissionalDto } from './dto/create-agenda-profissional.dto';
import { UpdateAgendaProfissionalDto } from './dto/update-agenda-profissional.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgendaProfissionalService {

  constructor(private readonly prisma: PrismaService){}

  create(createAgendaProfissionalDto: CreateAgendaProfissionalDto) {
    return this.prisma.agendaProfissional.create({
      data: createAgendaProfissionalDto
    });
  }

  findAll() {
    return this.prisma.agendaProfissional.findMany();
  }

  findOne(id: number) {
    return this.prisma.agendaProfissional.findFirst({
      where: {
        id
      }
    });
  }

  update(id: number, updateAgendaProfissionalDto: UpdateAgendaProfissionalDto) {
    return this.prisma.agendaProfissional.update({
      where: {
        id
      },
      data: updateAgendaProfissionalDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} agendaProfissional`;
  }
}
