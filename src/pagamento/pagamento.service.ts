import { Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PagamentoService {

  constructor(private readonly prisma: PrismaService){}

  create(createPagamentoDto: CreatePagamentoDto) {
    return this.prisma.pagamento.create({
      data: createPagamentoDto
    });
  }

  findAll() {
    return this.prisma.pagamento.findMany();
  }

  findOne(id: number) {
    return this.prisma.pagamento.findFirst({where:{id}});
  }

  update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    return this.prisma.pagamento.update({
      where: {
        id
      },
      data: updatePagamentoDto
    })
  }

}
