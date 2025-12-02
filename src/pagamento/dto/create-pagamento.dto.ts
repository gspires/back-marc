export class CreatePagamentoDto {
    id: number
    consultaId: number
    valor: number
    formaPagamento: string
    status: string
    dataPagamento: string
}
