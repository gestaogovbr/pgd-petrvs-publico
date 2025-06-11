<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

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
use App\Models\Entrega; // Metas
use App\Models\Planejamento;
use App\Models\PlanejamentoObjetivo;
use App\Services\UtilService;

class In24_2023Seeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */

  public $timenow;
  public $brasilia;
  public $utilService;

  public function __construct()
  {
    $this->timenow = now();
    $this->brasilia = Cidade::where('codigo_ibge', '5300108')->sole();
    $this->utilService = new UtilService();

  }

  public function run()
  {

    $tipos_atividades = array(
      [
        "id" => "22629851-db92-4e4e-999b-98e2368d84c6",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => null,
        "nome" => "Atividades de gestão",
        "esforco" => 8.00,
        "dias_planejado" => 0.00,
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
        "esforco" => 8.00,
        "dias_planejado" => 0.00,
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
        "esforco" => 8.00,
        "dias_planejado" => 0.00,
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
        "esforco" => 8.00,
        "dias_planejado" => 0.00,
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
        "esforco" => 8.00,
        "dias_planejado" => 0.00,
        "etiquetas" => "[{\"key\": \"bf154c8713d204d3ac920bf74b433663\", \"icon\": \"bi bi-book\", \"color\": \"#0dcaf0\", \"value\": \"Ensino, pesquisa e extensão\"}]",
        "checklist" => null,
        "comentario" => "Aquelas atividades exercidas em instituições de ensino, como por exemplo ensino superior."
      ],
      [
        "id" => "23ba35e5-dcbf-4931-a3b7-b9e058877f0f",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Projetos",
        "esforco" => 8.00,
        "dias_planejado" => 0.00,
        "etiquetas" => "[{\"key\": \"178c526ffa79c5ce7f55c58748c87c19\", \"icon\": \"bi bi-bar-chart\", \"color\": \"#fd7777\", \"value\": \"Projetos\"}]",
        "checklist" => NULL,
        "comentario" => "São atividades com começo e fim determinados, entregas concretas e prazos.",
      ],
    );

    $tipos_modalidades = array(
      [
        "id" => "48497798-02c2-46b8-87b9-5b03262b4fbd",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => null,
        "nome" => "Presencial",
        "plano_trabalho_calcula_horas" => 0,
        "atividade_tempo_despendido" => 0,
        "atividade_esforco" => 0,
        "exige_pedagio" => 0
      ],
      [
        "id" => "97dfa3f0-67d5-4b5c-9ed2-65eb7dea99b3",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => null,
        "nome" => "Teletrabalho (Integral)",
        "plano_trabalho_calcula_horas" => 0,
        "atividade_tempo_despendido" => 0,
        "atividade_esforco" => 0,
        "exige_pedagio" => 1
      ],
      [
        "id" => "fd58d1d3-cbaf-4a51-947a-6cd174ee4db0",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => null,
        "nome" => "Teletrabalho (Parcial)",
        "plano_trabalho_calcula_horas" => 0,
        "atividade_tempo_despendido" => 0,
        "atividade_esforco" => 0,
        "exige_pedagio" => 1
      ],
      [
        "id" => "1245de0b-8f57-4f7c-91c5-5d7f092c9a8f",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Teletrabalho com residência no exterior (hipóteses de substituição da Lei 8.112/90, inciso VIII do art. 12 do Decreto n. 11.072/2022)",
        "plano_trabalho_calcula_horas" => 0,
        "atividade_tempo_despendido" => 0,
        "atividade_esforco" => 0,
        "exige_pedagio" => 1
      ],
      [
        "id" => "999160ef-9d72-4a20-b56c-046785af06cf",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Teletrabalho com residência no exterior (autorização discricionária, §7º do art. 12 do Decreto n. 11.072/2022)",
        "plano_trabalho_calcula_horas" => 0,
        "atividade_tempo_despendido" => 0,
        "atividade_esforco" => 0,
        "exige_pedagio" => 1
      ],
    );

    $tipos_justificativas = array(
      array(
        "id" => "35a960fe-a33e-4eef-a53b-3ea275622024",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Abandonou a execução dos trabalhos/entregas",
      ),
      array(
        "id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Apresentou novas alternativas",
      ),
      array(
        "id" => "f2aef225-a391-4667-9c41-6bb537b18778",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Avaliação fora do prazo " .
          "(registro automático do sistema)",
      ),
      array(
        "id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Buscou referência em outras áreas",
      ),
      array(
        "id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Contribuiu para a unidade",
      ),
      array(
        "id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Criou parâmetro a ser seguido",
      ),
      array(
        "id" => "93adf83c-4f1a-4e9c-8e9d-f0788d11382c",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Entregou antes do prazo",
      ),
      array(
        "id" => "c84c4217-492f-4efe-bce7-c923372cf6c0",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Fora do prazo",
      ),
      array(
        "id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Fora do tema",
      ),
      array(
        "id" => "ccb41bcb-3478-40d7-affd-afa0b1ce98d9",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Não cumpriu os prazos acordados",
      ),
      array(
        "id" => "e970fcbc-51d7-49d7-ad6f-21907a45bae6",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Não foi possível compreender",
      ),
      array(
        "id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Não superou a média da equipe",
      ),
      array(
        "id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "O trabalho desenvolvido não foi " .
          "condizente com potencial individual",
      ),
      array(
        "id" => "7de1b22c-41e1-424d-9c74-5c756411222e",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "O trabalho realizado não correspondeu " .
          "às expectativas",
      ),
      array(
        "id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Superou os limites da sua função",
      ),
      array(
        "id" => "376813c6-8797-41f5-9c6e-436555b66d19",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Superou os objetivos",
      ),
      array(
        "id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Tecnicamente abaixo do esperado",
      ),
    );

    $tipos_avaliacoes = array(
      [
        "id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => null,
        "nome" => "Execução de Plano de Trabalho",
        "tipo" => "QUALITATIVO"
      ],
      [
        "id" => "b0db190d-823d-4222-bc92-abff634f5390",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => null,
        "nome" => "Execução do Plano de Entrega",
        "tipo" => "QUALITATIVO"
      ]
    );

    $tipos_avaliacoes_notas = array(
      [
        "id" => "1084fb8d-20ea-4fd2-bf30-8aa70f2f55f6",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 1,
        "nota" => "\"Excepcional\"",
        "descricao" => "Plano de entregas executado com desempenho muito acima do esperado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 0,
        "icone" => "bi bi-emoji-smile",
        "cor" => "#0620E5",
        "codigo" => "5",
        "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390",
      ],
      [
        "id" => "62a6ef53-b7c7-4fb9-b1c5-8261d60956c0",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 1,
        "nota" => "\"Excepcional\"",
        "descricao" => "Plano de trabalho executado muito acima do esperado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 1,
        "icone" => "bi bi-emoji-smile",
        "cor" => "#0620E5",
        "codigo" => "5",
        "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5",
      ],
      [
        "id" => "084221e6-d68e-4bfa-a7ab-dd5f1bc9a3a9",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 2,
        "nota" => "\"Alto desempenho\"",
        "descricao" => "Plano de trabalho executado acima do esperado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 0,
        "icone" => "bi bi-emoji-smile",
        "cor" => "#00B3FF",
        "codigo" => "4",
        "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5",
      ],
      [
        "id" => "960d1216-ba21-4ac3-a35e-9553766d8f4b",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 2,
        "nota" => "\"Alto desempenho\"",
        "descricao" => "Plano de entregas executado com desempenho acima do esperado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 0,
        "icone" => "bi bi-emoji-smile",
        "cor" => "#00B3FF",
        "codigo" => "4",
        "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390",
      ],
      [
        "id" => "5c7d6f5a-5990-4f76-add0-3290613b9ef2",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 3,
        "nota" => "\"Adequado\"",
        "descricao" => "Plano de trabalho executado dentro do esperado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 0,
        "icone" => "bi bi-emoji-smile",
        "cor" => "#049521",
        "codigo" => "3",
        "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5",
      ],
      [
        "id" => "788b122a-e444-41c4-89b4-440b47cb6fa5",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 3,
        "nota" => "\"Adequado\"",
        "descricao" => "Plano de entregas executado dentro do esperado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 0,
        "icone" => "bi bi-emoji-smile",
        "cor" => "#049521",
        "codigo" => "3",
        "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390",
      ],
      [
        "id" => "43c3b0e8-b25c-4b2a-bc5c-67d1b0e3cb86",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 4,
        "nota" => "\"Inadequado\"",
        "descricao" => "Plano de trabalho executado abaixo do esperado ou parcialmente executado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 1,
        "icone" => "bi bi-emoji-frown",
        "cor" => "#ff7300",
        "codigo" => "2",
        "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5",
      ],
      [
        "id" => "fd9e3a0c-cd82-49ec-8dc4-f6127d0fbad8",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 4,
        "nota" => "\"Inadequado\"",
        "descricao" => "Plano de entregas executado abaixo do esperado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 0,
        "icone" => "bi bi-emoji-frown",
        "cor" => "#ff7300",
        "codigo" => "2",
        "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390",
      ],
      [
        "id" => "428f6d53-2ae1-49cb-b8bd-8cd76be2da05",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 5,
        "nota" => "\"Não executado\"",
        "descricao" => "Plano de entregas não executado",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 0,
        "icone" => "bi bi-emoji-frown",
        "cor" => "#ff0000",
        "codigo" => "1",
        "tipo_avaliacao_id" => "b0db190d-823d-4222-bc92-abff634f5390",
      ],
      [
        "id" => "869b9687-e61d-4260-8178-aa8d9dab8a10",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 5,
        "nota" => "\"Não executado\"",
        "descricao" => "Plano de trabalho integralmente não executado.",
        "pergunta" => " ",
        "aprova" => 0,
        "justifica" => 1,
        "icone" => "bi bi-emoji-frown",
        "cor" => "#ff0000",
        "codigo" => "1",
        "tipo_avaliacao_id" => "005b3fbd-c457-4a50-b28e-de17da2d73a5",
      ]
    );

    $tipos_avaliacoes_justificativas = array(
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
      [
        "id" => "0ba3a3d0-93de-4e82-b14b-e910cf41a824",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "ebb8b156-ea16-42ce-b35e-ebf601cf6f92",
        "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca",
      ],
      [
        "id" => "ea459712-bca8-411c-aa58-624bae94b4cb",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "ebb8b156-ea16-42ce-b35e-ebf601cf6f92",
        "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19",
      ],
      [
        "id" => "eb7d84d8-6e5e-487b-91cd-20057809ba33",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "ebb8b156-ea16-42ce-b35e-ebf601cf6f92",
        "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad",
      ],
      [
        "id" => "238311fd-045b-44e8-92f6-0f06e64a9676",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "c31f949a-716f-4f56-8f30-2e1961ebd0d0",
        "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2",
      ],
      [
        "id" => "8542fefd-cec9-4849-9e40-72fa96495e5c",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "c31f949a-716f-4f56-8f30-2e1961ebd0d0",
        "tipo_justificativa_id" => "ccb41bcb-3478-40d7-affd-afa0b1ce98d9",
      ],
      [
        "id" => "f24ed87e-0302-486c-89c4-06eee75acec6",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "c31f949a-716f-4f56-8f30-2e1961ebd0d0",
        "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b",
      ],
      [
        "id" => "4381c9ac-bb73-4de0-8bdc-a13ef11ee396",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "7f644767-4609-4f34-93b9-57fbe93a9b4f",
        "tipo_justificativa_id" => "ccb41bcb-3478-40d7-affd-afa0b1ce98d9",
      ],
      [
        "id" => "bf65a7aa-5870-429f-8d92-5bc0df17185f",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "7f644767-4609-4f34-93b9-57fbe93a9b4f",
        "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2",
      ],
      [
        "id" => "f58fae12-5f21-482a-935b-6c5a8ede4f65",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "7f644767-4609-4f34-93b9-57fbe93a9b4f",
        "tipo_justificativa_id" => "35a960fe-a33e-4eef-a53b-3ea275622024",
      ],
      [
        "id" => "6b58114b-b5f8-4370-af4f-29bf99865b0b",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "0b598895-5898-4260-aaf3-961ebb128a56",
        "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad",
      ],
      [
        "id" => "a634462e-bf62-485c-8a6b-e900b55c3b4f",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "0b598895-5898-4260-aaf3-961ebb128a56",
        "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591",
      ],
      [
        "id" => "c0dc77e8-25b1-4335-8212-d91a94ffe211",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "0b598895-5898-4260-aaf3-961ebb128a56",
        "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19",
      ],
      [
        "id" => "2b8a579c-6cb5-4bad-aab3-0b8740a314d1",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "ec16c004-0b31-4766-9036-c8298b99c314",
        "tipo_justificativa_id" => "ea1adc6f-892b-42eb-acce-74ea40eda1c2",
      ],
      [
        "id" => "5cde027e-881b-435e-b214-4280f9bdac0e",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "ec16c004-0b31-4766-9036-c8298b99c314",
        "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e",
      ],
      [
        "id" => "deaf5898-d4b1-4a4b-8747-94bfd1f44a1d",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "ec16c004-0b31-4766-9036-c8298b99c314",
        "tipo_justificativa_id" => "ccb41bcb-3478-40d7-affd-afa0b1ce98d9",
      ],
      [
        "id" => "3dbb9958-13c9-4b8f-8d4e-274009441952",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "e928b1b2-2afb-4f8f-8b40-b12d5974b379",
        "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca",
      ],
      [
        "id" => "4bab4254-2069-407e-b307-e00003069964",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "e928b1b2-2afb-4f8f-8b40-b12d5974b379",
        "tipo_justificativa_id" => "a5f2d721-86d0-4cd5-8c36-b64ea2764186",
      ],
      [
        "id" => "87a8cad0-a289-4d59-95bc-07885ba05927",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "e928b1b2-2afb-4f8f-8b40-b12d5974b379",
        "tipo_justificativa_id" => "50bf425c-efeb-4c4c-9330-f5408a59edd9",
      ],
      [
        "id" => "9c73c944-5db8-49ba-82a2-96b33a09a0c5",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "e928b1b2-2afb-4f8f-8b40-b12d5974b379",
        "tipo_justificativa_id" => "6e7b42b2-6e92-47b7-86ec-206a1f9b3591",
      ],
      [
        "id" => "3783de5e-fb61-44c6-a3f1-1bce083f1a42",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "d01ce890-2eb6-4f5d-8599-ae99ce0be0e6",
        "tipo_justificativa_id" => "376813c6-8797-41f5-9c6e-436555b66d19",
      ],
      [
        "id" => "49bcc219-6808-4ea3-a7e1-d80ef8b54ea1",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "d01ce890-2eb6-4f5d-8599-ae99ce0be0e6",
        "tipo_justificativa_id" => "1f1d6720-0dcd-455e-8b8f-ecb653e821ad",
      ],
      [
        "id" => "a35e469d-2a5b-41e0-a3eb-6b99d6e2d23f",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "d01ce890-2eb6-4f5d-8599-ae99ce0be0e6",
        "tipo_justificativa_id" => "fd3ff2f9-bd96-46a2-a45d-c68281174bca",
      ],
      [
        "id" => "57ff989c-8a30-4699-96d6-53230ee5c758",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "03552cc9-1f63-4bb7-bb23-332df23f01ca",
        "tipo_justificativa_id" => "c4dd38f7-6281-4c93-85f0-678b5fb9f397",
      ],
      [
        "id" => "6ca79332-048c-4d54-b20d-cfc83994c326",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "03552cc9-1f63-4bb7-bb23-332df23f01ca",
        "tipo_justificativa_id" => "7de1b22c-41e1-424d-9c74-5c756411222e",
      ],
      [
        "id" => "c44a87f6-ace7-44ee-90d1-2b9a331571f0",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "03552cc9-1f63-4bb7-bb23-332df23f01ca",
        "tipo_justificativa_id" => "35a960fe-a33e-4eef-a53b-3ea275622024",
      ],
      [
        "id" => "c698c324-a224-4135-950a-9bc68770fe3b",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "03552cc9-1f63-4bb7-bb23-332df23f01ca",
        "tipo_justificativa_id" => "1e13ca59-d9de-4a35-a9c1-d3fc0f9342e0",
      ],
      [
        "id" => "f9b932d2-d8f8-4ee8-aebd-cdbf5eb7f3b1",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "tipo_avaliacao_nota_id" => "03552cc9-1f63-4bb7-bb23-332df23f01ca",
        "tipo_justificativa_id" => "d47efadf-15d5-43e7-b39f-0b2ebaec449b",
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

    

    $templates = array(
      array(
        "id" => "ef1c106c-3534-46d2-9519-cc69d5cf9dad",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "codigo" => "TCR",
        "numero" => DB::select("CALL sequence_template_numero()")[0]->number,
        "especie" => "TCR",
        "titulo" => "Termo de ciência e responsabilidade",
        "conteudo" => "<p class=\"MsoNormal\" style=\"line-height: normal; tab-stops: 390.55pt center 515.45pt; margin: 5.0pt 0cm 0cm 36.0pt;\"><strong><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-tab-count: 1;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span></strong></p>\n<p class=\"MsoNormal\" style=\"line-height: normal; margin: 5pt 0cm 0cm 36pt; text-align: center;\"><strong><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-tab-count: 1;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-tab-count: 1;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></strong></p>\n<div class=\"mceNonEditable\" style=\"display: inline-block;\" data-lock-timestamp=\"1697807954026\" data-lock-key=\"bd6bcb55711fbe3af7afb77192729b44\">\n<p class=\"MsoNormal\" style=\"line-height: normal; margin: 5pt 0cm 0cm 36pt; text-align: center;\"><strong><span style=\"mso-ligatures: none;\">TERMO DE CI&Ecirc;NCIA E RESPONSABILIDADE</span></strong></p>\n<p class=\"MsoNormal\" style=\"line-height: normal; tab-stops: 136.3pt center 408.85pt; margin: 5.0pt 0cm 0cm 36.0pt;\"><strong><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-tab-count: 1;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-tab-count: 1;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>&nbsp;</span></strong></p>\n<p class=\"MsoListParagraph\" style=\"text-indent: -18.0pt; mso-list: l1 level1 lfo1; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">CONTEXTO</span></strong></p>\n<p class=\"MsoListParagraph\" style=\"margin: 5.0pt 0cm 0cm 36.0pt;\"><span style=\"mso-ligatures: none;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">CONCEITO DE PGD - </span></strong><span style=\"mso-ligatures: none;\">Programa indutor de melhoria de desempenho institucional no servi&ccedil;o p&uacute;blico, com foco na vincula&ccedil;&atilde;o entre o trabalho dos participantes, as entregas das unidades e as estrat&eacute;gias organizacionais.</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; margin: 5.0pt 0cm 0cm 75.6pt;\"><span style=\"mso-ligatures: none;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">OBJETIVOS DO PGD</span></strong></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Promover a gest&atilde;o orientada a resultados, baseada em evid&ecirc;ncias, com foco na melhoria cont&iacute;nua das entregas dos &oacute;rg&atilde;os e entidades da administra&ccedil;&atilde;o p&uacute;blica federal;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Estimular a cultura de planejamento institucional;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.3.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Otimizar a gest&atilde;o dos recursos p&uacute;blicos;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.4.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Incentivar a cultura da inova&ccedil;&atilde;o;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.5.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Fomentar a transforma&ccedil;&atilde;o digital;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.6.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Atrair e reter talentos na administra&ccedil;&atilde;o p&uacute;blica federal;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.7.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Contribuir para o dimensionamento da for&ccedil;a de trabalho;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.8.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Aprimorar o desempenho institucional, das equipes e dos indiv&iacute;duos;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.9.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Contribuir para a sa&uacute;de e a qualidade de vida no trabalho dos participantes; e</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.2.10.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Contribuir para a sustentabilidade ambiental na administra&ccedil;&atilde;o p&uacute;blica federal.</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; margin: 5.0pt 0cm 0cm 126.0pt;\"><span style=\"mso-ligatures: none;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.3.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">PGD x TELETRABALHO - </span></strong><span style=\"mso-ligatures: none;\">De modo geral, o PGD representa <strong>a gest&atilde;o por resultado</strong> enquanto Teletrabalho <strong>&eacute; uma modalidade de trabalho poss&iacute;vel dentro do referido programa.</strong></span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; margin: 5.0pt 0cm 0cm 75.6pt;\"><span style=\"mso-ligatures: none;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">1.4.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">DIREITO ADQUIRIDO - </span></strong><span style=\"mso-ligatures: none;\">Conforme Art. 15, al&iacute;nea b, da IN CONJUNTA SEGES-SGPRT/MGI N&ordm; 24, DE 28 DE JULHO DE 2023, a participa&ccedil;&atilde;o no PGD<strong> n&atilde;o constitui direito adquirido.</strong></span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -15.0pt; line-height: normal;\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo1; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">INFORMA&Ccedil;&Otilde;ES DO PROGRAMA DE GEST&Atilde;O</span></strong></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">2.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">T&iacute;tulo: {{programa.nome}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">2.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Normativo: {{programa.normativa}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">2.3.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Data de in&iacute;cio: {{programa.data_inicio}}</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo1; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">3.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">DADOS DO PLANO DE TRABALHO</span></strong></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">3.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Data de in&iacute;cio da vig&ecirc;ncia: {{data_inicio}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">3.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Data do t&eacute;rmino da vig&ecirc;ncia: {{data_fim}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">3.3.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Unidade de execu&ccedil;&atilde;o: {{unidade.nome}}-{{unidade.sigla}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">3.4.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Modalidade: {{tipo_modalidade.nome}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">3.5.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Aloca&ccedil;&atilde;o da for&ccedil;a de trabalho</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><span style=\"mso-ligatures: none;\">{{for:entregas[0..x..t]}}</span></p>\n<ul>\n<li style=\"list-style-type: none;\">\n<ul>\n<li style=\"list-style-type: none;\">\n<ul>\n<li><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\"><span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><span style=\"mso-ligatures: none;\">{{entregas[x].entrega.descricao}} -</span><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\"><span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><span style=\"mso-ligatures: none;\">{{entregas[x].descricao}} - {{entregas[x].forca_trabalho}}%</span></li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><span style=\"mso-ligatures: none;\">{{end-for}}</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: justify; line-height: normal;\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo1; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">4.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">PARTICIPANTE</span></strong></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">4.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Nome completo: {{usuario.nome}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">4.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Unidade executora vinculada: {{unidade.nome}}-{{unidade.sigla}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">4.3.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">CPF: {{usuario.cpf}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">4.4.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Contatos:</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">4.4.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">E-Mail: {{usuario.email}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">4.4.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Telefone: {{usuario.telefone}}</span></p>\n<p class=\"MsoNormal\" style=\"text-align: justify; text-indent: 3.0pt; line-height: normal; margin: 0cm 0cm 0cm 72.0pt;\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo1; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">5.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">ESPECIFICA&Ccedil;&Atilde;O DA EXECU&Ccedil;&Atilde;O DOS TRABALHOS </span></strong></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">5.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Modalidade do plano:<strong> </strong>{{tipo_modalidade.nome}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">5.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Regras de Comparecimento Presencial</span></p>\n</div>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">5.2.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">O participante dever&aacute; comparecer ap&oacute;s __ dias ap&oacute;s comunicado pelos meios previstos neste termo.</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -36.0pt; mso-list: l1 level3 lfo1; margin: 5.0pt 0cm 0cm 126.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">5.2.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">O servidor dever&aacute; executar seu trabalho de forma presencial:</span></p>\n<p class=\"MsoNormal\" style=\"text-align: justify; text-indent: 3.0pt; line-height: normal; margin: 5.0pt 0cm 0cm 108.0pt;\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n<table class=\"MsoNormalTable\" style=\"width: 99.88%; margin-left: -.25pt; border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;\" border=\"1\" width=\"99%\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr style=\"mso-yfti-irow: 0; mso-yfti-firstrow: yes;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">Dia (da semana ou data espec&iacute;fica)</span></strong></p>\n</td>\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">Turno</span></strong></p>\n</td>\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">Local</span></strong></p>\n</td>\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><strong><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">Descri&ccedil;&atilde;o</span></strong></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 1;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 2;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 3;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 4; mso-yfti-lastrow: yes;\">\n<td style=\"width: 25.0%; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n<td style=\"width: 25.0%; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;\" valign=\"top\" width=\"25%\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: center;\" align=\"center\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n</td>\n</tr>\n</tbody>\n</table>\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: justify; text-indent: 3.0pt; line-height: normal;\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n<div class=\"mceNonEditable\" style=\"display: inline-block;\" data-lock-timestamp=\"1697807965724\" data-lock-key=\"ad136d13bd98f69736ccba3412cbf6f4\">\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo1; margin: 5.0pt 0cm 0cm 36.0pt;\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">6.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">CANAIS DE COMUNICA&Ccedil;&Atilde;O </span></strong></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">6.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">A ferramentas de comunica&ccedil;&atilde;o do PETRVS ser&atilde;o utilizados prioritariamente, podendo associadas a outras ferramentas de comunica&ccedil;&atilde;o vinculadas aos contatos do participante indicados neste termo.</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: justify;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo1; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">7.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">RESPONSABILIDADES DO PARTICIPANTE</span></strong><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\"><span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;</span></span></span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Utilizar a plataforma PETRVS de maneira &eacute;tica, respeitando todas as diretrizes e normas estabelecidas pela IN24 e demais regulamenta&ccedil;&otilde;es pertinentes.</span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Cumprir o plano de trabalho e o disposto neste TCR;&nbsp;</span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Informar &agrave; chefia da unidade de execu&ccedil;&atilde;o as atividades realizadas, a ocorr&ecirc;ncia de afastamentos, licen&ccedil;as e outros impedimentos, bem como eventual dificuldade, d&uacute;vida ou informa&ccedil;&atilde;o que possa atrasar ou prejudicar a realiza&ccedil;&atilde;o dos trabalhos;<span style=\"mso-spacerun: yes;\">&nbsp; </span></span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Executar o plano de trabalho, temporariamente, em modalidade distinta, na hip&oacute;tese de caso fortuito ou for&ccedil;a maior que impe&ccedil;a o cumprimento do plano de trabalho na modalidade pactuada;&nbsp;</span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Seguir as orienta&ccedil;&otilde;es de ergonomia e seguran&ccedil;a no trabalho;</span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Estar dispon&iacute;vel para ser contatado nas condi&ccedil;&otilde;es especificadas na plataforma;</span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Atender &agrave;s convoca&ccedil;&otilde;es para comparecimento presencial que ser&atilde;o apresentadas por meio, prazo e no local estabelecidos na plataforma;&nbsp;</span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Zelar pela guarda e manuten&ccedil;&atilde;o dos equipamentos cuja retirada tenha sido autorizada nos termos do art. 16 desta IN n&ordm; 24/23; </span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Custear a estrutura necess&aacute;ria, f&iacute;sica e tecnol&oacute;gica, para o desempenho das atividades em caso de teletrabalho. </span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Exercer atividades presencialmente, se for o caso, nas condi&ccedil;&otilde;es especificadas; </span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Em caso de teletrabalho desempenhado no exterior, aguardar a autoriza&ccedil;&atilde;o do dirigente m&aacute;ximo do &oacute;rg&atilde;o/entidade, nos termos no inciso V do art. 12 do Decreto n&ordm; 11.072/22, para iniciar a execu&ccedil;&atilde;o das minhas atividades a partir de local fora do territ&oacute;rio nacional, e voltar a exercer as minhas atividades a partir do territ&oacute;rio nacional, em at&eacute; dois meses, no caso de revoga&ccedil;&atilde;o ou suspens&atilde;o da portaria que concedeu o teletrabalho com resid&ecirc;ncia no exterior.</span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; margin-bottom: 0cm; margin-left: 72.0pt; text-align: justify; text-indent: -18.0pt; line-height: normal; mso-list: l0 level1 lfo1;\"><!-- [if !supportLists]--><span style=\"font-size: 12.0pt; font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style=\"font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">Estar ciente que, conforme Art. 15, al&iacute;nea b, da IN CONJUNTA SEGES-SGPRT/MGI N&ordm; 24, DE 28 DE JULHO DE 2023, a participa&ccedil;&atilde;o no PGD<strong> n&atilde;o constitui direito adquirido.</strong></span></p>\n<p class=\"MsoNormal\" style=\"text-align: justify; text-indent: -15.0pt; line-height: normal; margin: 5.0pt 0cm 0cm 36.0pt;\"><span style=\"font-size: 12.0pt; font-family: 'Times New Roman',serif; mso-fareast-font-family: 'Times New Roman'; mso-font-kerning: 0pt; mso-ligatures: none; mso-fareast-language: PT-BR;\">&nbsp;</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -18.0pt; mso-list: l1 level1 lfo1; margin: 5.0pt 0cm 0cm 36.0pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">8.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><!--[endif]--><strong><span style=\"mso-ligatures: none;\">COMPLEMENTOS&nbsp;</span></strong></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">8.1.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\"><span style=\"mso-spacerun: yes;\">&nbsp;</span>Especifica&ccedil;&otilde;es complementares da unidade executora {{unidade.nome}}-{{unidade.sigla}}:</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; margin: 5.0pt 0cm 0cm 36.0pt;\"><span style=\"mso-ligatures: none;\">{{unidade.texto_complementar_plano}}</span></p>\n<p class=\"MsoListParagraph\" style=\"text-align: justify; text-indent: -21.6pt; mso-list: l1 level2 lfo1; margin: 5.0pt 0cm 0cm 75.6pt;\"><!-- [if !supportLists]--><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-ligatures: none;\"><span style=\"mso-list: Ignore;\">8.2.<span style=\"font: 7.0pt 'Times New Roman';\">&nbsp; </span></span></span></strong><!--[endif]--><span style=\"mso-ligatures: none;\">Especifica&ccedil;&otilde;es complementares em rela&ccedil;&atilde;o ao participante {{usuario.nome}}</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: 0cm; text-align: justify; text-indent: 35.4pt;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-ligatures: none;\">{{usuario.texto_complementar_plano}}</span></p>\n</div>",
        "dataset" => "[{\"field\": \"carga_horaria\", \"label\": \"Carga horária diária\"}, {\"field\": \"tempo_total\", \"label\": \"Tempo total do plano\"}, {\"field\": \"tempo_proporcional\", \"label\": \"Tempo proporcional (descontando afastamentos)\"}, {\"type\": \"DATETIME\", \"field\": \"data_inicio\", \"label\": \"Data inicial do plano\"}, {\"type\": \"DATETIME\", \"field\": \"data_fim\", \"label\": \"Data final do plano\"}, {\"type\": \"OBJECT\", \"field\": \"tipo_modalidade\", \"label\": \"Tipo de modalidade\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}]}, {\"type\": \"OBJECT\", \"field\": \"unidade\", \"label\": \"Unidade\", \"fields\": [{\"field\": \"codigo\", \"label\": \"Código\"}, {\"field\": \"sigla\", \"label\": \"Sigla\"}, {\"field\": \"nome\", \"label\": \"Nome\"}, {\"type\": \"OBJECT\", \"field\": \"gestor\", \"label\": \"Gestor\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"ATIVO_PERMANENTE\", \"value\": \"Ativo permanente\"}, {\"key\": \"APOSENTADO\", \"value\": \"Aposentado\"}, {\"key\": \"CEDIDO/REQUISITADO\", \"value\": \"Cedido/Requisitado\"}, {\"key\": \"NOMEADO_CARGO_COMISSIONADO\", \"value\": \"Nomeado em Cargo Comissionado\"}, {\"key\": \"SEM_VINCULO\", \"value\": \"Sem vínculo\"}, {\"key\": \"TABELISTA(ESP/EMERG)\", \"value\": \"Tabelista(ESP/EMERG)\"}, {\"key\": \"NATUREZA_ESPECIAL\", \"value\": \"Natureza especial\"}, {\"key\": \"ATIVO_EM_OUTRO_ORGAO\", \"value\": \"Ativo em outro órgão\"}, {\"key\": \"REDISTRIBUIDO\", \"value\": \"Redistribuído\"}, {\"key\": \"ATIVO_TRANSITORIO\", \"value\": \"Ativo transitório\"}, {\"key\": \"EXCEDENTE_A_LOTACAO\", \"value\": \"Excedente à lotação\"}, {\"key\": \"EM_DISPONIBILIDADE\", \"value\": \"Em disponibilidade\"}, {\"key\": \"REQUISITADO_DE_OUTROS_ORGAOS\", \"value\": \"Requisitado de outros órgãos\"}, {\"key\": \"INSTITUIDOR_PENSAO\", \"value\": \"Instituidor de pensão\"}, {\"key\": \"REQUISITADO_MILITAR_FORCAS_ARMADAS\", \"value\": \"Requisitado militar - Forças Armadas\"}, {\"key\": \"APOSENTADO_TCU733/94\", \"value\": \"Aposentado TCU733/94\"}, {\"key\": \"EXERCICIO_DESCENTRALIZADO_CARREIRA\", \"value\": \"Exercício descentralizado de carreira\"}, {\"key\": \"EXERCICIO_PROVISORIO\", \"value\": \"Exercício provisório\"}, {\"key\": \"CELETISTA\", \"value\": \"Celetista\"}, {\"key\": \"ATIVO_PERMANENTE_LEI_8878/94\", \"value\": \"Ativo permanente Lei 8878/94\"}, {\"key\": \"ANISTIADO_ADCT_CF\", \"value\": \"Anistiado ADCT CF\"}, {\"key\": \"CELETISTA/EMPREGADO\", \"value\": \"Celetista/Empregado\"}, {\"key\": \"CLT_ANS_DECISAO_JUDICIAL\", \"value\": \"CLT Anistiado decisão judicial\"}, {\"key\": \"CLT_ANS_JUDICIAL_CEDIDO\", \"value\": \"CLT Anistiado judicial cedido\"}, {\"key\": \"CLT_APOS_COMPLEMENTO\", \"value\": \"CLT Aposentado complemento\"}, {\"key\": \"CLT_APOS_DECISAO_JUDICIAL\", \"value\": \"CLT Aposentado decisão judicial\"}, {\"key\": \"INST_PS_DECISAO_JUDICIAL\", \"value\": \"Instituidor de pensão decisão judicial\"}, {\"key\": \"EMPREGO_PUBLICO\", \"value\": \"Emprego público\"}, {\"key\": \"REFORMA_CBM/PM\", \"value\": \"Reforma CBM/PM\"}, {\"key\": \"RESERVA_CBM/PM\", \"value\": \"Reserva CBM/PM\"}, {\"key\": \"REQUISITADO_MILITAR_GDF\", \"value\": \"Requisitado militar GDF\"}, {\"key\": \"ANISTIADO_PUBLICO_L10559\", \"value\": \"Anistiado público L10559\"}, {\"key\": \"ANISTIADO_PRIVADO_L10559\", \"value\": \"Anistiado privado L10559\"}, {\"key\": \"ATIVO_DECISAO_JUDICIAL\", \"value\": \"Ativo decisão judicial\"}, {\"key\": \"CONTRATO_TEMPORARIO\", \"value\": \"Contrato temporário\"}, {\"key\": \"COLAB_PCCTAE_E_MAGISTERIO\", \"value\": \"Colaborador PCCTAE e Magistério\"}, {\"key\": \"COLABORADOR_ICT\", \"value\": \"Colaborador ICT\"}, {\"key\": \"CLT_ANS_DEC_6657/08\", \"value\": \"CLT Anistiado Decreto 6657/08\"}, {\"key\": \"EXERCICIO_7_ART93_8112\", \"value\": \"Exercício §7° Art.93 Lei 8112\"}, {\"key\": \"CEDIDO_SUS/LEI_8270\", \"value\": \"Cedido SUS Lei 8270\"}, {\"key\": \"INST_ANIST_PUBLICO\", \"value\": \"Instituidor anistiado público\"}, {\"key\": \"INST_ANIST_PRIVADO\", \"value\": \"Instituidor anistiado privado\"}, {\"key\": \"CELETISTA_DECISAO_JUDICIAL\", \"value\": \"Celetista decisão judicial\"}, {\"key\": \"CONTRATO_TEMPORARIO_CLT\", \"value\": \"Contrato temporário CLT\"}, {\"key\": \"EMPREGO_PCC/EX-TERRITORIO\", \"value\": \"Emprego PCC/Ex-Território\"}, {\"key\": \"EXC_INDISCIPLINA\", \"value\": \"Exc. indisciplina\"}, {\"key\": \"CONTRATO_PROFESSOR_SUBSTITUTO\", \"value\": \"Contrato Professor Substituto\"}, {\"key\": \"ESTAGIARIO\", \"value\": \"Estagiário\"}, {\"key\": \"ESTAGIARIO_SIGEPE\", \"value\": \"Estagiário SIGEPE\"}, {\"key\": \"RESIDENCIA_E_PMM\", \"value\": \"Residência e PMM\"}, {\"key\": \"APOSENTADO_TEMPORARIRIO\", \"value\": \"Aposentado temporário\"}, {\"key\": \"CEDIDO_DF_ESTADO_MUNICIPIO\", \"value\": \"Cedido DF Estado Munícipio\"}, {\"key\": \"EXERC_DESCEN_CDT\", \"value\": \"Exercício descentralizado CDT\"}, {\"key\": \"EXERC_LEI_13681/18\", \"value\": \"Exercício lei 13681/18\"}, {\"key\": \"PENSIONISTA\", \"value\": \"Pensionista\"}, {\"key\": \"BENEFICIARIO_PENSAO\", \"value\": \"Beneficiário de pensão\"}, {\"key\": \"QE/MRE_CEDIDO\", \"value\": \"QE/MRE Cedido\"}, {\"key\": \"QUADRO_ESPEC_QE/MRE\", \"value\": \"Quadro ESPEC QE/MRE\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"gestor_substituto\", \"label\": \"Gestor substituto\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"ATIVO_PERMANENTE\", \"value\": \"Ativo permanente\"}, {\"key\": \"APOSENTADO\", \"value\": \"Aposentado\"}, {\"key\": \"CEDIDO/REQUISITADO\", \"value\": \"Cedido/Requisitado\"}, {\"key\": \"NOMEADO_CARGO_COMISSIONADO\", \"value\": \"Nomeado em Cargo Comissionado\"}, {\"key\": \"SEM_VINCULO\", \"value\": \"Sem vínculo\"}, {\"key\": \"TABELISTA(ESP/EMERG)\", \"value\": \"Tabelista(ESP/EMERG)\"}, {\"key\": \"NATUREZA_ESPECIAL\", \"value\": \"Natureza especial\"}, {\"key\": \"ATIVO_EM_OUTRO_ORGAO\", \"value\": \"Ativo em outro órgão\"}, {\"key\": \"REDISTRIBUIDO\", \"value\": \"Redistribuído\"}, {\"key\": \"ATIVO_TRANSITORIO\", \"value\": \"Ativo transitório\"}, {\"key\": \"EXCEDENTE_A_LOTACAO\", \"value\": \"Excedente à lotação\"}, {\"key\": \"EM_DISPONIBILIDADE\", \"value\": \"Em disponibilidade\"}, {\"key\": \"REQUISITADO_DE_OUTROS_ORGAOS\", \"value\": \"Requisitado de outros órgãos\"}, {\"key\": \"INSTITUIDOR_PENSAO\", \"value\": \"Instituidor de pensão\"}, {\"key\": \"REQUISITADO_MILITAR_FORCAS_ARMADAS\", \"value\": \"Requisitado militar - Forças Armadas\"}, {\"key\": \"APOSENTADO_TCU733/94\", \"value\": \"Aposentado TCU733/94\"}, {\"key\": \"EXERCICIO_DESCENTRALIZADO_CARREIRA\", \"value\": \"Exercício descentralizado de carreira\"}, {\"key\": \"EXERCICIO_PROVISORIO\", \"value\": \"Exercício provisório\"}, {\"key\": \"CELETISTA\", \"value\": \"Celetista\"}, {\"key\": \"ATIVO_PERMANENTE_LEI_8878/94\", \"value\": \"Ativo permanente Lei 8878/94\"}, {\"key\": \"ANISTIADO_ADCT_CF\", \"value\": \"Anistiado ADCT CF\"}, {\"key\": \"CELETISTA/EMPREGADO\", \"value\": \"Celetista/Empregado\"}, {\"key\": \"CLT_ANS_DECISAO_JUDICIAL\", \"value\": \"CLT Anistiado decisão judicial\"}, {\"key\": \"CLT_ANS_JUDICIAL_CEDIDO\", \"value\": \"CLT Anistiado judicial cedido\"}, {\"key\": \"CLT_APOS_COMPLEMENTO\", \"value\": \"CLT Aposentado complemento\"}, {\"key\": \"CLT_APOS_DECISAO_JUDICIAL\", \"value\": \"CLT Aposentado decisão judicial\"}, {\"key\": \"INST_PS_DECISAO_JUDICIAL\", \"value\": \"Instituidor de pensão decisão judicial\"}, {\"key\": \"EMPREGO_PUBLICO\", \"value\": \"Emprego público\"}, {\"key\": \"REFORMA_CBM/PM\", \"value\": \"Reforma CBM/PM\"}, {\"key\": \"RESERVA_CBM/PM\", \"value\": \"Reserva CBM/PM\"}, {\"key\": \"REQUISITADO_MILITAR_GDF\", \"value\": \"Requisitado militar GDF\"}, {\"key\": \"ANISTIADO_PUBLICO_L10559\", \"value\": \"Anistiado público L10559\"}, {\"key\": \"ANISTIADO_PRIVADO_L10559\", \"value\": \"Anistiado privado L10559\"}, {\"key\": \"ATIVO_DECISAO_JUDICIAL\", \"value\": \"Ativo decisão judicial\"}, {\"key\": \"CONTRATO_TEMPORARIO\", \"value\": \"Contrato temporário\"}, {\"key\": \"COLAB_PCCTAE_E_MAGISTERIO\", \"value\": \"Colaborador PCCTAE e Magistério\"}, {\"key\": \"COLABORADOR_ICT\", \"value\": \"Colaborador ICT\"}, {\"key\": \"CLT_ANS_DEC_6657/08\", \"value\": \"CLT Anistiado Decreto 6657/08\"}, {\"key\": \"EXERCICIO_7_ART93_8112\", \"value\": \"Exercício §7° Art.93 Lei 8112\"}, {\"key\": \"CEDIDO_SUS/LEI_8270\", \"value\": \"Cedido SUS Lei 8270\"}, {\"key\": \"INST_ANIST_PUBLICO\", \"value\": \"Instituidor anistiado público\"}, {\"key\": \"INST_ANIST_PRIVADO\", \"value\": \"Instituidor anistiado privado\"}, {\"key\": \"CELETISTA_DECISAO_JUDICIAL\", \"value\": \"Celetista decisão judicial\"}, {\"key\": \"CONTRATO_TEMPORARIO_CLT\", \"value\": \"Contrato temporário CLT\"}, {\"key\": \"EMPREGO_PCC/EX-TERRITORIO\", \"value\": \"Emprego PCC/Ex-Território\"}, {\"key\": \"EXC_INDISCIPLINA\", \"value\": \"Exc. indisciplina\"}, {\"key\": \"CONTRATO_PROFESSOR_SUBSTITUTO\", \"value\": \"Contrato Professor Substituto\"}, {\"key\": \"ESTAGIARIO\", \"value\": \"Estagiário\"}, {\"key\": \"ESTAGIARIO_SIGEPE\", \"value\": \"Estagiário SIGEPE\"}, {\"key\": \"RESIDENCIA_E_PMM\", \"value\": \"Residência e PMM\"}, {\"key\": \"APOSENTADO_TEMPORARIRIO\", \"value\": \"Aposentado temporário\"}, {\"key\": \"CEDIDO_DF_ESTADO_MUNICIPIO\", \"value\": \"Cedido DF Estado Munícipio\"}, {\"key\": \"EXERC_DESCEN_CDT\", \"value\": \"Exercício descentralizado CDT\"}, {\"key\": \"EXERC_LEI_13681/18\", \"value\": \"Exercício lei 13681/18\"}, {\"key\": \"PENSIONISTA\", \"value\": \"Pensionista\"}, {\"key\": \"BENEFICIARIO_PENSAO\", \"value\": \"Beneficiário de pensão\"}, {\"key\": \"QE/MRE_CEDIDO\", \"value\": \"QE/MRE Cedido\"}, {\"key\": \"QUADRO_ESPEC_QE/MRE\", \"value\": \"Quadro ESPEC QE/MRE\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"field\": \"entidade\", \"label\": \"Entidade\"}, {\"field\": \"cidade\", \"label\": \"Cidade\"}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"usuario\", \"label\": \"Usuário\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"email\", \"label\": \"E-mail\"}, {\"field\": \"cpf\", \"label\": \"CPF\"}, {\"field\": \"matricula\", \"label\": \"Matrícula\"}, {\"field\": \"apelido\", \"label\": \"Apelido\"}, {\"field\": \"telefone\", \"label\": \"Telefone\"}, {\"field\": \"sexo\", \"label\": \"Sexo\", \"lookup\": [{\"key\": \"MASCULINO\", \"value\": \"Masculino\"}, {\"key\": \"FEMININO\", \"value\": \"Feminino\"}]}, {\"field\": \"situacao_funcional\", \"label\": \"Situação Funcional\", \"lookup\": [{\"key\": \"ATIVO_PERMANENTE\", \"value\": \"Ativo permanente\"}, {\"key\": \"APOSENTADO\", \"value\": \"Aposentado\"}, {\"key\": \"CEDIDO/REQUISITADO\", \"value\": \"Cedido/Requisitado\"}, {\"key\": \"NOMEADO_CARGO_COMISSIONADO\", \"value\": \"Nomeado em Cargo Comissionado\"}, {\"key\": \"SEM_VINCULO\", \"value\": \"Sem vínculo\"}, {\"key\": \"TABELISTA(ESP/EMERG)\", \"value\": \"Tabelista(ESP/EMERG)\"}, {\"key\": \"NATUREZA_ESPECIAL\", \"value\": \"Natureza especial\"}, {\"key\": \"ATIVO_EM_OUTRO_ORGAO\", \"value\": \"Ativo em outro órgão\"}, {\"key\": \"REDISTRIBUIDO\", \"value\": \"Redistribuído\"}, {\"key\": \"ATIVO_TRANSITORIO\", \"value\": \"Ativo transitório\"}, {\"key\": \"EXCEDENTE_A_LOTACAO\", \"value\": \"Excedente à lotação\"}, {\"key\": \"EM_DISPONIBILIDADE\", \"value\": \"Em disponibilidade\"}, {\"key\": \"REQUISITADO_DE_OUTROS_ORGAOS\", \"value\": \"Requisitado de outros órgãos\"}, {\"key\": \"INSTITUIDOR_PENSAO\", \"value\": \"Instituidor de pensão\"}, {\"key\": \"REQUISITADO_MILITAR_FORCAS_ARMADAS\", \"value\": \"Requisitado militar - Forças Armadas\"}, {\"key\": \"APOSENTADO_TCU733/94\", \"value\": \"Aposentado TCU733/94\"}, {\"key\": \"EXERCICIO_DESCENTRALIZADO_CARREIRA\", \"value\": \"Exercício descentralizado de carreira\"}, {\"key\": \"EXERCICIO_PROVISORIO\", \"value\": \"Exercício provisório\"}, {\"key\": \"CELETISTA\", \"value\": \"Celetista\"}, {\"key\": \"ATIVO_PERMANENTE_LEI_8878/94\", \"value\": \"Ativo permanente Lei 8878/94\"}, {\"key\": \"ANISTIADO_ADCT_CF\", \"value\": \"Anistiado ADCT CF\"}, {\"key\": \"CELETISTA/EMPREGADO\", \"value\": \"Celetista/Empregado\"}, {\"key\": \"CLT_ANS_DECISAO_JUDICIAL\", \"value\": \"CLT Anistiado decisão judicial\"}, {\"key\": \"CLT_ANS_JUDICIAL_CEDIDO\", \"value\": \"CLT Anistiado judicial cedido\"}, {\"key\": \"CLT_APOS_COMPLEMENTO\", \"value\": \"CLT Aposentado complemento\"}, {\"key\": \"CLT_APOS_DECISAO_JUDICIAL\", \"value\": \"CLT Aposentado decisão judicial\"}, {\"key\": \"INST_PS_DECISAO_JUDICIAL\", \"value\": \"Instituidor de pensão decisão judicial\"}, {\"key\": \"EMPREGO_PUBLICO\", \"value\": \"Emprego público\"}, {\"key\": \"REFORMA_CBM/PM\", \"value\": \"Reforma CBM/PM\"}, {\"key\": \"RESERVA_CBM/PM\", \"value\": \"Reserva CBM/PM\"}, {\"key\": \"REQUISITADO_MILITAR_GDF\", \"value\": \"Requisitado militar GDF\"}, {\"key\": \"ANISTIADO_PUBLICO_L10559\", \"value\": \"Anistiado público L10559\"}, {\"key\": \"ANISTIADO_PRIVADO_L10559\", \"value\": \"Anistiado privado L10559\"}, {\"key\": \"ATIVO_DECISAO_JUDICIAL\", \"value\": \"Ativo decisão judicial\"}, {\"key\": \"CONTRATO_TEMPORARIO\", \"value\": \"Contrato temporário\"}, {\"key\": \"COLAB_PCCTAE_E_MAGISTERIO\", \"value\": \"Colaborador PCCTAE e Magistério\"}, {\"key\": \"COLABORADOR_ICT\", \"value\": \"Colaborador ICT\"}, {\"key\": \"CLT_ANS_DEC_6657/08\", \"value\": \"CLT Anistiado Decreto 6657/08\"}, {\"key\": \"EXERCICIO_7_ART93_8112\", \"value\": \"Exercício §7° Art.93 Lei 8112\"}, {\"key\": \"CEDIDO_SUS/LEI_8270\", \"value\": \"Cedido SUS Lei 8270\"}, {\"key\": \"INST_ANIST_PUBLICO\", \"value\": \"Instituidor anistiado público\"}, {\"key\": \"INST_ANIST_PRIVADO\", \"value\": \"Instituidor anistiado privado\"}, {\"key\": \"CELETISTA_DECISAO_JUDICIAL\", \"value\": \"Celetista decisão judicial\"}, {\"key\": \"CONTRATO_TEMPORARIO_CLT\", \"value\": \"Contrato temporário CLT\"}, {\"key\": \"EMPREGO_PCC/EX-TERRITORIO\", \"value\": \"Emprego PCC/Ex-Território\"}, {\"key\": \"EXC_INDISCIPLINA\", \"value\": \"Exc. indisciplina\"}, {\"key\": \"CONTRATO_PROFESSOR_SUBSTITUTO\", \"value\": \"Contrato Professor Substituto\"}, {\"key\": \"ESTAGIARIO\", \"value\": \"Estagiário\"}, {\"key\": \"ESTAGIARIO_SIGEPE\", \"value\": \"Estagiário SIGEPE\"}, {\"key\": \"RESIDENCIA_E_PMM\", \"value\": \"Residência e PMM\"}, {\"key\": \"APOSENTADO_TEMPORARIRIO\", \"value\": \"Aposentado temporário\"}, {\"key\": \"CEDIDO_DF_ESTADO_MUNICIPIO\", \"value\": \"Cedido DF Estado Munícipio\"}, {\"key\": \"EXERC_DESCEN_CDT\", \"value\": \"Exercício descentralizado CDT\"}, {\"key\": \"EXERC_LEI_13681/18\", \"value\": \"Exercício lei 13681/18\"}, {\"key\": \"PENSIONISTA\", \"value\": \"Pensionista\"}, {\"key\": \"BENEFICIARIO_PENSAO\", \"value\": \"Beneficiário de pensão\"}, {\"key\": \"QE/MRE_CEDIDO\", \"value\": \"QE/MRE Cedido\"}, {\"key\": \"QUADRO_ESPEC_QE/MRE\", \"value\": \"Quadro ESPEC QE/MRE\"}]}, {\"type\": \"TEMPLATE\", \"field\": \"texto_complementar_plano\", \"label\": \"Mensagem do Plano de trabalho\"}]}, {\"type\": \"OBJECT\", \"field\": \"programa\", \"label\": \"Programa\", \"fields\": [{\"field\": \"nome\", \"label\": \"Nome\"}, {\"field\": \"normativa\", \"label\": \"Normativa\"}, {\"field\": \"data_inicio\", \"label\": \"Data início\"}, {\"field\": \"data_fim\", \"label\": \"Data término\"}]}, {\"type\": \"ARRAY\", \"field\": \"entregas\", \"label\": \"Entregas\", \"fields\": [{\"field\": \"descricao\", \"label\": \"Descrição da entrega\"}, {\"field\": \"forca_trabalho\", \"label\": \"Percentual da força de trabalho\"}, {\"field\": \"orgao\", \"label\": \"Orgão externo vinculado a entrega\"}, {\"field\": \"meta\", \"label\": \"Meta extipulada para a entrega\"}, {\"type\": \"OBJECT\", \"field\": \"entrega\", \"label\": \"Entrega do plano de entrega\", \"fields\": [{\"field\": \"descricao\", \"label\": \"Descrição da entrega\"}, {\"field\": \"data_inicio\", \"label\": \"Data início\"}, {\"field\": \"data_fim\", \"label\": \"Data fim\"}, {\"field\": \"homologado\", \"label\": \"Se a entrega já foi homologada\"}, {\"field\": \"progresso_esperado\", \"label\": \"Percentual de progesso esperado da entrega\"}, {\"field\": \"progresso_realizado\", \"label\": \"Percentual de progesso realizado da entrega\"}, {\"field\": \"destinatario\", \"label\": \"Destinatário da entrega\"}]}]}, {\"type\": \"ARRAY\", \"field\": \"criterios_avaliacao\", \"label\": \"Critérios de avaliação\", \"fields\": [{\"field\": \"value\", \"label\": \"Critério\"}]}]",
        "entidade_id" => NULL,
        "unidade_id" => NULL,
      ),
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
      array(
        "id" => "23ee6ace-2b7c-41a6-a255-c3ee91ba7aab",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Diretrizes SEGES",
        "icone" => "bi bi-book",
        "cor" => "#05BD33",
        "descricao" => ".",
      ),
      array(
        "id" => "995f5a29-6b30-44de-8e80-efeff45d99e1",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Propósito SEGES",
        "icone" => "bi bi-brightness-high",
        "cor" => "#D7E9F7",
        "descricao" => ".",
      ),
      array(
        "id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "PE MGI",
        "icone" => "bi bi-award",
        "cor" => "#B9F3FC",
        "descricao" => "Eixo incluído como genérico para a inclusão dos objetivos estratégicos do MGI",
      ),
    );

    $modelos_afericao_entregas = array(
      array(
        "id" => "375520ce-b147-441e-8b5f-688ccd65e1a1",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Meta Percentual",
        "descricao" => "Tipo de meta quantificada por valores percentuais.",
        "tipo_indicador" => "PORCENTAGEM",
        "lista_qualitativos" => NULL,
        "unidade_id" => NULL,
        "checklist" => NULL,
        "etiquetas" => NULL,
      ),
      array(
        "id" => "7aeef185-4e4c-4007-af81-0d0b5d82f45b",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Meta Quantitativa (Unidades)",
        "descricao" => "Tipo de meta quantificada por valores quantitativos inteiros.",
        "tipo_indicador" => "QUANTIDADE",
        "lista_qualitativos" => NULL,
        "unidade_id" => NULL,
        "checklist" => NULL,
        "etiquetas" => NULL,
      ),
    );

    // 27/12/2023 MGI - Paiva rodou um trabalho muito bom. Vamos lá!
    $planejamentos = array(
      array(
        "id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "MAPA ESTRATÉGICO MGI 2023-2027",
        "missao" => "Ampliar e qualificar a gestão, os serviços e as políticas governamentais para a sociedade e a administração pública, apoiando e potencializando a inovação e o fortalecimento das capacidades do Estado.",
        "visao" => "Atuar como liderança da transformação do Estado, fundada nos valores democráticos, para a promoção da inovação em políticas públicas que impulsionem o desenvolvimento sustentável e o pleno exercício da cidadania.",
        "data_inicio" => "2023-01-01 00:00:00",
        "data_fim" => "2027-12-31 00:00:00",
        "data_arquivamento" => NULL,
        "valores" => "[{\"key\":\"edeab1aebf2c539211fdbe5ae20fdf53\",\"value\":\"Colabora\\u00e7\\u00e3o\"},{\"key\":\"726c8c2b65516842fd8722ecc50aad53\",\"value\":\"Democracia\"},{\"key\":\"c9cb78b93d9cfe2331110f113bae0f55\",\"value\":\"Diversidade\"},{\"key\":\"1be05c412ef001c1ac8fe99e75f40708\",\"value\":\"Integridade\"},{\"key\":\"7170622a69c9f7691ba1aff87a3228ad\",\"value\":\"Participa\\u00e7\\u00e3o\"},{\"key\":\"85b971a1f55fce80503b8783be79a183\",\"value\":\"Qualidade\"},{\"key\":\"85c8e1135f49db4aa5933da2c58a3bee\",\"value\":\"Sustentabilidade\"}]",
        "resultados_institucionais" => "[]",
        "entidade_id" => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1",
        "unidade_id" => "4f705d83-5808-4240-8b92-39ca88139076",
        "planejamento_superior_id" => NULL,
      ),
    );

    $planejamentos_objetivos = array(
      array(
        "id" => "00db60be-856f-462a-9d0d-27f6b21edce6",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 10,
        "fundamentacao" => ".",
        "nome" => "OE 05 - Aperfeiçoar modelos de compras governamentais e parcerias públicas como instrumentos de indução ao desenvolvimento inclusivo e sustentável do País",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "09093d96-a0b1-4bd9-8adc-646947ec77e0",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 11,
        "fundamentacao" => ".",
        "nome" => "OE 03 - Liderar e promover a transformação digital da administração pública, em cooperação federativa, com segurança, transparência e foco nas pessoas",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "1f4e089f-c8be-4ade-b9f8-ec994b2946b4",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 1,
        "fundamentacao" => ".",
        "nome" => "OE 12 - Formar e desenvolver as competências dos agentes públicos, necessárias para melhor servir à sociedade, com agilidade e inovação adaptadas aos contextos dinâmicos",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "51a85317-e9ce-432a-9367-11b641a6ff41",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 2,
        "fundamentacao" => ".",
        "nome" => "OE 13 - Prover serviços de suporte compartilhados e difundir soluções inovadoras e de alta qualidade para toda administração pública federal",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "5e35120c-d276-4f23-8844-801e9686710a",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 3,
        "fundamentacao" => ".",
        "nome" => "OE 10 - Aperfeiçoar estruturas de atuação governamental, modelos de governança e gestão para mais e melhores políticas públicas",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "6044f32f-380c-4187-bfdb-0119735d9f43",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 4,
        "fundamentacao" => ".",
        "nome" => "OE 07 - Ampliar o acesso aos documentos, por meio do fortalecimento da gestão de documentos e arquivos, assegurando o direito à informação e à memória do País",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "9520ee41-2923-444e-83fc-a29fcbe462a9",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 12,
        "fundamentacao" => ".",
        "nome" => "OE 02 -Valorizar as servidoras e os servidores públicos para pleno exercício de suas funções emelhoria daqualidade do serviço prestado, aprimorando concursos e carreiras, promovendo a profissionalização da burocracia e a democratização das relações",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "95ecdebc-b77a-4a9d-aa59-f47f2362bca4",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 5,
        "fundamentacao" => ".",
        "nome" => "OE 08 - Fortalecer as empresas estatais, com adequada governança corporativa, revalorizando a propriedade pública e seu papel no desenvolvimento inclusivo e sustentável do país",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "ac0d9333-e5a1-4f6c-a352-031b45c6453d",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 6,
        "fundamentacao" => ".",
        "nome" => "OE 11 - Consolidar e gerir a infraestrutura nacional de dadospara facilitar a governança, a integração e o uso de dados nas políticas públicas com segurança, respeito à privacidade e à proteção das informações",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "c00943ac-414b-49bd-872b-8f3a244f12a3",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 7,
        "fundamentacao" => ".",
        "nome" => "OE 06 - Aprimorar o uso e a destinação do patrimônioda União por meio da gestão participativa, racional, socioambientalmentejusta, priorizando o atendimento às políticas públicas",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "c78be265-49a0-494a-a86f-2c5ca150aa09",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 13,
        "fundamentacao" => ".",
        "nome" => "OE 01 - Promover a inovação, a melhoria da gestão e da qualidade dos serviços públicos em articulação com instituições da administração pública federal, cooperação federativa com estados e municípios e diálogo com a sociedade",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "cdb46866-c3b3-413d-a328-bea4029a059c",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 14,
        "fundamentacao" => ".",
        "nome" => "OE 04 - Consolidar o sistema de identificação e implantar a Carteira de Identidade Nacional em todo o país, ampliando o acesso aos serviços públicos e a confiança na relação com a população",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "dc49de68-e024-4868-ab92-9442a18c39d0",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 8,
        "fundamentacao" => ".",
        "nome" => "OE 09 - Aprimorar os processos e serviços de gestão patrimonial, com transformação digital e foco no cidadão",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
      array(
        "id" => "fd655c5a-807c-4eee-89ad-61312b0d60b6",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "sequencia" => 9,
        "fundamentacao" => ".",
        "nome" => "OE 05 - Aperfeiçoar modelos de compras governamentais e parcerias públicas como instrumentos de indução ao desenvolvimento inclusivo e sustentável do País",
        "path" => NULL,
        "planejamento_id" => "c77333f6-548f-4558-8fd3-f84d2593f07b",
        "eixo_tematico_id" => "4e8cf338-7fb3-4b8e-8f1b-a4d165e046d7",
        "objetivo_pai_id" => NULL,
        "objetivo_superior_id" => NULL,
        "integra_okr" => 1,
      ),
    );

    foreach ($tipos_modalidades as $tipo_modalidade) {
      // criar ou atualizar o registro
      TipoModalidade::updateOrCreate(['id' => $tipo_modalidade['id']], $tipo_modalidade);
      //TipoModalidade::firstOrCreate(['id' => $tipo_modalidade['id']], $tipo_modalidade);
    }

    foreach ($tipos_atividades as $tipo_atividade) {
      TipoAtividade::firstOrCreate(['id' => $tipo_atividade['id']], $tipo_atividade);
    }

    // foreach ($tipos_justificativas as $tipo_justificativa) {
    //   TipoJustificativa::firstOrCreate(['id' => $tipo_justificativa['id']], $tipo_justificativa);
    // }

    foreach ($tipos_avaliacoes as $tipo_avaliacao) {
      TipoAvaliacao::firstOrCreate(['id' => $tipo_avaliacao['id']], $tipo_avaliacao);
    }

    foreach ($tipos_avaliacoes_notas as $tipo_avaliacao_nota) {
      TipoAvaliacaoNota::firstOrCreate(['id' => $tipo_avaliacao_nota['id']], $tipo_avaliacao_nota);
    }

    // foreach ($tipos_avaliacoes_justificativas as $tipo_avaliacao_justificativa) {
    //   TipoAvaliacaoJustificativa::firstOrCreate(['id' => $tipo_avaliacao_justificativa['id']], $tipo_avaliacao_justificativa);
    // }

    TipoDocumento::upsert($tipos_documentos, ['id']);
   
    foreach ($templates as $template) {
      try {
        Template::firstOrCreate(['id' => $template['id']], $template);
      } catch (\Illuminate\Database\QueryException $e) {
        // Handle exception
      }
      
    }


    foreach ($modelos_afericao_entregas as $modelo_afericao_entrega) {
      try {
        Entrega::firstOrCreate(['id' => $modelo_afericao_entrega['id']], $modelo_afericao_entrega);
      } catch (\Illuminate\Database\QueryException $e) {
        // Handle exception
      }
    }


  }
}
