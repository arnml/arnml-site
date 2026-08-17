-- CreateEnum
CREATE TYPE "NcEtapa" AS ENUM ('NOVO', 'CONTACTADO', 'RESPONDEU', 'NEGOCIANDO', 'FECHADO', 'NO_AR', 'PERDIDO');

-- CreateTable
CREATE TABLE "nightcrawl_parceiros" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "handle" TEXT NOT NULL DEFAULT '',
    "tipo" TEXT NOT NULL DEFAULT '',
    "contatos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cidade" TEXT NOT NULL DEFAULT '',
    "idioma" TEXT NOT NULL DEFAULT 'PT',
    "links" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pedido" TEXT NOT NULL DEFAULT '',
    "origem" TEXT NOT NULL DEFAULT '',
    "notas" TEXT NOT NULL DEFAULT '',
    "codigo" TEXT NOT NULL DEFAULT '',
    "desconto" TEXT NOT NULL DEFAULT '',
    "comissao" TEXT NOT NULL DEFAULT '',
    "etapa" "NcEtapa" NOT NULL DEFAULT 'NOVO',
    "proximo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nightcrawl_parceiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nightcrawl_registros" (
    "id" TEXT NOT NULL,
    "parceiroId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL DEFAULT '',
    "texto" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nightcrawl_registros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nightcrawl_vendas" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parceiroId" TEXT,
    "cliente" TEXT NOT NULL DEFAULT '',
    "pessoas" INTEGER NOT NULL DEFAULT 0,
    "valor" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nightcrawl_vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nightcrawl_clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "contato" TEXT NOT NULL DEFAULT '',
    "pais" TEXT NOT NULL DEFAULT '',
    "tipo" TEXT NOT NULL DEFAULT '',
    "origem" TEXT NOT NULL DEFAULT '',
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notas" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nightcrawl_clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nightcrawl_sites" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "proximaAcao" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nightcrawl_sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nightcrawl_modelos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "texto" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nightcrawl_modelos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nightcrawl_parceiros_etapa_idx" ON "nightcrawl_parceiros"("etapa");

-- CreateIndex
CREATE INDEX "nightcrawl_parceiros_proximo_idx" ON "nightcrawl_parceiros"("proximo");

-- CreateIndex
CREATE INDEX "nightcrawl_registros_parceiroId_idx" ON "nightcrawl_registros"("parceiroId");

-- CreateIndex
CREATE INDEX "nightcrawl_vendas_parceiroId_idx" ON "nightcrawl_vendas"("parceiroId");

-- CreateIndex
CREATE INDEX "nightcrawl_vendas_data_idx" ON "nightcrawl_vendas"("data");

-- AddForeignKey
ALTER TABLE "nightcrawl_registros" ADD CONSTRAINT "nightcrawl_registros_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "nightcrawl_parceiros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nightcrawl_vendas" ADD CONSTRAINT "nightcrawl_vendas_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "nightcrawl_parceiros"("id") ON DELETE SET NULL ON UPDATE CASCADE;
