import { PartialType } from '@nestjs/mapped-types';
import { CreateServicoRelatorioDto } from './create-servico-relatorio.dto';

export class UpdateServicoRelatorioDto extends PartialType(CreateServicoRelatorioDto) {}
