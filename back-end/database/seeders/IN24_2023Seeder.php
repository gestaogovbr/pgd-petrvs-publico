<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\BulkSeeeder;

use App\Models\TipoAtividade;
use App\Models\TipoModalidade;
use App\Models\TipoJustificativa;
use App\Models\TipoAvaliacaoJustificativa;

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

        $tipos_avaliacoes_justificativas = array(
          [
            "id" => "0910087f-4178-4de4-a093-ff6d31d513e4",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2a736446-f3fc-4414-a8c2-91d40d6413dd",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "0be54ed4-a626-4ef7-826b-647fa507f2f2",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "0e23e9f0-6a35-4a70-b7ae-3607f9fb748a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "7198fbe4-cca7-44cb-bce6-6f755b703303",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "15eef565-633f-4eca-bac1-e00d01a6c559",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "1a6e64e3-50fa-4118-b08c-1df25b44ccc7",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c1aad84f-93ff-44c5-8eec-88d904f29aa1",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "1a7eaaf0-c527-4031-bb7f-f598d98b98d3",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "7198fbe4-cca7-44cb-bce6-6f755b703303",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "1af539e2-9dbc-4641-8016-b629419e9f73",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2a736446-f3fc-4414-a8c2-91d40d6413dd",
            "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2"
          ],
          [
            "id" => "1bcf9191-fd10-418b-8329-2c32bc2331cc",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "22b3faa2-50b5-4071-90fc-2d0469bc5930",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "22bd5f2b-6d5e-4e40-bc11-d078dc17cd8b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c1aad84f-93ff-44c5-8eec-88d904f29aa1",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "23ad00b3-295b-4569-bac2-ae23ee6693d4",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c1aad84f-93ff-44c5-8eec-88d904f29aa1",
            "tipo_justificativa_id" => "e970fcbc-51d7-49d7-ad6f-21907a45bae6"
          ],
          [
            "id" => "23f03fee-73d7-434c-854b-a4e638ee56ad",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "a8b9232d-1bb7-4aab-8e44-8b7ad46f3c19",
            "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2"
          ],
          [
            "id" => "27a107ce-258d-44a8-be45-64d77051cac1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "2a76b38f-08ab-4328-a220-75942c40442b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "2f8b2cfb-2986-4635-af16-59d1ff1a4c69",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c1aad84f-93ff-44c5-8eec-88d904f29aa1",
            "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2"
          ],
          [
            "id" => "3054b2d4-4a5d-480e-a4bc-531012e3230a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "a8b9232d-1bb7-4aab-8e44-8b7ad46f3c19",
            "tipo_justificativa_id" => "e970fcbc-51d7-49d7-ad6f-21907a45bae6"
          ],
          [
            "id" => "32ad790e-217d-4d21-8a17-2e22e0c245cc",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c20d3cf1-b4a3-4d72-a2b5-f3ed48e62602",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "3cbc5d6c-05b2-40ec-b1b4-fd5dfbbcc9c0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b"
          ],
          [
            "id" => "3cccd4fa-fe2b-490b-bebb-9b155bba9503",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2a736446-f3fc-4414-a8c2-91d40d6413dd",
            "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e"
          ],
          [
            "id" => "44d09691-94b5-4db7-905f-c202cd087a59",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "48d5fa7a-9988-460b-b2fd-93c265b50351",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "35a960fe-a33e-4eef-a53b-3ea275622024"
          ],
          [
            "id" => "4aaa1cb4-c515-47e1-8d92-2dbdec12c61e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c74eb7a0-05c2-4ac7-8ab8-33337136009d",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "4f638460-9f81-4e76-83f6-7d68e3259ef8",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c74eb7a0-05c2-4ac7-8ab8-33337136009d",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "56b2a67a-472a-476f-97c7-ff6cbc7dca5c",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "6110b598-0899-4407-9d71-3ab3c36ed320",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c74eb7a0-05c2-4ac7-8ab8-33337136009d",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "62f6cf0c-a7d4-4dda-85fb-8d9993b83fb8",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "697e31c9-758c-4d89-9c34-31ba3ece1e16",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2a736446-f3fc-4414-a8c2-91d40d6413dd",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "6ea57c17-cd47-4131-8163-56cc335bcf15",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "a8b9232d-1bb7-4aab-8e44-8b7ad46f3c19",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "6f7220a6-960f-4589-8ebe-6028f73ecacc",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c20d3cf1-b4a3-4d72-a2b5-f3ed48e62602",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "71f9d08f-c451-4238-afd3-496656f0776f",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "729c94f3-fdd0-4650-885f-1286d7e94942",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "7880e3fe-5ca7-4371-9e06-ad65f0129a26",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "cc0d4dcb-827a-4c49-a762-add61b1c0956",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "7b20d943-580b-48be-b55c-c94afda1e478",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "7198fbe4-cca7-44cb-bce6-6f755b703303",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "7de153cd-9696-4063-95c8-688a5f525698",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c74eb7a0-05c2-4ac7-8ab8-33337136009d",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "7ee781ea-4eda-4d0e-b2fb-8ed66295299e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2a736446-f3fc-4414-a8c2-91d40d6413dd",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "8a4220fe-4bda-434c-8ae4-84c2e0b266a4",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c20d3cf1-b4a3-4d72-a2b5-f3ed48e62602",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "98906ae2-0f63-45e6-a313-ba66f0488efd",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c20d3cf1-b4a3-4d72-a2b5-f3ed48e62602",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "9f9e71c3-0603-4d25-b0c3-6ea15b2b6c39",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "a2afecf1-7a77-4248-9e8f-1a4b32f776a6",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "cc0d4dcb-827a-4c49-a762-add61b1c0956",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "a2bb0873-c664-47f9-ad32-ade53f5fd24d",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "a745dfe4-b5a9-4f3a-b373-019a6b8332ae",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2"
          ],
          [
            "id" => "a7c7c2bf-111c-40a8-a5e2-87273cab365e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c74eb7a0-05c2-4ac7-8ab8-33337136009d",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "ac4b1616-b583-4971-a178-444fe5ce7501",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c74eb7a0-05c2-4ac7-8ab8-33337136009d",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "adaf9ab9-33b2-49ed-82e9-ed5f447d72d2",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "7198fbe4-cca7-44cb-bce6-6f755b703303",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "adeed0d8-b725-48c6-9fec-4e44a6f5b3f1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "ae8764ed-dd1a-480e-baca-8d06de9480a5",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2a736446-f3fc-4414-a8c2-91d40d6413dd",
            "tipo_justificativa_id" => "e970fcbc-51d7-49d7-ad6f-21907a45bae6"
          ],
          [
            "id" => "bd8443f7-e33f-4b23-bf31-efb692686b1a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "bf2b0da7-33a1-4813-baad-feb5c91b9d8a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "c26a1ec1-0456-42ec-b016-7c8e278a41de",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e"
          ],
          [
            "id" => "c2a4f084-8ccd-4637-869b-872ac94f693b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0"
          ],
          [
            "id" => "c46d5431-e533-4d08-a1e0-c01cb60f2841",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "ccb41bcb-3478-40d7-affd-afa0b1ce98d9"
          ],
          [
            "id" => "c547d648-5594-45be-a3e8-5200f468073e",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "cc0d4dcb-827a-4c49-a762-add61b1c0956",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "c9633b4b-c360-4141-a615-d3b90c7de007",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "cc0d4dcb-827a-4c49-a762-add61b1c0956",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
          [
            "id" => "c9a9c382-e5b9-4a78-94a1-5833733903d2",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397"
          ],
          [
            "id" => "d0ef8a70-0050-48c4-9cd6-cb4da2ab5d9f",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "d3787f8e-117d-41cd-bbbd-38cdf99bae36",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "7198fbe4-cca7-44cb-bce6-6f755b703303",
            "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591"
          ],
          [
            "id" => "d496f9b7-f54c-4350-9e1d-5f1a3fb301af",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "2f0b5bcf-a4c7-44a6-925a-2019b31f5b0d",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "d63d0ef3-51e7-4044-a340-d4b64e2ecfa3",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "d9de2a5f-dd18-42fa-b75a-c722bc5b6235",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "cc0d4dcb-827a-4c49-a762-add61b1c0956",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "db3659b7-2957-46ff-8b7f-2a67b218a1cc",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "e970fcbc-51d7-49d7-ad6f-21907a45bae6"
          ],
          [
            "id" => "dddd8575-7269-4c49-97e1-790c9daf80ee",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c74eb7a0-05c2-4ac7-8ab8-33337136009d",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "e0b288d1-296d-41e3-8bd3-86c09197a2ae",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b"
          ],
          [
            "id" => "e7d52241-07ef-4be8-8d4d-e10cd7644360",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9"
          ],
          [
            "id" => "e9335d8e-b44f-4988-a08b-6096fe37141a",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "7198fbe4-cca7-44cb-bce6-6f755b703303",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "ebd896ac-adda-4ca8-98e5-f46baa28c800",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "a8b9232d-1bb7-4aab-8e44-8b7ad46f3c19",
            "tipo_justificativa_id" => "c84c4217-492f-4efe-bce7-c923372cf6c0"
          ],
          [
            "id" => "f031d8d3-f84e-44a8-bbf9-8c4cae7bbb26",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "690be20f-7b74-4208-8efe-2db2e0183575",
            "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e"
          ],
          [
            "id" => "f0aa6ee9-05b5-4b96-a89b-e26f3b29be0d",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "86cd7fea-a740-45a0-887c-4929e07591b1",
            "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b"
          ],
          [
            "id" => "f1b22a9e-785a-43ec-9905-681eda1326cc",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c20d3cf1-b4a3-4d72-a2b5-f3ed48e62602",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "f22878af-aed7-4abb-b02f-ad888bb7ac48",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "cc0d4dcb-827a-4c49-a762-add61b1c0956",
            "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186"
          ],
          [
            "id" => "f2c4ffec-2822-460f-b0bf-49dc6f7a8fb7",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c20d3cf1-b4a3-4d72-a2b5-f3ed48e62602",
            "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca"
          ],
          [
            "id" => "f352e6a0-a075-4950-a71f-a08cd9ad9c15",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "a8b9232d-1bb7-4aab-8e44-8b7ad46f3c19",
            "tipo_justificativa_id" => "35a960fe-a33e-4eef-a53b-3ea275622024"
          ],
          [
            "id" => "f3fd7333-501a-4047-b424-01d4d383c0f0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "c20d3cf1-b4a3-4d72-a2b5-f3ed48e62602",
            "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad"
          ],
          [
            "id" => "f5151a97-5859-4c99-9845-47a8079dc584",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "cc0d4dcb-827a-4c49-a762-add61b1c0956",
            "tipo_justificativa_id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c"
          ],
          [
            "id" => "fdd881ce-563e-48db-b063-f78e2aec3f70",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => null,
            "tipo_avaliacao_nota_id" => "7198fbe4-cca7-44cb-bce6-6f755b703303",
            "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19"
          ],
        );

        TipoModalidade::insertOrIgnore($tipos_modalidades);
        TipoAtividade::insertOrIgnore($tipos_atividades);
        TipoJustificativa::insertOrIgnore($tipos_justificativas);
        TipoAvaliacaoJustificativa::insertOrIgnore($tipos_avaliacoes_justificativas);
        
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