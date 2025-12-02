import { IsDateString, IsEnum, IsInt, IsNumber, IsString, Min } from "class-validator"
import { DiaSemana } from "src/common/enums/dia-semana"

export class CreateAgendaProfissionalDto {

    @IsInt()
    profissionalId: number

    @IsEnum(DiaSemana)
    diaSemana: DiaSemana

    @IsDateString()
    horaInicio: string

    @IsDateString()
    horaFim: string

    @IsInt()
    @Min(1)
    intervaloMin: number

}
