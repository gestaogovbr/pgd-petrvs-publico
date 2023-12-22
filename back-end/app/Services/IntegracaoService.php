<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Exceptions\LogError;
use App\Services\ServiceBase;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\IntegracaoUnidade;
use App\Models\IntegracaoServidor;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;
use Carbon\Carbon;
use DateTime;
use Exception;
use Throwable;

class IntegracaoService extends ServiceBase {
    public $unidadesInseridas = [];
    public $unidadesSelecionadas = [];
    public $unidadesAlteradas = [];
    public $filhasAlteradas = 0;
    public $paisAlterados = [];
    public $ativadas = 0;
    public $inativadas = 0;
    public $token = "";
    public $result = [];
    public $logged_user_id;
    public $echo = false;
    public $integracao_config = "";
    public $unidadeRaiz = null;
    public $validaCertificado = "";     // eventual alteração deve ser feita no arquivo .env
    public $useLocalFiles = "";         // eventual alteração deve ser feita no arquivo .env
    public $storeLocalFiles = "";       // eventual alteração deve ser feita no arquivo .env
    public $localUnidades = "";         // eventual alteração deve ser feita no arquivo .env
    public $localServidores = "";       // eventual alteração deve ser feita no arquivo .env

    function __construct($config = null) {
        parent::__construct();
        ini_set('max_execution_time', 1200); /* 20 minutos */
        $this->integracao_config = $config ?: config('integracao');
        $this->validaCertificado = $this->integracao_config['validaCertificado'];
        $this->useLocalFiles = $this->integracao_config['useLocalFiles'];
        $this->storeLocalFiles = $this->integracao_config['storeLocalFiles'];
        $this->localUnidades = $this->integracao_config['localUnidades']; // "unidades.xml";
        $this->localServidores = $this->integracao_config['localServidores']; // "servidores.xml";
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
                $lotacao->unidade_id = $servidor->unidade_servidor;
                //$lotacao->principal = 1;
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

    public function deepReplaceUnidades($unidade, $entidade_id) {
        // prepara os principais atributos da Unidade
        $values = [
            ':codigo' => $unidade->id_servo,
            ':nome' => $unidade->nomeuorg,
            ':sigla' => $unidade->siglauorg,
            ':cidade_id' => $unidade->cidade_id
        ];

        if(empty($unidade->id)) { /* Só entra aqui se a Unidade ainda não existir. Nesse caso, insere a Unidade */
            $timenow = now();
            if(empty($this->unidadesInseridas[$unidade->id_servo])) {       /* Insere somente se já não tiver sido inserido */
                $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade_id);
                $values[':id'] = Uuid::uuid4();
                $values[':path'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"] : "";
                $values[':data_modificacao'] = $this->UtilService->asDateTime($unidade->data_modificacao_siape);
                $this->unidadesInseridas[$unidade->id_servo] = ["unidade_id" => $values[':id'], "path" => $values[':path']];
                try {
                    $id = Unidade::insertGetId([
                        'id' => $values[':id'],
                        'path' => $values[':path'],
                        'codigo' => $values[':codigo'],
                        'nome' => $values[':nome'],
                        'sigla' => $values[':sigla'],
                        'cidade_id' => $values[':cidade_id'],
                        'entidade_id' => $entidade_id,
                        'unidade_pai_id' => !empty($dados_path_pai) ? $dados_path_pai["unidade_id"] : null, // Corrigido - 09/08/2023 21h48
                        'notificacoes' => '{}',
                        'etiquetas' => '[]',
                        'atividades_arquivamento_automatico' => 0,
                        'atividades_avaliacao_automatico' => 0,
                        'planos_prazo_comparecimento' => 10,
                        'planos_tipo_prazo_comparecimento' => 'DIAS',
                        'distribuicao_forma_contagem_prazos' => 'HORAS_UTEIS',
                        'autoedicao_subordinadas' => 1,
                        'checklist' => '[]',
                        'created_at' => $timenow,
                        'updated_at' => $timenow,
                        'data_modificacao' => $values[':data_modificacao'],
                    ]);
                    $this->atualizaLogs($this->logged_user_id, 'unidades', $id, 'ADD', ['Rotina' => 'Integração', 'Observação' => 'Unidade nova inserida informada pelo SIAPE: ' . $values[':nome'], 'Valores inseridos' => DB::table('unidades')->where('id', $id)->first()]);
                } catch (Throwable $e) {
                    LogError::newWarn("Erro ao inserir Unidade", $values);
                }
                return $this->unidadesInseridas[$unidade->id_servo];
            }
        }
        /* Só entra aqui se a Unidade já existir e houve mudança no Pai. Nesse caso, muda o pai da unidade e atualiza Nome e Sigla */
        else if( ($unidade->pai_servo != $unidade->codigoPai) && ($unidade->id != $unidade->id_pai_antigo) ){
            $values[':id'] = $unidade->id;
            // prepara apenas os atributos que precisam ser atualizados
            $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade_id);
            $values[':path'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"] : "";
            $values[':unidade_id'] = $dados_path_pai["unidade_id"];
            $values[':data_modificacao'] = $this->UtilService->asDateTime($unidade->data_modificacao_siape);

            $sql = "UPDATE unidades SET path = :path, unidade_pai_id = :unidade_id, codigo = :codigo, ".
                "nome = :nome, sigla = :sigla, cidade_id = :cidade_id, data_modificacao = :data_modificacao WHERE id = :id";
            DB::update($sql, $values);
            $this->atualizaLogs($this->logged_user_id, 'unidades', $values[':id'], 'EDIT', [
                'Rotina' => 'Integração',
                'Observação' => 'A Unidade sofreu alterações na hierarquia e possivelmente em outros campos (ver: nome/codigo/sigla/path/cidade_id/unidade_id)!',
                'Valores anteriores' => ['path' => $unidade->path_antigo, 'unidade_id' => $unidade->id_pai_antigo, 'codigo' => $unidade->codigo_antigo, 'nome' => $unidade->nome_antigo, 'sigla' => $unidade->sigla_antiga, 'cidade_id' => $unidade->cidade_antiga],
                'Valores atuais' => $values
            ]);

            array_push($this->paisAlterados, $unidade);

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
                /* $this->atualizaLogs($this->logged_user_id, 'unidades', 'IDs das Unidades-filhas', 'EDIT', [
                    'Rotina' => 'Integração',
                    'Observação' => 'Os paths de todas as unidades-filhas foram alterados, devido à alteração na unidade-pai da Unidade - ' . $values[':nome'],
                    'Path anterior das unidades filhas' => $antes,
                    'Path atual das unidades filhas' => $depois
                ]); */
                $this->filhasAlteradas += $n;
            }
            return ["unidade_id" => $values[':id'], "path" => $values[':path']];
        }
        else { /* Só entra aqui se a Unidade já existir e não tiver mudado o Pai. Nesse caso, atualiza apenas os outros dados (Nome, Sigla) */
            $values[':id'] = $unidade->id;
            $values[':data_modificacao'] = $this->UtilService->asDateTime($unidade->data_modificacao_siape);

            $sql = "UPDATE unidades SET codigo = :codigo, nome = :nome, sigla = :sigla, cidade_id = :cidade_id,  data_modificacao = :data_modificacao WHERE id = :id";
            DB::update($sql, $values);
            /* $this->atualizaLogs($this->logged_user_id, 'unidades', $values[':id'], 'EDIT', [
                'Rotina' => 'Integração',
                'Observação' => 'A Unidade sofreu alterações em algum(ns) campos (ver: nome/codigo/sigla/cidade_id)!',
                'Valores anteriores' => ['codigo' => $unidade->codigo_antigo, 'nome' => $unidade->nome_antigo, 'sigla' => $unidade->sigla_antiga, 'cidade_id' => $unidade->cidade_antiga],
                'Valores atuais' => ['codigo' => $values[':codigo'], ':nome' => $values[':nome'], ':sigla' => $values[':sigla'], 'cidade_id' => $values[':cidade_id']]
            ]); */
            array_push($this->unidadesAlteradas, $unidade);

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

    /**
     * Método usado quando a rotina de Integração é chamada de dentro do Petrvs, pelo grid de Integrações
     */
    public function sincronizarPetrvs($data,$usuario_id,$request) {
        $dados = $data['entity'];
        $this->logged_user_id = Auth::user() ? Auth::user()->id : null;
        $this->useLocalFiles = config('app')['env'] == 'local' ? $dados['usar_arquivos_locais'] : false;
        $this->storeLocalFiles = config('app')['env'] == 'local' ? $dados['gravar_arquivos_locais'] : false;
        $inputs['entidade'] = $dados['entidade_id'];
        $inputs['unidades'] = $dados['atualizar_unidades'];
        $inputs['servidores'] = $dados['atualizar_servidores'];
        $inputs['gestores'] = $dados['atualizar_gestores'];
        $dados['usar_arquivos_locais'] = $this->useLocalFiles;              // atualiza esse parâmetro para que seja salvo no banco corretamente
        $dados['gravar_arquivos_locais'] = $this->storeLocalFiles;          // atualiza esse parâmetro para que seja salvo no banco corretamente
        $this->sincronizacao($inputs);
        $unidadeLogin = Auth::user()->areasTrabalho[0]->unidade;
        return $this->store(array_merge($dados, ['usuario_id' => $usuario_id,'data_execucao' => $this->unidadeService->hora($unidadeLogin->id),'resultado' => json_encode($this->result)]), null);
    }

    /**
     * Método usado quando a rotina de Integração é chamada direto na linha de comando:
     * curl -G 'http://localhost/api/integracao' -d servidores=true -d unidades=true -d entidade=? -H 'X-ENTIDADE: MGI'
     */
    public function sincronizar($inputs){
        $inputs['entidade_id'] = $inputs['entidade'];
        $this->echo = true;

        // Validação manual de dados passados na requisição de integração;
        if(!empty($inputs['unidades'])){
          $inputs['unidades'] = strtolower(trim($inputs['unidades']));
          $inputs['unidades'] = ($inputs['unidades'] == 'true' or $inputs['unidades'] == '1') ? boolval(1) : boolval(0);
        } else {
          $inputs['unidades'] = boolval(0);
        };

        if(!empty($inputs['servidores'])){
          $inputs['servidores'] = strtolower(trim($inputs['servidores']));
          $inputs['servidores'] = ($inputs['servidores'] == 'true' or $inputs['servidores'] == '1') ? boolval(1) : boolval(0);
        } else {
          $inputs['servidores'] = boolval(0);
        };

        $this->sincronizacao($inputs);

        return $this->store([
                'entidade_id' => $inputs['entidade'],
                'atualizar_unidades' => $inputs['unidades'] == "false" ? false : true,
                'atualizar_servidores' => $inputs['servidores'] == "false" ? false : true,
                'atualizar_gestores' => true,
                'usar_arquivos_locais' => $this->useLocalFiles,
                'gravar_arquivos_locais' => $this->storeLocalFiles,
                'usuario_id' => null,//"0",
                'data_execucao' => Carbon::now(),
                'resultado' => json_encode($this->result, JSON_UNESCAPED_UNICODE)
        ], null)->resultado;
    }

    public function sincronizacao($inputs) {
        ob_start(); // Inicia o buffer de saída.
        ob_implicit_flush(true); // Libera a chamada explícita para o output buffer.
        ini_set('memory_limit', '-1');
        ini_set('default_socket_timeout', 300); // 5 minutos.
        set_time_limit(1800);
        $self = $this;
        $this->result = [
            'unidades' => ['Resultado' => 'Não foi executado!','Observações' => [], 'Falhas' => []],
            'servidores' => ['Resultado' => 'Não foi executado!','Observações' => [], 'Falhas' => []],
            'gestores' => ['Resultado' => '','Observações' => [], 'Falhas' => []]
        ];
        $token = $this->useLocalFiles ? "LOCAL" : $this->getToken($this->integracao_config);
        $entidade_id = $inputs["entidade"] ?: "";
        $xmlStream = "";
        LogError::newWarn("Sincronizar Entidade: " . $entidade_id);

        // Atualização das unidades.
        if(!empty($inputs['unidades']) && $inputs['unidades'] && !empty($entidade_id)) {
            try {
                $uos = [];
                if($this->integracao_config["tipo"] == "SIAPE") {
                    $uos = $this->IntegracaoSiapeService->retornarUorgs()["uorg"];
                } else {
                    if($this->useLocalFiles) { // Se for para usar os arquivos locais, a rotina lê os dados do arquivo salvo localmente.
                        // Ajuste na forma antiga
                            // $xmlStream = utf8_encode(file_get_contents(base_path($this->localUnidades)));
                        // Ajuste na forma nova.
                        $xmlStream = mb_convert_encoding(file_get_contents(base_path($this->localUnidades)), 'UTF-8', 'ISO-8859-1' );
                    } else { // Caso contrário, a rotina vai buscar no servidor do SIGEPE.
                        $url = $this->integracao_config["baseUrlunidades"];
                        $response = $this->consultarApiSigepe($token, $url);
                        $xmlStream = $response->body();
                        if($this->storeLocalFiles) { // Aqui decide se salva ou não em arquivo as informações trazidas do servidor do SIGEPE.
                            if(file_exists(base_path($this->localUnidades))) unlink(base_path($this->localUnidades));
                            file_put_contents(base_path($this->localUnidades), $xmlStream);
                        }
                    }
                    $xml = simplexml_load_string($xmlStream);
                    $uos = $this->UtilService->object2array($xml)["uorg"];
                }
                if($this->echo) $this->imprimeNoTerminal("Concluída a fase de obtenção dos dados das unidades informados pelo SIAPE!.....");

                // Resumo: Apaga conteúdo da tabela integracao_unidades e
                // busca novo conteúdo com as unidades ATIVAS obtidas do Web Service

                DB::transaction(function () use (&$uos, &$self) {
                    // DB::table('integracao_unidades')->delete();
                    // Iteração com lista de uorg's
                    foreach($uos as $uo) {
                        $uorg_codigo = $self->UtilService->valueOrDefault($uo["id_servo"]);
                        $uorg_ativa = $self->UtilService->valueOrDefault($uo["ativa"]) == 'true';

                        $query_iu = DB::table('integracao_unidades')->where('id_servo', $uorg_codigo);
                        $query_u = DB::table('unidades')->where('codigo', $uorg_codigo);

                        $uorg_siape_data_modificacao = $self->UtilService->asTimeStamp($self->UtilService->valueOrDefault($uo["data_modificacao"]));
                        $iu_data_modificacao = $self->UtilService->asTimeStamp($self->UtilService->valueOrDefault($query_iu->value('data_modificacao')));
                        $u_data_modificacao = $self->UtilService->asTimeStamp($self->UtilService->valueOrDefault($query_u->value('data_modificacao')));

                        if(!empty($uorg_codigo) && $uorg_ativa) {
                            // Tratar dados. Tentando melhorar um pouco...
                            $tel = $self->UtilService->valueOrDefault($uo["telefone"], null);
                            if(!is_null($tel) && strlen($tel) == 19 &&
                                substr($tel,0,3) == '000' &&
                                substr($tel,14,5) == '00000'){
                                $tel = substr($tel,3,2) . substr($tel,6,8);
                            }

                            $sigla = $self->UtilService->valueOrDefault($uo["siglauorg"], null);
                            if(!is_null($sigla)){
                                $sigla = mb_strtoupper(trim($sigla), 'UTF-8');
                            }

                            $email = $self->UtilService->valueOrDefault($uo["email"], null);
                            if(!is_null($email)){
                                $email = mb_strtolower(trim($email), 'UTF-8');
                            }

                            $cod_municipio_ibge = $self->UtilService->valueOrDefault($uo["municipio_ibge"], null);
                            $municipio_nome = $self->UtilService->valueOrDefault($uo["municipio_nome"], null);
                            if(!is_null($cod_municipio_ibge)){
                                $query = "SELECT nome FROM cidades where codigo_ibge = :cod_municipio_ibge";
                                $db_result = DB::select($query, ["cod_municipio_ibge" => $cod_municipio_ibge]);
                                if(is_array($db_result)) $municipio_nome = $db_result[0]->nome;
                            }

                            // Formata nome da unidade organizacional
                            $nomeuorg = $self->UtilService->valueOrDefault($uo["nomeuorg"], null);
                            if(!is_null($nomeuorg)) $nomeuorg = $self->UtilService->getNomeFormatado($nomeuorg);

                            $unidade = [
                                'id_servo' => $self->UtilService->valueOrDefault($uo["id_servo"], null, $option = "uorg"),
                                'pai_servo' => $self->UtilService->valueOrDefault($uo["pai_servo"], null, $option = "uorg"),
                                'codigo_siape' => $self->UtilService->valueOrDefault($uo["codigo_siape"], null, $option = "uorg"),
                                'pai_siape' => $self->UtilService->valueOrDefault($uo["pai_siape"], null, $option = "uorg"),
                                'codupag' => $self->UtilService->valueOrDefault($uo["codupag"], null, $option = "uorg"),
                                'nomeuorg' => $nomeuorg,
                                'siglauorg' => $sigla,
                                'telefone' => $tel,
                                'email' =>  $email,
                                'natureza' => $self->UtilService->valueOrDefault($uo["natureza"], null),
                                'fronteira' => $self->UtilService->valueOrDefault($uo["fronteira"], null),
                                'fuso_horario' => $self->UtilService->valueOrDefault($uo["fuso_horario"], null),
                                'cod_uop' => $self->UtilService->valueOrDefault($uo["cod_uop"], null, $option = "uorg"),
                                'cod_unidade' => $self->UtilService->valueOrDefault($uo["cod_unidade"], null, $option = "uorg"),
                                'tipo' => $self->UtilService->valueOrDefault($uo["tipo"], null),
                                'tipo_desc' => $self->UtilService->valueOrDefault($uo["tipo_desc"], null),
                                'na_rodovia' => $self->UtilService->valueOrDefault($uo["na_rodovia"], null),
                                'logradouro' => $self->UtilService->valueOrDefault($uo["logradouro"], null),
                                'bairro' => $self->UtilService->valueOrDefault($uo["bairro"], null),
                                'cep' => $self->UtilService->valueOrDefault($uo["cep"], null),
                                'ptn_ge_coordenada' => $self->UtilService->valueOrDefault($uo["ptn_ge_coordenada"], null),
                                'municipio_siafi_siape' => $self->UtilService->valueOrDefault($uo["municipio_siafi_siape"], null),
                                'municipio_siscom' => $self->UtilService->valueOrDefault($uo["municipio_siscom"], null),
                                'municipio_ibge' => $cod_municipio_ibge,
                                'municipio_nome' => $municipio_nome,
                                'municipio_uf' => $self->UtilService->valueOrDefault($uo["municipio_uf"], null),
                                'ativa' => $self->UtilService->valueOrDefault($uo["ativa"]),
                                'regimental' => $self->UtilService->valueOrDefault($uo["regimental"], null),
                                'data_modificacao' => $self->UtilService->valueOrDefault($uo["data_modificacao"], null),
                                'und_nu_adicional' => $self->UtilService->valueOrDefault($uo["und_nu_adicional"], null),
                                'cnpjupag' => $self->UtilService->valueOrDefault($uo["cnpjupag"], null),
                                'deleted_at' => null,
                            ];

                            if(empty($query_iu->value('id_servo'))){
                                $registro = new IntegracaoUnidade($unidade);
                                $registro->save();
                            } else if((!empty($query_iu->value('id_servo'))  &&  ($uorg_siape_data_modificacao > $iu_data_modificacao || $uorg_siape_data_modificacao > $u_data_modificacao)) ||
                                (!empty($query_iu->value('id_servo')) && $query_iu->value('deleted_at'))){
                                    // Atualiza informações de unidade que já existe na tabela integracao_unidades ou remove dados de soft_delete da tabela integracao_unidade.
                                    $query_iu->update($unidade);
                                }
                            }
                        }
                });


                /*
                    Finalidade: Remover uorgs que não existem mais no SIAPE, mas ainda constam na tabela integracao_unidades.
                    Como? Através de sofdelete, as unidades que não existem mais no SIAPE serão desativadas.
                */
                $unidades_siape =  array_map(function ($uorg) { return $uorg['id_servo']; }, $uos);
                $unidades_integracao = DB::table("integracao_unidades")->get('id_servo')->values('id_servo')->toArray();
                $unidades_integracao = array_map(function ($uorg) { return $uorg->id_servo; }, $unidades_integracao);
                $unidades_integracao_remover = array_diff($unidades_integracao, $unidades_siape);
                $datahora_remocao = Carbon::now();
                $unidades_integracao_remover ? DB::table('integracao_unidades')->wherein('id_servo', $unidades_integracao_remover)->update(['deleted_at' => $datahora_remocao]) : true;
                //

                if($this->echo) $this->imprimeNoTerminal("Concluída a fase de reconstrução da tabela integracao_unidades!.....");
                $n = IntegracaoUnidade::count();
                $this->atualizaLogs($this->logged_user_id, 'integracao_unidades', 'todos os registros', 'ADD', ['Observação' => 'Total de unidades importadas do SIAPE: ' . $n . ' (apenas ATIVAS)']);
                array_push($this->result['unidades']["Observações"], 'Total de unidades importadas do SIAPE: ' . $n . ' (apenas ATIVAS)');
                array_push($this->result['unidades']['Observações'], 'Os dados das Unidades foram obtidos ' . ($this->useLocalFiles ? 'através de arquivo XML armazenado localmente!' : 'através de consulta à API do SIAPE!'));


                /* Insere as unidades faltantes ou atualiza dados e seus respectivos pais */
                // OBS.: Não vejo a diferença de usar :entidade_id para restringir as Unidades.
                // OBS.: Essa rotina de integração vai rodar nos diversos servidores onde estarão instaladas a aplicação... então ela tem que atualizar
                //       todas as Unidades do SIAPE, de todas as agências que usarão o sistema. O ideal é essa consulta_sql utilizar um parâmetro de
                //       identificação da entidade, presente no arquivo de configuração.

                $this->unidadesSelecionadas = [];

                $consulta_sql = "".
                    "SELECT iu.id_servo, u.codigo as codigo_antigo, " .
                    "iu.nomeuorg, u.nome as nome_antigo, iu.siglauorg, " .
                    "u.sigla as sigla_antiga, iu.pai_servo, " .
                    "un.id as id_pai_antigo, u.id, u.path as path_antigo, " .
                    "c.id AS cidade_id, u.cidade_id as cidade_antiga, " .
                    "und.id AS unidade_pai_id, un.codigo AS codigoPai, " .
                    "und.path AS path_pai, " .
                    "iu.data_modificacao as data_modificacao_siape, " .
                    "u.data_modificacao as data_modificacao_und " .
                    "" .
                    "FROM integracao_unidades iu " .
                    "" .
                    "LEFT JOIN unidades u ON (iu.id_servo = u.codigo) " .
                    "LEFT JOIN unidades un ON (un.id = u.id) ".
                    "LEFT JOIN unidades und ON (iu.pai_servo = und.codigo) " .
                    "LEFT JOIN cidades c ON (iu.municipio_ibge = c.codigo_ibge) " .
                    "" .
                    "WHERE (u.id is null OR iu.nomeuorg != u.nome " .
                    "OR iu.siglauorg != u.sigla " .
                    "OR iu.pai_servo != " .
                    "(SELECT codigo as cod_unidade_pai FROM unidades u2 " .
                    "WHERE id = u.unidade_pai_id)" .
                    ") AND iu.ativa = 'true' AND iu.deleted_at is NULL";

                $this->unidadesSelecionadas = DB::select($consulta_sql);

                // Executa atualizações das unidades caso necessário.
                if(!empty($this->unidadesSelecionadas)){
                    DB::transaction(function () use (&$self, $entidade_id) {
                        foreach($self->unidadesSelecionadas as $unidade) {
                          $db_result = $self->deepReplaceUnidades($unidade, $entidade_id);
                        }
                    });
                }

                # (RN_UND_E) Quando utilizando integração com o SIAPE, as unidades serão inativadas quando não constarem na lista de unidades vindas do SIAPE, exceto as que se enquadrarem na regra RN_UND_F.
                # (RN_UND_F) Unidades cadastradas (com código vazio) devem permanecer ATIVO mesmo após a execução da rotina de integração com o SIAPE.

                // *** Comentários originários ***
                // Seta inativo nas unidades que não existem em integracao_unidades e garante que não esteja inativo as que existem em integracao_unidades.
                // Agora, essa desativação é baseada no soft delete. As unidades permanecem na tabela integracao_unidades, porém com parâmetro deleted_at configurado.

                $db_result_desativadas = $this->inativadas = DB::update("UPDATE unidades AS u SET data_inativacao = NOW() WHERE data_inativacao IS NULL AND u.codigo IS NOT NULL and u.codigo != '' AND EXISTS (SELECT id FROM integracao_unidades iu WHERE iu.id_servo = u.codigo AND iu.deleted_at IS NOT NULL)");
                $db_result_ativadas = $this->ativadas = DB::update("UPDATE unidades AS u SET data_inativacao = NULL WHERE data_inativacao IS NOT NULL AND EXISTS (SELECT id FROM integracao_unidades iu WHERE iu.id_servo = u.codigo AND iu.deleted_at IS NULL);");

                $this->result['unidades']['Resultado'] = 'Sucesso';
                array_push($this->result['unidades']['Observações'], 'Na tabela Unidades do Petrvs constam agora ' . DB::table('unidades')->get()->count() . ' unidades!');
                $this->result['unidades']['Observações'] = [...$this->result['unidades']['Observações'], ...array_filter([
                    count($this->unidadesInseridas) . (count($this->unidadesInseridas) == 1 ? ' unidade nova informada pelo SIAPE foi inserida no Petrvs!' : ' unidades novas informadas pelo SIAPE foram inseridas no Petrvs!'),
                    count($this->paisAlterados) . (count($this->paisAlterados) == 1 ? ' unidade sofreu alteração na hierarquia e possivelmente em outros dados e foi atualizada!' : ' unidades sofreram alteração na hierarquia e possivelmente em outros dados e foram atualizadas!'),
                    $this->filhasAlteradas . ($this->filhasAlteradas == 1 ? ' unidade filha teve seu path alterado porque sua Unidade-pai mudou sua posição hierárquica!' : ' unidades filhas tiveram seus paths alterados porque sua Unidade-pai mudou sua posição hierárquica!'),
                    count($this->unidadesAlteradas) . (count($this->unidadesAlteradas) == 1 ? ' unidade manteve sua hierarquia mas sofreu alteração em outros dados e foi atualizada!' : ' unidades mantiveram sua hierarquia mas sofreram alteração em outros dados e foram atualizadas!'),
                    $this->inativadas . ($this->inativadas == 1 ? ' unidade do Petrvs foi INATIVADA porque não existe ou já está inativa no SIAPE!' : ' unidades do Petrvs foram INATIVADAS porque não existem ou já estão inativas no SIAPE!'),
                    $this->ativadas . ($this->ativadas == 1 ? ' unidade foi ATIVADA no Petrvs porque constava como inativa mas ainda está ativa no SIAPE!' : ' unidades foram ATIVADAS no Petrvs porque constavam como inativas mas ainda estão ativas no SIAPE!')
                    ], fn($o) => intval(substr($o,0,strpos($o, 'unidade')-1)) > 0)];
                // Unidades que foram removidas em integracao_unidades vão permanecer no sistema por questões de integridade.
            } catch (Throwable $e) {
                LogError::newError("Erro ao importar unidades", $e);
                $this->result['unidades']['Resultado'] = 'ERRO: '. $e->getMessage();
            }
        }
        if($this->echo) $this->imprimeNoTerminal("Concluída a fase de atualização da tabela unidades ou opção não selecionada!.....");

        // Atualização dos servidores
        // Interação inicial na tabela integracao_servidores
        if(!empty($inputs["servidores"]) && $inputs["servidores"] && !empty($entidade_id)) {
            try {
                $servidores = [];
                if($this->integracao_config["tipo"] == "SIAPE") {
                    $servidores = $this->IntegracaoSiapeService->retornarPessoas()["Pessoas"];
                } else {
                    if($this->useLocalFiles) {
                        // Ajuste na forma antiga
                            // $xmlStream = utf8_encode(file_get_contents(base_path($this->localServidores)));
                        // Ajuste na forma nova.
                        $xmlStream = mb_convert_encoding(file_get_contents(base_path($this->localServidores)), 'UTF-8', 'ISO-8859-1' );
                    } else {
                        $url = $this->integracao_config["baseUrlpessoas"];
                        $response = $this->consultarApiSigepe($token, $url);
                        $xmlStream = $response->body();
                        if($this->storeLocalFiles) {
                            if(file_exists(base_path($this->localServidores))) unlink(base_path($this->localServidores));
                            file_put_contents(base_path($this->localServidores), $xmlStream);
                        }
                    }
                    $xml = simplexml_load_string($xmlStream);
                    $servidores = $this->UtilService->object2array($xml)["Pessoa"];
                }
                if($this->echo) $this->imprimeNoTerminal("Concluída a fase de obtenção dos dados dos servidores informados pelo SIAPE.....");

                // Reseta tabela integracao_servidores e faz nova leitura do Web Service.

                // Usada para verificar email's duplicados,
                $emails_integracao_na_memoria = [];
                // Usado para detalhar no final da integração,
                $cpfs_emails_funcionais_vazios = [];
                $emails_funcionais_duplicados = [];

                DB::transaction(function () use (&$servidores,
                        &$self, &$emails_integracao_na_memoria,
                        &$cpfs_emails_funcionais_vazios,
                        &$emails_funcionais_duplicados) {

                    //DB::table('integracao_servidores')->delete();

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

                            // Email funcional. Caso não exista, adequa.
                            $email = $self->UtilService->valueOrDefault($servidor['emailfuncional'], $servidor['cpf'] . "@petrvs.gov.br");

                            if($ativo && !empty($email)) {
                                // Tratamento de e-mail.
                                $email = str_contains($email, "@") ? $email : $email . "@prf.gov.br";
                                $email = mb_strtolower($email, 'UTF-8');

                                // Trata nomedeguerra
                                // Caso não exista variável (SIAPE WEB SERVICE não tem)
                                // pega primeiro nome e vai.
                                if(!empty($ativo['nomeguerra'])) {
                                    $nomeguerra = $ativo['nomeguerra'];
                                } else {
                                    $nomeguerra = $self->UtilService->getApelido($servidor['nome']);
                                }

                                // Trata $ativo['funcoes'] para registro na integracao_servidores
                                // e posteriores consultas aos códigos de função/unidade.
                                if(is_array($ativo['funcoes']) && !empty($ativo['funcoes'])){
                                    foreach($ativo['funcoes'] as &$at){
                                        if (array_key_exists('uorg_funcao', $at)){
                                            $at['uorg_funcao'] = strval(intval($at['uorg_funcao']));
                                        }
                                    }
                                    $ativo['funcoes'] = json_encode(($ativo['funcoes']));
                                } else{
                                    $ativo['funcoes'] = null;
                                }

                                // Transforma código da situação funcional em descrição
                                $situacao_funcional = $self->UtilService
                                    ->valueOrDefault($ativo['codsitfuncional'],
                                          "DESCONHECIDO", $option = "situacao_funcional");

                                // Formata nome dos servidores
                                $nome = $self->UtilService->valueOrDefault($servidor['nome'], null);
                                if(!is_null($nome)) $nome = $self->UtilService->getNomeFormatado($nome);

                                // Trata campo sexo. Model aguarda MASCULINO ou FEMININO.
                                if($servidor['sexo'] == 'M' || $servidor['sexo'] == 'm'){
                                    $servidor['sexo'] = 'MASCULINO';
                                };
                                if($servidor['sexo'] == 'F' || $servidor['sexo'] == 'f'){
                                  $servidor['sexo'] = 'FEMININO';
                                };
                                if(empty($servidor['sexo']) || is_null($servidor['sexo'])){
                                    $servidor['sexo'] = 'MASCULINO';
                                }

                                $servidor = [
                                    'id' => Uuid::uuid4(),
                                    'cpf_ativo' => $self->UtilService->valueOrDefault($servidor['cpf_ativo']),
                                    'data_modificacao' => $self->UtilService->valueOrDefault($servidor['data_modificacao'], null),
                                    'cpf' => $self->UtilService->valueOrDefault($servidor['cpf'], null),
                                    'nome' => $nome,
                                    'emailfuncional' => $email,
                                    'sexo' => $self->UtilService->valueOrDefault($servidor['sexo'], null),
                                    'municipio' => $self->UtilService->valueOrDefault($servidor['municipio'], null),
                                    'uf' => $self->UtilService->valueOrDefault($servidor['uf'], null),
                                    'data_nascimento' => $self->UtilService->valueOrDefault($servidor['datanascimento'], null),
                                    'telefone' => $self->UtilService->valueOrDefault($servidor['telefone'], null),
                                    'vinculo_ativo' => $self->UtilService->valueOrDefault($ativo['vinculo_ativo'], null),
                                    'matriculasiape' => $self->UtilService->valueOrDefault($ativo['matriculasiape'], null),
                                    'cargo' => $self->UtilService->valueOrDefault($ativo['tipo'], null),
                                    'coduorgexercicio' => $self->UtilService->valueOrDefault($ativo['coduorgexercicio'], null, $option = "uorg"),
                                    'coduorglotacao' => $self->UtilService->valueOrDefault($ativo['coduorglotacao'], null, $option = "uorg"),
                                    'codigo_servo_exercicio' => $self->UtilService->valueOrDefault($ativo['codigo_servo_exercicio'], null, $option = "uorg"),
                                    'nomeguerra' => $nomeguerra,
                                    'situacao_funcional' => !is_null($situacao_funcional) ? $situacao_funcional : "DESCONHECIDO",
                                    'codupag' => $self->UtilService->valueOrDefault($ativo['codupag'], null),
                                    'dataexercicionoorgao' => $self->UtilService->valueOrDefault($ativo['dataexercicionoorgao'], null),
                                    'funcoes' => $ativo['funcoes'],
                                    'matricula' => $self->UtilService->valueOrDefault($ativo['matriculasiape'], null),
                                ];

                                /* Caso não existe na memória nem na tabela usuários OU
                                 o cpf no integração atual consta na tabela usuários,
                                 registro é incluso na tabela integração para processamento. */

                                // Verifica se já existe email funcional (index) na tabela usuários.
                                $registro_test = DB::table('usuarios')->where('email', $servidor['emailfuncional']);

                                if ( (!in_array($servidor['emailfuncional'], $emails_integracao_na_memoria ) &&
                                        is_null($registro_test->value('email'))) ||
                                            $registro_test->value('cpf') == $servidor['cpf']){

                                    $registro = new IntegracaoServidor($servidor);
                                    $registro->save();

                                    // Adiciona na memória para verificar próximos e evitar duplicidade.
                                    array_push($emails_integracao_na_memoria, $email);

                                    // Contabiliza servidores com e-mail funcional vazio no cadastro SIAPE.
                                    str_contains($servidor['emailfuncional'], '@petrvs.gov.br') ?
                                        array_push($cpfs_emails_funcionais_vazios, [$servidor['cpf'],$servidor['emailfuncional']]) : true;

                                } else { // Caso e-mail esteja duplicado, segue registro para rotina de avisos no final.
                                        array_push($emails_funcionais_duplicados, [$servidor['cpf'],$servidor['emailfuncional']]);
                                    }
                                }
                            }
                        }
                });

                if($this->echo) $this->imprimeNoTerminal("Concluída a fase de reconstrução da tabela integração_servidores.....");
                $n = IntegracaoServidor::count();
                $n_emails_funcionais_vazios = count($cpfs_emails_funcionais_vazios);
                $n_emails_funcionais_duplicados = count($emails_funcionais_duplicados);

                $this->atualizaLogs($this->logged_user_id, 'integracao_servidores', 'todos os registros', 'ADD', ['Observação' => 'Total de servidores importados do SIAPE: ' . $n . ' (apenas ATIVOS).']);
                array_push($this->result['servidores']['Observações'], 'Os dados dos Servidores foram obtidos ' . ($this->useLocalFiles ? 'através de arquivo XML armazenado localmente!' : 'através de consulta à API do SIAPE!'));

                if($n_emails_funcionais_vazios){
                    $cpfs_emails_funcionais_vazios = json_encode($cpfs_emails_funcionais_vazios);
                    array_push($this->result['servidores']['Observações'], 'Total de servidores com email funcional vazio no SIAPE: ' . $n_emails_funcionais_vazios . ' (apenas ATIVOS).');
                    array_push($this->result['servidores']['Observações'], 'Lista de servidores com email funcional vazio no SIAPE: ' . $cpfs_emails_funcionais_vazios . '.');
                }

                if($n_emails_funcionais_duplicados){
                    $emails_funcionais_duplicados = json_encode($emails_funcionais_duplicados);
                    array_push($this->result['servidores']['Observações'], 'Total de emails funcionais duplicados no SIAPE: ' . $n_emails_funcionais_duplicados . ' (apenas ATIVOS).');
                    array_push($this->result['servidores']['Observações'], 'Lista de servidores com email funcional duplicado no SIAPE: ' . $emails_funcionais_duplicados . '.');
                }

                array_push($this->result['servidores']['Observações'], 'Total de servidores importados do SIAPE: ' . $n . ' (apenas ATIVOS).');

                DB::transaction(function () use (&$atualizacoes) {
                    // Seleciona todos os servidores que sofreram alteração nos seus dados pessoais ou estão com dat
                        $atualizacoes = DB::select(
                        "SELECT u.id, isr.cpf AS cpf_servidor, u.nome AS nome_anterior, ".
                        "isr.nome AS nome_servidor, u.apelido AS apelido_anterior, ".
                        "isr.nomeguerra AS nome_guerra, u.email AS email_anterior, ".
                        "isr.emailfuncional, u.matricula AS matricula_anterior, ".
                        "isr.matriculasiape, u.telefone AS telefone_anterior, isr.telefone, ".
                        "isr.data_modificacao as data_modificacao, u.data_modificacao as data_modificacao_anterior ".
                        "FROM integracao_servidores isr LEFT JOIN usuarios u ON (isr.cpf = u.cpf) ".
                        "WHERE isr.nome != u.nome OR isr.emailfuncional != u.email OR ".
                        "isr.matriculasiape != u.matricula OR isr.nomeguerra != u.apelido OR ".
                        "isr.telefone != u.telefone OR ".
                        "isr.data_modificacao != u.data_modificacao");

                    $sql_update = "UPDATE usuarios SET ".
                        "nome = :nome, apelido = :nomeguerra, ".
                        "email = :email, matricula = :matricula, ".
                        "telefone = :telefone, ".
                        "data_modificacao = :data_modificacao WHERE id = :id";

                    /* Atualiza os dados pessoais de todos os servidores ATIVOS
                    presentes na tabela USUARIOS.
                    *** ESTA ROTINA NÃO DEVE INSERIR NOVOS SERVIDORES *** */
                    if (!empty($atualizacoes)) {
                        foreach($atualizacoes as $linha) {
                            DB::update($sql_update, [
                                'nome'          => $linha->nome_servidor,
                                'nomeguerra'    => $linha->nome_guerra,
                                'email'         => $linha->emailfuncional,
                                'matricula'     => $linha->matriculasiape,
                                'telefone'      => $linha->telefone,
                                'id'            => $linha->id,
                                'data_modificacao' => $linha->data_modificacao,
                            ]);
                            $this->atualizaLogs($this->logged_user_id, 'usuarios', $linha->id, 'EDIT', [
                                'Rotina' => 'Integração',
                                'Observação' => 'Servidor ATIVO que foi atualizado porque apresentou '.
                                'alteração em seus dados pessoais!',
                                'Valores anteriores' => [
                                    'nome'          => $linha->nome_anterior,
                                    'nomeguerra'    => $linha->apelido_anterior,
                                    'email'         => $linha->email_anterior,
                                    'matricula'     => $linha->matricula_anterior,
                                    'telefone'      => $linha->telefone_anterior,
                                    'id'            => $linha->id,
                                    'data_modificacao' => $linha->data_modificacao,
                                ],
                                'Valores atuais' => [
                                    'nome'          => $linha->nome_servidor,
                                    'nomeguerra'    => $linha->nome_guerra,
                                    'email'         => $linha->emailfuncional,
                                    'matricula'     => $linha->matriculasiape,
                                    'telefone'      => $linha->telefone,
                                    'id'            => $linha->id,
                                    'data_modificacao' => $linha->data_modificacao,
                                ]
                            ]);
                        }
                    };

                    if($this->echo) $this->imprimeNoTerminal('Concluída a fase de atualização de servidores que apresentaram alteração nos seus dados pessoais!.....');
                    $n = count($atualizacoes);
                    if($n > 0) array_push($this->result['servidores']["Observações"], $n . ($n == 1 ? ' servidor foi atualizado porque sofreu alteração em seus dados pessoais!' : ' servidores foram atualizados porque sofreram alteração em seus dados pessoais!'));

                    /* Incluir todos servidores da tabela integracao_servidores
                    que não estejam na tabela usuarios.
                    Foi modificado a ideia original onde era uma opção o autoincluir.
                    Obs.:: Inserção de novos servidores automaticamente.
                    */

                    /* Query Builder */
                    $query = "SELECT " .
                        "isr.matriculasiape as matricula, " .
                        "isr.nome as nome, isr.cpf as cpf, " .
                        "isr.emailfuncional as emailfuncional, " .
                        "isr.sexo as sexo, " .
                        "isr.uf as uf, " .
                        "isr.data_nascimento as data_nascimento, " .
                        "isr.telefone as telefone, " .
                        "isr.nomeguerra as apelido, " .
                        "isr.codigo_servo_exercicio as exercicio, " .
                        "isr.situacao_funcional as situacao_funcional, " .
                        "isr.data_modificacao as data_modificacao, " .
                        "isr.funcoes as gestor " .
                        "FROM integracao_servidores as isr LEFT JOIN usuarios as u " .
                        "ON isr.cpf = u.cpf " .
                        "WHERE u.cpf is NULL";

                    $vinculos_isr = DB::select($query);

                    $perfil_participante = Perfil::where('nome', 'Participante')->first()->id;
                    $perfil_chefe = Perfil::where('nome', 'Chefe de Unidade Executora')->first()->id;

                    foreach($vinculos_isr as $v_isr){
                        $v_isr = $this->UtilService->object2array($v_isr);
                        $perfil = $v_isr['gestor'] ? $perfil_chefe : $perfil_participante;
                        $registro = new Usuario([
                            'id' => Uuid::uuid4(),
                            'email' => $this->UtilService->valueOrDefault($v_isr['emailfuncional']),
                            'nome' => $this->UtilService->valueOrDefault($v_isr['nome']),
                            'cpf' => $this->UtilService->valueOrDefault($v_isr['cpf']),
                            'matricula' => $this->UtilService->valueOrDefault($v_isr['matricula']),
                            'apelido' => $this->UtilService->valueOrDefault($v_isr['apelido']),
                            'telefone' => $this->UtilService->valueOrDefault($v_isr['telefone'], null),
                            'data_nascimento' => $this->UtilService->valueOrDefault($v_isr['data_nascimento'], null),
                            'sexo' => $this->UtilService->valueOrDefault($v_isr['sexo']),
                            'situacao_funcional' => $this->UtilService->valueOrDefault($v_isr['situacao_funcional'], "DESCONHECIDO"),
                            'perfil_id' => $perfil,
                            'exercicio' => $this->UtilService->valueOrDefault($v_isr['exercicio']),
                            'uf' => $this->UtilService->valueOrDefault($v_isr['uf']),
                            'data_modificacao' => $this->UtilService->valueOrDefault($v_isr['data_modificacao']),
                        ]);
                        $registro->save();
                        $id_user = $registro->id;
                        $unidade_exercicio = Unidade::where("codigo", $v_isr["exercicio"])->first();

                        // Alguns servidores possuem unidades de exercícios não válidas (provavelmente aposentados).
                        // Dessa forma, como resolução, alocar eles na unidade
                        // instituidora para ciência dos administradores do sistema e posterior remanejamento.

                        if(is_null($unidade_exercicio)){
                            $unidade_exercicio = Unidade::where("codigo", "1")->first();
                        }

                        $vinculo = array([
                            'usuario_id' => $id_user,
                            'unidade_id' => $unidade_exercicio->id,
                            'atribuicoes' => ["LOTADO"],
                        ]);

                        /* Farias criou rotina para gerar exercícios (antiga lotação)
                        de forma simplificada. Aqui é criado o exercício vinculando
                        o usuário a unidade. Olhar rotina para entender melhor. */
                        $this->unidadeIntegrante->saveIntegrante($vinculo, false);
                    }
                    if($this->echo) $this->imprimeNoTerminal('Concluída a fase de atualização das lotações dos servidores!.....');
                });

                $this->result['servidores']['Resultado'] = 'Sucesso';
                array_push($this->result['servidores']["Observações"], 'Na tabela Usuários constam agora '.
                Usuario::count() . ' servidores!');

            } catch (Throwable $e) {
                LogError::newError("Erro ao importar servidores", $e);
                $this->result["servidores"]['Resultado'] = 'ERRO: '. $e->getMessage();
            }
        }

        // Atualização dos Gestores
        // Os gestores só são atualizadas quando as Unidades e os Servidores são atualizados e AMBOS com sucesso.

        if(!empty($inputs["gestores"]) && !$inputs["gestores"]){
            $this->result["gestores"]['Resultado'] = 'Os gestores não foram atualizados, conforme solicitado!';
        } elseif($this->result['unidades']['Resultado'] == 'Sucesso' && $this->result['servidores']['Resultado'] == 'Sucesso'){
            if($this->echo) $this->imprimeNoTerminal("Iniciando a fase de reconstrução das funções de chefia!.....");
            try {
                DB::beginTransaction();
                // seleciona o ID do usuário e as funções de todos os servidores ativos trazidos do SIAPE, e que já existem na tabela Usuários
                $query_selecionar_chefes = "SELECT u.id, isr.funcoes FROM integracao_servidores as isr " .
                         "INNER JOIN usuarios as u " .
                         "ON isr.cpf = u.cpf " .
                         "WHERE isr.vinculo_ativo = '1' AND u.cpf IS NOT NULL AND u.deleted_at IS NULL AND isr.funcoes is NOT NULL";

                // filtra apenas aqueles que são gestores ou gestores substitutos
                // $servidores = DB::select($query_selecionar_chefes);
                // $chefes = array_filter($servidores, fn($s) => $s->funcoes != null);     //encontrar uma forma de juntar no sql
                $chefes = DB::select($query_selecionar_chefes);

                // percorre todos os gestores, montando um array com os dados da chefia (matricula do chefe, código siape da unidade, tipo de função)
                $chefias = [];

                foreach($chefes as $chefe){
                    $funcoes = json_decode($chefe->funcoes);

                    if(is_array($funcoes->funcao)){
                        // nesse caso o servidor é gestor de mais de uma unidade
                        $chefias = array_merge($chefias,
                          array_map(fn($f) => ['id_usuario' => $chefe->id, 'codigo_siape' => $f->uorg_funcao, 'tipo_funcao' => $f->tipo_funcao], $funcoes->funcao));
                    } else {
                        // nesse caso o servidor é gestor de apenas uma unidade
                        array_push($chefias, ['id_usuario' => $chefe->id, 'codigo_siape' => $funcoes->funcao->uorg_funcao, 'tipo_funcao' => $funcoes->funcao->tipo_funcao]);
                    }
                }

                if($this->echo) $this->imprimeNoTerminal("Concluída a fase de montagem do array de chefias!.....");

                foreach($chefias as $chefia){
                    // Descobre o ID da Unidade
                    $query_selecionar_unidade = "SELECT u.id " .
                        "FROM integracao_unidades as iu " .
                        "JOIN unidades as u " .
                        "ON iu.id_servo = u.codigo " .
                        "WHERE iu.codigo_siape = :codigo_siape";

                    $unidade_exercicio = DB::select($query_selecionar_unidade,
                        [':codigo_siape' => $chefia['codigo_siape']]);

                    /*
                    Monta a consulta de acordo com o tipo de função e efetua
                    o registro na tabela unidade_integrante_atribucoes.
                    */

                    if($unidade_exercicio){
                        if($chefia['tipo_funcao'] == '1'){
                            $vinculo = array([
                                'usuario_id' => $chefia['id_usuario'],
                                'unidade_id' => $unidade_exercicio[0]->id,
                                'atribuicoes' => ["LOTADO", "GESTOR"],
                            ]);

                            $this->unidadeIntegrante->saveIntegrante($vinculo, false);
                        } else if($chefia['tipo_funcao'] == '2'){
                              $vinculo = array([
                              'usuario_id' => $chefia['id_usuario'],
                              'unidade_id' => $unidade_exercicio[0]->id,
                              'atribuicoes' => ["GESTOR_SUBSTITUTO"],
                              ]);

                              $this->unidadeIntegrantsaveIntegrantee->saveIntegrante($vinculo, false);
                        } else{
                            throw new Exception("Falha no array de funções do servidor");
                        }
                        /*
                        $this->atualizaLogs($this->logged_user_id, 'unidades', $unidade_exercicio[0]->id, 'EDIT', [
                                    'Rotina' => 'Integração',
                                    'Observação' => 'Atualização do ' . ($chefia['tipo_funcao'] == '1' ? 'Gestor' : 'Gestor substituto') . ' da Unidade',
                                    'Valores anteriores' => ['gestor_id' => $unidade_exercicio[0]->gestor_id, 'gestor_substituto_id' => $unidade_exercicio[0]->gestor_substituto_id],
                                    'Valores atuais' => ['gestor_id' => $chefia['tipo_funcao'] == '1' ? $chefia['id_usuario'] : null, 'gestor_substituto_id' => $chefia['tipo_funcao'] == '2' ? $chefia['id_usuario'] : null]
                                ]);
                        */
                    } else{
                        $nomeUsuario = Usuario::where('id',$chefia['id_usuario'])->first()->nome;
                        $unidade = array_filter($uos, function($o) use ($chefia){
                            if($o['id_servo'] == $chefia['codigo_siape']) return $o['nomeuorg'];
                        });
                        array_push($this->result['gestores']["Falhas"], 'Impossível lançar a chefia do servidor ' . strtoupper($nomeUsuario) . ' porque a Unidade de código SIAPE ' .
                                    $chefia['codigo_siape'] . '(' . $unidade[0] ?? 'nome não localizado!' . ')' . ' não está cadastrada/ativa!');
                    }
                }
                DB::commit();
                $this->result["gestores"]['Resultado'] = 'Sucesso';
                $this->result["gestores"]['Observações'] = [...$this->result["gestores"]['Observações'], ...array_filter([
                    count($chefes) . (count($chefes) == 1 ? ' gestor atualizado, ' : ' gestores atualizados, ') . count($chefias) . (count($chefias) == 1 ? ' chefia atualizada!' : ' chefias atualizadas!')
                    ], fn($o) => intval(substr($o,0,strpos($o, 'gestor')-1)) > 0)];
            } catch (Throwable $e) {
                DB::rollback();
                LogError::newError("Erro ao atualizar os gestores (titulares/substitutos)", $e);
                $this->result["gestores"]['Resultado'] = 'ERRO: '. $e->getMessage();
            }
        } else{
            $this->result["gestores"]['Resultado'] = 'Os gestores não foram atualizados porque as Unidades e/ou Servidores não o foram, ' .
                                              'ou ainda porque houve alguma falha em suas atualizações! Os gestores só são atualizados quando as Unidades ' .
                                              'e os Servidores são atualizados e AMBOS com sucesso.';
        }
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
            $perfil_nivel_5_id = Perfil::where('nivel', '5')->first()->id;
            $usuario->perfil_id = $perfil_nivel_5_id;
            $usuario->save();
            $usuario->fresh();
            if(!empty($lotacao->unidade_id)) { // se sua Unidade estiver cadastrada, insere-se uma lotação principal pra ele
                $lotacao->usuario_id = $usuario->id;
                $lotacao->save();
                $lotacao->refresh();
                UnidadeIntegranteAtribuicao::create(['unidade_integrante_id' => $lotacao->id, 'atribuicao' => 'LOTADO'])->save();
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

    public function atualizaLogs($user_id, string $table_name, string $row_id, string $type, array $delta)
    {
      /*
      $change = DB::connection('log');
      $change->setConnection('log');
      $pdo = $change->getPdo();
      $change->insert([
            'date_time' => new DateTime(),
            'user_id' => $user_id,
            'table_name' => $table_name,
            'row_id' => $row_id,
            'type' => $type,
            'delta' => json_encode($delta ?? ['Rotina' => 'Integração'])
        ]);*/
    }

    public function imprimeNoTerminal($str){
        passthru("echo ".$str);
        ob_flush();
    }

    /**
     * SHOW RESPONSÁVEIS devolve um array de objetos do tipo {'key' => 'value'}, onde 'value' é o nome do usuário que executou alguma vez
     * a rotina de integração e 'key' é o seu ID. No caso de a rotina de integração ter sido executada por um processo/alguém "por fora" do Petrvs,
     * o seu ID será nulo e o nome será setado para "Usuário não logado".
     */
    public function showResponsaveis() {
        $a = array_map(fn($u) => ['key' => $u['id'], 'value' => $u['nome']], Usuario::select(['id', 'nome'])->has('integracoes')->get()->toArray());
        $b = array_merge([['key' => "null", 'value' => 'Usuário não logado']],$a);
        usort($b, function ($a, $b) {return strnatcmp($a['value'], $b['value']);});
        return $b;
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

--------------------------------------------------------------


        U1 - A (01/01)
        U1 - A (20/01)


                    PETRVS
            SIAPE   CHEFE
        U1 - A      - A     - 02/01
        U1 - A      - B     - 05/01
        U1 - A      - B
        U1 - A      - B
        U1 - A != C - C     - 08/01
        U1 - C      - C
        U1 - C      - C
        U1 - C      - B     - 10/01
        U1 - C != D - D
        U1 - D      - D

        -------------------------
        U1 - A

        integracao_unidade -> chefe antes e chefe atual
        integracao_chefias ->
        integracao_servidores

        INTEGRACOES_CHEFIAS
        GESTOR_SIAPE: string (usuario->id)
        GESTOR_PETRVS: string (usuario->id)
        GESTOR_SUBSTITUTO_SIAPE: string (usuario->id)
        GESTOR_SUBSTITUTO_PETRVS: string (usuario->id)

        registro->delete();  deleted_at com a data


        //  PARA CADA REGISTRO NO ARRAY DE CHEFIAS(codigo_siape,id_usuario,tipo_funcao)
        //      OBTER O id_unidade ATRAVÉS DO codigo_siape
        //      VERIFICAR SE HÁ CONSISTÊNCIA ENTRE AS SEGUINTES INFORMAÇÕES: 'UNIDADE DE GERENCIA' x 'UNIDADE DE LOTAÇÃO' (id_unidade x usuario->lotacao->unidade_id)
        //      SE FOREM AS MESMAS
        //          OBTER O id_unidade ATRAVÉS DO codigo_siape
        //          SE A UNIDADE FOR LOCALIZADA
        //              VERIFICAR SE JÁ EXISTE NA TABELA INTEGRACAO_CHEFIAS UM REGISTRO COM codigo_siape,id_usuario,tipo_funcao
        //              SE AINDA NÃO EXISTIR O REGISTRO
        //                  CRIA UM REGISTRO INFORMANDO GESTOR/SUBSTITUTO_SIAPE E GESTOR/GESTOR SUBSTITUTO_PETRVS COM O id_usuario
        //                  CHAMA O MÉTODO saveIntegrante(id_unidade,id_usuario,['gestor/gestor_substituto' => 'ADD']) PARA ATUALIZAR O GESTOR/SUBSTITUTO NO PETRVS
        //              SE JÁ EXISTIR O REGISTRO
        //                  VERIFICAR SE O ID_USUARIO DO GESTOR/SUBSTITUTO_SIAPE É IGUAL AO id_usuario
        //                  SE FOR IGUAL, NÃO FAZER NADA
        //                  SE FOR DIFERENTE, ATUALIZAR GESTOR/SUBSTITUTO_SIAPE E GESTOR/SUBSTITUTO_PETRVS COM o id_usuario
        //          SE A UNIDADE NÃO FOR LOCALIZADA, GERAR MENSAGEM DE ERRO
        //      SE FOREM DIFERENTES, GERAR MENSAGEM DE ERRO.

        // Ler integracaochefia (verifica gestores do siape)
        // 0 -
        // 1 - Se chefe_siape na integracaoservidores é igual a chefe_siape na integracaochefia (não faz nada). Permanece chefe_petrvs sem alteração.
        // 2 - Se chefe_siape mudou na integracaoservidores então chefe_siape na integraochefia é atualizado e chefe_petrvs também é atualizado.
        // 3 -
                CASOS POSSÍVEIS
                                         SIAPE                        PETRVS
                SERVIDOR         LOTACAO       CHEFIA        LOTACAO         CHEFIA
                   S1               A            A              A               A                   10/01
                   S1               A            A              B               B                   11/01
                   S1                            =              NADA           NADA                 12/02 INTEGRACAO

    CENARIO 1      S1               B            B                                                  13/01 DESIGNACAO NO SIAPE (FOI DESIGNADO S1)
                   S1                            !=             B               B                   14/01 INTEGRAÇÃO

    CENARIO 2      S2               B            B                                                  15/01 DESIGNACAO NO SIAPE (FOI DESIGNADA OUTRA PESSOA - S2)
CASO 1: S1/S2      S1
CASO 2: S2/S1



OK CENARIO 1: A NOMEAÇÃO DE S1 PARA A UNIDADE B FOI EFETIVADA.
CENÁRIO 2: NO LUGAR DE S1, FOI NOMEADO S2 PARA A UNIDADE B.
CENÁRIO 3: S2, QUE HAVIA SIDO DESIGNADO CHEFE DA UNIDADE, TEVE SUA DESIGNAÇÃO CANCELADA.
CENÁRIO 4: O CHEFE DA UNIDADE B FOI DISPENSADO, MAS NINGUÉM FOI DESIGNADO.

*/
