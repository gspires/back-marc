import { IsInt, IsNotEmpty, IsObject } from "class-validator";

export class CreateRelatorioConsultaDto {
    @IsInt()
    consultaId: number;

    @IsInt()
    servicoRelatorioId: number;

    @IsObject()
    @IsNotEmpty()
    dados: any
}
