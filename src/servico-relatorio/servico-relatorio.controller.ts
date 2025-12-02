import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ServicoRelatorioService } from './servico-relatorio.service';
import { CreateServicoRelatorioDto } from './dto/create-servico-relatorio.dto';
import { UpdateServicoRelatorioDto } from './dto/update-servico-relatorio.dto';

@Controller('servico-relatorio')
export class ServicoRelatorioController {
  constructor(private readonly servicoRelatorioService: ServicoRelatorioService) {}

  @Post()
  create(@Body() createServicoRelatorioDto: CreateServicoRelatorioDto) {
    console.log(createServicoRelatorioDto)
    return this.servicoRelatorioService.create(createServicoRelatorioDto);
  }

  @Get()
  findAll() {
    return this.servicoRelatorioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    
    const response = await this.servicoRelatorioService.findOne(+id);
    console.log(id)
    if(response === null){
      return 'Não existe relatório cadastrado para este serviço.'
    }else {
      return response
    }
    
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServicoRelatorioDto: UpdateServicoRelatorioDto) {
    console.log(id, updateServicoRelatorioDto)
    return this.servicoRelatorioService.update(+id, updateServicoRelatorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicoRelatorioService.remove(+id);
  }
}
