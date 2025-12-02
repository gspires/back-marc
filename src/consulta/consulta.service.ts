import { Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ConsultaService {

  constructor(private readonly prisma: PrismaService) { }


  getFiltroMes(mes?: number, ano?: number) {
    if (!mes || !ano) {
      const hoje = new Date();
      mes = hoje.getMonth() + 1; // 1-12
      ano = hoje.getFullYear();
    }

    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    return {
      data: {
        gte: inicio,
        lt: fim
      }
    };
  }




  create(createConsultaDto: CreateConsultaDto) {
    return this.prisma.consulta.create({
      data: createConsultaDto
    });
  }

  async findAll(user) {
    if (user.role === 'funcionario' || user.role === 'admin') {

      return this.prisma.consulta.findMany({
        include: {
          paciente: {
            select: {
              id: true,
              nome: true,
            },
          },
          profissional: {
            select: {
              id: true,
              nome: true,
            },
          },
          servico: {
            select: {
              id: true,
              descricao: true,
            },
          },
        },
      });
    } else {
      console.log(user)
      return this.prisma.consulta.findMany({
        where: {
          profissionalId: user.profissionalId
        },
        include: {
          paciente: {
            select: {
              id: true,
              nome: true,
            },
          },
          profissional: {
            select: {
              id: true,
              nome: true,
            },
          },
          servico: {
            select: {
              id: true,
              descricao: true,
            },
          },
        },
      });
    }
  }

  findOne(id: number) {
    return this.prisma.consulta.findFirst({
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
          },
        },
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
        servico: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
      where: {
        id
      }
    });
  }

  update(id: number, updateConsultaDto: UpdateConsultaDto) {
    return this.prisma.consulta.update({
      where: {
        id
      },
      data: updateConsultaDto
    });
  }

  historico(id) {
    console.log(id)
    return this.prisma.consulta.findMany({
      where: {
        pacienteId: id,
        status: 'REALIZADO'
      },
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            cpf: true
          },
        },
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
        servico: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
    });
  }

  async resumoStatus(user, mes?: number, ano?: number) {
    let data;
    const filtroMes = this.getFiltroMes(mes, ano);
    if (user.role === 'profissional') {
      data = await this.prisma.consulta.groupBy({
        by: ['status'],
        _count: { status: true },
        where: {
          data: filtroMes.data,
          profissionalId: user.profissionalId
        }
      })
    } else {
      data = await this.prisma.consulta.groupBy({
        by: ['status'],
        _count: { status: true },
       where: {
        data: filtroMes.data
       }
      })
    }

    return Object.fromEntries(
      data.map(item => [item.status, item._count])
    )
  }
  async resumoServico(user, mes?: number, ano?: number) {
    var data;
    const filtroMes = this.getFiltroMes(mes, ano);
    data = await this.prisma.consulta.groupBy({
      by: ['servicoId'],
      _count: { _all: true },
      where: {
        data: filtroMes.data,
        profissionalId: user.profissionalId
      }
    })

    const servico = await this.prisma.servico.findMany({
      select: {
        id: true,
        descricao: true
      }
    })

    const resultado = data.map(item => {
      const serv = servico.find(s => s.id === item.servicoId)
      return {
        servicoId: item.servicoId,
        descricao: serv?.descricao,
        total: item._count._all,
      };

    })
    return resultado

  }



  async resumoFinanceiro(user, mes?: number, ano?: number) {
const filtroMes = this.getFiltroMes(mes, ano);
    type ResumoItem = {
      servicoId: number;
      descricao: string;
      quantidade: number;
      valorUnitario: number;
      subtotal: number;
    };

    let valorTotal = 0;
    const resumoDetalhado: ResumoItem[] = [];
    let qtdTotal = 0;

    if (user.role === 'profissional') {
      const servicos = await this.prisma.servico.findMany({
        select: {
          id: true,
          descricao: true,
          valor: true
        }
      });

      const contagemConsultas = await this.prisma.consulta.groupBy({
        by: ['servicoId'],
        _count: { _all: true },
        where: {
          data: filtroMes.data,
          profissionalId: user.profissionalId
        }
      });

      qtdTotal = contagemConsultas.reduce((total, item) => total + item._count._all, 0);


      for (const servico of servicos) {
        const contagem = contagemConsultas.find(c => c.servicoId === servico.id);
        const quantidade = contagem ? contagem._count._all : 0;

        const subtotal = quantidade * servico.valor;
        valorTotal += subtotal;


        resumoDetalhado.push({
          servicoId: servico.id,
          descricao: servico.descricao,
          quantidade,
          valorUnitario: servico.valor,
          subtotal
        });
      }

    } else {

      const servicos = await this.prisma.servico.findMany({
        select: {
          id: true,
          descricao: true,
          valor: true
        }
      });

      const contagemConsultas = await this.prisma.consulta.groupBy({
        by: ['servicoId'],
        _count: { _all: true },
        where: {
          data: filtroMes.data,
          profissionalId: user.profissionalId
        }
      });
      qtdTotal = contagemConsultas.reduce((total, item) => total + item._count._all, 0);


      for (const servico of servicos) {
        const contagem = contagemConsultas.find(c => c.servicoId === servico.id);
        console.log(contagem)
        const quantidade = contagem ? contagem._count._all : 0;

        const subtotal = quantidade * servico.valor;
        valorTotal += subtotal;

        resumoDetalhado.push({
          servicoId: servico.id,
          descricao: servico.descricao,
          quantidade,
          valorUnitario: servico.valor,
          subtotal
        });
      }
    }
    return {
      valorTotal,
      resumoDetalhado,
      qtdTotal
    };
  }

  async consultaClientes(user, mes?: number, ano?: number) {
    console.log(user)
    const filtroMes = this.getFiltroMes(mes, ano);
    if (user.role === 'funcionario' || user.role === 'admin') {
      const clientes = await this.prisma.consulta.findMany({
        distinct: ['pacienteId'],
        select: { pacienteId: true },
        where:{
          data: filtroMes.data
        }
      });

      return clientes.length;
    } else {
      const clientes = await this.prisma.consulta.findMany({
        where: {
          data: filtroMes.data,
          profissionalId: user.profissionalId
        },
        distinct: ['pacienteId'],
        select: { pacienteId: true }
      });

      return clientes.length;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} consulta`;
  }
}
