import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AgendaProfissionalService } from './agenda-profissional.service';
import { CreateAgendaProfissionalDto } from './dto/create-agenda-profissional.dto';
import { UpdateAgendaProfissionalDto } from './dto/update-agenda-profissional.dto';

@Controller('agenda-profissional')
export class AgendaProfissionalController {
  constructor(private readonly agendaProfissionalService: AgendaProfissionalService) {}

  @Post()
  create(@Body() createAgendaProfissionalDto: CreateAgendaProfissionalDto) {
    return this.agendaProfissionalService.create(createAgendaProfissionalDto);
  }

  @Get()
  findAll() {
    return this.agendaProfissionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaProfissionalService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAgendaProfissionalDto: UpdateAgendaProfissionalDto) {
    return this.agendaProfissionalService.update(+id, updateAgendaProfissionalDto);
  }

}
