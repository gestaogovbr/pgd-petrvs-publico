<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Disciplina;

class DisciplinaSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $materias = array(
      array(
        "id" => "054be22a-f04b-4839-ac69-37958848eacd",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ATENDIMENTO EM PRIMEIROS SOCORROS",
        "sigla" => "APS",
        "ativo" => 1
      ),
      array(
        "id" => "05c380e8-a4c0-4191-ab06-366289a647ec",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "OPERAÇÕES AÉREAS",
        "sigla" => "OAE",
        "ativo" => 1
      ),
      array(
        "id" => "14227bb5-70f9-4755-b426-069997c354be",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "MANEJO DE ZOONOSES CANINAS",
        "sigla" => "MZC",
        "ativo" => 1
      ),
      array(
        "id" => "142696eb-c5de-4142-b0e1-06b0ce731039",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "PROCEDIMENTOS CINOTÉCNICOS DO DPRF",
        "sigla" => "PRC",
        "ativo" => 1
      ),
      array(
        "id" => "1c9b2065-a2e0-48ec-851d-a97f1554f60f",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "DIREITOS HUMANOS, INTEGRIDADE E RELAÇÕES HUMANAS",
        "sigla" => "DHI",
        "ativo" => 1
      ),
      array(
        "id" => "1e436040-d107-4bad-9f9a-826c0b771b43",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "LEGISLAÇÃO DE PESSOAL",
        "sigla" => "LGP",
        "ativo" => 1
      ),
      array(
        "id" => "22773e6a-348b-4063-87f4-d660ea708dde",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "DOCÊNCIA",
        "sigla" => "DOC",
        "ativo" => 1
      ),
      array(
        "id" => "2be69a32-6c72-458f-8c30-2bd150999e47",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "PATRULHA RURAL E URBANA",
        "sigla" => "PRU",
        "ativo" => 1
      ),
      array(
        "id" => "2df034f8-996b-416f-a5d6-6f68b6af58ad",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "CONTROLE INTERNO DA PRF",
        "sigla" => "CIP",
        "ativo" => 1
      ),
      array(
        "id" => "2e6946b3-72fc-4391-8c4e-2755c91749c2",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "POLICIAMENTO E FISCALIZAÇÃO",
        "sigla" => "PLF",
        "ativo" => 1
      ),
      array(
        "id" => "30e2ca68-baed-46fb-985a-aa16e3c4920e",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "FISCALIZAÇÃO DE PRODUTOS PERIGOSOS",
        "sigla" => "FPP",
        "ativo" => 1
      ),
      array(
        "id" => "32aa1b3a-6655-44fc-80a1-55e248d6693e",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "USO DIFERENCIADO DA FORÇA",
        "sigla" => "UDF",
        "ativo" => 1
      ),
      array(
        "id" => "363df921-bd61-4199-b12b-1f163f7052d4",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "SEGURANÇA DE AUTORIDADES",
        "sigla" => "SAT",
        "ativo" => 1
      ),
      array(
        "id" => "4205d6d1-b58a-4d5e-897f-af267ca3dc3d",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ASPECTOS DA ADMINISTRAÇÃO PÚBLICA",
        "sigla" => "AAP",
        "ativo" => 1
      ),
      array(
        "id" => "5031dd32-b526-4a6b-8921-e44aba2866e0",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "NOÇÕES DE ORGANIZAÇÃO E CONTROLE",
        "sigla" => "NOC",
        "ativo" => 1
      ),
      array(
        "id" => "504b6eda-a19a-4e77-96c1-7df5f9970b4b",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ESTRATÉGIA INSTITUCIONAL E GOVERNANÇA",
        "sigla" => "EIG",
        "ativo" => 1
      ),
      array(
        "id" => "51564ada-6077-4f48-be98-edcf85d9aff7",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "MOTOCICLISMO",
        "sigla" => "MOT",
        "ativo" => 1
      ),
      array(
        "id" => "5f4b92be-0c79-4ad6-904b-23c210ac0774",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ENFRENTAMENTO ÀS FRAUDES VEICULARES",
        "sigla" => "EFV",
        "ativo" => 1
      ),
      array(
        "id" => "684c3acd-922a-47da-96fb-f5a14248baa2",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO POLICIAL",
        "sigla" => "TIC",
        "ativo" => 1
      ),
      array(
        "id" => "6e04dff5-7c2c-4dca-a140-5ca2b88a75e0",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "SOCIEDADE, ESTADO, POLÍCIA E HISTÓRIA DA PRF",
        "sigla" => "SEP",
        "ativo" => 1
      ),
      array(
        "id" => "6eaec9d3-371e-47f3-a658-20bab02e7fe1",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "FISCALIZAÇÃO DE TRÂNSITO",
        "sigla" => "FTR",
        "ativo" => 1
      ),
      array(
        "id" => "75e193e4-08f4-43fe-846d-e48f659d64d8",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "GESTÃO ESTRATÉGICA DA PRF",
        "sigla" => "GEP",
        "ativo" => 1
      ),
      array(
        "id" => "7f270b26-c2db-4f82-8765-480939360e50",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "TÉCNICAS PARA FISCALIZAÇÃO DO USO DO ÁLCOOL E OUTRAS DROGAS",
        "sigla" => "FD",
        "ativo" => 1
      ),
      array(
        "id" => "86b83c3f-f466-4220-84a6-049fdc5ad344",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "PRINCÍPIOS BÁSICOS PARA A SAÚDE",
        "sigla" => "PBS",
        "ativo" => 1
      ),
      array(
        "id" => "87e00122-485b-4e18-9bb7-2ead0aab5ddd",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ASPECTOS LEGAIS DOS PROCEDIMENTOS POLICIAIS",
        "sigla" => "ALP",
        "ativo" => 1
      ),
      array(
        "id" => "8ce450a7-9b95-4eec-9131-4bb05c666a9c",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "FISCALIZAÇÃO DE PESOS E DIMENSÕES",
        "sigla" => "FPD",
        "ativo" => 1
      ),
      array(
        "id" => "9c5dc888-3041-4a92-a7d8-db8fce8bdc73",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "NOÇÕES DE GERENCIAMENTO DE CRISE",
        "sigla" => "GER",
        "ativo" => 1
      ),
      array(
        "id" => "9edb52e5-a01b-4469-83a7-2addced0b5b3",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ENFRENTAMENTO AO TRÁFICO DE DROGAS, ARMAS E MUNIÇÕES",
        "sigla" => "EDA",
        "ativo" => 1
      ),
      array(
        "id" => "a51b82c7-fcb6-42e0-ac77-6adc145be486",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ARMAMENTO MUNIÇÃO E TIRO",
        "sigla" => "AMT",
        "ativo" => 1
      ),
      array(
        "id" => "bc5f980e-10ec-42d6-80da-eafa56893e9a",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ELABORAÇÃO E GESTÃO DE PROJETOS",
        "sigla" => "GPJ",
        "ativo" => 1
      ),
      array(
        "id" => "be00afe6-43f4-4d4d-bddf-a404bd2f33ca",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "PLANEJAMENTO OPERACIONAL",
        "sigla" => "POP",
        "ativo" => 1
      ),
      array(
        "id" => "bf348323-3770-40b0-b3cf-725a95f9b33b",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "TÉCNICAS DE ABORDAGEM",
        "sigla" => "TAB",
        "ativo" => 1
      ),
      array(
        "id" => "c0c691bc-a314-472c-95de-4bab10ffcbbb",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "FISCALIZAÇÃO AMBIENTAL",
        "sigla" => "FAM",
        "ativo" => 1
      ),
      array(
        "id" => "c16244a1-9d71-476c-994c-8233a5192b0d",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "CUMPRIMENTO DE MANDADO DE ALTO RISCO",
        "sigla" => "CMA",
        "ativo" => 1
      ),
      array(
        "id" => "d6fe753f-84bc-4027-9eb6-211c18e8f6a8",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "NOÇÕES E TÉCNICAS DE SOBREVIVÊNCIA",
        "sigla" => "NTS",
        "ativo" => 1
      ),
      array(
        "id" => "df19adec-08c2-4b54-b3ac-94ece88e223c",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "CONDUÇÃO VEICULAR POLICIAL",
        "sigla" => "CVP",
        "ativo" => 1
      ),
      array(
        "id" => "df715873-464d-45eb-a1aa-1695b7c48472",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "OPERAÇÕES DE CONTROLE DE DISTÚRBIOS",
        "sigla" => "OCD",
        "ativo" => 1
      ),
      array(
        "id" => "e0d8b54d-089b-4129-a8bc-2c10b6837bb1",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "REDAÇÃO TÉCNICA PARA A ATIVIDADE POLICIAL",
        "sigla" => "RTP",
        "ativo" => 1
      ),
      array(
        "id" => "e83a1f4b-5489-43b7-bfa8-fe96f0c5c765",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "EDUCAÇÃO E SEGURANÇA PARA O TRANSITO",
        "sigla" => "EDT",
        "ativo" => 1
      ),
      array(
        "id" => "e84ddddd-9ef2-4d13-8d3b-799784847c56",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "TÉCNICAS DE DEFESA POLICIAL",
        "sigla" => "TDP",
        "ativo" => 1
      ),
      array(
        "id" => "e98a64fe-3862-4b73-8dce-22409a91f320",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "FISCALIZAÇÃO DO SERVIÇO DE TRANSPORTE",
        "sigla" => "FST",
        "ativo" => 1
      ),
      array(
        "id" => "eb4628a9-004a-40d5-81e8-556011bf6585",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "INTELIGÊNCIA POLICIAL E SEGURANÇA ORGÂNICA",
        "sigla" => "INT",
        "ativo" => 1
      ),
      array(
        "id" => "f0706db4-6ebc-436c-9c20-8fb29dd92f21",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "ACIDENTE E LEVANTAMENTO DO LOCAL",
        "sigla" => "ACD",
        "ativo" => 1
      ),
      array(
        "id" => "f0724f25-ebf4-4577-9d01-f696b122e95a",
        "created_at" => "2024-02-23 16:19:10",
        "updated_at" => "2024-02-23 16:19:10",
        "deleted_at" => NULL,
        "nome" => "CORREGEDORIA E DIREITO DISCIPLINAR",
        "sigla" => "CDD",
        "ativo" => 1
      ),
    );
    Disciplina::upsert($materias, "id");
  }
}
