import { DiaSemana } from "src/common/enums/dia-semana"

export class AgendaProfissional {
        profissionalId: number
        diaSemana: DiaSemana
        horaInicio: string
        horaFim: string
        intervaloMin: number
}
