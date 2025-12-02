import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateProfissionalDto {
    @IsString()
    nome: string;

    @IsString()
    cpf: string;

    @IsString()
    registroConselho: string;

    @IsString()
    especialidade?: string;

    @IsOptional()
    @IsString()
    telefone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

}
