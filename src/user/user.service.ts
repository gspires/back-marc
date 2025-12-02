import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create({ email, name, password, cpf, role, profissionalId }: CreateUserDto) {
    const userFound = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (userFound) {
      throw new BadRequestException('E-mail já está em uso.');
    }
    password = await bcrypt.hash(password, await bcrypt.genSalt())

    return this.prisma.user.create({
      data: {
        email,
        name,
        password,
        cpf,
        role,
        profissionalId
      }
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findByEmail(email: string) {

    return this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        profissional: true
      }
    })

  }

  async update(id: number, { name, email, password, cpf, role }: UpdateUserDto) {
    if (password) {
      password = await bcrypt.hash(password, await bcrypt.genSalt())
      return this.prisma.user.update({
        where: {
          id
        },
        data: {
          name,
          email,
          password,
          cpf,
          role
        }
      })
    } else {
      return this.prisma.user.update({
        where: {
          id
        },
        data: {
          name,
          email,
          cpf,
          role
        }
      })
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
