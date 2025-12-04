import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) { }

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  // 🚀 ENDPOINT DE SEED PARA INSERIR UM USUÁRIO
  @IsPublic() // opcional
  @Post('seed-user')
  async seedUser() {
    const user = await this.prisma.user.create({
      data: {
        name: "admin",
        email: "admin@gmail.com",
        password: "123@Mudar",
        cpf: "12345678989",
        role: "admin"
      }
    })

    return {
      message: 'Usuário criado com sucesso!',
      user,
    };
  }
}
