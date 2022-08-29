<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Exceptions\LogError;
use App\Models\Unidade;
use App\Models\Perfil;
use App\Models\UnidadeOrigemAtividade;
use Ramsey\Uuid\Uuid;
use Carbon\Carbon;
use Exception;

class IntegracaoService
{
    //public $autoIncluir = false;
    public $unidadesInseridas = [];
    public $unidadesSelecionadas = [];
    public $token = "";
    public $unidadeRaiz = null;
    public $codigoUnidadeRaiz = "";     // eventual alteração deve ser feita no arquivo .env
    public $validaCertificado = "";     // eventual alteração deve ser feita no arquivo .env
    public $useLocalFiles = "";         // eventual alteração deve ser feita no arquivo .env
    public $storeLocalFiles = "";       // eventual alteração deve ser feita no arquivo .env
    public $localUnidades = "";         // eventual alteração deve ser feita no arquivo .env
    public $localServidores = "";       // eventual alteração deve ser feita no arquivo .env

    function __construct($config = null) {
        ini_set('max_execution_time', 1200); /* 20 minutos */
        $integracao_config = $config ?: config('integracao');
        //$this->autoIncluir = $integracao_config['auto_incluir'];
        $this->codigoUnidadeRaiz = $integracao_config['codigoUnidadeRaiz'];
        $this->validaCertificado = $integracao_config['validaCertificado'];
        $this->useLocalFiles = $integracao_config['useLocalFiles'];
        $this->storeLocalFiles = $integracao_config['storeLocalFiles'];
        $this->localUnidades = $integracao_config['localUnidades'];
        $this->localServidores = $integracao_config['localServidores'];
    }

    /** Preenche os campos de uma lotação para o novo Usuário, se sua lotação já vier definida pelo SIAPE */
    public function fillUsuarioWithSiape(&$usuario, &$lotacao) {
        $result = false;
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
            $result = true;
        }
        return $result;
    }

    public function buscaOuInserePai($unidade, $entidade) {
        if (empty($unidade->pai_servo)) {
            return ["unidade_id" => null, "path" => ""];
        } else if (!empty($unidade->unidade_pai_id)) {
            return ["unidade_id" => $unidade->unidade_pai_id, "path" => $unidade->path_pai];
        } else if (!empty($this->unidadesInseridas[$unidade->pai_servo])) {
            return $this->unidadesInseridas[$unidade->pai_servo];
        } else if ($pai = current(array_filter($this->unidadesSelecionadas, fn($element) => $element->id_servo == $unidade->pai_servo))) {
            return $this->deepReplaceUnidades($pai, $entidade);
        }
    }

    public function insereVinculoRaiz($unidade_id) {
		if(!empty($unidade_id)) {
        	$sql_vinculo_insert = "INSERT INTO unidades_origem_atividades(id, unidade_id, unidade_origem_atividade_id) VALUES (:id, :unidade_id, :unidade_origem_atividade_id)";
			DB::insert($sql_vinculo_insert, [
                'id' => Uuid::uuid4(),
	            'unidade_id' => $unidade_id,
	            'unidade_origem_atividade_id' => $this->unidadeRaiz->id
	        ]);
        }
    }

    public function verificaVinculoRaiz($unidade_id) {
        $existeVinculo = UnidadeOrigemAtividade::where([
            ['unidade_id', '=', $unidade_id],
            ['unidade_origem_atividade_id', '=', $this->unidadeRaiz->id]
        ])->first();
        if (empty($existeVinculo)) $this->insereVinculoRaiz($unidade_id);
    }

    public function deepReplaceUnidades($unidade, $entidade) {
        // prepara os principais atributos da Unidade
        $values = [
            ':codigo' => $unidade->id_servo,
            ':nome' => $unidade->nomeuorg,
            ':sigla' => $unidade->siglauorg,
            ':cidade_id' => $unidade->cidade_id,
            ':entidade_id' => $entidade
        ];

        if(empty($unidade->id)) { /* Só entra aqui se a Unidade ainda não existir. Nesse caso, insere a Unidade */
            /* Insere somente se já não tiver sido inserido */
            if(empty($this->unidadesInseridas[$unidade->id_servo])) {
                // conclui a preparação de todos os parâmetros para inserir uma nova Unidade
                $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade);
                $values[':id'] = Uuid::uuid4();
                $values[':path'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"] : "";
                $values[':unidade_id'] = !empty($dados_path_pai) ? $dados_path_pai["unidade_id"] : null;

                $values[':notificacoes'] = '{}';
                $values[':etiquetas'] = '[]';
                $values[':data_inicio'] = Carbon::now();
                $values[':atividades_arquivamento_automatico'] = 0;
                $values[':atividades_avaliacao_automatico'] = 0;
                $values[':planos_prazo_comparecimento'] = 10;
                $values[':planos_tipo_prazo_comparecimento'] = 'DIAS';
                $values[':horario_trabalho_inicio'] = '00:00';
                $values[':horario_trabalho_fim'] = '23:59';
                $values[':distribuicao_forma_contagem_prazos'] = 'HORAS_UTEIS';
                $values[':autoedicao_subordinadas'] = 1;
                $values[':data_fim'] = null;
                $values[':checklist'] = '[]';

                $sql = "INSERT INTO unidades (id, codigo, path, nome, sigla, cidade_id, unidade_id, entidade_id, ".
                    "notificacoes, etiquetas, data_inicio, atividades_arquivamento_automatico, ".
                    "atividades_avaliacao_automatico, planos_prazo_comparecimento, planos_tipo_prazo_comparecimento, ".
                    "horario_trabalho_inicio, horario_trabalho_fim, distribuicao_forma_contagem_prazos, ".
                    "autoedicao_subordinadas, data_fim, checklist) ".
                    "VALUES (:id, :codigo, :path, :nome, :sigla, :cidade_id, :unidade_id, :entidade_id, ".
                    ":notificacoes, :etiquetas, :data_inicio, :atividades_arquivamento_automatico, ".
                    ":atividades_avaliacao_automatico, :planos_prazo_comparecimento, :planos_tipo_prazo_comparecimento, ".
                    ":horario_trabalho_inicio, :horario_trabalho_fim, :distribuicao_forma_contagem_prazos, ".
                    ":autoedicao_subordinadas, :data_fim, :checklist)";

                $this->unidadesInseridas[$unidade->id_servo] = ["unidade_id" => $values[':id'], "path" => $values[':path']];
                try {
                    DB::insert($sql, $values);
                } catch (Exception $e) {
                    LogError::newWarn("Erro ao inserir Unidade", $values);
                }

                // INSERE AQUI O VINCULO COM A UNIDADE RAIZ DAS ATIVIDADES
                $this->verificaVinculoRaiz($values[':id']);

                return $this->unidadesInseridas[$unidade->id_servo];
            }
        }
        else if($unidade->pai_servo != $unidade->codigoPai) { /* Só entra aqui se a Unidade já existir e houve mudança no Pai. Nesse caso, muda o pai da unidade e atualiza Nome e Sigla */

            // prepara apenas os atributos que precisam ser atualizados
            $pathAntigo = $unidade->path;
            $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade);

            $values[':id'] = $unidade->id;
            $values[':path'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"] : "";
            $values[':unidade_id'] = $dados_path_pai["unidade_id"];

            $sql = "UPDATE unidades SET path = :path, unidade_id = :unidade_id, codigo = :codigo, ".
                "nome = :nome, sigla = :sigla, cidade_id = :cidade_id, entidade_id = :entidade_id ".
                "WHERE id = :id";
            DB::update($sql, $values);                  // OBS.: QUAL A NECESSIDADE DE SE ATUALIZAR CODIGO, CIDADE, ENTIDADE

            // Se necessário, insere o vínculo com a Unidade Raiz das Atividades
            $this->verificaVinculoRaiz($values[':id']);

            $this->unidadesInseridas[$unidade->id_servo] = ["unidade_id" => $values[':id'], "path" => $values[':path']];

            /* Atualiza os paths dos filhos */
            $antes = $pathAntigo."/".$unidade->id;
            $depois = $values[':path'] . "/" . $unidade->id;
            $like = $antes."%";

            DB::update('UPDATE unidades SET path = REPLACE(path, :antes, :depois) WHERE path LIKE :like', [
                ':antes' => $antes,
                ':depois' => $depois,
                ':like' => $like
            ]);

            return ["unidade_id" => $values[':id'], "path" => $values[':path']];
        }
        else { /* Só entra aqui se a Unidade já existir e não tiver mudado o Pai. Nesse caso, atualiza apenas os outros dados (Nome, Sigla) */
            $values[':id'] = $unidade->id;
            $values[':path'] = $unidade->path;

            $params[':id'] = $values[':id'];
            $params[':nome'] = $unidade->nomeuorg;
            $params[':sigla'] = $unidade->siglauorg;

            $sql = "UPDATE unidades SET nome = :nome, sigla = :sigla WHERE id = :id";
            DB::update($sql, $params);

            // Se necessário, insere o vínculo com a Unidade Raiz das Atividades
            $this->verificaVinculoRaiz($values[':id']);

            $this->unidadesInseridas[$unidade->id_servo] = ["unidade_id" => $values[':id'], "path" => $values[':path']];

            return ["unidade_id" => $values[':id'], "path" => $values[':path']];
        }
    }

    public function object2array($object) {
        return @json_decode(@json_encode($object),1);
    }

    public function valueOrDefault($value) {
        return empty($value) || gettype($value) == "array" ? "" : $value;
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
        $result = [];
        $this->integracao_config = config('integracao');
        $token = $this->useLocalFiles ? "LOCAL" : $this->getToken($this->integracao_config);
        $entidade = $inputs["entidade"] ?: "";
        $xmlStream = "";
        LogError::newWarn("Sincronizar Entidade: " . $entidade);

        if(!empty($inputs["unidades"]) && $inputs["unidades"] != "false" && !empty($entidade)) {
            try {

                if($this->useLocalFiles) {//Se for para usar os arquivos locais, a rotina lê os dados do arquivo salvo localmente
                    $xmlStream = file_get_contents($this->localUnidades);
                } else {        //caso contrário, a rotina vai buscar no servidor do SIGEPE
                    if ($this->validaCertificado) {
                        $response = Http::withHeaders([
                            'Authorization' => 'Bearer ' . $token
                        ])->get($this->integracao_config["baseUrlunidades"]);
                    } else {
                        $response = Http::withoutVerifying()->withHeaders([
                            'Authorization' => 'Bearer ' . $token
                        ])->get($this->integracao_config["baseUrlunidades"]);
                    }
                    $xmlStream = $response->body();
                    if($this->storeLocalFiles) {        // aqui decide se salva ou não em arquivo as informações trazidas do servidor do SIGEPE
                        if(file_exists($this->localUnidades)) unlink($this->localUnidades);
                        file_put_contents($this->localUnidades, $xmlStream);
                    }
                }
                $xml = simplexml_load_string($xmlStream);
                $uos = $this->object2array($xml)["uorg"];
                $sql = "INSERT INTO integracao_unidades(id_servo, pai_servo, codigo_siape, pai_siape, codupag, nomeuorg, siglauorg, telefone, email, natureza, fronteira, fuso_horario, cod_uop, cod_unidade, tipo, tipo_desc, na_rodovia, logradouro, bairro, cep, ptn_ge_coordenada, municipio_siafi_siape, municipio_siscom, municipio_ibge, municipio_nome, municipio_uf, ativa, regimental, datamodificacao, und_nu_adicional, cnpjupag) " .
                       "VALUES (:id_servo, :pai_servo, :codigo_siape, :pai_siape, :codupag, :nomeuorg, :siglauorg, :telefone, :email, :natureza, :fronteira, :fuso_horario, :cod_uop, :cod_unidade, :tipo, :tipo_desc, :na_rodovia, :logradouro, :bairro, :cep, :ptn_ge_coordenada, :municipio_siafi_siape, :municipio_siscom, :municipio_ibge, :municipio_nome, :municipio_uf, :ativa, :regimental, :datamodificacao, :und_nu_adicional, :cnpjupag)";

                /* Apaga a tabela integracao_unidades e cria novamente com as unidades obtidas pelo webservice */
                DB::transaction(function () use (&$uos, &$sql, &$self) {
                    /* Remove toda a lista da tabela temporária integracao_unidades */
                    DB::delete('DELETE FROM integracao_unidades');
                    /* Itera as UOs */
                    foreach($uos as $uo) {
                        if(!empty($self->valueOrDefault($uo["id_servo"]))) {
                            DB::insert($sql, [
                                 ':id_servo' => $self->valueOrDefault($uo["id_servo"]),
                                ':pai_servo' => $self->valueOrDefault($uo["pai_servo"]),
                                ':codigo_siape' => $self->valueOrDefault($uo["codigo_siape"]),
                                ':pai_siape' => $self->valueOrDefault($uo["pai_siape"]),
                                ':codupag' => $self->valueOrDefault($uo["codupag"]),
                                ':nomeuorg' => $self->valueOrDefault($uo["nomeuorg"]),
                                ':siglauorg' => $self->valueOrDefault($uo["siglauorg"]),
                                ':telefone' => $self->valueOrDefault($uo["telefone"]),
                                ':email' => $self->valueOrDefault($uo["email"]),
                                ':natureza' => $self->valueOrDefault($uo["natureza"]),
                                ':fronteira' => $self->valueOrDefault($uo["fronteira"]),
                                ':fuso_horario' => $self->valueOrDefault($uo["fuso_horario"]),
                                ':cod_uop' => $self->valueOrDefault($uo["cod_uop"]),
                                ':cod_unidade' => $self->valueOrDefault($uo["cod_unidade"]),
                                ':tipo' => $self->valueOrDefault($uo["tipo"]),
                                ':tipo_desc' => $self->valueOrDefault($uo["tipo_desc"]),
                                ':na_rodovia' => $self->valueOrDefault($uo["na_rodovia"]),
                                ':logradouro' => $self->valueOrDefault($uo["logradouro"]),
                                ':bairro' => $self->valueOrDefault($uo["bairro"]),
                                ':cep' => $self->valueOrDefault($uo["cep"]),
                                ':ptn_ge_coordenada' => $self->valueOrDefault($uo["ptn_ge_coordenada"]),
                                ':municipio_siafi_siape' => $self->valueOrDefault($uo["municipio_siafi_siape"]),
                                ':municipio_siscom' => $self->valueOrDefault($uo["municipio_siscom"]),
                                ':municipio_ibge' => $self->valueOrDefault($uo["municipio_ibge"]),
                                ':municipio_nome' => $self->valueOrDefault($uo["municipio_nome"]),
                                ':municipio_uf' => $self->valueOrDefault($uo["municipio_uf"]),
                                ':ativa' => $self->valueOrDefault($uo["ativa"]),
                                ':regimental' => $self->valueOrDefault($uo["regimental"]),
                                ':datamodificacao' => $self->valueOrDefault($uo["datamodificacao"]),
                                ':und_nu_adicional' => $self->valueOrDefault($uo["und_nu_adicional"]),
                                ':cnpjupag' => $self->valueOrDefault($uo["cnpjupag"])
                            ]);
                        }
                    }
                });

                /* Insere as unidades faltantes ou atualiza dados e seus respectivos pais */
                // OBS.: Não vejo a diferença de usar :entidade_id para restringir as Unidades.
                // OBS.: Essa rotina de integração vai rodar nos diversos servidores onde estarão instaladas a aplicação... então ela tem que atualizar
                //       todas as Unidades do SIAPE, de todas as agências que usarão o sistema. O ideal é essa consulta_sql utilizar um parâmetro de
                //       identificação da entidade, presente no arquivo de configuração.
                $this->unidadesInseridas = [];
                $consulta_sql = "SELECT u.id_servo, u.nomeuorg, u.siglauorg, u.pai_servo, l.id, l.path, c.id AS cidade_id, p.id AS unidade_pai_id, ".
                    "pl.codigo AS codigoPai, p.path AS path_pai ".
                    "FROM integracao_unidades u LEFT JOIN unidades l ON (u.id_servo = l.codigo) ".  // && l.entidade_id = :entidade_id_l) ".
                    "LEFT JOIN unidades pl ON (pl.id = l.unidade_id) ".
                    "LEFT JOIN unidades p ON (u.pai_servo = p.codigo) ".  // && p.entidade_id = :entidade_id_p) ".
                    "LEFT JOIN cidades c ON (u.municipio_ibge = c.codigo_ibge) ".
                    "WHERE (l.id is null OR u.nomeuorg != l.nome OR u.siglauorg != l.sigla OR u.pai_servo != pl.codigo) ".
                    "AND u.email like '%@prf.gov.br' AND u.ativa = 'true'";      // Por enquanto estou usando o e-mail até discutir com o Inspetor Genisson

                // OBS.: Pode haver casos em que só foi alterado o pai da Unidade (OR u.pai_servo != pl.codigo)
                // OBS.: Existem Unidades repetidas na tabela INTEGRACAO UNIDADES, umas ativas e outras não, com ID_SERVO distintos
                $this->unidadesSelecionadas = DB::select($consulta_sql);  //, [':entidade_id_l' => $entidade, ':entidade_id_p' => $entidade]);

                //OBS.: não seria interessante incluir o e-mail na tabela UNIDADES?

                DB::transaction(function () use (&$self, $entidade) {

                    // identifica a Unidade Raiz para cadastro de Atividades.
                    $this->unidadeRaiz = Unidade::where('codigo', $this->codigoUnidadeRaiz)->first();

                    foreach($self->unidadesSelecionadas as $unidade) {
                        $self->deepReplaceUnidades($unidade, $entidade);
                    }

                });
                $result["unidades"] = 'sucesso';
                /* Unidades que foram removidas em integracao_unidades vão permanecer no sistema por questões de integridade */
            } catch (Exception $e) {
                LogError::newError("Erro ao importar unidades", $e);
                $result["unidades"] = $e->getMessage();
            }
        }

        if(!empty($inputs["servidores"]) && $inputs["servidores"] != "false" && !empty($entidade)) {
            try {

                if($this->useLocalFiles) {
                    $xmlStream = file_get_contents($this->localServidores);
                } else {
                    if ($this->validaCertificado) {
                        $response = Http::withHeaders([
                            'Authorization' => 'Bearer ' . $token
                        ])->get($this->integracao_config["baseUrlpessoas"]);
                    } else {
                        $response = Http::withoutVerifying()->withHeaders([
                            'Authorization' => 'Bearer ' . $token
                        ])->get($this->integracao_config["baseUrlpessoas"]);
                    }
                    $xmlStream = $response->body();
                    if($this->storeLocalFiles) {
                        if(file_exists($this->localServidores)) unlink($this->localServidores);
                        file_put_contents($this->localServidores, $xmlStream);
                    }
                }
                $xml = simplexml_load_string($xmlStream);
                $servidores = $this->object2array($xml)["Pessoa"];
                $sql = "INSERT INTO integracao_servidores(cpf_ativo, data_modificacao, cpf, nome, emailfuncional, sexo, municipio, uf, datanascimento, telefone, vinculo_ativo, matriculasiape, tipo, coduorgexercicio, coduorglotacao, codigo_servo_exercicio, nomeguerra, codsitfuncional, codupag, dataexercicionoorgao, funcoes) " .
                       "VALUES (:cpf_ativo, :data_modificacao, :cpf, :nome, :emailfuncional, :sexo, :municipio, :uf, :datanascimento, :telefone, :vinculo_ativo, :matriculasiape, :tipo, :coduorgexercicio, :coduorglotacao, :codigo_servo_exercicio, :nomeguerra, :codsitfuncional, :codupag, :dataexercicionoorgao, :funcoes)";

                /* Insere os servidores ATIVOS obtidos pelo webservice para a tabela integracao_servidores */
                DB::transaction(function () use (&$servidores, &$sql, &$self) {
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
                            $email = $self->valueOrDefault($servidor['emailfuncional']);
                            if($ativo && !empty($email)) {
                                $email = str_contains($email, "@") ? $email : $email . "@prf.gov.br";
                                DB::insert($sql, [
                                    ':cpf_ativo' => $self->valueOrDefault($servidor['cpf_ativo']),
                                    ':data_modificacao' => $self->valueOrDefault($servidor['data_modificacao']),
                                    ':cpf' => $self->valueOrDefault($servidor['cpf']),
                                    ':nome' => $self->valueOrDefault($servidor['nome']),
                                    ':emailfuncional' => $email,
                                    ':sexo' => $self->valueOrDefault($servidor['sexo']),
                                    ':municipio' => $self->valueOrDefault($servidor['municipio']),
                                    ':uf' => $self->valueOrDefault($servidor['uf']),
                                    ':datanascimento' => $self->valueOrDefault($servidor['datanascimento']),
                                    ':telefone' => $self->valueOrDefault($servidor['telefone']),
                                    ':vinculo_ativo' => $self->valueOrDefault($ativo['vinculo_ativo']),
                                    ':matriculasiape' => $self->valueOrDefault($ativo['matriculasiape']),
                                    ':tipo' => $self->valueOrDefault($ativo['tipo']),
                                    ':coduorgexercicio' => $self->valueOrDefault($ativo['coduorgexercicio']),
                                    ':coduorglotacao' => $self->valueOrDefault($ativo['coduorglotacao']),
                                    ':codigo_servo_exercicio' => $self->valueOrDefault($ativo['codigo_servo_exercicio']),
                                    ':nomeguerra' => $self->valueOrDefault($ativo['nomeguerra']),
                                    ':codsitfuncional' => $self->valueOrDefault($ativo['codsitfuncional']),
                                    ':codupag' => $self->valueOrDefault($ativo['codupag']),
                                    ':dataexercicionoorgao' => $self->valueOrDefault($ativo['dataexercicionoorgao']),
                                    ':funcoes' => json_encode($ativo['funcoes'])
                                ]);
                            }
                        }
                    }
                });

                DB::transaction(function () use (&$atualizacoes) {

                    // Seleciona todos os servidores que sofreram alteração nos seus dados pessoais.
                    $atualizacoes = DB::select(
                        "SELECT u.id, s.cpf AS cpf_servidor, s.nome AS nome_servidor, s.nomeguerra AS nome_guerra, ".
                        "s.emailfuncional, s.matriculasiape, s.telefone FROM integracao_servidores s LEFT JOIN usuarios u ON (s.cpf = u.cpf) ".
                        "WHERE s.nome != u.nome OR s.emailfuncional != u.email OR s.matriculasiape != u.matricula OR s.nomeguerra != u.apelido");
                    $sql_update = "UPDATE usuarios SET nome = :nome, apelido = :nomeguerra, email = :email, matricula = :matricula WHERE id = :id";

                    // Atualiza os dados pessoais de todos os servidores ATIVOS presentes na tabela USUARIOS. ESTA ROTINA NÃO DEVE INSERIR NOVOS SERVIDORES
                    if (!empty($atualizacoes)) {
                        foreach($atualizacoes as $linha) {
                                DB::update($sql_update, [
                                    'nome'          => $linha->nome_servidor,
                                    'nomeguerra'    => $linha->nome_guerra,
                                    'email'         => $linha->emailfuncional,
                                    'matricula'     => $linha->matriculasiape,
                                    'id'            => $linha->id
                                ]);
                        };
                    };

                    // Seleciona todas as lotações que não correspondem à Unidade Atual do servidor
                    $lotacoes_nao_atuais = DB::select(
                        "SELECT u.id AS id_usuario, l.id AS id_lotacao, l.data_fim, s.codigo_servo_exercicio, d.sigla ".
                        "FROM usuarios u LEFT JOIN lotacoes l ON (l.usuario_id = u.id) LEFT JOIN unidades d ON (l.unidade_id = d.id) ".
                        "LEFT JOIN integracao_servidores s ON (u.cpf = s.cpf) ".
                        "WHERE d.codigo != s.codigo_servo_exercicio");//PODEM VIR TUPLAS ONDE O SERVIDOR AINDA NÃO TEM LOTAÇÃO MAS NÃO SERÃO AFETADAS PELO BLOCO FOREACH ABAIXO
                    $sql2_update = "UPDATE lotacoes SET principal = 0 WHERE id = :id_lotacao";
                    // Todas são setadas como PRINCIPAL = 0
                    if (!empty($lotacoes_nao_atuais)) {
                        foreach($lotacoes_nao_atuais as $lotacao) {
                            DB::update($sql2_update, ['id_lotacao' => $lotacao->id_lotacao]);
                        };
                    }

                    // Seleciona todos os servidores que possuem alguma lotação registrada com a Unidade Atual
                    // Podem ocorrer 2 casos: I - possuem lotação com data_fim não nula (setar com PRINCIPAL = 0), ou II - possuem com data_fim nula (ou seja, estão OK. Setar com PRINCIPAL = 1)
                    $lotacoes_atuais = DB::select(
                        "SELECT u.id AS id_usuario, l.id AS id_lotacao, l.data_fim, s.codigo_servo_exercicio AS cod_unidade_atual, d2.id AS id_unidade_atual ".
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
                            } else {
                                DB::update($sql3_update, ['id_lotacao' => $lotacao->id_lotacao, 'principal' => 1]);
                            };
                        };
                    };

                    // Por fim, certifica-se de que todos os servidores ativos possuem alguma lotação com a Unidade Atual, Principal = 1 e Data_fim nula.
                    // Executada a consulta, podem surgir 2 casos: (a) usuários com unidade, mas sem lotação principal, e (b) usuários sem unidade e sem lotação principal
                    $servidores_sem_lotacoes_atualizadas = DB::select(
                        "SELECT u.id AS id_usuario, d.id AS id_unidade_atual ".
                        "FROM usuarios u LEFT JOIN integracao_servidores s ON (u.cpf = s.cpf) ".
                        "LEFT JOIN unidades d ON (s.codigo_servo_exercicio = d.codigo) ".
                        "LEFT JOIN lotacoes l ON (d.id = l.unidade_id AND u.id = l.usuario_id AND l.principal = 1 AND l.data_fim is null) ".
                        "WHERE l.id is null AND s.cpf is not null AND s.codigo_servo_exercicio is not null");

                    $sql4_insert = "INSERT INTO lotacoes(id, data_inicio, principal, unidade_id, usuario_id) VALUES (:id, Now(), 1, :unidade_id, :usuario_id)";
                    if (!empty($servidores_sem_lotacoes_atualizadas)) {
                        foreach($servidores_sem_lotacoes_atualizadas as $lotacao) {
                            if(!empty($lotacao->id_unidade_atual)) {
                                DB::insert($sql4_insert, [
                                    'id'            => Uuid::uuid4(),
                                    'unidade_id'    => $lotacao->id_unidade_atual,
                                    'usuario_id'    => $lotacao->id_usuario
                                ]);
                            }else{
                                // DECIDIR O QUE FAZER NO CASO DE UM SERVIDOR NÃO TER UMA LOTAÇÃO PRINCIPAL PORQUE SUA UNIDADE NÃO ESTÁ CADASTRADA
                            }
                        };
                    };

                });
                $result["servidores"] = 'sucesso';
            } catch (Exception $e) {
                LogError::newError("Erro ao importar servidores", $e);
                $result["servidores"] = $e->getMessage();
            }
            return $result;
        }

    }

    public function salvaUsuarioLotacaoGapi(&$usuario, &$lotacao, $tokenData, $auth){
        $auth->fillUsuarioWithCredential($usuario, $tokenData);
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
}
