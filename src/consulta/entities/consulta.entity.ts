export class Consulta {
    id: number;
    pacienteId: number;
    profissionalId: number;
    servicoId?: number;
    data: Date;
    horaInicio: Date;
    horaFim: Date;
    status: string;
    observacoes?: string;
}
