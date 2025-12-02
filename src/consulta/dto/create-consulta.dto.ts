import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { StatusAgendamento } from "src/common/enums/status-agendamento";

export class CreateConsultaDto {

    @IsInt()
    pacienteId: number;

    @IsInt()
    profissionalId: number;

    @IsOptional()
    @IsInt()
    servicoId?: number;

    @IsDateString()
    data: string;

    @IsDateString()
    horaInicio: string; 

    @IsDateString()
    horaFim: string; 

    @IsEnum(StatusAgendamento)
    status: StatusAgendamento; 

    @IsOptional()
    @IsString()
    observacoes?: string;
}
