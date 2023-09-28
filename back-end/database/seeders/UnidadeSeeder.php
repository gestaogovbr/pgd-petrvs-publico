<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unidade;
use App\Models\Cidade;

class UnidadeSeeder extends Seeder
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

    public function run()
    {    
        /*
        $brasilia = Cidade::where('codigo_ibge', '5300108')->sole();
        //cria a Unidade 'PRF' que será a raiz de todas as outras.
        $prf = new Unidade();
        $prf->fill([
            'codigo' => '1', // Código SIAPE da UORG
            'sigla' => 'PRF',
            'nome' => 'Polícia Rodoviária Federal',
            'entidade_id' => '52d78c7d-e0c1-422b-b094-2ca5958d5ac1',
            'instituidora' => 1,
            'cidade_id' => $brasilia->id
        ]);
        $prf->save();
        */

        $unidades_raiz = array(
          array(
            "id" => "4f705d83-5808-4240-8b92-39ca88139076",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "30802",
            "sigla" => "PRF",
            "nome" => "Polícia Rodoviária Federal",
            "instituidora" => 1,
            "path" => NULL,
            "texto_complementar_plano" => NULL,
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => NULL,
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => NULL,
            "entidade_id" => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1",
          ),
          array(
            "id" => "8a2a768c-ae60-4308-8f30-821a21a66fe4",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "17500",
            "sigla" => "MGI",
            "nome" => "Ministério da Gestão e da Inovação em Serviços Públicos",
            "instituidora" => 1,
            "path" => NULL,
            "texto_complementar_plano" => NULL,
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => NULL,
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => NULL,
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "c6b3c3a5-ebc6-41c2-bc98-402026d2d638",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "37003",
            "sigla" => "SEGES",
            "nome" => "Secretaria de Gestão e Inovação",
            "instituidora" => 1,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "8a2a768c-ae60-4308-8f30-821a21a66fe4",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
        );
        foreach($unidades_raiz as $u){
          Unidade::insertOrIgnore($u);
        }

        $unidades = array(
          array(
            "id" => "c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "created_at" => "2023-09-26 19:07:03",
            "updated_at" => "2023-09-26 19:13:28",
            "deleted_at" => NULL,
            "codigo" => "300013",
            "sigla" => "DGTES",
            "nome" => "Diretoria de Informações, Serviços e Sistemas de Gestão",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c6b3c3a5-ebc6-41c2-bc98-402026d2d638",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"0\": \"{\\\"enviar_email\\\": true, \\\"enviar_petrvs\\\": true, \\\"nao_notificar\\\": [], \\\"enviar_whatsapp\\\": true}\", \"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "c6b3c3a5-ebc6-41c2-bc98-402026d2d638",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "e93a5a5c-2081-42fb-9aba-34033fcc71a0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "246050",
            "sigla" => "CGSES",
            "nome" => "Coordenação-Geral de Serviços aos Sistemas Estruturantes",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "dcf10e21-dea0-4d30-8bf2-20fca0527c51",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "300073",
            "sigla" => "CGSIS",
            "nome" => "Coordenação-Geral de Sistemas de Processo Eletrônico",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "7f4aa3aa-7f9c-4f18-8fdd-84d790fbb07b",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "300068",
            "sigla" => "DICOM",
            "nome" => "Divisão de Comunicações",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "117759",
            "sigla" => "CGINF",
            "nome" => "Coordenação-Geral de Gestão da Informação",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "6e3c19ec-e938-430b-bc7a-c4c7749b8574",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "300069",
            "sigla" => "CGESP",
            "nome" => "Coordenação-Geral de Soluções Negociais em Processo Eletrônico",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "26e561b0-4d28-419a-a161-be2654da5389",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "300067",
            "sigla" => "COREL",
            "nome" => "Coordenação de Relacionamento e Inovação",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "c4a1df51-9aed-4341-bc0d-adac9b4914fb",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "300071",
            "sigla" => "DIVIN",
            "nome" => "Divisão de Dados e Interoperabilidade",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa/6e3c19ec-e938-430b-bc7a-c4c7749b8574",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "6e3c19ec-e938-430b-bc7a-c4c7749b8574",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "b9ad7a8b-075e-4841-8abe-5e0b8acbb1a1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "300070",
            "sigla" => "CORED",
            "nome" => "Coordenação de Requisitos Negociais e Documentação",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa/6e3c19ec-e938-430b-bc7a-c4c7749b8574",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "6e3c19ec-e938-430b-bc7a-c4c7749b8574",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "990b3431-1a35-426c-9491-641ee257eaea",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "321407",
            "sigla" => "COINF",
            "nome" => "Coordenação de Informações Gerenciais",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa/7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "8bc53b7e-d84e-48f0-96d7-c49e5c1b7459",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "321423",
            "sigla" => "COGES",
            "nome" => "Coordenação de Soluções em Gestão",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa/7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "125f3615-3f7f-4238-a93c-4f2cc5edb85d",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "300074",
            "sigla" => "DQUAL",
            "nome" => "Divisão de Qualidade",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa/dcf10e21-dea0-4d30-8bf2-20fca0527c51",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "dcf10e21-dea0-4d30-8bf2-20fca0527c51",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "000a8aac-f1a2-4ab3-ae45-ba2c061c5604",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "224018",
            "sigla" => "COCAF",
            "nome" => "Coordenação de Controle de Cargos, Funções e Gratificações",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa/7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "ecacb518-97e8-40f2-be58-2d0b5d262a0f",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "300072",
            "sigla" => "DICAD",
            "nome" => "Divisão de Comunicações Administrativas e Documentações",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa/6e3c19ec-e938-430b-bc7a-c4c7749b8574",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "6e3c19ec-e938-430b-bc7a-c4c7749b8574",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
          array(
            "id" => "7f11aecb-0472-4449-afa7-45c8ddffe62c",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "codigo" => "293068",
            "sigla" => "CDATA",
            "nome" => "Coordenação de Inovação e Ciência de Dados",
            "instituidora" => 0,
            "path" => "/8a2a768c-ae60-4308-8f30-821a21a66fe4/c475b9ff-f9eb-48da-b15f-1eb93ceaf5fa/7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "texto_complementar_plano" => "",
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => "7738d06e-dcca-49a2-87fa-5a5018ea83d0",
            "entidade_id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
          ),
        );
        foreach($unidades as $u){
            Unidade::insertOrIgnore($u);
        }
    }
}