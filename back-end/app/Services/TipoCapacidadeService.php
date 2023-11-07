<?php

namespace App\Services;

use App\Models\TipoCapacidade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;

class TipoCapacidadeService extends ServiceBase {

    public $tiposCapacidades =
    [
        [
            "id" => "9cc3d833-1443-a354-2bfb-5385680cd0f4",
            "codigo" => "MOD_CTXT",
            "descricao" => "Módulo de Acesso aos Contextos",
            "capacidades" => [
                /* Capacidades do menu principal*/
                ["42f3cc03-9e0a-5522-dca7-13d3bfc959e0", "CTXT_GEST", "Permite acessar o contexto GESTÃO"],
                ["863a46b5-75d8-ded9-2380-172e22f4b823", "CTXT_EXEC", "Permite acessar o contexto EXECUÇÃO"],
                ["5c6d9350-5f77-e5bd-1f2a-cd1a098c6ada", "CTXT_ADM", "Permite acessar o contexto ADMINISTRADOR"],
                ["2aa97bcf-a681-5f29-3783-3ded76a1d12d", "CTXT_DEV", "Permite acessar o contexto DEV"],
                ["655fceb6-46be-4602-62c0-8b2f002692a8", "CTXT_PNT", "Permite acessar o contexto PONTO"],
                ["b2d2e8ca-9ffe-cbaf-9ba2-6b18e36cd119", "CTXT_PROJ", "Permite acessar o contexto PROJETO"],
                ["36bd8fba-cd94-9e3a-86e1-df67218603da", "CTXT_RX", "Permite acessar o contexto RAIOX"],
            ]
        ], [
            "id" => "584a1faa-df5f-1518-ec85-21ea60847ebb",
            "codigo"=> "MOD_ACESSO",
            "descricao" => "Módulo de Acesso aos Menus",
            "capacidades" => [
                /* Capacidades do menu principal*/
                ["f6bf629f-1743-6331-4da2-f6ccd1db29c0", "MENU_CAD_ACESSO", "Permite acessar o menu cadastro"],
                ["13e6667a-238c-49af-11f2-ef0182b73549", "MENU_CONFIG_ACESSO", "Permite acessar o menu configurações"], //Substituída por MOD_CFG
                ["dde071f9-1fe8-68c6-10f9-4a7fce6f4009", "MENU_GESTAO_ACESSO", "Permite acessar o menu gestão"],
                ["7243ee41-0f8f-2a85-4830-ebed78290b0e", "MENU_REL_ACESSO", "Permite acessar o menu relatórios"],
                ["7adab614-982c-944a-d4b5-cfcb1516dd85", "DEV_MENU_LOGS_ACESSO", "Permite acessar o menu logs"],
                /* Capacidades do DASHBOARD */
                ["5b3d60b3-cd0d-c6c7-0871-5aebec40a0df", "DASH_PRG", "Permite mostrar informações do Programa de Gestão"],
            ]
        ], [
            "id" => "827a2b51-866e-da51-16bc-1f791c8f8e68",
            "codigo" => "MOD_AFT",
            "descricao"=> "Módulo de afastamentos",
            "capacidades" => [
            /* Capacidades do módulo AFASTAMENTO*/
                ["0ac18772-72ef-8023-d9ac-7e1879fa045d", "MOD_AFT_CONS", "Permite consultar afastamento"],
                ["ac5655f7-c8f1-d942-54d2-585a3c90bcdc", "MOD_AFT_EDT", "Permite editar afastamento"],
                ["d49a202b-ef6f-6d95-b6fb-e6b188896ed5", "MOD_AFT_EXCL", "Permite excluir afastamento"],
                ["72842deb-6304-739b-209f-8ac736a2a721", "MOD_AFT_INCL", "Permite incluir afastamento"]
            ]
        ], [
            "id" => "cf1e3dfa-7e12-3668-935e-3612505ba6b6",
            "codigo" => "MOD_ATV",
            "descricao" => "Módulo Atividades",
            "capacidades" => [
                /* Capacidades do módulo ATIVIDADES*/
                ["5a4302ec-e350-e76a-2fc2-f07aae6406f7", "MOD_ATV_TIPO_ATV_VAZIO", "Permite incluir atividade sem tipo de atividade"],
                ["e4e98026-5484-942a-122d-d65d910ee584", "MOD_ATV_CONS", "Permite consultar atividade"],
                ["0fc2b4f1-992b-fa7c-b2b7-5ff1f25543ca", "MOD_ATV_EDT", "Permite editar atividade"],
                ["131aa1a3-450e-39a8-6d5a-02fb6de4f9a3", "MOD_ATV_EXCL", "Permite excluir atividade"],
                ["fe019b6d-981f-385e-1d0c-10f9174eafee", "MOD_ATV_USU_EXT", "Permite atribuir atividades a usuários de outra unidade"],
                ["456d5aba-75ac-7303-9bbf-928128b54e4b", "MOD_ATV_INCL", "Permite incluir atividade"],
                ["2b5af233-1da0-8236-bdf8-007c11fd4ad3", "MOD_ATV_INICIO", "Permite definir início atividade"],
                ["539c69d1-d77b-c480-9c2f-114b3f4306ca", "MOD_ATV_RESP_INICIAR", "Permite incluir responsável por atividade"],
                ["0eca6527-cbb3-5547-9cbf-1513ac998335", "MOD_ATV_TRF_INCL", "Permite incluir tarefas dentro de atividades"],
                ["44aaaa26-563a-eb93-5a18-910fd1aed8f7", "MOD_ATV_TRF_EDT", "Permite editar tarefas dentro de atividades"],
                ["af3091ef-2247-a440-672e-712ea02d8bbe", "MOD_ATV_TRF_EXCL", "Permite exluir tarefas dentro de atividades"],
                ["2cb9f4db-c64c-cbec-7d0f-2a2ed81fbadc", "MOD_ATV_TRF_CONS", "Permite consultar tarefas dentro de atividades"],
                ["163d7e84-4fb2-b735-42b6-80edad68c18c", "MOD_ATV_CLONAR", "Permite clonar atividades"],
            ]
        ], [
            "id" => "41ea9174-f61d-130d-40e7-9537e33e61dd",
            "codigo" => "MOD_CADV",
            "descricao" => "Módulo Cadeia de Valor",
            "capacidades" => [
                /* Capacidades do módulo CADEIA DE VALOR*/
                ["2b1db46f-4243-4453-0bd9-ca863c8845b5", "MOD_CADV_EDT", "Permite editar cadeia de valor"],
                ["31ca12ad-e34e-6821-0a9d-99f9f15bec67", "MOD_CADV_EXCL", "Permite excluir cadeia de valor"],
                ["a20c9de8-5777-21e9-a9e7-a006c52cb31f", "MOD_CADV_INCL", "Permite incluir cadeia de valor"],
            ]
        ], [
            "id" => "5aea9ae8-8bb5-c0f5-bcd6-25ec259ee332",
            "codigo" => "MOD_CID", // ok
            "descricao" => "Módulo Cidades",
            "capacidades" => [
                /* Capacidades do módulo CIDADE*/
                //["MOD_CID", "Permite acessar item menu cidades"],
                ["9e81843c-b045-140a-1ddf-fcc11e3e8873", "MOD_CID_CONS", "Permite consultar cidade"],
                ["ec78a136-c4d6-1919-b341-b5141620b0bf", "MOD_CID_EDT", "Permite editar cidades"],
                ["f7628915-cb6d-bacc-4054-ef3b6862e7f7", "MOD_CID_EXCL", "Permite excluir cidades"],
                ["28832ef0-bf13-ab9e-7f65-8f1ab3ebff60", "MOD_CID_INCL", "Permite incluir cidades"],
            ]
        ], [
            "id" => "cf79dd69-7c19-4acd-71b5-ff33f19085d8",
            "codigo" => "MOD_DEV", // ok
            "descricao" => "Módulo Desenvolvedor",
            "capacidades" => [
                /* Capacidades do módulo LOGS*/
                ["3a3df1f2-48b7-5cbd-6bae-1823ebb54bee", "MOD_LOGS", "Permite manter registros de logs"],
            ]
        ], [
            "id" => "41416e8c-8542-895c-1c31-afffd63e4053",
            "codigo" => "MOD_CFG", // ok
            "descricao" => "Módulo de configurações",
            "capacidades" => [
                /* Capacidades do módulo CONFIGURAÇÃO*/
                ["cec582f7-c947-4f96-765c-4abe2c633528", "MOD_CFG_ENTD", "Permite acessar Entidade no menu configurações"],
                ["aee3f23e-12af-383b-e9ec-ab3ea3bf8cac", "MOD_CFG_PERFS", "Permite configuração de perfis no petrvs"],
                //["MOD_CFG_PREF", "Permite configura"r preferências"],
                ["6e1931a7-e9bc-5ce3-0b41-95751361aef7", "MOD_CFG_UND", "Permite configurar unidade"],
                ["31264556-b517-9d58-b6fb-5b5af255c5a4", "MOD_CFG_USER", "Permite alterar configurações de usuário"],
                //["MOD_CFG_USER_APELIDO", "Permite a"lterar valor campo apelido do usuário"],
                ["8d64ba37-e260-c601-774a-d8f84d02ba25", "MOD_CFG_USER_CPF", "Permite alterar valor campo CPF do usuário"],
                ["b73c2c20-1b8c-57d7-953f-17eea3d006e1", "MOD_CFG_USER_MAIL", "Permite alterar valor campo e-Mail do usuário"],
                ["46a6e267-7863-76ad-1d6d-ebd5dcc3d226", "MOD_CFG_USER_MAT", "Permite alterar valor campo matrícula do usuário"],
                //["MOD_CFG_USER_NOME", "Permite alte"rar valor campo nome do usuário"],
                ["4ad4995b-8d3f-8878-a89b-c0ed28133c3e", "MOD_CFG_USER_PERFIL", "Permite alterar valor campo perfil do usuário"],
                //["MOD_CFG_USER_TEL", "Permite alter"ar valor campo telefone do usuário"],
                //["MOD_CFG_USER_UF", "Permite altera"r valor campo UF do usuário"],
                /* Capacidades do módulo Configuraçõe"s de PERFIL*/
                ["247e9544-e402-02a2-5840-a910b7bbff79", "MOD_PERF_EDT", "Permite editar perfil"],
                ["08b04074-d8f5-4e83-d759-afbe024051ce", "MOD_PERF_EXCL", "Permite excluir perfil"],
                ["8d920cdd-84f8-47ff-a8c0-76918a92d3f4", "MOD_PERF_INCL", "Permite incluir perfil"],
            ]
        ], [
            "id" => "c0be5273-e181-5eb5-48a5-cb46aa5a14f6",
            "codigo"=> "MOD_ENTD", // ok
            "descricao"=> "Módulo Entidade",
            "capacidades"=> [
                /* Capacidades do módulo ENTIDADE*/
                ["35097f93-f04a-7d96-4174-955f572263fe", "MOD_ENTD_EDT", "Permite editar entidade"],
                ["3a79338d-662c-cb95-ddcc-4c830b3a3d18", "MOD_ENTD_EXCL", "Permite excluir Entidade"],
                ["97b1d600-d6b9-9ebe-ad54-141c2c08c555", "MOD_ENTD_INCL", "Permite incluir Entidade"],
            ]
        ], [
            "id" => "d83107c9-4903-bdc8-b314-1dcebac52a0a",
            "codigo" => "MOD_EXTM", //ok
            "descricao" => "Módulo Eixos Temáticos",
            "capacidades" => [
                /* Capacidades do módulo EIXOS TEMÁTICOS */
                //["MOD_EXTM", "Permite acessar item do menu Eixos temáticos"],
                ["ef245afe-7d8d-19fd-ac1f-5d7739b0094e", "MOD_EXTM_CONS", "Permite consultar Eixos temáticos"],
                ["5ecc7923-7eaa-e95a-e17b-0dd188d03351" ,"MOD_EXTM_INCL", "Permite incluir Eixos temáticos"],
                ["0d7dbfa5-cbaf-2aec-6b2a-52302d7766b6" ,"MOD_EXTM_EDT", "Permite editar Eixos temáticos"],
                ["b1f08587-67ce-f496-aa79-a8d781674b63" ,"MOD_EXTM_EXCL", "Permite excluir Eixos temáticos"],
            ]
        ], [
            "id" => "5a3ff979-737d-5f16-df44-dd07609e5eb2",
            "codigo"=> "MOD_ENTRG", //ok
            "descricao"=> "Módulo de Entregas",
            "capacidades"=> [
                /* Capacidades do módulo ENTREGAS*/
                ["fa2e6609-853a-79e1-f909-cf7abaef564f", "MOD_ENTRG_INCL", "Permite incluir Entregas"],
                ["845ce034-2606-8d70-41f0-6eb1097cfe8f", "MOD_ENTRG_EDT", "Permite editar Entregas"],
                ["265d3a6d-ad7c-d8f4-9e4c-1bc6cb34d3e7", "MOD_ENTRG_EXCL", "Permite excluir Entregas"],
            ]
        ], [
            "id" => "94216c82-09b0-1c0e-3fc0-351c67ad18ab",
            "codigo" => "MOD_FER", //ok
            "descricao" => "Módulo feriados",
            "capacidades" => [
                /* Capacidades do módulo FERIADO*/
                //["MOD_FER", "Permite acessar item menu feriados"],
                ["e237a10c-a274-ba65-b293-da6223f53ad8", "MOD_FER_CONS", "Permite consultar feriado"],
                ["82ab5e5c-26ae-1eac-bff2-4c123e60e4fd", "MOD_FER_EDT", "Permite editar feriados"],
                //["MOD_FER_ENT_EDT", "Permite editar entidades em feriado"], // só no back
                //["MOD_FER_ENT_INCL", "Permite incluir entidades em feriado"], // só no back
                ["5a424bdb-dcc6-6130-896c-af2e7fbde743", "MOD_FER_EXCL", "Permite excluir feriado"],
                ["4eba8c43-a5c6-2c61-a2ef-f0c163894d20", "MOD_FER_INCL", "Permite incluir feriados"],
            ]
        ], [
            "id" => "b12c3253-d507-fa9f-851a-035d76c43538",
            "codigo" => "MOD_MATSRV", //ok
            "descricao" => "Módulo materiais e serviços",
            "capacidades" => [
                /* Capacidades do módulo MATERIAIS E SERVIÇOS*/
                ["90347279-b893-368c-d8fd-61eaaec55461", "MOD_MATSRV_EDT", "Permite editar materiais e serviços"],
                ["c21206b2-0897-f0e5-af6c-b2c9f99a8bf5", "MOD_MATSRV_EXCL", "Permite excluir materiais e serviços"],
                ["a37ae9b6-0343-6797-6d2e-6e8cb3431156", "MOD_MATSRV_INCL", "Permite incluir materiais e serviços"],
            ]
        ], [
            "id" => "e73c33b4-a30b-7c55-2101-31d3fc53ea44",
            "codigo" => "MOD_PLAN", //ok
            "descricao" => "Módulo de Planejamento Institucional",
            "capacidades" => [
                /* Capacidades do módulo PLANEJAMENTO INSTITUCIONAL */
                //["MOD_PLAN", "Permite acessar Planejamentos Institucionais"],
                ["3e5f5851-e63a-0430-3804-d9c0e14179be", "MOD_PLAN_INST", "Permite acessar item do menu Planejamentos Institucionais"],
                ["47bba179-cf06-f54f-9822-e5c0d1bb482a", "MOD_PLAN_INST_CONS", "Permite consultar Planejamentos Institucionais"],
                ["141c10fe-adf5-bd53-97cb-d7fd4c001902", "MOD_PLAN_INST_INCL", "Permite incluir algum tipo de Planejamento Institucional"],
                ["16cdcedd-6575-553a-d9dc-cca816d19cbd", "MOD_PLAN_INST_INCL_UNID_INST", "Permite incluir Planejamento Institucional para a Unidade Instituidora"],
                ["a9e16567-ab1f-97e7-e5f7-e30c7d5f3699", "MOD_PLAN_INST_INCL_UNEX_LOTPRI", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas para a sua lotação)"],
                ["83372bf5-878b-4a38-5b35-a35c1077bc4e", "MOD_PLAN_INST_INCL_UNEX_QQLOT", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas as de suas lotações)"],
                ["073249da-522d-ad7d-4ff2-5635f91a9d59", "MOD_PLAN_INST_INCL_UNEX_SUBORD", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas as de suas lotações e suas subordinadas)"],
                ["a141521d-60af-bc62-19f6-4dce1a17e8a9", "MOD_PLAN_INST_INCL_UNEX_QUALQUER", "Permite incluir Planejamentos Institucionais para qualquer Unidade Executora, independente de sua lotação"],
                ["7ca181ff-3f57-37dd-1994-eb469132a9dc", "MOD_PLAN_INST_EDT", "Permite editar Planejamentos Institucionais"],
                ["ded0e72b-7842-0d38-c5d8-2fdfbc23e692", "MOD_PLAN_INST_EXCL", "Permite excluir Planejamentos Institucionais"],
            ]
        ], [
            "id" => "e255df1d-26ea-bd25-5b9b-57cb8228be72",
            "codigo" => "MOD_PTR",
            "descricao" => "Módulo de Plano de Trabalho",
            "capacidades" => [
                /* Capacidades do módulo PLANO DE TRABALHO */
                ["d75bcc08-ba8e-325f-76e3-a97fd928250b", "MOD_PTR_EDT", "Permite editar planos de trabalho"],
                ["d7da9765-816b-198f-4625-15533b70d652", "MOD_PTR_INCL", "Permite incluir planos de trabalho"],
                ["c17fc9cb-a788-75b0-d793-3f2d2e64b290", "MOD_PTR_EDT_ATV", "Permite editar planos de trabalho ativos"],
                ["78d6200f-f723-6f5f-45c1-3406b00728c4", "MOD_PTR_CNC", "Permite cancelar planos de trabalho"],
                ["6173d3d6-53d8-254a-ac50-9f1ad5f4429a", "MOD_PTR_USERS_INCL", "Permite incluir planos de trabalho para usuários que não estão lotados nas áreas de trabalho do usuário logado"],
                ["00601e28-971f-7d8a-4139-145a595a28dc", "MOD_PTR_INCL_SEM_LOT", "Permite incluir planos de trabalho para usuários que não estão lotados na unidade executora"],
                ["0f23c861-a5af-824d-36c7-df0e1a7dfef8", "MOD_PTR_INTSC_DATA", "Permite incluir planos de trabalho que possuam períodos conflitantes com outro plano já existente na mesma unidade executora"]
            ]
        ], [
            "id" => "2728de77-6a04-3f97-dd77-aacc33a50861",
            "codigo" => "MOD_PTR_ENTR",
            "descricao" => "Módulo de Plano de Trabalho - Entregas",
            "capacidades" => [
                /* Capacidades do módulo PLANO DE TRABALHO */
                ["11a87627-765c-8e70-5179-a4a3b4342a7a", "MOD_PTR_ENTR_EDT", "Permite editar entregas de um plano de trabalho"],
                ["91393114-4197-c56f-38ff-ca89db7a87e2", "MOD_PTR_ENTR_EXCL", "Permite excluir entregas de um plano de trabalho"],
                ["cc2af910-abcd-ca0b-e0f4-7b3865d4fcd7", "MOD_PTR_ENTR_INCL", "Permite incluir entregas de um plano de trabalho"],
            ]
        ], [
            "id" => "83720b13-e701-6ae9-f5fa-78c9633f32fe",
            "codigo"=> "MOD_PTR_CSLD", //ok
            "descricao"=> "Módulo de consolidações do Plano de Trabalho",
            "capacidades"=> [
                ["a1d1ce6d-edbb-5d4f-6e92-1729bcc470e1", "MOD_PTR_CSLD_EDT", "Permite editar a consolidação do planos de trabalho"],
                ["b0b03bc7-979f-2fd5-1476-05ef83052830", "MOD_PTR_CSLD_EXCL", "Permite excluir a consolidação do planos de trabalho"],
                ["4ad1ffee-36a5-d279-2e1a-10fd6bd88b0e", "MOD_PTR_CSLD_INCL", "Persmite incluir a consolidação do planos de trabalho"],
                ["3081460a-86f6-b473-e40c-6a26ad706cd5", "MOD_PTR_CSLD_CONCL", "Permite realizar conclusão (independete de ser o usuário da consolidação)"],
                ["5cbde15c-f4c8-c002-1d96-07a2cc7e47f1", "MOD_PTR_CSLD_DES_CONCL", "Permite desfazer conclusão (independete de ser o usuário da consolidação)"],
                ["ead5cfe9-2692-cdc2-0c82-6de685042dd4", "MOD_PTR_CSLD_CANC_AVAL", "Permite cancelar avaliação"],
                ["23f9b025-a927-022d-6144-74f6b9123782", "MOD_PTR_CSLD_AVAL", "Permite avaliar"],
                ["add5de46-1df5-5ba6-7200-061d9c5e5cae", "MOD_PTR_CSLD_REC_AVAL", "Permite recorrer da avaliação"]
            ]
        ], [
            "id" => "630fe08d-e5a4-fece-8090-bd1490024525",
            "codigo" => "MOD_PTR_CSLD_OCOR",
            "descricao" => "Módulo de Plano de Trabalho - Ocorrências",
            "capacidades" => [
                /* Capacidades do módulo PLANO DE TRABALHO */
                ["b18f6b93-9497-128b-1841-0cff7ccdb8ea", "MOD_PTR_CSLD_OCOR_EDT", "Permite editar ocorrência de um plano de trabalho"],
                ["203adc1c-7c1d-c0fd-c5bb-6c8e9e1c8fc6", "MOD_PTR_CSLD_OCOR_EXCL", "Permite excluir ocorrência de um plano de trabalho"],
                ["52fcebde-b752-1859-e30a-f263ac2af60e", "MOD_PTR_CSLD_OCOR_INCL", "Permite incluir ocorrência de um plano de trabalho"],
            ]
        ], [
            "id" => "b02fdafc-9a08-4a1c-49e1-2e1747d80a5a",
            "codigo"=> "MOD_PENT",
            "descricao"=> "Permite acesso ao menu e consultas do módulo Plano de Entregas.",
            "capacidades"=> [
                /* Capacidades do módulo PLANO DE ENTREGA */
                ["253b499f-a412-16cb-b7a2-5f3052dc3308", "MOD_PENT_INCL", "Permite incluir planos de entregas."],
                ["da694009-9859-6f87-46b8-bd5c7821cfae", "MOD_PENT_EDT", "Permite editar planos de entregas."],
                ["50464f92-e5f0-5cd7-bab4-f39487d896c8", "MOD_PENT_EXCL", "Permite excluir planos de entregas."],
                ["300c3627-2932-800f-9d08-3ae0507f5bf5", "MOD_PENT_CNC", "Permite cancelar planos de entregas."],
                ["762d1482-2c81-20ce-1aad-340d743263f3", "MOD_PENT_EDT_ATV_HOMOL", "Permite editar planos de entregas que estejam no status ATIVO. O plano voltará ao status HOMOLOGANDO."],
                ["12e73306-e858-c588-e616-76425b564721", "MOD_PENT_EDT_ATV_ATV", "Permite editar planos de entregas que estejam no status ATIVO, mantendo-os neste status."],
                ["c9727cac-9ba0-8cfb-929e-b89252874c75", "MOD_PENT_HOMOL", "Permite homologar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
                ["0e624f1d-0eab-b5db-e0f7-2bbaf8eca6e5", "MOD_PENT_CANC_HOMOL", "Permite cancelar a homologação dos planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
                ["74d4c153-eb9a-234b-089c-857f3b837d38", "MOD_PENT_AVAL", "Permite avaliar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
                ["e2ff3a30-1afc-9a42-a3b6-38d2cdce9a04", "MOD_PENT_AVAL_SUBORD", "Permite avaliar planos de entregas de todas as Unidades subordinadas à sua Unidade de lotação."],
                ["0d9e8042-0197-aa1b-6e16-cd1f5d5cf4ff", "MOD_PENT_CANC_AVAL", "Permite cancelar a avaliação dos planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
                ["82cbafe1-53eb-7bec-c9d2-5e1833907f6d", "MOD_PENT_EDT_FLH", "Permite alterar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
                ["40f3fa8f-78b1-f4d5-e934-db40579a98b4", "MOD_PENT_LIB_HOMOL", "Permite liberar para homologação planos de entregas da sua Unidade de lotação."],
                ["928dc904-c769-cc17-6e77-7639b74badf3", "MOD_PENT_RET_HOMOL", "Permite retirar de homologação planos de entregas da sua Unidade de lotação."],
                ["057f76a9-d9fd-d44c-adee-2a0561239ed2", "MOD_PENT_CONC", "Permite marcar como concluídos planos de entregas da sua Unidade de lotação."],
                ["576be5f0-acf7-8a57-aae8-936d28b067b1", "MOD_PENT_CANC_CONCL", "Permite cancelar a conclusão de planos de entregas da sua Unidade de lotação."],
                ["9fb4f582-d6a1-b095-a0a2-f53050ef7161", "MOD_PENT_SUSP", "Permite suspender planos de entregas da sua Unidade de lotação."],
                ["cd223a78-5e5d-c4d6-7702-fe236cf8e359", "MOD_PENT_RTV", "Permite reativar planos de entregas suspensos, desde que sejam da sua Unidade de lotação."],
                ["288dfcf1-6d6b-dffe-49ee-66630705a0b3", "MOD_PENT_ARQ", "Permite arquivar planos de entregas da sua Unidade de lotação."],
                ["6257e4d8-1125-13b8-941a-a8acfcc816e0", "MOD_PENT_QQR_UND", "Permite Incluir/Editar planos de entregas de qualquer Unidade, desde que possua também as respectivas MOD_PENT_INCL/MOD_PENT_EDT (independente de qualquer outra condição)."],
                /* Capacidades do módulo PLANO DE ENTREGAS - ENTREGAS */
                ["1aa1658c-4b7b-4f7c-c94e-2887059d6ef4", "MOD_PENT_ENTR_EDT", "Permite editar entregas de um plano de entregas"],
                ["bf7efa23-7cf5-bc72-c2d6-f428c4c3c490", "MOD_PENT_ENTR_EXCL", "Permite excluir entregas de um plano de entregas"],
                ["253b499f-a412-16cb-b7a2-5f3052dc3308", "MOD_PENT_ENTR_INCL", "Permite incluir entregas de um plano de entregas"],
            ],
        ], [
            "id" => "6ae23cdc-06a3-7e36-e087-8ff41db868b1",
            "codigo" => "MOD_PRGT",
            "descricao" => "Módulo de Programa de Gestão",
            "capacidades" => [
                /* Capacidades do módulo PROGRAMA DE GESTÃO */
                ["7650c59b-a0a3-70c1-ce2d-ff9b7b4f125e", "MOD_PRGT_EDT", "Permite editar programas de gestão"],
                ["f32a1841-7125-397b-6ed2-713a7c7a44e0", "MOD_PRGT_EXCL", "Permite excluir programas de gestão"],
                ["b7fc59e8-50c9-5d47-81de-8029cb8a3927", "MOD_PRGT_INCL", "Permite incluir programas de gestão"],
                ["0e77b050-35b9-a344-3e83-ad9abeea6e28", "MOD_PRGT_PART", "Participantes do programa"],
                ["12c2c11a-ac6c-60c6-1c83-294e25b88cf9", "MOD_PRGT_PART_INCL", "Permite incluir participantes do programa"],
                ["5f6a5896-330c-4870-d328-8818bb1828b0", "MOD_PRGT_PART_EDT", "Permite editar participantes do programa"],
                ["18ace489-2807-905c-2d7f-bce76760e9cc", "MOD_PRGT_PART_EXCL", "Permite excluir participantes do programa"],
            ]
        ], [
            "id" => "ca52409b-9ea2-b980-7790-e2d575f37a4f",
            "codigo" => "MOD_PROJ", //ok
            "descricao" => "Módulo de Projetos",
            "capacidades" => [
                /* Capacidades do módulo PROJETO */
                //["MOD_PROJ", "Permite acessar módulo projetos"],
                ["bef44378-fe21-a28e-0e31-043744dc8626", "MOD_PROJ_CONS", "Permite consultar projeto"], // só aqui
                ["5680c2a1-3d3a-03bb-72ca-c47be716bd4c", "MOD_PROJ_EDT", "Permite editar projeto"], //só no back
                ["7dd6e529-9595-d787-f2cd-dc15f7f6ac4c", "MOD_PROJ_EXCL", "Permite excluir projeto"], //só no back
                ["208580ea-8cfe-4541-0334-3d53f34955a6", "MOD_PROJ_INCL", "Permite incluir Projetos"],
                /* Capacidades do módulo PROJETO RECURSO*/
                ["61e513d7-fcc1-0127-f82a-d94bda31e89a", "MOD_PROJ_REC_EDT", "Permite editar projeto recurso"], //só no back
                ["6bdb9534-73ba-fcbc-2edc-769b8821584e", "MOD_PROJ_REC_EXCL", "Permite excluir projeto recurso"], //só no back
                ["dbb04baf-26b3-7c99-8694-e703271ac2ac", "MOD_PROJ_REC_INCL", "Permite incluir projeto recurso"], //só no back
                /* Capacidades do módulo PROJETO REGRA*/
                ["b4cebcfa-7101-16bf-66d7-23da70549998", "MOD_PROJ_REG_EDT", "Permite editar projeto regra"], //só no back
                ["4ac69fad-b2c7-d0f2-8bee-4bb8b03f07a7", "MOD_PROJ_REG_EXCL", "Permite excluir projeto regra"], //só no back
                ["f5ea8c69-352b-1080-c4a5-e40bedfc3fb3", "MOD_PROJ_REG_INCL", "Permite incluir projeto regra"], //só no back
            ]
        ], [
            "id" => "d4135268-8f6e-9d21-05aa-416216e85266",
            "codigo" => "MOD_TEMP",
            "descricao" => "Módulo de Templates",
            "capacidades" => [
                /* Capacidades do módulo de templates */
                ["cee628e6-5acf-3e49-5e90-bb6fd7c97bf8", "MOD_TEMP_INCL", "Permite incluir template"],
                ["8bc2bd3d-8667-5d4f-5b70-d5b85b6e7bbb", "MOD_TEMP_EDT", "Permite editar template"],
                ["aae94c9a-def9-49c9-7f54-ed489090f2cc", "MOD_TEMP_EXCL", "Permite excluir template"],
            ]
        ], [
            "id" => "52ee436c-0aea-0bbe-0fdd-758e3cb6dd1b",
            "codigo" => "MOD_TIPO_ATV",
            "descricao" => "Módulo de Tipos de Atividade",
            "capacidades" => [
                /* Capacidades do módulo TIPO ATIVIDADE*/
                //["MOD_TIPO_ATV", "Permite acessar item de menu cadastro->tipo de atividade"],
                ["231fc4f6-31f8-58c0-48e1-d0561bb82c7f", "MOD_TIPO_ATV_CONS", "Permite consultar atividade"],
                ["2d2216e1-d1fb-2e0e-b1a0-66ee46d8d420", "MOD_TIPO_ATV_EDT", "Permite editar atividades"],
                ["76c4272c-c776-22fe-1fd8-56c835cb98e8", "MOD_TIPO_ATV_EDT_PCPL", "Permite editar atividades na guia principal"],
                ["36bd1719-8ac4-27b2-757a-2dc494073179", "MOD_TIPO_ATV_EDT_PRE_DEF", "Permite editar dados guia pré-definidas"],
                ["a4f8b80b-1dcd-eec2-b52b-29c4909a21eb", "MOD_TIPO_ATV_EDT_TP_MIN", "Permite editar tempo máximo da atividade"],
                ["72f969b3-fa66-bd01-35dd-e6f1e284242a", "MOD_TIPO_ATV_EDT_UND", "Permite editar unidade associada à atividade"],
                ["7c96c5f4-7ad6-e6bb-5056-78c55d82b968", "MOD_TIPO_ATV_EDT_VAR_P", "Permite editar guia variação e produtividade"],
                ["fe4679cf-e6fd-ad9e-ccbb-2ac696696c3b", "MOD_TIPO_ATV_EXCL", "Permite excluir atividades"],
                ["ec4bd514-3887-20be-84d9-efe54a0e52a2", "MOD_TIPO_ATV_INCL", "Permite incluir atividades"],
                ["51382430-66c9-9fd5-922b-8d20650390cb", "MOD_TIPO_ATV_INCL_PRE_DEF", "Permite acessar e editar guia pré-definidas"],
                ["f974b3ae-768f-4c47-5876-100e7efe0dd4", "MOD_TIPO_ATV_INCL_TP_MIN", "Permite incluir tempo máximo da atividade"],
                ["2887c324-1da5-3680-c932-9ff5c3e35d35", "MOD_TIPO_ATV_PCPL", "Permite incluir atividades na guia principal"],
            ]
        ], [
            "id" => "95470a10-c94a-a9fb-fe32-603e282cf843",
            "codigo" => "MOD_TIPO_AVAL",
            "descricao" => "Módulo de Tipos de Avaliação",
            "capacidades" => [
                /* Capacidades do módulo TIPO AVALIACAO*/
                ["55d3bf8c-6a76-683d-f00a-6c741e901b3b", "MOD_TIPO_AVAL_EDT", "Permite editar tipos de avaliações"],
                ["d3b2c723-acd2-b1a8-d67e-51d187d0584d", "MOD_TIPO_AVAL_EXCL", "Permite excluir tipos de avaliações"],
                ["44bb1979-4571-58fa-d93b-fe04fa61691a", "MOD_TIPO_AVAL_INCL", "Permite incluir tipos de avaliações"],
            ]
        ], [
            "id" => "8391349e-5ce6-b75c-0ead-743de5f85386",
            "codigo" => "MOD_TIPO_CAP",
            "descricao" => "Módulo de Tipos de Capacidade",
            "capacidades" => [
                /* Capacidades do módulo TIPO CAPACIDADE*/
                //["MOD_TIPO_CAP", "Permite acessar configurações de capacidades de usuário"],
                ["7fe9b8ea-51ff-155b-6fd4-7dcaa397b5f7", "MOD_TIPO_CAP_CONS", "Permite consultar tipo de capacidade"],
                ["4b3fb5ac-dd4e-dedb-9082-3ecfbbb43c3c", "MOD_TIPO_CAP_EDT", "Permite editar tipo de capacidade"],
                ["7bcc05ff-db6c-4a37-3feb-acc276f0bc43", "MOD_TIPO_CAP_EXCL", "Permite excluir tipo de capacidade"],
                ["404f9e11-4083-fbdd-b67c-272edb128adf", "MOD_TIPO_CAP_INCL", "Permite incluir tipos de capacidades"],
            ]
        ], [
            "id" => "e687c79a-ad77-bd66-83af-a4ec36aa04bd",
            "codigo" => "MOD_TIPO_DOC",
            "descricao" => "Módulo de Tipos de Documentos",
            "capacidades" => [
                /* Capacidades do módulo TIPO DOCUMENTO*/
                ["ae638120-03bf-4911-ab02-f9f94e495ee6", "MOD_TIPO_DOC_EDT", "Permite editar tipos de documentos"],
                ["c64f0ca1-5128-800e-2a7a-0a963d188ce2", "MOD_TIPO_DOC_EXCL", "Permite excluir tipos de documentos"],
                ["f7727d11-36cf-13a9-9041-9b25a7aa280d", "MOD_TIPO_DOC_INCL", "Permite incluir tipos de documentos"],
            ]
        ], [
            "id" => "b2d66efb-d4d1-1003-3475-49cf504a976b",
            "codigo" => "MOD_TIPO_JUST",
            "descricao" => "Módulo de Tipos de Justificativa",
            "capacidades" => [
                /* Capacidades do módulo TIPO JUSTIFICATIVA*/
                //["MOD_TIPO_JUST", "Permite acessar item de menu cadastro->tipo de justificativa"],
                ["54cc1746-3a70-2e06-51b2-e128f59e993d", "MOD_TIPO_JUST_CONS", "Permite consultar tipos de justificativas"],
                ["01ebd07f-17f2-8b8e-f637-4885e30a6d83", "MOD_TIPO_JUST_EDT", "Permite editar tipos de justificativas"],
                ["9a31cf98-67dc-393d-bd48-a0e290266d3a", "MOD_TIPO_JUST_EXCL", "Permite excluir tipos de justificativas"],
                ["dfb039df-6e4b-c2ff-ab0f-63e68c785513", "MOD_TIPO_JUST_INCL", "Permite incluir tipos de justificativas"],
            ]
        ], [
            "id" => "dd12403a-d9ea-40a5-28b4-f40639a3dc11",
            "codigo"=> "MOD_TIPO_MDL",
            "descricao"=> "Módulo de Tipos de Modalidade",
            "capacidades"=> [
                /* Capacidades do módulo TIPO MODALIDADE*/
                ["ff31c914-c9fb-8979-d7e5-4ae672b984b1", "MOD_TIPO_MDL_EDT", "Permite editar tipos de modalidades"],
                ["2157ab8a-c9e0-f5ea-3a9a-4a73c6ff83e8", "MOD_TIPO_MDL_EXCL", "Permite excluir tipos de modalidades"],
                ["9cf4707a-8bd5-7cc7-8ab1-fda49b9feebe", "MOD_TIPO_MDL_INCL", "Permite incluir tipos de modalidades"],
            ]
        ], [
            "id" => "5fa94a47-ce02-a94e-0daf-13987972e3a9",
            "codigo" => "MOD_TIPO_MTV_AFT", //ok
            "descricao" => "Módulo de Tipos de Motivos de Afastamento",
            "capacidades" => [
                /* Capacidades do módulo TIPO MOTIVO AFASTAMENTO*/
                //["MOD_TIPO_MTV_AFT", "Permite acessar item de menu cadastro->tipo de motivo de afastamento"],
                ["cb733de6-7229-6d23-a61a-50b60fab085d", "MOD_TIPO_MTV_AFT_CONS", "Permite consultar tipos de motivos de afastamentos"],
                ["2d8b1789-1e6c-f119-bed2-5415da5caa9e", "MOD_TIPO_MTV_AFT_EDT", "Permite editar tipos de motivos de afastamentos"],
                ["1b05f4d2-014c-3c85-db9c-eb8bfcb2922f", "MOD_TIPO_MTV_AFT_EXCL", "Pemite excluir tipos de motivos de afastamentos"],
                ["0d09fd70-c1ed-f1f8-3af5-dedbccf5b410", "MOD_TIPO_MTV_AFT_INCL", "Permite incluir tipos de motivos de afastamentos"],
                ["86e5ab6d-92ce-d89d-971d-e52704ef3791", "MOD_TPMAF_INCL", "Permite incluir tipos de motivos de afastamentos"], //só definição
            ]
        ], [
            "id" => "ef18cfb1-4a6c-059b-ab07-d577410c313b",
            "codigo" => "MOD_TIPO_PROC",
            "descricao" => "Módulo de Tipos de Processos",
            "capacidades" => [
                /* Capacidades do módulo TIPO PROCESSO*/
                ["41bf2738-93e1-115b-b348-8e8765985863", "MOD_TIPO_PROC_EDT", "Permite editar tipos de processos"],
                ["51d70219-9aaa-3c48-3005-ab25aab63680", "MOD_TIPO_PROC_EXCL", "Permite excluir tipos de processos"],
                ["d86eee92-22ec-6eab-5b3e-4370054710c1", "MOD_TIPO_PROC_INCL", "Permite incluir tipos de processos"],
            ]
        ], [
            "id" => "69f29d43-f6f2-ca23-5af1-8ee721b52349",
            "codigo" => "MOD_TRF",
            "descricao" => "Módulo Tarefas",
            "capacidades" => [
                /* Capacidades do módulo TAREFAS*/
                //["MOD_TRF", "Permite acessar módulo/item de menu tarefas"],
                ["c97f09ab-deed-0564-6bb7-60cc28b6d3ac", "MOD_TRF_CONS", "Permite consultar tarefa"],
                ["28d36214-4e36-25a3-19d8-a2663544aff9", "MOD_TRF_EDT", "Permite editar tarefas"],
                ["610404b7-7b6e-20b4-7244-a8a654cd2fc3", "MOD_TRF_EXCL", "Permite excluir tarefas"],
                ["c25f4c08-9edf-19b1-0c17-b72803ae3229", "MOD_TRF_INCL", "Permite incluir tarefas"],
            ]
        ], [
            "id" => "8b95e861-9321-06b9-6928-c69aea1120fb",
            "codigo" => "MOD_TIPO_TRF",
            "descricao" => "Módulo Tipo Tarefas",
            "capacidades" => [
                /* Capacidades do módulo TIPO TAREFA*/
                ["3c051cf4-35ce-b753-4c73-1d4564e60fa3", "MOD_TIPO_TRF_EDT", "Permite editar tipos de tarefas"],
                ["481d5dda-de03-1f85-18bb-39b800a5ac0f", "MOD_TIPO_TRF_EXCL", "Permite excluir tipos de tarefas"],
                ["18f70e01-d661-4898-b92b-27e0aca5948b", "MOD_TIPO_TRF_INCL", "Permite incluir tipos de tarefas"],
            ]
        ], [
            "id" => "a511b243-e582-9707-dd24-acf689f6e425",
            "codigo"=> "MOD_UND",
            "descricao"=> "Módulo Unidades",
            "capacidades"=> [
                /* Capacidades do módulo UNIDADES*/
                ["46d9ae68-8dc8-f73b-fb65-74285f8f368d", "MOD_UND_CONS", "Permite consultar Unidades"],
                ["54c26986-5f17-20f4-e6b6-525b5db15b19", "MOD_UND_EDT", "Permite editar Unidade"],
                ["e6dbb5f7-18df-4876-6e2a-e603e46c6900", "MOD_UND_EXCL", "Permite excluir Unidade"],
                ["9c603f2d-2eda-1356-f828-518aa43226f0", "MOD_UND_INCL", "Permite incluir Unidades"],
                ["6a9bc033-f5e3-a909-dd1e-6d63d5bcdb11", "MOD_UND_UNIR", "Permite Unificar Unidades"],
                ["7fd5dc9c-7ecf-b046-3c9c-634528d8217c", "MOD_UND_TUDO", "Permite consultar qualquer unidade independente de subordinação"],
                ["a28556eb-93c1-2603-537a-cabc5d55d46c", "MOD_UND_INATV", "Permite inativar uma unidade"],
                ["072113d6-0152-0d5b-7373-c09c6c01fe57", "MOD_UND_INTG", "Permite gerenciar integrantes da unidade"],
                ["9c9cb017-86c8-5491-e8f8-f5b2bd848465", "MOD_UND_INTG_INCL", "Permite incluir integrantes da unidade"],
                ["274841c1-1842-2436-5b32-54c2eb39b893", "MOD_UND_INTG_EDT", "Permite editar integrantes da unidade"],
                ["45e8ddb3-83db-49a3-eaaa-75b125827243", "MOD_UND_INTG_EXCL", "Permite excluir integrantes da unidade"],
            ]
        ], [
            "id" => "9435f0d7-cefd-68e9-287e-e8e693d3b376",
            "codigo" => "MOD_USER", //ok
            "descricao" => "Módulo Usuários",
            "capacidades" => [
                /* Capacidades do módulo USUÁRIOS */
                ["ef0cb303-d710-3862-91c7-c005279ed8e9", "MOD_USER_EDT", "Permite alterar dados de usuário"],
                ["5b01cee0-d173-0f78-3128-8021f48e32da", "MOD_USER_EXCL", "Permite excluir dados de usuário"],
                ["1a42fd2b-a83d-80e1-e714-f63e1edf07b3", "MOD_USER_INCL", "Permite incluir usuário"],
                ["bd78e4bd-c75b-1d2c-dc02-93ee45f0df83", "MOD_USER_TUDO", "Permite consultar qualquer usuário independente de lotação"],
                ["ad8a2807-5bfe-67e0-3fde-191da1c9fbc1", "MOD_USER_ATRIB", "Permite gerenciar atribuições do usuário"],
            ]
        ], [
            "id" => "545f5b80-c305-57d2-ec01-ae25801dc0d7",
            "codigo" => "MOD_RX",
            "descricao" => "Módulo Raio-X",
            "capacidades" => [
                /* Capacidades do módulo RAIO X*/
                ["5b2cdca6-e867-1d2f-dac6-0a2c315c61af", "MOD_RX_EDT_DPE", "Permite editar dados pessoais de outro usuário"],
                ["af0de131-0895-6481-4a68-16c0b6b59ab0", "MOD_RX_EDT_DPR", "Permite editar dados profissionais de outro usuário"],
                ["eaf9f513-3710-03b0-93fa-83018f970ce5", "MOD_RX_EDT_ATR", "Permite editar atributos comportamentais de outro usuário"],
                ["591aef22-ca8a-e002-a5d9-d12903652b12", "MOD_RX_VIS_DPE", "Permite visualizar menu pessoais"],
                ["c175bee4-fcfb-eb2a-4866-df9d10ef40e0", "MOD_RX_VIS_DPR", "Permite visualizar menu dados profissionais"],
                ["44b31bf8-48e1-c594-8c6c-7fcdc0fc0daf", "MOD_RX_VIS_ATR", "Permite visualizar menu atributos comportamentais"],
                ["ecb2feb8-fb96-827e-26f6-3ec38295a5ed", "MOD_RX_VIS_OPO", "Permite visualizar menu oportunidades"],
                ["ba26072f-c0aa-1ab0-1abb-9affdc49df3b", "MOD_RX_EDT_USR", "Permite editar tudo para o usuário atual menos atributos comportamentais"],
                ["490d083c-5488-6eab-5f87-a0e33467b439", "MOD_RX_EDT_SUP", "Permite editar tudo para o usuário atual"],
                ["691d5aab-cbe3-208e-63ff-070432aaff58", "MOD_RX_EDT_OPO", "Permite editar oportunidades"],
                ["04967c7b-1fbf-f14f-6f0c-a7b11f140c9e", "MOD_RX_RES_ATR", "Permite resetar dados comportamentais"]
            ]
        ], [
            "id" => "4b448afe-b9a0-f64b-4df1-7b0515eef278",
            "codigo" => "MOD_AUDIT",
            "descricao" => "Módulo Auditoria",
            "capacidades" => [
                ["ecaca432-7631-df96-a6a3-7a94660d153a", "MOD_AUDIT_DEL", "Permite visualizar registros deletados"],
                ["984378ab-f480-22e4-ea46-6c58c1c255d8", "MOD_AUDIT_LOG", "Permite visualizar logs das tabelas"]
            ]
        ]
    ];

    private function differentDev(&$data) {
        if(!$this->isLoggedUserADeveloper()){
            if(isset($data['where']) && count($data['where']) > 0) {
                if(gettype($data['where'][0]) == "string") {
                    $data['where'] = [["not like", "DEV_%"], $data['where']];
                } else {
                    $data['where'][] = ["not like", "DEV_%"];
                }
            } else {
                $data['where'] = [["not like", "DEV_%"]];
            }
        }
    }

    public function searchText($data) {
        $this->differentDev($data);
        return parent::searchText($data);
    }

    public function query($data) {
        $this->differentDev($data);
        return parent::query($data);
    }
}
