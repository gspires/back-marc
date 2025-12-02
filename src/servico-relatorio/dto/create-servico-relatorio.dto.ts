import { IsInt, IsNotEmpty, IsObject } from "class-validator";

export class CreateServicoRelatorioDto {
    @IsInt()
    servicoId: number;

    @IsObject()
    @IsNotEmpty()
    estrutura: any
}
