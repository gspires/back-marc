import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, Query } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-suth.guard';
import { findPackageJSON } from 'module';

@Controller('consulta')
@UseGuards(JwtAuthGuard)
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) { }

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.consultaService.findAll(req.user);
  }
  @Get('hitorico-paricente/:id')
  historico(@Param('id') id: string) {
    console.log(id)
    return this.consultaService.historico(+id);
  }

  @Get('resumo-status')
  async resumoStatus(@Request() req, @Query('mes') mes?: string, @Query('ano') ano?: string) {
    return this.consultaService.resumoStatus(req.user, mes ? Number(mes) : undefined,
    ano ? Number(ano) : undefined);
  }

  @Get('resumo-servico')
  async resumoServico(@Request() req, @Query('mes') mes?: string, @Query('ano') ano?: string) {
    return this.consultaService.resumoServico(req.user, mes ? Number(mes) : undefined,
    ano ? Number(ano) : undefined);
  }

  @Get('resumo-financeiro')
  async resumoFinanceiro(@Request() req, @Query('mes') mes?: string, @Query('ano') ano?: string) {
    return this.consultaService.resumoFinanceiro(req.user, mes ? Number(mes) : undefined,
    ano ? Number(ano) : undefined);
  }
    @Get('consulta-clientes')
  async consultaClientes(@Request() req, @Query('mes') mes?: string, @Query('ano') ano?: string) {
    console.log(req)
    return this.consultaService.consultaClientes(req.user, mes ? Number(mes) : undefined,
    ano ? Number(ano) : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
    return this.consultaService.update(+id, updateConsultaDto);
  }



}
