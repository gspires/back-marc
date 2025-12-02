import { PartialType } from '@nestjs/mapped-types';
import { CreateRelatorioConsultaDto } from './create-relatorio-consulta.dto';

export class UpdateRelatorioConsultaDto extends PartialType(CreateRelatorioConsultaDto) {}
