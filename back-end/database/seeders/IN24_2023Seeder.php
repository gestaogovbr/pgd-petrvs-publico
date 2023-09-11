<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\BulkSeeeder;

use App\Models\TipoAtividade;
use App\Models\TipoModalidade;
use App\Models\TipoJustificativa;

class IN24_2023Seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    public $timenow;

    public function __construct(){
        $this->timenow = now();
    }

    public function run(){
        $tipos_atividades = array(
            [
                "id" => "22629851-db92-4e4e-999b-98e2368d84c6",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Atividades de gestão",
                "esforco" => 40.0,
                "dias_planejado" => 5.0,
                "etiquetas" => "[{\"key\": \"4533a61809adcc2fa2ff47f739b4105e\", \"icon\": \"bi bi-archive\", \"color\": \"#198754\", \"value\": \"Atividades de gestão\"}]",
                "checklist" => null,
                "comentario" => "São aquelas relacionadas às atividades como planejamento e gestão estratégica, tecnologia, orçamento, recursos humanos, gestão de patrimônio, gestão documental.",
            ],
            [
                "id" => "24d61d74-c34d-44f8-ab2b-ff47195fe3ff",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Atividades de assessoria",
                "esforco" => 40.0,
                "dias_planejado" => 5.0,
                "etiquetas" => "[{\"key\": \"fe25fa03c17bc91725b3660fca952d56\", \"icon\": \"bi bi-check-circle\", \"color\": \"#ffc107\", \"value\": \"Atividades de assessoria\"}]",
                "checklist" => null,
                "comentario" => "São as mais variadas atividade exercidas em assessorias de autoridades como ministros, secretários executivos e\/ou dirigentes de órgãos\/entidades.",
            ],
            [
                "id" => "3ee62cc1-6aa7-4472-b620-908d251b6967",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Atividades de suporte",
                "esforco" => 40.0,
                "dias_planejado" => 5.0,
                "etiquetas" => "[{\"key\": \"521544bdb1b9e1feac71062cd164a5c0\", \"icon\": \"bi bi-archive\", \"color\": \"#198754\", \"value\": \"Atividades de suporte\"}]",
                "checklist" => null,
                "comentario" => "São aquelas que possuem natureza administrativa e que contribuem para a entrega de atividades finalísticas."
            ],
            [
                "id" => "5ae28c56-582a-48a2-8688-c266f69589c9",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Fiscalização e controle",
                "esforco" => 40.0,
                "dias_planejado" => 5.0,
                "etiquetas" => "[{\"key\": \"05aa8046e6dfbbe9a30275685731e03b\", \"icon\": \"bi bi-cone-striped\", \"color\": \"#dc3545\", \"value\": \"Fiscalização e controle\"}]",
                "checklist" => null,
                "comentario" => "Atividades relacionadas à auditoria, controle interno, fiscalização como aquelas que ocorrem nos órgãos de controle ou algumas agências reguladoras."
            ],
            [
                "id" => "b99f9e4f-0aac-41a6-b536-b91b624d2b91",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Ensino, pesquisa e extensão",
                "esforco" => 40.0,
                "dias_planejado" => 5.0,
                "etiquetas" => "[{\"key\": \"bf154c8713d204d3ac920bf74b433663\", \"icon\": \"bi bi-book\", \"color\": \"#0dcaf0\", \"value\": \"Ensino, pesquisa e extensão\"}]",
                "checklist" => null,
                "comentario" => "Aquelas atividades exercidas em instituições de ensino, como por exemplo ensino superior."
            ],
        );

        $tipos_modalidades = array(
            [
                "id" => "11e04620-c9c8-4502-a37a-d5a3311698e3",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Presencial (obrigatório)",
                "plano_trabalho_calcula_horas" => 0,
                "atividade_tempo_despendido" => 0,
                "atividade_esforco" => 0
            ],
            [
                "id" => "48497798-02c2-46b8-87b9-5b03262b4fbd",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Presencial",
                "plano_trabalho_calcula_horas" => 0,
                "atividade_tempo_despendido" => 0,
                "atividade_esforco" => 0
            ],
            [
                "id" => "97dfa3f0-67d5-4b5c-9ed2-65eb7dea99b3",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Teletrabalho (Integral)",
                "plano_trabalho_calcula_horas" => 0,
                "atividade_tempo_despendido" => 0,
                "atividade_esforco" => 0
            ],
            [
                "id" => "fd58d1d3-cbaf-4a51-947a-6cd174ee4db0",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "nome" => "Teletrabalho (Parcial)",
                "plano_trabalho_calcula_horas" => 0,
                "atividade_tempo_despendido" => 0,
                "atividade_esforco" => 0
            ],
        );

        $tipos_justificativas = array(
            [
                "id" => "c84c4217-492f-4efe-bce7-c923372cf6c0",
                "nome" => "Fora do prazo :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ], 
            [
                "id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397",
                "nome" => "Fora do tema :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2",
                "nome" => "Motivação técnica insuficiente :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "35a960fe-a33e-4eef-a53b-3ea275622024",
                "nome" => "Abandono de atividade :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
              ],
            [
                "id" => "e970fcbc-51d7-49d7-ad6f-21907a45bae6",
                "nome" => "Entrega incompreensível :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
              ],
            [ 
                "id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c",
                "nome" => "Entregou antes do prazo :)",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "376813c6-8797-41f5-9c6e-436555b66d19",
                "nome" => "Superou os objetivos :)",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591",
                "nome" => "Apresentou novas alternativas :)",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186",
                "nome" => "Contribuiu para a unidade :)",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad",
                "nome" => "Criou parâmetro a ser seguido :)",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca",
                "nome" => "Superou os limites da sua função :)",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9",
                "nome" => "Buscou referência em outras áreas :)",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "ccb41bcb-3478-40d7-affd-afa0b1ce98d9",
                "nome" => "Entregar dentro do prazo :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "7de1b22c-41e1-424d-9c74-5c756411222e",
                "nome" => "Entregar dentro das expectativas :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0",
                "nome" => "Superar a média da equipe :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
            [
                "id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b",
                "nome" => "Superar a expectativa individual :(",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
            ],
        );

        TipoModalidade::insertOrIgnore($tipos_modalidades);
        TipoAtividade::insertOrIgnore($tipos_atividades);
        TipoJustificativa::insertOrIgnore($tipos_justificativas);

        /*
        $this->call([
          CidadeSeeder=>=>class,
          FeriadoSeeder=>=>class,
          PerfilSeeder=>=>class,
          TipoCapacidadeSeeder=>=>class,
          EntidadeSeeder=>=>class,
          UnidadePrfSeeder=>=>class,
          UsuarioSeeder=>=>class,
          AreaConhecimentoSeeder=>=>class,
          TipoCursoSeeder=>=>class,
          CursoSeeder=>=>class,
          MateriaSeeder=>=>class,
          CargoSeeder=>=>class,
          FuncaoSeeder=>=>class,
          CentroTreinamentoSeeder=>=>class,
          GrupoEspecializadoSeeder=>=>class,
        ]);
        */
    }
  
}