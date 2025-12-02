export class User {
  id?: number;
  email: string;
  password: string;
  name: string;
  cpf: string;
  role: string;
  profissionalId?: number;

  profissional?: {
    id: number;
    nome: string;
  };
}
