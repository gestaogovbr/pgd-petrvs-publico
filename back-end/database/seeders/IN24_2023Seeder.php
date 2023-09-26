<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Database\Seeders\BulkSeeeder;

use App\Models\Cidade;
use App\Models\TipoAtividade;
use App\Models\TipoAvaliacao;
use App\Models\TipoModalidade;
use App\Models\TipoJustificativa;
use App\Models\TipoAvaliacaoJustificativa;
use App\Models\TipoAvaliacaoNota;
use App\Models\TipoDocumento;
use App\Models\Programa;
use App\Models\Template;
use App\Models\Unidade;
use App\Models\EixoTematico;
use App\Models\Entrega;
use App\Models\Entidade;

class IN24_2023Seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    public $timenow;
    public $brasilia;

    public function __construct(){
        $this->timenow = now();
        $this->brasilia = Cidade::where('codigo_ibge', '5300108')->sole();
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
            [
              "id" => "f2aef225-a391-4667-9c41-6bb537b18778",
              "nome" => "Avaliação fora do prazo (registro sistêmico)",
              "created_at" => $this->timenow,
              "updated_at" => $this->timenow,
            ],
        );

        $tipos_avaliacoes = array(
            [
              "id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5",
              "created_at" => $this->timenow,
              "updated_at" => $this->timenow,
              "deleted_at" => null,
              "nome" => "Plano de Trabalho",
              "tipo" => "QUANTITATIVO"
            ],
            [
              "id" => "b0db190d-823d-4222-bc92-abff634f5390",
              "created_at" => $this->timenow,
              "updated_at" => $this->timenow,
              "deleted_at" => null,
              "nome" => "Plano de Entrega",
              "tipo" => "QUANTITATIVO"],
        );
      
        $tipos_avaliacoes_notas = array(
          [
            "id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 2,
            "nota" => "\"8\"",
            "descricao" => "(Alto desempenho) Plano de trabalho executado acima do esperado",
            "pergunta" => "O que pode melhorar?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-building",
            "cor" => "#42f09f",
            "codigo" => "8",
            "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5"
          ],
          [
            "id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 1,
            "nota" => "\"10\"",
            "descricao" => "(Excepcional) Plano de entregas executado com desempenho muito acima do esperado",
            "pergunta" => "Do que você gostou?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-award",
            "cor" => "#198754",
            "codigo" => "10",
            "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390"
          ],
          [
            "id" => "428f6d53-2ae1-49cb-b8bd-8cd76be2da05",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 5,
            "nota" => "\"1\"",
            "descricao" => "(Não executado) Plano de entregas não executado",
            "pergunta" => "Por quê não aceitar a atividade?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-camera-video-off",
            "cor" => "#dc3545",
            "codigo" => "1",
            "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390"
          ],
          [
            "id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 4,
            "nota" => "\"4\"",
            "descricao" => "(Inadequado) Plano de trabalho executado abaixo do esperado ou parcialmente executado",
            "pergunta" => "Por quê não aceitar a atividade?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-bug",
            "cor" => "#fd7e14",
            "codigo" => "4",
            "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5"
          ],
          [
            "id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 3,
            "nota" => "\"7\"",
            "descricao" => "(Adequado) Plano de trabalho executado dentro do esperado",
            "pergunta" => "O que pode melhorar?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-brightness-alt-high",
            "cor" => "#ffc107",
            "codigo" => "7",
            "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5"
          ],
          [
            "id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 1,
            "nota" => "\"10\"",
            "descricao" => "(Excepcional) Plano de trabalho executado muito acima do esperado",
            "pergunta" => "O que pode melhorar?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-award",
            "cor" => "#198754",
            "codigo" => "10",
            "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5"
          ],
          [
            "id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 3,
            "nota" => "\"7\"",
            "descricao" => "(Adequado) Plano de entregas executado dentro do esperado",
            "pergunta" => "Do que você gostou?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-brightness-alt-high",
            "cor" => "#ffc107",
            "codigo" => "7",
            "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390"
          ],
          [
            "id" => "869b9687-e61d-4260-8178-aa8d9dab8a10",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 5,
            "nota" => "\"1\"",
            "descricao" => "(Não executado) Plano de trabalho integralmente não executado.",
            "pergunta" => "Por quê não aceitar a atividade?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-bug",
            "cor" => "#dc3545",
            "codigo" => "1",
            "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5"
          ],
          [
            "id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 2,
            "nota" => "\"8\"",
            "descricao" => "(Alto desempenho) Plano de entregas executado com desempenho acima do esperado",
            "pergunta" => "Do que você gostou?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-building",
            "cor" => "#1de286",
            "codigo" => "8",
            "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390"
          ],
          [
            "id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "sequencia" => 4,
            "nota" => "\"4\"",
            "descricao" => "(Inadequado) Plano de entregas executado abaixo do esperado",
            "pergunta" => "O que pode melhorar?",
            "aprova" => 0,
            "justifica" => 1,
            "icone" => "bi bi-bug",
            "cor" => "#fd7e14",
            "codigo" => "4",
            "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390"
          ]
        );

        $tipos_avaliacoes_justificativas= array(
          [
            "id" => "0006b44a-1eba-45a4-a64f-a3199dcd2264",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "034d31d8-8a44-4d9c-8852-99755eab71fe",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "047a028c-1bda-4b40-ba66-de458d606f25",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "052f4c64-5cd9-4fc8-996d-034cabae19ef",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "0794a269-e8c9-4568-9322-e19611575f34",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "08acf046-68b9-4409-a7b1-9ff312294e20",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "0c9ce375-19f4-4807-87b3-9b80a6ee86b0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "0cabba5f-3d8b-40d8-83f3-3217ef9a540e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "869b9687-e61d-4260-8178-aa8d9dab8a10",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "0e9fd5b2-fcb0-4a0a-b7cf-967b8a43ec19",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b"
          ],
          [
            "id" => "0ee5bfae-9515-4720-b1cf-baf0637d2a42",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "10d43f50-57a1-4806-b1a9-ae38a26f138f",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "869b9687-e61d-4260-8178-aa8d9dab8a10",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "18efc0f0-a697-4ee4-9211-1c40f2e438c0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "428f6d53-2ae1-49cb-b8bd-8cd76be2da05",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "1bce5170-b9d8-4460-9f7d-9895dc8cffd0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "270a632c-1cb4-4940-907f-0451162c1ce0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "2843e028-9939-4dc3-9049-5c0f9e444103",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "31d384e8-b8e2-42a2-b3c2-f32640073b69",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "396aa966-c1d9-4ef1-b7e1-aff69e7c17ae",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "39d54ee6-b119-425b-8352-592f4066a0dd",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
            "tipo_justificativa_id" => "e970fcbc-51d7-49d7-ad6f-21907a45bae6"
          ],
          [
            "id" => "3ab4e5a1-34c5-4473-9e90-3ed5b6d11c65",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "ccb41bcb-3478-40d7-affd-afa0b1ce98d9"
          ],
          [
            "id" => "43240e7f-a335-4c0f-8387-211eca68cbe2",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "480bb721-effc-4c11-8c52-f18833e03c92",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "4fa902ff-f5df-4397-a04a-f2458c9d8cb8",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "5cf344e5-0f03-463c-8f3b-758361f99eb6",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "5dfb971d-544a-4eed-9293-79c9155b2a33",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "620b43c8-55ff-49dc-bac9-52b0ea40f344",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "869b9687-e61d-4260-8178-aa8d9dab8a10",
            "tipo_justificativa_id" => "35a960fe-a33e-4eef-a53b-3ea275622024"
          ],
          [
            "id" => "65068de2-07db-47ce-b62e-98efbcb60c69",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e"
          ],
          [
            "id" => "67621bd1-96f3-4942-ade4-7bd6e6c7a29f",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "693f2c9c-3dca-4edb-97dc-8ff17993e035",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "6df57dff-cdc9-427e-adc4-a32829181bca",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "75fe7e1d-bcb8-4d08-84c7-a83bddbb3858",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "79e6899f-7052-40fd-8031-7a9319cf4e8e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "7b1d6b4f-64ed-4937-a317-fd1c4a68ed71",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "428f6d53-2ae1-49cb-b8bd-8cd76be2da05",
            "tipo_justificativa_id" => "35a960fe-a33e-4eef-a53b-3ea275622024"
          ],
          [
            "id" => "7b3c7221-dd7b-437d-b13f-32bd9c1ffdf2",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "7b84e818-e826-441e-82e7-bdb9a5cf09e1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "7d4fbcf5-9350-41d7-813c-ec4949d990db",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "80cb5adb-774e-4fe4-985b-52ca46207feb",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "834c70b6-c8da-491f-8507-12633ce265f9",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "8a9624ae-d231-4a79-a91e-08f23c38d092",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b"
          ],
          [
            "id" => "8aa090d9-df73-4f4a-951c-bf14dc22695c",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "8dda4453-cb81-4362-9f3c-e1cba1745fdc",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "9a0b1c07-814d-4795-a163-33149efd9abf",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "9b6c086e-d9f2-4873-b69f-8c31945c7ae3",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2"
          ],
          [
            "id" => "9e1aa0be-0f75-47b7-9159-5278fcf842b7",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "tipo_justificativa_id" => "ccb41bcb-3478-40d7-affd-afa0b1ce98d9"
          ],
          [
            "id" => "a02054c8-63d5-4082-b5e3-3a4afacb406f",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
            "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b"
          ],
          [
            "id" => "a24e675d-84c6-4f7b-858a-191e1f6c828f",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "869b9687-e61d-4260-8178-aa8d9dab8a10",
            "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2"
          ],
          [
            "id" => "a2840f38-6e28-4532-982e-14d57a15be30",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2"
          ],
          [
            "id" => "a879c6ea-5c1a-4efd-8c44-7c846a2977f1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
            "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e"
          ],
          [
            "id" => "a8848ee5-0f5e-4867-9596-0bbd485bcf00",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b"
          ],
          [
            "id" => "aa5b02d5-b53a-4d7e-a8ba-173b4226fe6a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "ada8fe86-b36b-4a41-88cc-29cd362c8530",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "aee58d54-b94a-478e-8cea-fcd1e8bdbc5d",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "b5407340-6a08-4271-964b-f163e2c10388",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "be1d1209-a140-440e-90c0-c053fbcccbc5",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "869b9687-e61d-4260-8178-aa8d9dab8a10",
            "tipo_justificativa_id" => "e970fcbc-51d7-49d7-ad6f-21907a45bae6"
          ],
          [
            "id" => "be98b374-dd28-401a-9057-e84ea198fb54",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "becba76f-4d42-47a0-b232-36990e83c682",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "c18112d3-bbf8-4a23-8500-56b45c80ed09",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "428f6d53-2ae1-49cb-b8bd-8cd76be2da05",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "c5d91a6e-f05b-4f13-8024-2b8e2425a7ae",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "c8480a3f-1209-485f-a992-21c5b4f3000e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "c9e28a3f-c5a6-4d73-bb57-0f3ed9911328",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "cda778fa-1173-4e4f-b11c-8974af4a68f0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b"
          ],
          [
            "id" => "d4c097b7-e713-464c-86d2-6df01d0e4d66",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "dc437ba6-a4e6-42b6-a8fa-f105d42b8c21",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e"
          ],
          [
            "id" => "defabc53-46fe-48da-88b5-d834307e23fe",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
            "tipo_justificativa_id" => "35a960fe-a33e-4eef-a53b-3ea275622024"
          ],
          [
            "id" => "e82a1c73-26dd-4b69-91d5-fe7fecd29f67",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "e9bb8ff2-967c-411c-bb29-18057734f1ad",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "ea235d82-f47d-4fc2-b27c-6b518a91ebdd",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "ec095dd2-ce18-40de-a2c9-db3b4c936842",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "f6d72ac2-74bf-4e69-ae31-98c795eb0037",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "f7f0b929-6210-4816-bc7b-69f3d77e1621",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "tipo_justificativa_id" => "35a960fe-a33e-4eef-a53b-3ea275622024"
          ],
          [
            "id" => "fc8dd5db-2f48-466a-be34-a4d633cbba15",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
            "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e"
          ],
          [
            "id" => "fd3525e6-c3b0-4250-a680-290909198a4f",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "fffee814-231a-4e7d-93ad-eccb3357c6ed",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
        );

        $tipos_documentos = array(
            [
              "id" => "48bc6f30-a634-4a21-9717-6fe0dc0d4f2a",
              "created_at" => $this->timenow,
              "updated_at" => $this->timenow,
              "deleted_at" => NULL,
              "codigo" => NULL,
              "nome" => "TCR",
              "entregavel" => 0,
            ]
        );

        // Encontra unidade inicial (instituidora) para registro de programa
        $unidade = Unidade::where('codigo', 1)->first();
        $programas = array(
            [ 
                "id" => "9ebed914-1b82-4df0-95da-b0c8fadbb6f2",
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => NULL,
                "nome" => "PGD",
                "normativa" => "Portaria XXX XXX XXX XXX",
                "prazo_max_plano_entrega" => 365,
                "termo_obrigatorio" => 1,
                "config" => NULL,
                "data_inicio" => $this->timenow,
                "data_fim" => date('Y-m-d H:i:s', strtotime('+1 year', strtotime($this->timenow))),
                "periodicidade_consolidacao" => "MENSAL",
                "periodicidade_valor" => 1,
                "dias_tolerancia_consolidacao" => 10,
                "dias_tolerancia_avaliacao" => 20,
                "nota_padrao_avaliacao" => "7",
                "plano_trabalho_assinatura_participante" => 1,
                "plano_trabalho_assinatura_gestor_lotacao" => 0,
                "plano_trabalho_assinatura_gestor_unidade" => 0,
                "plano_trabalho_assinatura_gestor_entidade" => 0,
                "tipo_avaliacao_plano_trabalho_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5",
                "tipo_avaliacao_plano_entrega_id" => "b0db190d-823d-4222-bc92-abff634f5390",
                "tipo_justificativa_id" => "f2aef225-a391-4667-9c41-6bb537b18778",
                "unidade_id" => $unidade->id,
                "template_tcr_id" => "39f087ce-8816-4be2-a28e-18e8a8e83010",
                "tipo_documento_tcr_id" => "48bc6f30-a634-4a21-9717-6fe0dc0d4f2a",
                "documento_id" => NULL,
            ]
        );

        $templates = array(
          [
            "id" => "39f087ce-8816-4be2-a28e-18e8a8e83010",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "1",
            "numero" => DB::select("CALL sequence_template_numero()")[0]->number,
            "especie" => "TCR",
            "titulo" => "TCR (Termo de ciência e responsabilidade) - Exemplo 1",
            "conteudo" => "<p style=\"text-align: center; margin: 5.0pt 0cm 0cm 36.0pt;\" align=\"center\"><strong><span style=\"font-size: 14.0pt;\">TERMOS DE CI&Ecirc;NCIA E RESPONSABILIDADE</span></strong></p>\n<p style=\"text-align: center; margin: 5.0pt 0cm 0cm 36.0pt;\" align=\"center\"><strong>&nbsp;</strong></p>\n<p style=\"text-indent: -18.0pt; mso-list: l1 level1 lfo2; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">1. </span></strong><strong>CONTEXTO</strong></p>\n<p style=\"margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-list: Ignore;\">1.1. </span></strong><strong>CONCEITO DE PGD - </strong>Programa indutor de melhoria de desempenho institucional no servi&ccedil;o p&uacute;blico, com foco na vincula&ccedil;&atilde;o entre o trabalho dos participantes, as entregas das unidades e as estrat&eacute;gias organizacionais.</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">1.2. </span></strong><strong>OBJETIVOS DO PGD</strong></p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.1. </span>Promover a gest&atilde;o orientada a resultados, baseada em evid&ecirc;ncias, com foco na melhoria cont&iacute;nua das entregas dos &oacute;rg&atilde;os e entidades da administra&ccedil;&atilde;o p&uacute;blica federal;</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.2.<span style=\"font: 7.0pt 'Times New Roman';\"> &nbsp;</span></span>Estimular a cultura de planejamento institucional;</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.3.&nbsp;</span>Otimizar a gest&atilde;o dos recursos p&uacute;blicos;</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.4.<span style=\"font: 7.0pt 'Times New Roman';\"> &nbsp;</span></span>Incentivar a cultura da inova&ccedil;&atilde;o;</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.5. </span>Fomentar a transforma&ccedil;&atilde;o digital;</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.6. </span>Atrair e reter talentos na administra&ccedil;&atilde;o p&uacute;blica federal;</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.7. </span>Contribuir para o dimensionamento da for&ccedil;a de trabalho;</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.8. </span>Aprimorar o desempenho institucional, das equipes e dos indiv&iacute;duos;</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.9. </span>Contribuir para a sa&uacute;de e a qualidade de vida no trabalho dos participantes; e</p>\n<p style=\"margin-left: 108.0pt; text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">1.2.10. </span>Contribuir para a sustentabilidade ambiental na administra&ccedil;&atilde;o p&uacute;blica federal.</p>\n<p style=\"margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-list: Ignore;\">1.3. </span></strong><!--[endif]--><strong>PGD x TELETRABALHO - </strong>De modo geral, o PGD representa <strong>a gest&atilde;o por resultado</strong> enquanto Teletrabalho <strong>&eacute; uma modalidade de trabalho poss&iacute;vel dentro do referido programa.</strong></p>\n<p style=\"margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">1.4. </span></strong><!--[endif]--><strong>DIREITO ADQUIRIDO - </strong>Conforme Art. 15, al&iacute;nea b, da IN CONJUNTA SEGES-SGPRT/MGI N&ordm; 24, DE 28 DE JULHO DE 2023, a participa&ccedil;&atilde;o no PGD<strong> n&atilde;o constitui direito adquirido.</strong></p>\n<p style=\"margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2;\">&nbsp;</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo2; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\"><strong>2. </strong></span><strong>INFORMA&Ccedil;&Otilde;ES DO PROGRAMA DE GEST&Atilde;O</strong></p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">2.1. </span><!--[endif]-->{{instituicao.nome}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">2.2. </span><!--[endif]-->{{programa.nome}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">2.3. </span><!--[endif]-->{{programa.data_inicio}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">2.4. </span><!--[endif]-->{{programa.data_fim}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\">&nbsp;</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo2; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">3. </span></strong><strong>DADOS B&Aacute;SICOS</strong></p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">3.1. </span><!--[endif]-->Versionamento do TCR: {{tcr.versao}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">3.2. </span><!--[endif]-->Data de in&iacute;cio: {{data.inicio}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">3.3. </span><!--[endif]-->Data da habilita&ccedil;&atilde;o: {{data.atual}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">3.4. </span><!--[endif]-->Data do t&eacute;rmino da vig&ecirc;ncia: {{data.fim}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">3.5. </span><!--[endif]-->Unidade de execu&ccedil;&atilde;o: {{unidade.nome}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">3.6. </span><!--[endif]-->Aloca&ccedil;&atilde;o da for&ccedil;a de trabalho ??</p>\n<p style=\"margin: 0cm; text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo2; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">4. </span></strong><strong>PARTICIPANTE</strong></p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">4.1. </span><!--[endif]-->Nome completo: {{usuario.nome}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">4.2. </span><!--[endif]-->Lota&ccedil;&atilde;o e &Oacute;rg&atilde;o: {{usuario.lotacao_id.nome}} / {{programa.instituicao}}</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">4.3. </span><!--[endif]-->Unidade executora vinculada: {{unidade.nome}}</p>\n<p style=\"text-align: justify; margin: 0cm 0cm 0cm 72.0pt;\">&nbsp;</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo2; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">5. </span></strong><strong>MODALIDADE E REGIME</strong></p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-list: Ignore;\">5.1. </span></strong><strong>{{tipo_modalidade.nome}}</strong></p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">5.2. </span><!--[endif]-->Regras de Comparecimento Presencial</p>\n<p style=\"text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2; margin: 5.0pt 0cm 0cm 108.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">5.2.1. </span>Prazo para comparecimento padr&atilde;o: __ dias</p>\n<p style=\"text-align: justify; text-indent: -9.0pt; mso-list: l1 level3 lfo2; margin: 5.0pt 0cm 0cm 108.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">5.2.2. </span>O servidor dever&aacute; desempenhar suas atividades laborais ordinariamente conforme as seguintes especifica&ccedil;&otilde;es:</p>\n<p style=\"text-align: justify; margin: 5.0pt 0cm 0cm 108.0pt;\">&nbsp;</p>\n<table class=\"MsoTableGrid\" style=\"width: 99.88%; margin-left: -.25pt; border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;\" border=\"1\" width=\"99%\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr style=\"mso-yfti-irow: 0; mso-yfti-firstrow: yes;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>Dia</strong></p>\n</td>\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>Turno</strong></p>\n</td>\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>Local</strong></p>\n</td>\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>Descri&ccedil;&atilde;o</strong></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 1;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 2;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 3;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 4;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 5; mso-yfti-lastrow: yes;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong>&nbsp;</strong></p>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\"margin: 0cm; text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo2; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">6.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></strong><!--[endif]--><strong>CRIT&Eacute;RIOS DE AVALIA&Ccedil;&Atilde;O</strong></p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 0cm 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">6.1. </span><!--[endif]-->Qualidade;</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 0cm 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">6.2. </span><!--[endif]-->Tempestividade;</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 0cm 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">6.3. </span><!--[endif]-->Relacionamento com os pares;</p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 0cm 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">6.4. </span><!--[endif]-->Cumprimento dos combinados;</p>\n<p style=\"margin-bottom: 0cm; text-align: justify;\"><strong>&nbsp;</strong></p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo2; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">7. </span></strong><strong>CANAIS DE COMUNICA&Ccedil;&Atilde;O </strong></p>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level2 lfo2; margin: 5.0pt 0cm 0cm 72.0pt;\"><!-- [if !supportLists]--><span style=\"mso-list: Ignore;\">7.1. </span>A ferramentas de comunica&ccedil;&atilde;o do PETRVS ser&atilde;o utilizados prioritariamente e poder&atilde;o ser associadas aos seguintes meios:</p>\n<p class=\"MsoListParagraphCxSpFirst\" style=\"mso-add-space: auto; line-height: normal; margin: 0cm 0cm 0cm 108.0pt;\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n<div align=\"center\">\n<table class=\"MsoTableGrid\" style=\"border-collapse: collapse; mso-table-layout-alt: fixed; border: none; mso-border-alt: solid windowtext .5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;\" border=\"1\" width=\"529\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr style=\"mso-yfti-irow: 0; mso-yfti-firstrow: yes; height: 15.0pt;\">\n<td style=\"width: 200.45pt; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"267\">\n<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">MEIO</span></p>\n</td>\n<td style=\"width: 196.2pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"262\">\n<p class=\"MsoListParagraphCxSpLast\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">CONTATO</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 1; height: 15.0pt;\">\n<td style=\"width: 200.45pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"267\">\n<p class=\"MsoListParagraphCxSpFirst\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">E-mail institucional</span></p>\n</td>\n<td style=\"width: 196.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"262\">\n<p class=\"MsoListParagraphCxSpLast\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 2; height: 15.0pt;\">\n<td style=\"width: 200.45pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"267\">\n<p class=\"MsoListParagraphCxSpFirst\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Telefone celular</span></p>\n</td>\n<td style=\"width: 196.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"262\">\n<p class=\"MsoListParagraphCxSpLast\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 3; height: 15.0pt;\">\n<td style=\"width: 200.45pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"267\">\n<p class=\"MsoListParagraphCxSpFirst\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: PT-BR;\">WhatsApp</span></p>\n</td>\n<td style=\"width: 196.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"262\">\n<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 4; height: 15.0pt;\">\n<td style=\"width: 200.45pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"267\">\n<p class=\"MsoListParagraphCxSpFirst\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: PT-BR;\">Microsoft Teams </span></p>\n</td>\n<td style=\"width: 196.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"262\">\n<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 5; height: 15.0pt;\">\n<td style=\"width: 200.45pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"267\">\n<p class=\"MsoListParagraphCxSpFirst\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: PT-BR;\">Google Chat</span></p>\n</td>\n<td style=\"width: 196.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"262\">\n<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 6; mso-yfti-lastrow: yes; height: 15.0pt;\">\n<td style=\"width: 200.45pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"267\">\n<p class=\"MsoListParagraphCxSpFirst\" style=\"margin: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: PT-BR;\">Outro</span></p>\n</td>\n<td style=\"width: 196.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" width=\"262\">\n<p class=\"MsoListParagraphCxSpLast\" style=\"margin-bottom: 0cm; mso-add-space: auto; text-align: center; line-height: normal;\" align=\"center\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<p class=\"MsoListParagraph\" style=\"mso-add-space: auto; line-height: normal; margin: 0cm 0cm 0cm 108.0pt;\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n<p style=\"margin-bottom: 0cm; text-align: justify;\">Declaro estar ciente das minhas responsabilidades enquanto participante do PGD, quais sejam:</p>\n<ul>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Assinar e cumprir o plano de trabalho e o disposto neste TCR; </span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Informar &agrave; chefia da unidade de execu&ccedil;&atilde;o as atividades realizadas, a ocorr&ecirc;ncia de afastamentos, licen&ccedil;as e outros impedimentos, bem como eventual dificuldade, d&uacute;vida ou informa&ccedil;&atilde;o que possa atrasar ou prejudicar a realiza&ccedil;&atilde;o dos trabalhos;<span style=\"mso-spacerun: yes;\">&nbsp; </span></span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Executar o plano de trabalho, temporariamente, em modalidade distinta, na hip&oacute;tese de caso fortuito ou for&ccedil;a maior que impe&ccedil;a o cumprimento do plano de trabalho na modalidade pactuada; e </span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Seguir as orienta&ccedil;&otilde;es de ergonomia e seguran&ccedil;a no trabalho;</span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Estar dispon&iacute;vel para ser contatado nas condi&ccedil;&otilde;es especificadas acima;</span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Atender &agrave;s convoca&ccedil;&otilde;es para comparecimento presencial que ser&atilde;o apresentadas por meio, prazo e no local aqui estabelecidos; </span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Zelar pela guarda e manuten&ccedil;&atilde;o dos equipamentos cuja retirada tenha sido autorizada nos termos do art. 16 desta IN n&ordm; 24/23; </span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Custear a estrutura necess&aacute;ria, f&iacute;sica e tecnol&oacute;gica, para o desempenho das atividades em caso de teletrabalho. </span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Exercer atividades presencialmente, se for o caso, nas condi&ccedil;&otilde;es especificadas; </span></li>\n<li class=\"MsoNormal\" style=\"text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman';\">Em caso de teletrabalho desempenhado no exterior, aguardar a autoriza&ccedil;&atilde;o do dirigente m&aacute;ximo do &oacute;rg&atilde;o/entidade, nos termos no inciso V do art. 12 do Decreto n&ordm; 11.072/22, para iniciar a execu&ccedil;&atilde;o das minhas atividades a partir de local fora do territ&oacute;rio nacional, e voltar a exercer as minhas atividades a partir do territ&oacute;rio nacional, em at&eacute; dois meses, no caso de revoga&ccedil;&atilde;o ou suspens&atilde;o da portaria que concedeu o teletrabalho com resid&ecirc;ncia no exterior.</span></li>\n</ul>\n<p style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo2; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong><span style=\"mso-list: Ignore;\">8.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></strong><!--[endif]--><strong>ASSINATURAS</strong></p>",
            "dataset" => "[{\"field\": \"carga_horaria\", \"label\": \"Carga horária diária\"}, {\"field\": \"tempo_total\", \"label\": \"Tempo total do plano\"}, {\"field\": \"tempo_proporcional\", \"label\": \"Tempo proporcional (descontando afastamentos)\"}, {\"type\": \"DATETIME\", \"field\": \"data_inicio\", \"label\": \"Data inicial do plano\"}, {\"type\": \"DATETIME\", \"field\": \"data_fim\", \"label\": \"Data final do plano\"}, {\"type\": \"OBJECT\", \"field\": \"tipo_modalidade\", \"label\": \"tipo_modalidade\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}]}, {\"type\": \"OBJECT\", \"field\": \"unidade\", \"label\": \"unidade\", \"fields\": [{\"field\": \"codigo\", \"label\": \"Código\"}, {\"field\": \"sigla\", \"label\": \"Sigla\"}, {\"field\": \"nome\", \"label\": \"Nome\"}, {\"type\": \"OBJECT\", \"field\": \"gestor\", \"label\": \"Gestor\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"SERVIDOR_EFETIVO\", \"value\": \"Servidor público cargo efetivo\"}, {\"key\": \"SERVIDOR_COMISSIONADO\", \"value\": \"Servidor público cargo em comissão\"}, {\"key\": \"EMPREGADO\", \"value\": \"Empregado público\"}, {\"key\": \"CONTRATADO_TEMPORARIO\", \"value\": \"Contratado temporário\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"gestor_substituto\", \"label\": \"Gestor substituto\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"SERVIDOR_EFETIVO\", \"value\": \"Servidor público cargo efetivo\"}, {\"key\": \"SERVIDOR_COMISSIONADO\", \"value\": \"Servidor público cargo em comissão\"}, {\"key\": \"EMPREGADO\", \"value\": \"Empregado público\"}, {\"key\": \"CONTRATADO_TEMPORARIO\", \"value\": \"Contratado temporário\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"field\": \"entidade\", \"label\": \"Entidade\"}, {\"field\": \"cidade\", \"label\": \"Cidade\"}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"usuario\", \"label\": \"usuario\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"SERVIDOR_EFETIVO\", \"value\": \"Servidor público cargo efetivo\"}, {\"key\": \"SERVIDOR_COMISSIONADO\", \"value\": \"Servidor público cargo em comissão\"}, {\"key\": \"EMPREGADO\", \"value\": \"Empregado público\"}, {\"key\": \"CONTRATADO_TEMPORARIO\", \"value\": \"Contratado temporário\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"programa\", \"label\": \"programa\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"normativo\", \"label\": \"Normativo\"}, {\"field\": \"data_inicio\", \"label\": \"Data início\"}, {\"field\": \"data_fim\", \"label\": \"Data término\"}]}, {\"type\": \"ARRAY\", \"field\": \"entregas\", \"label\": \"entregas\", \"fields\": [{\"field\": \"descricao\", \"label\": \"Descrição da entrega\"}, {\"field\": \"forca_trabalho\", \"label\": \"Percentual da força de trabalho\"}, {\"field\": \"orgao\", \"label\": \"Orgão externo vinculado a entrega\"}, {\"field\": \"meta\", \"label\": \"Meta extipulada para a entrega\"}]}]",
            "entidade_id" => NULL,
            "unidade_id" => NULL,
          ],
          [
            "id" => "f9c3633e-4028-4f55-a8c9-80c094f7df4e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "2",
            "numero" => DB::select("CALL sequence_template_numero()")[0]->number,
            "especie" => "TCR",
            "titulo" => "TCR (Termo de ciência e responsabilidade) - Exemplo 2",
            "conteudo" => "<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">Pelo presente termo de ci&ecirc;ncia e responsabilidade, em raz&atilde;o da solicita&ccedil;&atilde;o de ades&atilde;o ao Programa de Gest&atilde;o e Desempenho da Secretaria X do Minist&eacute;rio Y, eu, PARTICIPANTE,</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO assinar e cumprir o plano de trabalho e o TCR;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO atender &agrave;s convoca&ccedil;&otilde;es para comparecimento presencial, nos termos do art. 14&nbsp;desta Portaria;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO estar dispon&iacute;vel para ser contatado no hor&aacute;rio de funcionamento do &oacute;rg&atilde;o ou da entidade, pelos meios de comunica&ccedil;&atilde;o definidos em TCR, exceto se acordado de forma distinta com a chefia da unidade de execu&ccedil;&atilde;o;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO informar &agrave; chefia da unidade de execu&ccedil;&atilde;o as atividades realizadas, a ocorr&ecirc;ncia de afastamentos, licen&ccedil;as e outros impedimentos, bem como eventual dificuldade, d&uacute;vida ou informa&ccedil;&atilde;o que possa atrasar ou prejudicar a realiza&ccedil;&atilde;o dos trabalhos;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia das veda&ccedil;&otilde;es contidas nos termos do art. 18&nbsp;desta Portaria;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO zelar pela guarda e manuten&ccedil;&atilde;o dos equipamentos cuja retirada tenha sido autorizada nos termos do art. 22 desta Portaria;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO executar o plano de trabalho, temporariamente, em modalidade distinta, na hip&oacute;tese de caso fortuito ou for&ccedil;a maior que impe&ccedil;a o cumprimento do plano de trabalho na modalidade pactuada;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO comprometer-me a providenciar e manter a infraestrutura f&iacute;sica e tecnol&oacute;gica necess&aacute;ria &agrave; eficiente realiza&ccedil;&atilde;o de suas atividades fora das depend&ecirc;ncias f&iacute;sicas da Secretaria X, mediante o uso de equipamentos e instala&ccedil;&otilde;es que permitam o acesso, o tr&aacute;fego e a utiliza&ccedil;&atilde;o de informa&ccedil;&otilde;es de maneira segura e tempestiva, al&eacute;m de condi&ccedil;&otilde;es adequadas de ergonomia, bem como assumindo pessoalmente quaisquer custos decorrentes relacionados ao teletrabalho, como conex&atilde;o &agrave; internet, &agrave; energia el&eacute;trica e &agrave; rede de telefonia;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO zelar pelas informa&ccedil;&otilde;es acessadas de forma remota, mediante observ&acirc;ncia &agrave;s normas internas e externas de seguran&ccedil;a da informa&ccedil;&atilde;o;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia de que a participa&ccedil;&atilde;o no programa de gest&atilde;o n&atilde;o constitui direito adquirido, podendo ser desligado nas condi&ccedil;&otilde;es da Portaria que regulamenta o PGD da Secretaria X</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia da veda&ccedil;&atilde;o de utiliza&ccedil;&atilde;o de terceiros para a execu&ccedil;&atilde;o dos trabalhos acordados como parte das metas;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia do dever de observar as disposi&ccedil;&otilde;es constantes da Lei n&ordm; 13.709, de 14.8.2018, Lei Geral de Prote&ccedil;&atilde;o de Dados Pessoas (LGPD), no que couber;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia das orienta&ccedil;&otilde;es do DECRETO N&ordm; 1.171, DE 22 DE JUNHO DE 1994, que divulga o C&oacute;digo de &Eacute;tica Profissional do Servidor P&uacute;blico Civil do Poder Executivo Federal;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia de que a chefia imediata e o dirigente da unidade dever&atilde;o acompanhar a qualidade e a adapta&ccedil;&atilde;o dos participantes do programa de gest&atilde;o;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia de que a chefia imediata dever&aacute; aferir o cumprimento das metas estabelecidas bem como avaliar a qualidade das entregas;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia de que a altera&ccedil;&atilde;o no c&aacute;lculo das metas ou atividades constantes do plano de trabalho n&atilde;o enseja o dever de assinar novo termo de ci&ecirc;ncia e responsabilidade, bastando ser notificado quanto ao teor da altera&ccedil;&atilde;o promovida.</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia de que a chefia imediata poder&aacute; redefinir minhas metas por necessidade do servi&ccedil;o, na hip&oacute;tese de surgimento de demanda priorit&aacute;ria cujas atividades n&atilde;o tenham sido previamente acordadas;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO manter dados cadastrais e de contato, especialmente telef&ocirc;nicos, permanentemente atualizados e ativos;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO operar diariamente a&nbsp;caixa postal individual de correio eletr&ocirc;nico institucional, a Intranet e demais formas de comunica&ccedil;&atilde;o da unidade;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO permanecer em disponibilidade constante para contato por meios telem&aacute;ticos pelo per&iacute;odo acordado com a chefia imediata, n&atilde;o podendo extrapolar o hor&aacute;rio de funcionamento da unidade;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia de que, em caso de mudan&ccedil;a de modalidade, teletrabalho para presencial,&nbsp;ser&aacute; firmado um novo TCR em at&eacute;&nbsp;trinta dias ap&oacute;s o ato de notifica&ccedil;&atilde;o;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO ter ci&ecirc;ncia de que a chefia imediata dever&aacute; manter contato permanente com os participantes do programa de gest&atilde;o para repassar instru&ccedil;&otilde;es de servi&ccedil;o e manifestar considera&ccedil;&otilde;es sobre sua atua&ccedil;&atilde;o;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">&nbsp;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">Com a assinatura deste termo, o participante:</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">I - autoriza o fornecimento do n&uacute;mero de telefone pessoal &agrave;s&nbsp;pessoas que fa&ccedil;am chamadas telef&ocirc;nicas para a sua unidade de exerc&iacute;cio na Secretaria X, sem necessidade de avalia&ccedil;&atilde;o, pelo atendente, a respeito da pertin&ecirc;ncia do fornecimento; e</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">II - autoriza o fornecimento do n&uacute;mero de telefone pessoal aos servidores em exerc&iacute;cio na Secretaria X que indiquem necessidade de contato telef&ocirc;nico relacionado &agrave;s suas atividades profissionais.</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">&nbsp;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">Telefone Celular:</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">Telefone Residencial (opcional):</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">Endere&ccedil;o:</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">E-mail pessoal:</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">&nbsp;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">DECLARO que os n&uacute;meros de telefone e e-mail pessoal listados neste formul&aacute;rio est&atilde;o ativos e atualizados.</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">&nbsp;</p>\n<p class=\"Texto_Justificado_Recuo_Primeira_Linha\" style=\"text-align: justify;\">*Classifique este documento, quanto ao n&iacute;vel de acesso, como restrito, por conter informa&ccedil;&atilde;o pessoal (art. 31 da Lei n&ordm; 12.527, de 18.11.2011).</p>",
            "dataset" => "[{\"field\": \"carga_horaria\", \"label\": \"Carga horária diária\"}, {\"field\": \"tempo_total\", \"label\": \"Tempo total do plano\"}, {\"field\": \"tempo_proporcional\", \"label\": \"Tempo proporcional (descontando afastamentos)\"}, {\"type\": \"DATETIME\", \"field\": \"data_inicio\", \"label\": \"Data inicial do plano\"}, {\"type\": \"DATETIME\", \"field\": \"data_fim\", \"label\": \"Data final do plano\"}, {\"type\": \"OBJECT\", \"field\": \"tipo_modalidade\", \"label\": \"tipo_modalidade\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}]}, {\"type\": \"OBJECT\", \"field\": \"unidade\", \"label\": \"unidade\", \"fields\": [{\"field\": \"codigo\", \"label\": \"Código\"}, {\"field\": \"sigla\", \"label\": \"Sigla\"}, {\"field\": \"nome\", \"label\": \"Nome\"}, {\"type\": \"OBJECT\", \"field\": \"gestor\", \"label\": \"Gestor\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"SERVIDOR_EFETIVO\", \"value\": \"Servidor público cargo efetivo\"}, {\"key\": \"SERVIDOR_COMISSIONADO\", \"value\": \"Servidor público cargo em comissão\"}, {\"key\": \"EMPREGADO\", \"value\": \"Empregado público\"}, {\"key\": \"CONTRATADO_TEMPORARIO\", \"value\": \"Contratado temporário\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"gestor_substituto\", \"label\": \"Gestor substituto\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"SERVIDOR_EFETIVO\", \"value\": \"Servidor público cargo efetivo\"}, {\"key\": \"SERVIDOR_COMISSIONADO\", \"value\": \"Servidor público cargo em comissão\"}, {\"key\": \"EMPREGADO\", \"value\": \"Empregado público\"}, {\"key\": \"CONTRATADO_TEMPORARIO\", \"value\": \"Contratado temporário\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"field\": \"entidade\", \"label\": \"Entidade\"}, {\"field\": \"cidade\", \"label\": \"Cidade\"}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"usuario\", \"label\": \"usuario\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"SERVIDOR_EFETIVO\", \"value\": \"Servidor público cargo efetivo\"}, {\"key\": \"SERVIDOR_COMISSIONADO\", \"value\": \"Servidor público cargo em comissão\"}, {\"key\": \"EMPREGADO\", \"value\": \"Empregado público\"}, {\"key\": \"CONTRATADO_TEMPORARIO\", \"value\": \"Contratado temporário\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"programa\", \"label\": \"programa\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"normativo\", \"label\": \"Normativo\"}, {\"field\": \"data_inicio\", \"label\": \"Data início\"}, {\"field\": \"data_fim\", \"label\": \"Data término\"}]}, {\"type\": \"ARRAY\", \"field\": \"entregas\", \"label\": \"entregas\", \"fields\": [{\"field\": \"descricao\", \"label\": \"Descrição da entrega\"}, {\"field\": \"forca_trabalho\", \"label\": \"Percentual da força de trabalho\"}, {\"field\": \"orgao\", \"label\": \"Orgão externo vinculado a entrega\"}, {\"field\": \"meta\", \"label\": \"Meta extipulada para a entrega\"}]}]",
            "entidade_id" => NULL,
            "unidade_id" => NULL,
          ],
        );

        $eixos_tematicos = array(
          array(
            "id" => "0a80af0f-cae3-409f-9df9-195721587acd",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Engajamento",
            "icone" => "bi bi-bell",
            "cor" => "#FAEDCD",
            "descricao" => "...",
          ),
          array(
            "id" => "10837269-6f23-4978-a86e-b5d280af389a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Criatividade",
            "icone" => "bi bi-bell",
            "cor" => "#E9EDC9",
            "descricao" => "...",
          ),
          array(
            "id" => "4634cec2-f829-46f7-9dfe-29f094bc807a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Respeito",
            "icone" => "bi bi-bell",
            "cor" => "#FAEDCD",
            "descricao" => "...",
          ),
          array(
            "id" => "6c930a94-f778-4943-925d-7812c33258cc",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Diversidade",
            "icone" => "bi bi-bell",
            "cor" => "#FAEDCD",
            "descricao" => "...",
          ),
          array(
            "id" => "a28d8bf1-30b9-496e-b903-9568829ba3c1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Colaboração",
            "icone" => "bi bi-bell",
            "cor" => "#FAEDCD",
            "descricao" => "...",
          ),
          array(
            "id" => "06e244eb-bb98-470f-8846-575e4dab16ee",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Pessoas",
            "icone" => "bi bi-brightness-alt-high",
            "cor" => "#50bf31",
            "descricao" => "Fomentar o bem-estar, o desenvolvimento de competências, a disciplina e o desempenho dos servidores",
          ),
          array(
            "id" => "13903305-91a2-4515-bb6e-4bc7883c147a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Geral",
            "icone" => "bi bi-book",
            "cor" => "#55dd97",
            "descricao" => "Eixo utilizado no órgão/entidade que não utilize os eixos-temáticos.",
          ),
          array(
            "id" => "524f043f-cafd-4bd1-8687-643ef6be7c9b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Logística e Infraestrutura",
            "icone" => "bi bi-building",
            "cor" => "#AEE2FF",
            "descricao" => "Prover recursos, infraestrutura e soluções tecnológicas inovadoras.",
          ),
          array(
            "id" => "6b867a0a-9349-447a-a4b9-cdacd44e317b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Comunicação",
            "icone" => "bi bi-camera-reels",
            "cor" => "#FAEDCD",
            "descricao" => "Fortalecer a imagem e a transparência institucional",
          ),
          array(
            "id" => "c49516a9-d457-4c68-b3a3-5a4de3edda14",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Integração",
            "icone" => "bi bi-diagram-3",
            "cor" => "#FFEB99",
            "descricao" => "Aprimorar a articulação e integração interinstitucional.",
          ),
          array(
            "id" => "c68ea6e6-2b40-42c8-bb46-8b5b27ee6766",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Segurança Pública com Cidadania",
            "icone" => "bi bi-heart",
            "cor" => "#d73c3c",
            "descricao" => "Potencializar ações de educação para o trânsito. Intensificar a fiscalização e o policiamento ostensivo. Aprimorar o atendimento de acidentes de trânsito. Fomentar ações preventivas de promoção a mobilidade. Intensificar ações responsivas de promoção da livre circulação. Potencializar ações de enfrentamento à criminalidade. Intensificar o enfrentamento a crimes ambientais. Otimizar o policiamento por inteligência. Intensificar ações de garantia e promoção dos direitos humanos.",
          ),
          array(
            "id" => "d543188b-67f4-4a7a-9282-f5f20757ea79",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Sistema Penitenciário",
            "icone" => "fa-solid fa-check-double",
            "cor" => "#D0C9C0",
            "descricao" => "Gerir o Sistema Penitenciário Federal, promovendo o isolamento das lideranças criminosas.",
          ),
          array(
            "id" => "de6d350e-9a51-4549-9104-a00d6125290e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Gestão e Inovação",
            "icone" => "bi bi-award",
            "cor" => "#FFD4B2",
            "descricao" => "Aprimorar a governança e a gestão por resultados.",
          ),
        );

        $entregas = array(
          array(
            "id" => "23bf3c25-016f-4b9c-9a61-f0fba2a701ab",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Modelo - Valor",
            "descricao" => "Modelo de entrega na qual a meta espec´´ifica valor. Ex.: Financeiro.",
            "tipo_indicador" => "VALOR",
            "lista_qualitativos" => NULL,
            "unidade_id" => NULL,
          ),
          array(
            "id" => "375520ce-b147-441e-8b5f-688ccd65e1a1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Modelo - Percentual",
            "descricao" => "Modelo de entrega com meta em percentual",
            "tipo_indicador" => "PORCENTAGEM",
            "lista_qualitativos" => NULL,
            "unidade_id" => NULL,
          ),
          array(
            "id" => "4ef8f42e-3753-471f-b984-ad75cd596aa6",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Modelo - Avaliação do público",
            "descricao" => "Modelo de entrega onde o público destinatário avalia a entrega.",
            "tipo_indicador" => "QUALITATIVO",
            "lista_qualitativos" => "[{\"key\": \"AVALIAOEXCELENTE\", \"value\": \"Avaliação Excelente\"}, {\"key\": \"AVALIAOBOA\", \"value\": \"Avaliação boa\"}, {\"key\": \"NOAVALIADA\", \"value\": \"Não avaliada\"}, {\"key\": \"AVALIADACOMORUIM\", \"value\": \"Avaliada como ruim\"}, {\"key\": \"AVALIADACOMOPSSIMA\", \"value\": \"Avaliada como péssima\"}]",
            "unidade_id" => NULL,
          ),
          array(
            "id" => "7aeef185-4e4c-4007-af81-0d0b5d82f45b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Modelo - Quantidade",
            "descricao" => "Modelo de entrega na qual a meta permite aferição por quantidade.",
            "tipo_indicador" => "QUANTIDADE",
            "lista_qualitativos" => NULL,
            "unidade_id" => NULL,
          ),
          array(
            "id" => "9ce92424-5b04-453a-af9d-7297641315c5",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Modelo - Qualitativo - Ordinal",
            "descricao" => "Modelo de entrega na qual a meta é aferida através de níveis de qualidade",
            "tipo_indicador" => "QUALITATIVO",
            "lista_qualitativos" => "[{\"key\": \"EXCELENTE\", \"value\": \"Excelente\"}, {\"key\": \"MUITOBOM\", \"value\": \"Muito bom\"}, {\"key\": \"BOM\", \"value\": \"Bom\"}, {\"key\": \"RAZOVEL\", \"value\": \"Razoável\"}, {\"key\": \"RUIMNOENTREGUE\", \"value\": \"Ruim (Não entregue)\"}, {\"key\": \"NEUTRO\", \"value\": \"Neutro\"}]",
            "unidade_id" => NULL,
          ),
          array(
            "id" => "a08cb8f5-1b08-4e59-8a50-81962adf273b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "nome" => "Modelo - Entrega com variação na execução",
            "descricao" => "Modelo de entrega onde ocorrerá aferição de execução ao final do prazo da respectiva entrega",
            "tipo_indicador" => "QUALITATIVO",
            "lista_qualitativos" => "[{\"key\": \"CONCLUDATOTALMENTE\", \"value\": \"Concluída totalmente\"}, {\"key\": \"CONCLUDAPARCIALMENTE\", \"value\": \"Concluída parcialmente\"}, {\"key\": \"NOINICIADA\", \"value\": \"Não iniciada\"}, {\"key\": \"COMDEPENDNCIAS\", \"value\": \"Com dependências\"}, {\"key\": \"COMPROBLEMAS\", \"value\": \"Com problemas\"}]",
            "unidade_id" => NULL,
          ),
        );

        $entidades = array(
          array(
            "id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "sigla" => "MGI",
            "nome" => "Ministério da Gestão e da Inovação em Serviços Públicos",
            "abrangencia" => "NACIONAL",
            "codigo_ibge" => $this->brasilia->codigo_ibge,
            "uf" => "DF",
            "carga_horaria_padrao" => 8,
            "gravar_historico_processo" => 0,
            "layout_formulario_atividade" => "COMPLETO",
            "campos_ocultos_atividade" => NULL,
            "nomenclatura" => NULL,
            "url_sei" => "https://sei.economia.gov.br/",
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "forma_contagem_carga_horaria" => "DIA",
            "api_public_key" => NULL,
            "api_private_key" => NULL,
            "expediente" => "{\"sexta\": [], \"terca\": [], \"quarta\": [], \"quinta\": [], \"sabado\": [], \"domingo\": [], \"segunda\": [], \"especial\": []}",
            "tipo_modalidade_id" => NULL,
            "cidade_id" => $this->brasilia->id,
            "gestor_id" => NULL,
            "gestor_substituto_id" => NULL,
          ),
        );

        $unidades = array(
          array(
            "codigo" => '17500', //Código SIAPE da UORG
            "sigla" => 'MGI',
            "nome" => 'Ministério da Gestão e da Inovação em Serviços Públicos',
            "entidade_id" => '1eec6bcb-28c9-4b2e-ad37-250a10439647',
            "instituidora" => 1,
            "cidade_id" => $this->brasilia->id
          ),
        );

        
        // Existe uma sequência no Seeder. Se alterar vai dar ruim
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

        TipoModalidade::insertOrIgnore($tipos_modalidades);
        TipoAtividade::insertOrIgnore($tipos_atividades);
        TipoJustificativa::insertOrIgnore($tipos_justificativas);
        TipoAvaliacao::insertOrIgnore($tipos_avaliacoes);
        TipoAvaliacaoNota::insertOrIgnore($tipos_avaliacoes_notas);
        TipoAvaliacaoJustificativa::insertOrIgnore($tipos_avaliacoes_justificativas);
        TipoDocumento::insertOrIgnore($tipos_documentos);
        Template::insertOrIgnore($templates);
        Programa::insertOrIgnore($programas);
        EixoTematico::insertOrIgnore($eixos_tematicos);
        Entrega::insertOrIgnore($entregas);
        Entidade::insertOrIgnore($entidades);
        Unidade::insertOrIgnore($unidades);
    }
}