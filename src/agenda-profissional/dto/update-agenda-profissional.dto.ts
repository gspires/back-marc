import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaProfissionalDto } from './create-agenda-profissional.dto';

export class UpdateAgendaProfissionalDto extends PartialType(CreateAgendaProfissionalDto) {}
