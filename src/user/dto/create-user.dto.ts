import { IsEmail, IsEnum, IsInt, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";
import { UserRole } from "src/common/enums/user-role";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
    })
    password: string;

    @IsString()
    @Length(11, 11, { message: 'O CPF deve ter 11 dígitos (apenas números).' })
    cpf: string

    @IsEnum(UserRole, {
        message: `O papel (role) deve ser um dos seguintes valores: ${Object.values(
            UserRole,
        ).join(', ')}.`,
    })
    role: UserRole;

    @IsOptional()
    @IsInt()
    profissionalId?: number;
}