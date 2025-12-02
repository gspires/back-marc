import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class CreatePacienteDto {
    
    @IsString()
    nome: string;

    @IsString()
    cpf: string;

    @IsDateString()
    dataNascimento: string;

    @IsOptional()
    @IsString()
    telefone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    endereco: string;

}
