<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\BulkSeeeder;

use App\Models\TipoAtividade;
use App\Models\TipoModalidade;

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

    public function run()
    {
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

        TipoModalidade::insertOrIgnore($tipos_modalidades);
        TipoAtividade::insertOrIgnore($tipos_atividades);
    }
}