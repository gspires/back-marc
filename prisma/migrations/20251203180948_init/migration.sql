-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "password" VARCHAR(127) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "role" VARCHAR(63) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profissionalId" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Paciente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "endereco" TEXT,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profissionais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "registroConselho" TEXT NOT NULL,
    "especialidade" TEXT,
    "telefone" TEXT,
    "email" TEXT,

    CONSTRAINT "profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Servico" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "duracaoMinutos" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AgendaProfissional" (
    "id" SERIAL NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,
    "intervaloMin" INTEGER NOT NULL,

    CONSTRAINT "AgendaProfissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Consulta" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "servicoId" INTEGER,
    "data" TIMESTAMP(3) NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pagamento" (
    "id" SERIAL NOT NULL,
    "consultaId" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataPagamento" TIMESTAMP(3),

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServicoRelatorio" (
    "id" SERIAL NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "estrutura" JSONB NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicoRelatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RelatorioConsulta" (
    "id" SERIAL NOT NULL,
    "consultaId" INTEGER NOT NULL,
    "servicoRelatorioId" INTEGER NOT NULL,
    "dados" JSONB NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RelatorioConsulta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_profissionalId_key" ON "public"."users"("profissionalId");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "public"."Paciente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_email_key" ON "public"."Paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profissionais_cpf_key" ON "public"."profissionais"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "profissionais_email_key" ON "public"."profissionais"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_consultaId_key" ON "public"."Pagamento"("consultaId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicoRelatorio_servicoId_key" ON "public"."ServicoRelatorio"("servicoId");

-- CreateIndex
CREATE UNIQUE INDEX "RelatorioConsulta_consultaId_key" ON "public"."RelatorioConsulta"("consultaId");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "public"."profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AgendaProfissional" ADD CONSTRAINT "AgendaProfissional_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "public"."profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consulta" ADD CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consulta" ADD CONSTRAINT "Consulta_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "public"."profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consulta" ADD CONSTRAINT "Consulta_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pagamento" ADD CONSTRAINT "Pagamento_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "public"."Consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServicoRelatorio" ADD CONSTRAINT "ServicoRelatorio_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RelatorioConsulta" ADD CONSTRAINT "RelatorioConsulta_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "public"."Consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RelatorioConsulta" ADD CONSTRAINT "RelatorioConsulta_servicoRelatorioId_fkey" FOREIGN KEY ("servicoRelatorioId") REFERENCES "public"."ServicoRelatorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
