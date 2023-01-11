<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Exceptions\LogError;
use App\Services\ServiceBase;
use App\Models\Unidade;
use App\Models\Perfil;
use App\Models\UnidadeOrigemAtividade;
use Ramsey\Uuid\Uuid;
use Carbon\Carbon;
use DateTime;
use Exception;
use Throwable;

class IntegracaoService extends ServiceBase {
    public $autoIncluir = false;
    public $unidadesInseridas = [];
    public $unidadesSelecionadas = [];
    public $unidadesAlteradas = [];
    public $filhasAlteradas = 0;
    public $paisAlterados = [];
    public $ativadas = 0;
    public $inativadas = 0;
    public $token = "";
    public $integracao_config = "";
    public $unidadeRaiz = null;
    public $codigoUnidadeRaiz = "";     // eventual alteração deve ser feita no arquivo .env
    public $validaCertificado = "";     // eventual alteração deve ser feita no arquivo .env
    public $useLocalFiles = "";         // eventual alteração deve ser feita no arquivo .env
    public $storeLocalFiles = "";       // eventual alteração deve ser feita no arquivo .env
    public $localUnidades = "";         // eventual alteração deve ser feita no arquivo .env
    public $localServidores = "";       // eventual alteração deve ser feita no arquivo .env

    function __construct($config = null) {
        ini_set('max_execution_time', 1200); /* 20 minutos */
        $this->integracao_config = $config ?: config('integracao');
        $this->autoIncluir =$this->integracao_config['auto_incluir'];
        $this->codigoUnidadeRaiz =$this->integracao_config['codigoUnidadeRaiz'];
        $this->validaCertificado =$this->integracao_config['validaCertificado'];
        $this->useLocalFiles =$this->integracao_config['useLocalFiles'];
        $this->storeLocalFiles =$this->integracao_config['storeLocalFiles'];
        $this->localUnidades =$this->integracao_config['localUnidades'];
        $this->localServidores =$this->integracao_config['localServidores'];
    }

    /** Preenche os campos de uma lotação para o novo Usuário, se sua lotação já vier definida pelo SIAPE */
    public function fillUsuarioWithSiape(&$usuario, &$lotacao) {
        $resultado = false;
        $query = DB::select("SELECT s.*, u.id AS unidade_servidor, c.uf AS unidade_uf FROM integracao_servidores s ".
            "LEFT JOIN unidades u ON (u.codigo = s.codigo_servo_exercicio) ".
            "LEFT JOIN cidades c ON (c.id = u.cidade_id) ".
            "WHERE emailfuncional = :email", [":email" => $usuario->email]);
        if($servidor = current($query)) {
            $usuario->cpf = $servidor->cpf;
            $usuario->nome = $servidor->nome;
            $usuario->telefone = $servidor->telefone;
            $usuario->matricula = $servidor->matriculasiape;
            $usuario->apelido = $servidor->nomeguerra;
            if(!empty($servidor->unidade_servidor)) {               //cria uma lotação para o novo servidor apenas se ela já estiver definida no SIAPE
                $lotacao->data_inicio = new \DateTime();
                $lotacao->unidade_id = $servidor->unidade_servidor;
                $lotacao->principal = 1;
            }
            $resultado = true;
        }
        return $resultado;
    }

    public function buscaOuInserePai($unidade, $entidade_id) {
        if (empty($unidade->pai_servo)) {
            return ["unidade_id" => null, "path" => ""];
        } else if (!empty($unidade->unidade_pai_id)) {
            return ["unidade_id" => $unidade->unidade_pai_id, "path" => $unidade->path_pai];
        } else if (!empty($this->unidadesInseridas[$unidade->pai_servo])) {
            return $this->unidadesInseridas[$unidade->pai_servo];
        } else if ($pai = current(array_filter($this->unidadesSelecionadas, fn($element) => $element->id_servo == $unidade->pai_servo))) {
            return $this->deepReplaceUnidades($pai, $entidade_id);
        }
    }

    public function insereVinculoRaiz($unidade_id) {
		if(!empty($unidade_id)) {
			$id = DB::table('unidades_origem_atividades')->insert([
                'id' => Uuid::uuid4(),
	            'unidade_id' => $unidade_id,
	            'unidade_origem_atividade_id' => $this->unidadeRaiz->id
	        ]);
            $this->atualizaLogs('unidades_origem_atividades', $id, 'ADD', ['Rotina' => 'Integração', 'Observação' => 'Criação do vínculo entre a unidade ' . $unidade_id . 'e a unidade ' . $this->unidadeRaiz]);
        }
    }

    public function verificaVinculoRaiz($unidade_id) {
        $existeVinculo = UnidadeOrigemAtividade::where([
            ['unidade_id', '=', $unidade_id],
            ['unidade_origem_atividade_id', '=', $this->unidadeRaiz->id]
        ])->first();
        if (empty($existeVinculo)) $this->insereVinculoRaiz($unidade_id);
    }

    public function deepReplaceUnidades($unidade, $entidade_id) {
        // prepara os principais atributos da Unidade
        $values = [
            ':codigo' => $unidade->id_servo,
            ':nome' => $unidade->nomeuorg,
            ':sigla' => $unidade->siglauorg,
            ':cidade_id' => $unidade->cidade_id
        ];

        if(empty($unidade->id)) { /* Só entra aqui se a Unidade ainda não existir. Nesse caso, insere a Unidade */
            if(empty($this->unidadesInseridas[$unidade->id_servo])) {       /* Insere somente se já não tiver sido inserido */
                $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade_id);
                $values[':id'] = Uuid::uuid4();
                $values[':path'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"] : "";
                $this->unidadesInseridas[$unidade->id_servo] = ["unidade_id" => $values[':id'], "path" => $values[':path']];
                try {
                    $id = DB::table('unidades')->insertGetId([
                        'id' => $values[':id'],
                        'path' => $values[':path'],
                        'codigo' => $values[':codigo'],
                        'nome' => $values[':nome'],
                        'sigla' => $values[':sigla'],
                        'cidade_id' => $values[':cidade_id'],
                        'entidade_id' => $entidade_id,
                        'unidade_id' => !empty($dados_path_pai) ? $dados_path_pai["unidade_id"] : null,
                        'notificacoes' => '{}',
                        'etiquetas' => '[]',
                        'data_inicio' => Carbon::now(),
                        'atividades_arquivamento_automatico' => 0,
                        'atividades_avaliacao_automatico' => 0,
                        'planos_prazo_comparecimento' => 10,
                        'planos_tipo_prazo_comparecimento' => 'DIAS',
                        'horario_trabalho_inicio' => '00:00',
                        'horario_trabalho_fim' => '23:59',
                        'distribuicao_forma_contagem_prazos' => 'HORAS_UTEIS',
                        'autoedicao_subordinadas' => 1,
                        'data_fim' => null,
                        'checklist' => '[]'
                    ]);
                    $this->atualizaLogs('unidades', $id, 'ADD', ['Rotina' => 'Integração', 'Observação' => 'Unidade nova inserida informada pelo SIAPE: ' . $values[':nome'], 'Valores inseridos' => DB::table('unidades')->where('id', $id)->first()]);
                } catch (Throwable $e) {
                    LogError::newWarn("Erro ao inserir Unidade", $values);
                }

                // INSERE AQUI O VINCULO COM A UNIDADE RAIZ DAS ATIVIDADES
                $this->verificaVinculoRaiz($values[':id']);
                return $this->unidadesInseridas[$unidade->id_servo];
            }
        }
        else if($unidade->pai_servo != $unidade->codigoPai) { /* Só entra aqui se a Unidade já existir e houve mudança no Pai. Nesse caso, muda o pai da unidade e atualiza Nome e Sigla */
            $values[':id'] = $unidade->id;
            // prepara apenas os atributos que precisam ser atualizados
            $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade_id);
            $values[':path'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"] : "";
            $values[':unidade_id'] = $dados_path_pai["unidade_id"];

            $sql = "UPDATE unidades SET path = :path, unidade_id = :unidade_id, codigo = :codigo, ".
                "nome = :nome, sigla = :sigla, cidade_id = :cidade_id WHERE id = :id";
            DB::update($sql, $values);                  
            $this->atualizaLogs('unidades', $values[':id'], 'EDIT', [
                'Rotina' => 'Integração', 
                'Observação' => 'A Unidade sofreu alterações na hierarquia e possivelmente em outros campos (ver: nome/codigo/sigla/path/cidade_id/unidade_id)!',
                'Valores anteriores' => ['path' => $unidade->path_antigo, 'unidade_id' => $unidade->id_pai_antigo, 'codigo' => $unidade->codigo_antigo, 'nome' => $unidade->nome_antigo, 'sigla' => $unidade->sigla_antiga, 'cidade_id' => $unidade->cidade_antiga], 
                'Valores atuais' => $values
            ]);
            array_push($this->paisAlterados, $unidade);

            // Se necessário, insere o vínculo com a Unidade Raiz das Atividades
            $this->verificaVinculoRaiz($values[':id']);

            /* Atualiza os paths dos filhos */
            $antes = $unidade->path_antigo."/".$unidade->id;
            if(DB::select("select count(*) from unidades where path = '" . $antes . "'") > 0) {
                $depois = $values[':path'] . "/" . $unidade->id;
                $like = $antes."%";

                $n = DB::update('UPDATE unidades SET path = REPLACE(path, :antes, :depois) WHERE path LIKE :like', [
                    ':antes' => $antes,
                    ':depois' => $depois,
                    ':like' => $like
                ]);
                $this->atualizaLogs('unidades', 'IDs das Unidades-filhas', 'EDIT', [
                    'Rotina' => 'Integração', 
                    'Observação' => 'Os paths de todas as unidades-filhas foram alterados, devido à alteração na unidade-pai da Unidade - ' . $values[':nome'],
                    'Path anterior das unidades filhas' => $antes, 
                    'Path atual das unidades filhas' => $depois
                ]);
                $this->filhasAlteradas += $n;
            }

            return ["unidade_id" => $values[':id'], "path" => $values[':path']];
        }
        else { /* Só entra aqui se a Unidade já existir e não tiver mudado o Pai. Nesse caso, atualiza apenas os outros dados (Nome, Sigla) */
            $values[':id'] = $unidade->id;

            $sql = "UPDATE unidades SET codigo = :codigo, nome = :nome, sigla = :sigla, cidade_id = :cidade_id WHERE id = :id";
            DB::update($sql, $values);
            $this->atualizaLogs('unidades', $values[':id'], 'EDIT', [
                'Rotina' => 'Integração', 
                'Observação' => 'A Unidade sofreu alterações em algum(ns) campos (ver: nome/codigo/sigla/cidade_id)!',
                'Valores anteriores' => ['codigo' => $unidade->codigo_antigo, 'nome' => $unidade->nome_antigo, 'sigla' => $unidade->sigla_antiga, 'cidade_id' => $unidade->cidade_antiga], 
                'Valores atuais' => ['codigo' => $values[':codigo'], ':nome' => $values[':nome'], ':sigla' => $values[':sigla'], 'cidade_id' => $values[':cidade_id']]
            ]);
            array_push($this->unidadesAlteradas, $unidade);

            // Se necessário, insere o vínculo com a Unidade Raiz das Atividades
            $this->verificaVinculoRaiz($values[':id']);

            return ["unidade_id" => $values[':id'], "path" => $unidade->path_antigo];
        }
    }

    public function getToken($config) {
        if(empty($this->token)) {
            $this->token = $config["token"];
            if(empty($this->token) && !empty($config["generate"]["url"])) {
                $response = Http::withHeaders([
                    'Authorization' => 'Basic ' . $config["generate"]["authorization"]
                ])->post($config["generate"]["url"], [
                    'grant_type' => 'password',
                    'username' => $config["generate"]['user'],
                    'password' => $config["generate"]['password']
                ]);
                if($response->ok()) {
                    $data = $response->json();
                    $this->token = $data["access_token"];
                }
            }
        }
        return $this->token;
    }

    public function sincronizar($inputs) {
        ini_set('memory_limit', '-1');
        set_time_limit(1800);
        $self = $this;
        $result = [
            'unidades' => ['Resultado' => '','Observações' => [], 'Falhas' => []], 
            'servidores' => ['Resultado' => '','Observações' => [], 'Falhas' => []], 
            'chefias' => ['Resultado' => '','Observações' => [], 'Falhas' => []]
        ];
        $token = $this->useLocalFiles ? "LOCAL" : $this->getToken($this->integracao_config);
        $entidade_id = $inputs["entidade"] ?: "";
        $xmlStream = "";
        LogError::newWarn("Sincronizar Entidade: " . $entidade_id);

        // Atualização das unidades
        if(!empty($inputs['unidades']) && $inputs['unidades'] != "false" && !empty($entidade_id)) {
            try {
                $uos = [];
                if($this->integracao_config["tipo"] == "SIAPE") {
                    $uos = $this->IntegracaoSiapeService->retornarUorgs()["uorg"];
                } else {
                    if($this->useLocalFiles) {//Se for para usar os arquivos locais, a rotina lê os dados do arquivo salvo localmente
                        $xmlStream = file_get_contents(base_path($this->localUnidades));
                    } else {        //caso contrário, a rotina vai buscar no servidor do SIGEPE
                        $url = $this->integracao_config["baseUrlunidades"];
                        $response = $this->consultarApiSigepe($token, $url);
                        $xmlStream = $response->body();
                        if($this->storeLocalFiles) {        // aqui decide se salva ou não em arquivo as informações trazidas do servidor do SIGEPE
                            if(file_exists(base_path('../' . $this->localUnidades))) unlink(base_path('../' . $this->localUnidades));
                            file_put_contents(base_path('../' . $this->localUnidades), $xmlStream);
                        }
                    }
                    $xml = simplexml_load_string($xmlStream);
                    $uos = $this->UtilService->object2array($xml)["uorg"];
                }
                /* Apaga a tabela integracao_unidades e cria novamente com as unidades ATIVAS obtidas pelo webservice */
                DB::transaction(function () use (&$uos, &$self, &$sql_log_changes) {
                    /* Remove toda a lista da tabela temporária integracao_unidades */
                    DB::delete('DELETE FROM integracao_unidades');
                    /* Itera as UOs */
                    foreach($uos as $uo) {
                        if(!empty($self->UtilService->valueOrDefault($uo["id_servo"])) && $self->UtilService->valueOrDefault($uo["ativa"]) == 'true') {
                            DB::table('integracao_unidades')->insert([
                                'id_servo' => $self->UtilService->valueOrDefault($uo["id_servo"]),
                                'pai_servo' => $self->UtilService->valueOrDefault($uo["pai_servo"]),
                                'codigo_siape' => $self->UtilService->valueOrDefault($uo["codigo_siape"]),
                                'pai_siape' => $self->UtilService->valueOrDefault($uo["pai_siape"]),
                                'codupag' => $self->UtilService->valueOrDefault($uo["codupag"]),
                                'nomeuorg' => $self->UtilService->valueOrDefault($uo["nomeuorg"]),
                                'siglauorg' => $self->UtilService->valueOrDefault($uo["siglauorg"]),
                                'telefone' => $self->UtilService->valueOrDefault($uo["telefone"]),
                                'email' => $self->UtilService->valueOrDefault($uo["email"]),
                                'natureza' => $self->UtilService->valueOrDefault($uo["natureza"]),
                                'fronteira' => $self->UtilService->valueOrDefault($uo["fronteira"]),
                                'fuso_horario' => $self->UtilService->valueOrDefault($uo["fuso_horario"]),
                                'cod_uop' => $self->UtilService->valueOrDefault($uo["cod_uop"]),
                                'cod_unidade' => $self->UtilService->valueOrDefault($uo["cod_unidade"]),
                                'tipo' => $self->UtilService->valueOrDefault($uo["tipo"]),
                                'tipo_desc' => $self->UtilService->valueOrDefault($uo["tipo_desc"]),
                                'na_rodovia' => $self->UtilService->valueOrDefault($uo["na_rodovia"]),
                                'logradouro' => $self->UtilService->valueOrDefault($uo["logradouro"]),
                                'bairro' => $self->UtilService->valueOrDefault($uo["bairro"]),
                                'cep' => $self->UtilService->valueOrDefault($uo["cep"]),
                                'ptn_ge_coordenada' => $self->UtilService->valueOrDefault($uo["ptn_ge_coordenada"]),
                                'municipio_siafi_siape' => $self->UtilService->valueOrDefault($uo["municipio_siafi_siape"]),
                                'municipio_siscom' => $self->UtilService->valueOrDefault($uo["municipio_siscom"]),
                                'municipio_ibge' => $self->UtilService->valueOrDefault($uo["municipio_ibge"]),
                                'municipio_nome' => $self->UtilService->valueOrDefault($uo["municipio_nome"]),
                                'municipio_uf' => $self->UtilService->valueOrDefault($uo["municipio_uf"]),
                                'ativa' => $self->UtilService->valueOrDefault($uo["ativa"]),
                                'regimental' => $self->UtilService->valueOrDefault($uo["regimental"]),
                                'datamodificacao' => $self->UtilService->valueOrDefault($uo["datamodificacao"]),
                                'und_nu_adicional' => $self->UtilService->valueOrDefault($uo["und_nu_adicional"]),
                                'cnpjupag' => $self->UtilService->valueOrDefault($uo["cnpjupag"])
                            ]);
                        }
                    }
                });
                $n = DB::table('integracao_unidades')->get()->count();
                $this->atualizaLogs('integracao_unidades', 'todos os registros', 'ADD', ['Observação' => 'Total de unidades importadas do SIAPE: ' . $n . ' (apenas ATIVAS)']);
                array_push($result['unidades']["Observações"], 'Total de unidades importadas do SIAPE: ' . $n . ' (apenas ATIVAS)');

                /* Insere as unidades faltantes ou atualiza dados e seus respectivos pais */
                // OBS.: Não vejo a diferença de usar :entidade_id para restringir as Unidades.
                // OBS.: Essa rotina de integração vai rodar nos diversos servidores onde estarão instaladas a aplicação... então ela tem que atualizar
                //       todas as Unidades do SIAPE, de todas as agências que usarão o sistema. O ideal é essa consulta_sql utilizar um parâmetro de
                //       identificação da entidade, presente no arquivo de configuração.
                $this->unidadesSelecionadas = [];
                $consulta_sql = "SELECT iu.id_servo, u.codigo as codigo_antigo, iu.nomeuorg, u.nome as nome_antigo, iu.siglauorg, u.sigla as sigla_antiga, iu.pai_servo, ".
                    "un.id as id_pai_antigo, u.id, u.path as path_antigo, c.id AS cidade_id, u.cidade_id as cidade_antiga, und.id AS unidade_pai_id, ".
                    "un.codigo AS codigoPai, und.path AS path_pai ".
                    "FROM integracao_unidades iu LEFT JOIN unidades u ON (iu.id_servo = u.codigo) ".
                    "LEFT JOIN unidades un ON (un.id = u.unidade_id) ".
                    "LEFT JOIN unidades und ON (iu.pai_servo = und.codigo) ". 
                    "LEFT JOIN cidades c ON (iu.municipio_ibge = c.codigo_ibge) ".
                    "WHERE (u.id is null OR iu.nomeuorg != u.nome OR iu.siglauorg != u.sigla OR iu.pai_servo != un.codigo) AND iu.ativa = 'true'";
                $this->unidadesSelecionadas = DB::select($consulta_sql);
                //OBS.: não seria interessante incluir o e-mail na tabela UNIDADES?
                DB::transaction(function () use (&$self, $entidade_id) {
                    // identifica a Unidade Raiz para cadastro de Atividades.
                    $this->unidadeRaiz = Unidade::where('codigo', $this->codigoUnidadeRaiz)->first();
                    foreach($self->unidadesSelecionadas as $unidade) {
                        $self->deepReplaceUnidades($unidade, $entidade_id);
                    }
                    /* Seta inativo nas unidades que não existem em integracao_unidades e garante que não esteja inativo as que existem em integracao_unidades */
                    $this->inativadas = DB::update("UPDATE unidades AS u SET inativo = NOW() WHERE NOT EXISTS (SELECT id FROM integracao_unidades iu WHERE iu.id_servo = u.codigo)"); 
                    $this->ativadas = DB::update("UPDATE unidades AS u SET inativo = NULL WHERE inativo IS NOT NULL AND EXISTS (SELECT id FROM integracao_unidades iu WHERE iu.id_servo = u.codigo);");
                });
                $result['unidades']['Resultado'] = 'Sucesso';
                array_push($result['unidades']['Observações'], 'Na tabela Unidades do Petrvs constam agora ' . DB::table('unidades')->get()->count() . ' unidades!');
                $result['unidades']['Observações'] = [...$result['unidades']['Observações'], ...array_filter([
                    count($this->unidadesInseridas) . count($this->unidadesInseridas) == 1 ? ' unidade nova informada pelo SIAPE foi inserida no Petrvs!' : ' unidades novas informadas pelo SIAPE foram inseridas no Petrvs!',
                    count($this->paisAlterados) . count($this->paisAlterados) == 1 ? ' unidade sofreu alteração na hierarquia e possivelmente em outros dados e foi atualizada!' : ' unidades sofreram alteração na hierarquia e possivelmente em outros dados e foram atualizadas!',
                    $this->filhasAlteradas . $this->filhasAlteradas == 1 ? ' unidade filha teve seu path alterado porque sua Unidade-pai mudou sua posição hierárquica!' : ' unidades filhas tiveram seus paths alterados porque sua Unidade-pai mudou sua posição hierárquica!',
                    count($this->unidadesAlteradas) . count($this->unidadesAlteradas) == 1 ? ' unidade manteve sua hierarquia mas sofreu alteração em outros dados e foi atualizada!' : ' unidades mantiveram sua hierarquia mas sofreram alteração em outros dados e foram atualizadas!',
                    $this->inativadas . $this->inativadas == 1 ? ' unidade do Petrvs foi INATIVADA porque não existe ou já está inativa no SIAPE!' : ' unidades do Petrvs foram INATIVADAS porque não existem ou já estão inativas no SIAPE!',
                    $this->ativadas . $this->ativadas == 1 ? ' unidade foi ATIVADA no Petrvs porque constava como inativa mas ainda está ativa no SIAPE!' : ' unidades foram ATIVADAS no Petrvs porque constavam como inativas mas ainda estão ativas no SIAPE!'
                    ], fn($o) => intval(substr($o,0,strpos($o, 'unidade')-1)) > 0)];
                /* Unidades que foram removidas em integracao_unidades vão permanecer no sistema por questões de integridade */
            } catch (Throwable $e) {
                LogError::newError("Erro ao importar unidades", $e);
                $result['unidades']['Resultado'] = 'ERRO: '. $e->getMessage();
            }
        }

        // Atualização dos servidores
        if(!empty($inputs["servidores"]) && $inputs["servidores"] != "false" && !empty($entidade_id)) {
            try {
                $servidores = [];
                if($this->integracao_config["tipo"] == "SIAPE") {
                    $servidores = $this->IntegracaoSiapeService->retornarPessoas()["Pessoas"];
                } else {
                    if($this->useLocalFiles) {
                        //$xmlStream = file_get_contents($this->localServidores);
                        $xmlStream = file_get_contents(base_path('../' . $this->localServidores));
                    } else {
                        $url = $this->integracao_config["baseUrlpessoas"];
                        $response = $this->consultarApiSigepe($token, $url);
                        $xmlStream = $response->body();
                        if($this->storeLocalFiles) {
                            if(file_exists(base_path('../' . $this->localServidores))) unlink(base_path('../' . $this->localServidores));
                            file_put_contents(base_path('../' . $this->localServidores), $xmlStream);
                        }
                    }
                    $xml = simplexml_load_string($xmlStream);
                    $servidores = $this->UtilService->object2array($xml)["Pessoa"];
                }

                //$sql = "INSERT INTO integracao_servidores(cpf_ativo, data_modificacao, cpf, nome, emailfuncional, sexo, municipio, uf, datanascimento, telefone, vinculo_ativo, matriculasiape, tipo, coduorgexercicio, coduorglotacao, codigo_servo_exercicio, nomeguerra, codsitfuncional, codupag, dataexercicionoorgao, funcoes) " .
                //       "VALUES (:cpf_ativo, :data_modificacao, :cpf, :nome, :emailfuncional, :sexo, :municipio, :uf, :datanascimento, :telefone, :vinculo_ativo, :matriculasiape, :tipo, :coduorgexercicio, :coduorglotacao, :codigo_servo_exercicio, :nomeguerra, :codsitfuncional, :codupag, :dataexercicionoorgao, :funcoes)";

                /* Insere os servidores ATIVOS obtidos pelo webservice para a tabela integracao_servidores */
                DB::transaction(function () use (&$servidores, &$self) {
                    DB::delete('DELETE FROM integracao_servidores');
                    foreach($servidores as $servidor) {
                        if(isset($servidor['matriculas']) && isset($servidor['matriculas']['dados']) &&
                            isset($servidor['cpf_ativo']) && $servidor['cpf_ativo'] == 'true') {
                            $ativo = false;

                            $dados = isset($servidor['matriculas']['dados']['vinculo_ativo']) ? [$servidor['matriculas']['dados']] : $servidor['matriculas']['dados'];

                            foreach($dados as $matricula) {
                                if(isset($matricula['vinculo_ativo']) && $matricula['vinculo_ativo'] == 'true') {
                                    $ativo = $matricula;
                                }
                            }
                            $email = $self->UtilService->valueOrDefault($servidor['emailfuncional']);
                            if($ativo && !empty($email)) {
                                $email = str_contains($email, "@") ? $email : $email . "@prf.gov.br";
                                DB::table('integracao_servidores')->insertGetId([
                                    'cpf_ativo' => $self->UtilService->valueOrDefault($servidor['cpf_ativo']),
                                    'data_modificacao' => $self->UtilService->valueOrDefault($servidor['data_modificacao']),
                                    'cpf' => $self->UtilService->valueOrDefault($servidor['cpf']),
                                    'nome' => $self->UtilService->valueOrDefault($servidor['nome']),
                                    'emailfuncional' => $email,
                                    'sexo' => $self->UtilService->valueOrDefault($servidor['sexo']),
                                    'municipio' => $self->UtilService->valueOrDefault($servidor['municipio']),
                                    'uf' => $self->UtilService->valueOrDefault($servidor['uf']),
                                    'datanascimento' => $self->UtilService->valueOrDefault($servidor['datanascimento']),
                                    'telefone' => $self->UtilService->valueOrDefault($servidor['telefone']),
                                    'vinculo_ativo' => $self->UtilService->valueOrDefault($ativo['vinculo_ativo']),
                                    'matriculasiape' => $self->UtilService->valueOrDefault($ativo['matriculasiape']),
                                    'tipo' => $self->UtilService->valueOrDefault($ativo['tipo']),
                                    'coduorgexercicio' => $self->UtilService->valueOrDefault($ativo['coduorgexercicio']),
                                    'coduorglotacao' => $self->UtilService->valueOrDefault($ativo['coduorglotacao']),
                                    'codigo_servo_exercicio' => $self->UtilService->valueOrDefault($ativo['codigo_servo_exercicio']),
                                    'nomeguerra' => $self->UtilService->valueOrDefault($ativo['nomeguerra']),
                                    'codsitfuncional' => $self->UtilService->valueOrDefault($ativo['codsitfuncional']),
                                    'codupag' => $self->UtilService->valueOrDefault($ativo['codupag']),
                                    'dataexercicionoorgao' => $self->UtilService->valueOrDefault($ativo['dataexercicionoorgao']),
                                    'funcoes' => json_encode($ativo['funcoes'])
                                ]);
                            }
                        }
                    }
                });
                $this->atualizaLogs('integracao_servidores', 'todos os registros', 'ADD', ['Observação' => 'Total de servidores importados do SIAPE: ' . DB::table('integracao_servidores')->get()->count() . ' (apenas ativos)']);

                DB::transaction(function () use (&$atualizacoes) {

                    // Seleciona todos os servidores que sofreram alteração nos seus dados pessoais.
                    $atualizacoes = DB::select(
                        "SELECT u.id, s.cpf AS cpf_servidor, u.nome AS nome_anterior, s.nome AS nome_servidor, u.apelido AS apelido_anterior, s.nomeguerra AS nome_guerra, ".
                        "u.email AS email_anterior, s.emailfuncional, u.matricula AS matricula_anterior, s.matriculasiape, u.telefone AS telefone_anterior, s.telefone FROM integracao_servidores s LEFT JOIN usuarios u ON (s.cpf = u.cpf) ".
                        "WHERE s.nome != u.nome OR s.emailfuncional != u.email OR s.matriculasiape != u.matricula OR s.nomeguerra != u.apelido OR s.telefone != u.telefone");
                    $sql_update = "UPDATE usuarios SET nome = :nome, apelido = :nomeguerra, email = :email, matricula = :matricula, telefone = :telefone WHERE id = :id";

                    // Atualiza os dados pessoais de todos os servidores ATIVOS presentes na tabela USUARIOS. ESTA ROTINA NÃO DEVE INSERIR NOVOS SERVIDORES
                    if (!empty($atualizacoes)) {
                        foreach($atualizacoes as $linha) {
                                DB::update($sql_update, [
                                    'nome'          => $linha->nome_servidor,
                                    'nomeguerra'    => $linha->nome_guerra,
                                    'email'         => $linha->emailfuncional,
                                    'matricula'     => $linha->matriculasiape,
                                    'telefone'      => $linha->telefone,
                                    'id'            => $linha->id
                                ]);
                                $this->atualizaLogs('usuarios', $linha->id, 'EDIT', [
                                    'Rotina' => 'Integração', 
                                    'Observação' => 'Servidor ATIVO que apresentou alteração em seus dados pessoais',
                                    'Valores anteriores' => [
                                                                'nome'          => $linha->nome_anterior,
                                                                'nomeguerra'    => $linha->apelido_anterior,
                                                                'email'         => $linha->email_anterior,
                                                                'matricula'     => $linha->matricula_anterior,
                                                                'telefone'      => $linha->telefone_anterior,
                                                                'id'            => $linha->id                                        
                                                            ], 
                                    'Valores atuais' => $linha
                                ]);
                        };
                    };

                    // Seleciona todas as lotações que não correspondem à Unidade Atual do servidor
                    $lotacoes_nao_atuais = DB::select(
                        "SELECT u.id AS id_usuario, l.id AS id_lotacao, l.data_fim, l.principal, s.codigo_servo_exercicio, d.sigla ".
                        "FROM usuarios u LEFT JOIN lotacoes l ON (l.usuario_id = u.id) LEFT JOIN unidades d ON (l.unidade_id = d.id) ".
                        "LEFT JOIN integracao_servidores s ON (u.cpf = s.cpf) ".
                        "WHERE d.codigo != s.codigo_servo_exercicio");//PODEM VIR TUPLAS ONDE O SERVIDOR AINDA NÃO TEM LOTAÇÃO MAS NÃO SERÃO AFETADAS PELO BLOCO FOREACH ABAIXO
                    $sql2_update = "UPDATE lotacoes SET principal = 0 WHERE id = :id_lotacao";
                    // Todas são setadas como PRINCIPAL = 0
                    if (!empty($lotacoes_nao_atuais)) {
                        foreach($lotacoes_nao_atuais as $lotacao) {
                            DB::update($sql2_update, ['id_lotacao' => $lotacao->id_lotacao]);
                            $this->atualizaLogs('lotacoes', $lotacao->id_lotacao, 'EDIT', [
                                'Rotina' => 'Integração', 
                                'Observação' => 'Esta lotação não é a lotação atual do servidor',
                                'Valores anteriores' => ['principal' => $lotacao->principal], 
                                'Valores atuais' => ['principal' => 0]
                            ]);
                        };
                    }

                    // Seleciona todos os servidores que possuem alguma lotação registrada com a Unidade Atual
                    // Podem ocorrer 2 casos: I - possuem lotação com data_fim não nula (setar com PRINCIPAL = 0), ou II - possuem com data_fim nula (ou seja, estão OK. Setar com PRINCIPAL = 1)
                    $lotacoes_atuais = DB::select(
                        "SELECT u.id AS id_usuario, l.id AS id_lotacao, l.data_fim, l.principal, s.codigo_servo_exercicio AS cod_unidade_atual, d2.id AS id_unidade_atual ".
                        "FROM usuarios u LEFT JOIN lotacoes l ON (l.usuario_id = u.id) ".
                        "LEFT JOIN unidades d1 ON (l.unidade_id = d1.id) ".
                        "LEFT JOIN integracao_servidores s ON (u.cpf = s.cpf) ".
                        "LEFT JOIN unidades d2 ON (d2.codigo = s.codigo_servo_exercicio) ".
                        "WHERE d1.codigo = d2.codigo");
                    $sql3_update = "UPDATE lotacoes SET principal = :principal WHERE id = :id_lotacao";
                    if (!empty($lotacoes_atuais)) {
                        foreach($lotacoes_atuais as $lotacao) {
                            if (!empty($lotacao->data_fim)) {
                                DB::update($sql3_update, ['id_lotacao' => $lotacao->id_lotacao, 'principal' => 0]);
                                $this->atualizaLogs('lotacoes', $lotacao->id_lotacao, 'EDIT', [
                                    'Rotina' => 'Integração', 
                                    'Observação' => 'Esta lotação corresponde à lotação atual, mas o registro não é mais válido (data-fim não-nula)',
                                    'Valores anteriores' => ['principal' => $lotacao->principal, 'data-fim' => $lotacao->data_fim], 
                                    'Valores atuais' => ['principal' => 0, 'data-fim' => $lotacao->data_fim]
                                ]);
                            } else {
                                DB::update($sql3_update, ['id_lotacao' => $lotacao->id_lotacao, 'principal' => 1]);
                                $this->atualizaLogs('lotacoes', $lotacao->id_lotacao, 'EDIT', [
                                    'Rotina' => 'Integração', 
                                    'Observação' => 'Esta lotação corresponde à lotação atual, e o registro é válido (data-fim nula)',
                                    'Valores anteriores' => ['principal' => $lotacao->principal, 'data-fim' => $lotacao->data_fim], 
                                    'Valores atuais' => ['principal' => 1, 'data-fim' => $lotacao->data_fim]
                                ]);
                            };
                        };
                    };

                    // Por fim, certifica-se de que todos os servidores ativos possuem alguma lotação com a Unidade Atual, Principal = 1 e Data_fim nula.
                    // Executada a consulta, podem surgir 2 casos: (a) usuários com unidade, mas sem lotação principal, e (b) usuários sem unidade e sem lotação principal
                    $servidores_sem_lotacoes_atualizadas = DB::select(
                        "SELECT u.id AS id_usuario, d.id AS id_unidade_atual, s.coduorgexercicio ".
                        "FROM usuarios u LEFT JOIN integracao_servidores s ON (u.cpf = s.cpf) ".
                        "LEFT JOIN unidades d ON (s.codigo_servo_exercicio = d.codigo) ".
                        "LEFT JOIN lotacoes l ON (d.id = l.unidade_id AND u.id = l.usuario_id AND l.principal = 1 AND l.data_fim is null) ".
                        //"WHERE l.id is null AND s.cpf is not null AND s.codigo_servo_exercicio is not null");
                        "WHERE l.id is null AND s.cpf is not null AND s.coduorgexercicio is not null");

                    //$sql4_insert = "INSERT INTO lotacoes(id, data_inicio, principal, unidade_id, usuario_id) VALUES (:id, Now(), 1, :unidade_id, :usuario_id)";
                    if (!empty($servidores_sem_lotacoes_atualizadas)) {
                        foreach($servidores_sem_lotacoes_atualizadas as $lotacao) {
                            if(!empty($lotacao->id_unidade_atual)) {    //(a) usuários com unidade, mas sem lotação principal
                                $id = DB::table('lotacoes')->insertGetId([
                                    'id'            => Uuid::uuid4(),
                                    'data_inicio'   => Carbon::now(),
                                    'principal'     => 1,
                                    'unidade_id'    => $lotacao->id_unidade_atual,
                                    'usuario_id'    => $lotacao->id_usuario
                                ]);
                                $this->atualizaLogs('lotacoes', $id, 'ADD', ['Rotina' => 'Integração', 'Observação' => 'Criação da lotação do servidor ' . $lotacao->id_usuario . ' e a unidade ' . $lotacao->id_unidade_atual]);
                            }else{
                                $result["falhas"] = $result["falhas"] ?? [];
                                array_push($result["falhas"], [
                                    'Observação' => "Lotação não inserida porque a Unidade não foi localizada!",
                                    'ID do usuário' => $lotacao->id_usuario,
                                    'Código SIAPE da Unidade de Lotação Atual' => $lotacao->coduorgexercicio
                                ]); // SERVIDOR NÃO TEM UMA LOTAÇÃO PRINCIPAL PORQUE SUA UNIDADE NÃO FOI LOCALIZADA
                            }
                        };
                    };

                });
                $result["servidores"] = 'Sucesso: ' . count($atualizacoes) . ' servidores tiveram dados pessoais atualizados!';
            } catch (Throwable $e) {
                LogError::newError("Erro ao importar servidores", $e);
                $result["servidores"] = 'ERRO: '. $e->getMessage();
            }
        }

        // Atualização das chefias
        // Serão atualizadas quando as rotinas de atualização das unidades e dos servidores tiverem sido atualizadas com sucesso, ou não tiverem sido atualizadas!
        if($result['unidades']['Resultado'] == 'Sucesso' && $result['servidores']['Resultado'] == 'Sucesso'){
            try {
                DB::beginTransaction();
                // seleciona o Id do usuário, a data da modificação e as funções de todos os servidores ativos trazidos do SIAPE, e que já existem na tabela Usuários
                $sql_1 = "SELECT u.id, s.funcoes FROM integracao_servidores s INNER JOIN usuarios u " . 
                         "ON s.cpf = u.cpf WHERE s.vinculo_ativo = 'true' and u.cpf is not null";
                $servidores = DB::select($sql_1);
                // filtra apenas aqueles que são gestores ou gestores substitutos
                $chefes = array_filter($servidores, fn($s) => $s->funcoes != "[]");//encontrar uma forma de juntar no sql
                $chefias = [];
                // percorre todos os gestores, montando um array com os dados da chefia (matricula do chefe, código siape da unidade, tipo de função)
                foreach($chefes as $chefe){
                    $funcoes = json_decode($chefe->funcoes);
                    if(is_array($funcoes->funcao)) {
                        // nesse caso o servidor é gestor de mais de uma unidade
                        $chefias = array_merge($chefias, array_map(fn($f) => ['id_usuario' => $chefe->id, 'codigo_siape' => $f->uorg_funcao, 'tipo_funcao' => $f->tipo_funcao], $funcoes->funcao));
                    } else {
                        // nesse caso o servidor é gestor de apenas uma unidade
                        array_push($chefias, ['id_usuario' => $chefe->id, 'codigo_siape' => $funcoes->funcao->uorg_funcao, 'tipo_funcao' => $funcoes->funcao->tipo_funcao]);
                    }
                }
                // torna nulos os campos gestor_id e gestor_substituto_id das unidades, para refazê-los com o atual array de chefias
                DB::update("UPDATE unidades SET gestor_id = null, gestor_substituto_id = null");
                $this->atualizaLogs('unidades', 'todas as unidades com gestores não nulos', 'EDIT', ['Rotina' => 'Integração', 'Observação' => 'Apagando todos os gestores antes de atualizá-los com a consulta ao SIAPE']);
                // percorre o array das chefias, inserindo na tabela de unidades os IDs dos respectivos gestores e gestores substitutos
                foreach($chefias as $chefia) {
                    // descobre o ID da Unidade
                    $sql_3 = "SELECT u.id, u.gestor_id, u.gestor_substituto_id FROM integracao_unidades iu join unidades u on iu.id_servo = u.codigo WHERE iu.codigo_siape = :codigo_siape";
                    $unidade = DB::select($sql_3, [':codigo_siape' => $chefia['codigo_siape']]);
                    // monta a consulta de acordo com o tipo de função
                    if($chefia['tipo_funcao'] == '1'){
                        $sql_4 = "UPDATE unidades SET gestor_id = :id_usuario WHERE id = :id_unidade";
                    } else if($chefia['tipo_funcao'] == '2'){
                        $sql_4 = "UPDATE unidades SET gestor_substituto_id = :id_usuario WHERE id = :id_unidade";
                    } else {
                        throw new Exception("Falha no array de funções do servidor");
                    }
                    // insere o ID do usuário na Unidade como gestor ou gestor substituto
                    DB::update($sql_4, [':id_usuario'=> $chefia['id_usuario'], ':id_unidade' => $unidade[0]->id]);
                    $this->atualizaLogs('unidades', $unidade[0]->id, 'EDIT', [
                                'Rotina' => 'Integração', 
                                'Observação' => 'Atualização do ' . $chefia['tipo_funcao'] == '1' ? 'Gestor' : 'Gestor substituto' . ' da Unidade',
                                'Valores anteriores' => ['gestor_id' => $unidade[0]->gestor_id, 'gestor_substituto_id' => $unidade[0]->gestor_substituto_id], 
                                'Valores atuais' => ['gestor_id' => $chefia['tipo_funcao'] == '1' ? $chefia['id_usuario'] : null, 'gestor_substituto_id' => $chefia['tipo_funcao'] == '2' ? $chefia['id_usuario'] : null]
                            ]);
                }
                DB::commit();
                $result['chefias']['Resultado'] = 'Sucesso';
                $result['chefias']['Observações'] = [...$result['chefias']['Observações'], ...array_filter([
                    count($chefes) . (count($chefes) == 1 ? ' gestor atualizado, ' : ' gestores atualizados, ') . count($chefias) . (count($chefias) == 1 ? ' chefia atualizada!' : ' chefias atualizadas!')
                    ], fn($o) => intval(substr($o,0,strpos($o, 'gestor')-1)) > 0)];
            } catch (Throwable $e) {
                DB::rollback();
                LogError::newError("Erro ao atualizar as chefias (titulares/substitutos)", $e);
                $result['chefias']['Resultado'] = 'ERRO: '. $e->getMessage();
            }        
        }else{
            $result["chefias"]['Resultado'] = 'As chefias não foram atualizadas porque as Unidades e/ou Servidores não o foram, ' . 
                                              'ou ainda porque houve alguma falha em suas atualizações! As chefias só são atualizadas quando as Unidades ' .
                                              'E os Servidores são atualizados e AMBOS com sucesso.';
        }
        return $result;
    }

    public function salvaUsuarioLotacaoGoogle(&$usuario, &$lotacao, $tokenData, $auth){
        $auth->fillUsuarioWithCredential($usuario, $tokenData);
        $this->salvarUsuarioLotacao($usuario, $lotacao);
    }

    public function salvaUsuarioLotacaoApi(&$usuario, &$lotacao, $tokenData, $api){
        $api->fillUsuarioWithCredential($usuario, $tokenData);
        $this->salvarUsuarioLotacao($usuario, $lotacao);
    }

    public function salvaUsuarioLotacaoDprf(&$usuario, &$lotacao, $profile, $auth){
        $auth->fillUsuarioWithProfile($usuario, $profile);
        $this->salvarUsuarioLotacao($usuario, $lotacao);
    }

    /** Cria uma lotação para o Usuário, se seus dados já existirem na tabela integracao_servidores,
     * e se ela já constar na tabela Unidades. Salva o novo usuário, independentemente da lotação
     */
    public function salvarUsuarioLotacao(&$usuario, &$lotacao){
        if ($this->fillUsuarioWithSiape($usuario, $lotacao)) { //se quem está logado existe na tabela integracao_servidores
            $perfil_nivel_5 = Perfil::where('nivel', '5')->first()->id;
            $usuario->perfil_id = $perfil_nivel_5;
            $usuario->save();
            $usuario->fresh();
            if(!empty($lotacao->unidade_id)) { // se sua Unidade estiver cadastrada, insere-se uma lotação principal pra ele
                $lotacao->usuario_id = $usuario->id;
                $lotacao->save();
            }
        } else {
            $usuario = null; // se quem está logando não existe na tabela integracao_servidores
        }
    }

    public function consultarApiSigepe($token, $url){
            $response = Http::withToken($token)->withOptions([
            'allow_redirects' => false,
            'verify' => $this->validaCertificado
            ])->get($url);
            if($response->failed()) $response->throw();
            if($response->status() >= 300 && $response->status() < 400) $response = $this->consultarApiSigepe($token, $response->header('Location'));
            return $response;
    }

    public function atualizaLogs(string $table_name, string $row_id, string $type, array $delta)
    {
        DB::connection("log")->table('changes')->insert([
            'date_time' => new DateTime(), 
            'user_id' => null, 
            'table_name' => $table_name, 
            'row_id' => $row_id, 
            'type' => $type, 
            'delta' => json_encode( $delta ?? ['Rotina' => 'Integração'])
        ]);
    }
}
/**
 *      Unidade                                                  SIAPE        cod_siape       ativa       id_servo
 *                                                               PETRVS                                   (codigo)
 *      Delegacia 01 em Nossa Senhora do Socorro/SE                             4111          sim         3414
 *      Divisão de Gestão Documental Eletrônica - DIGEDE                        4773          sim         4111
 *      Divisão de Gestão Documental Eletrônica - DIGEDE                        3954          não         3156
 *      8ª CIA PMRV/BPMRV/CPRV EM GOVERNADOR VALADARES/MG                       -             não         1213
 *      Coordenação de Inovação e Liderança                                     1213          sim         1514
 *      Núcleo de Articulação e Governança/RS                                   4574          sim         3636
 * 
 *      Servidores                                          coduorgexercicio*  coduorglotacao   cod_servo_exercicio    funcao        vinc. ativo
 *                                                          (cod_siape)        (cod_siape)      (id_servo)*            (cod_siape)     
 *      Caroline Freire                                     4773               4773             4111                   4773, 1213    sim
 *      Carlos Marian                                       4574               4574             3636                   4574          sim
 *      Ricardo Farias                                      4385               4385             3582                   -             sim
 *  */

/*                                                              
tabela: integracao_servidores               tabela: usuarios    tabela: lotacoes                    tabela: unidades       tabela: integracao_unidades
                                            id                  id_usuario  id_unidade              id                       

cpf*                                        cpf*                                                                                                                                                      codigo_siape
coduorgexercicio* (cod.siape)                                                                                              codigo_siape
coduorglotacao  (cod.siape)                                                                                                                                                                                                                          
cod_servo_exercicio (id_servo)                                                                      codigo*                id_servo*
                                                                                     

Descobrir           Eu tenho            Como Fazer
id_usuario          cpf_servidor        select id from usuarios where cpf = cpf_servidor
id_unidade          coduorgexercicio    select u.id from unidades u left join integracao_unidades iu 
                                                    on u.codigo = iu.id_servo
                                                    where iu.codigo_siape = :codurgexercicio  
                                                    
usuarios u LEFT JOIN integracao_servidores s ON (u.cpf = s.cpf) ".
    "LEFT JOIN unidades d ON (s.codigo_servo_exercicio = d.codigo) "

(usuarios us LEFT JOIN integracao_servidores se ON us.cpf = se.cpf) LEFT JOIN 
    (unidades un left join integracao_unidades iu ON un.codigo = iu.id_servo)
    ()

"LEFT JOIN lotacoes l ON (d.id = l.unidade_id AND u.id = l.usuario_id AND l.principal = 1 AND l.data_fim is null) ".




*/  

