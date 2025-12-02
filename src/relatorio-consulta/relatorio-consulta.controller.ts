import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelatorioConsultaService } from './relatorio-consulta.service';
import { CreateRelatorioConsultaDto } from './dto/create-relatorio-consulta.dto';
import { UpdateRelatorioConsultaDto } from './dto/update-relatorio-consulta.dto';

@Controller('relatorio-consulta')
export class RelatorioConsultaController {
  constructor(private readonly relatorioConsultaService: RelatorioConsultaService) {}

  @Post()
  create(@Body() createRelatorioConsultaDto: CreateRelatorioConsultaDto) {
    console.log(createRelatorioConsultaDto)
    return this.relatorioConsultaService.create(createRelatorioConsultaDto);
  }

  @Get()
  findAll() {
    return this.relatorioConsultaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relatorioConsultaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelatorioConsultaDto: UpdateRelatorioConsultaDto) {
    return this.relatorioConsultaService.update(+id, updateRelatorioConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relatorioConsultaService.remove(+id);
  }
}
