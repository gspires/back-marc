import { IsEnum, IsNumber, IsString } from "class-validator"
import { StatusServico } from "src/common/enums/status-servico";

export class CreateServicoDto {

    @IsString()
    descricao: string

    @IsNumber()
    duracaoMinutos: number

    @IsNumber()
    valor: number

    @IsEnum(StatusServico, {
        message: `O papel (status de agendamento) deve ser um dos seguintes valores: ${Object.values(
            StatusServico,
        ).join(', ')}.`,
    })
    status: StatusServico;
}
