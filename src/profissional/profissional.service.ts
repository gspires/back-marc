import { Injectable } from '@nestjs/common';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfissionalService {

  constructor(private readonly prisma: PrismaService) { }

  create(createProfissionalDto: CreateProfissionalDto) {
    return this.prisma.profissional.create({
      data: createProfissionalDto
    });
  }

  findAll() {
    return this.prisma.profissional.findMany();
  }

  findOne(id: number) {
    return this.prisma.profissional.findFirst({
      where: {
        id
      }
    });
  }

  update(id: number, updateProfissionalDto: UpdateProfissionalDto) {
    return this.prisma.profissional.update({
      where: {
        id
      },
      data: updateProfissionalDto
    });
  }
}

