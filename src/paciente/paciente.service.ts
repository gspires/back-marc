import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PacienteService {

  constructor(private readonly prisma: PrismaService) { }

  create(createPacienteDto: CreatePacienteDto) {
    const { dataNascimento, ...rest } = createPacienteDto
    return this.prisma.paciente.create({
      data: {
        ...rest,
        dataNascimento: new Date(dataNascimento)
      }
    })
  }

  findAll() {
    return this.prisma.paciente.findMany();
  }

  findOne(id: number) {
    return this.prisma.paciente.findFirst({
      where: {
        id
      }
    });
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
     const { dataNascimento, ...rest } = updatePacienteDto
    return this.prisma.paciente.update({
      where: {
        id
      },
      data: {
        ...rest,
        ...(dataNascimento ? { dataNascimento: new Date(dataNascimento) } : {})
      }
    });
  }

}
