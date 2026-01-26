<?php

namespace App\Services;

use App\Exceptions\BadGatewayException;
use Throwable;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\SiapeDadosUORG;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Exceptions\LogError;
use App\Services\ServiceBase;
use App\Models\IntegracaoUnidade;
use App\Models\IntegracaoServidor;
use Illuminate\Support\Facades\DB;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\IntegracaoServidorRepository;
use App\Services\Siape\Gestor\Integracao as GestorIntegracao;
use App\Services\Siape\Servidor\Integracao;
use Illuminate\Support\Facades\Log;
use App\Facades\SiapeLog;

/**
 * @property UtilService $UtilService
 * @property IntegracaoGestorService $integracaoGestorService
 */
class IntegracaoService extends ServiceBase
{
  use LogTrait;

  const CODIGO_SIAPE_UNIDADE_RAIZ_PELO_PAI = 999999;

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
  public $integracao_config = [];
  public $unidadeRaiz = "";
  public $validaCertificado = "";     // eventual alteração deve ser feita no arquivo .env
  public $useLocalFiles = "";         // eventual alteração deve ser feita no arquivo .env
  public $storeLocalFiles = "";       // eventual alteração deve ser feita no arquivo .env
  public $localUnidades = "";         // eventual alteração deve ser feita no arquivo .env
  public $localServidores = "";       // eventual alteração deve ser feita no arquivo .env
  private $servidores_registrados_is = [];
  public $nivelAcessoService;

  function __construct($config = null, string $tenantId = null)
  {
    parent::__construct();
    ini_set('max_execution_time', 1800); /* 30 minutos */
    $this->loadingTenantConfigurationMiddleware($tenantId);
    $this->integracao_config = $config ?: config('integracao');
    $this->validaCertificado = $this->integracao_config['validaCertificado'];
    $this->useLocalFiles = $this->integracao_config['useLocalFiles'];
    $this->storeLocalFiles = $this->integracao_config['storeLocalFiles'];
    $this->localUnidades = $this->integracao_config['localUnidades']; // "unidades.xml";
    $this->localServidores = $this->integracao_config['localServidores']; // "servidores.xml";
    $this->unidadeRaiz = $this->integracao_config['codigoUnidadeRaiz'] ?: "1";
    $this->nivelAcessoService = new NivelAcessoService();
  }

  private function loadingTenantConfigurationMiddleware($tenantId): void
  {
    if (is_null($tenantId)) return;
    $tenantConfigurations = new TenantConfigurationsService();
    $tenantConfigurations->handle($tenantId);
  }


  // Preenche os campos de uma lotação para o novo Usuário, se sua lotação já vier definida pelo SIAPE.
  public function fillUsuarioWithSiape(&$usuario, &$lotacao)
  {
    $resultado = false;
    $query = DB::select("SELECT s.*, u.id AS unidade_servidor, c.uf AS unidade_uf FROM integracao_servidores s " .
      "LEFT JOIN unidades u ON (u.codigo = s.codigo_servo_exercicio) " .
      "LEFT JOIN cidades c ON (c.id = u.cidade_id) " .
      "WHERE emailfuncional = :email", [":email" => $usuario->email]);
    if ($servidor = current($query)) {
      $usuario->cpf = $servidor->cpf;
      $usuario->nome = $servidor->nome;
      $usuario->telefone = $servidor->telefone;
      $usuario->matricula = $servidor->matriculasiape;
      $usuario->apelido = $servidor->nomeguerra;
      if (!empty($servidor->unidade_servidor)) { // Cria uma lotação para o novo servidor apenas se ela já estiver definida no SIAPE.
        $lotacao->unidade_id = $servidor->unidade_servidor;
      }
      $resultado = true;
    }
    return $resultado;
  }

  public function buscaOuInserePai($unidade, $entidade_id)
  {
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

  public function deepReplaceUnidades($unidade, $entidade_id)
  {
    // Prepara os principais atributos da Unidade.
    $values = [
      ':codigo' => $unidade->id_servo,
      ':nome' => $unidade->nomeuorg,
      ':sigla' => $unidade->siglauorg,
      ':cidade_id' => $unidade->cidade_id
    ];

    if (empty($unidade->id)) { // Só entra aqui se a Unidade ainda não existir. Nesse caso, insere a Unidade.
      $timenow = now();
      if (empty($this->unidadesInseridas[$unidade->id_servo])) { // Insere somente se já não tiver sido inserido.
        $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade_id);
        $values[':id'] = Uuid::uuid4();
        $values[':path'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"] : "";
        $values[':data_modificacao'] = UtilService::asDateTime($unidade->data_modificacao_siape);
        $this->unidadesInseridas[$unidade->id_servo] = ["unidade_id" => $values[':id'], "path" => $values[':path']];
        $unidadeJaExisteNoBanco = Unidade::where("codigo", $unidade->id_servo)->first();
        if ($unidadeJaExisteNoBanco) {
          throw new BadGatewayException(sprintf("Já existe uma unidade para o código %s", $unidade->id_servo));
        }
        try {
          $id = Unidade::insertGetId([
            'id' => $values[':id'],
            'path' => $values[':path'],
            'codigo' => $values[':codigo'],
            'nome' => $values[':nome'],
            'sigla' => $values[':sigla'],
            'cidade_id' => $values[':cidade_id'],
            'entidade_id' => $entidade_id,
            'unidade_pai_id' => !empty($dados_path_pai) ? $dados_path_pai["unidade_id"] : null,
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
        } catch (Throwable $e) {
          Log::error(sprintf("Erro ao inserir Unidade %s: %s", $values[':codigo'], $e->getMessage()), throwableToArray($e));
          LogError::newWarn("Erro ao inserir Unidade", $values);
        }
        return $this->unidadesInseridas[$unidade->id_servo];
      }
    } // Só entra aqui se a Unidade já existir e ocorreu mudança no Pai. Nesse caso, muda o pai da Unidade e atualiza Nome e Sigla.
    else if (($unidade->pai_servo != $unidade->codigo_pai_antigo) && ($unidade->id != $unidade->id_pai_antigo)) {
      $values[':id'] = $unidade->id;
      // Prepara apenas os atributos que precisam ser atualizados.
      $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade_id);
      $values[':path'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"] : "";
      $values[':unidade_id'] = !empty($dados_path_pai["unidade_id"]) ? $dados_path_pai["unidade_id"] : null;
      $values[':data_modificacao'] = UtilService::asDateTime($unidade->data_modificacao_siape);

      $sql = "UPDATE unidades SET path = :path, unidade_pai_id = :unidade_id, codigo = :codigo, " .
        "nome = :nome, sigla = :sigla, cidade_id = :cidade_id, data_modificacao = :data_modificacao WHERE id = :id";
      DB::update($sql, $values);

      array_push($this->paisAlterados, $unidade);

      // Atualiza os paths dos filhos.
      $antes = $unidade->path_antigo . "/" . $unidade->id;
      if (DB::select("select count(*) from unidades where path = '" . $antes . "'") > 0) {
        $depois = $values[':path'] . "/" . $unidade->id;
        $like = $antes . "%";

        $n = DB::update('UPDATE unidades SET path = REPLACE(path, :antes, :depois) WHERE path LIKE :like', [
          ':antes' => $antes,
          ':depois' => $depois,
          ':like' => $like
        ]);
        $this->filhasAlteradas += $n;
      }
      return ["unidade_id" => $values[':id'], "path" => $values[':path']];
    } else { // Só entra aqui se a Unidade já existir e não tiver mudado o Pai. Nesse caso, atualiza apenas os outros dados (Nome, Sigla).
      $values[':id'] = $unidade->id;
      $values[':data_modificacao'] = UtilService::asDateTime($unidade->data_modificacao_siape);

      $sql = "UPDATE unidades SET codigo = :codigo, nome = :nome, sigla = :sigla, cidade_id = :cidade_id,  data_modificacao = :data_modificacao WHERE id = :id";
      DB::update($sql, $values);
      array_push($this->unidadesAlteradas, $unidade);
      return ["unidade_id" => $values[':id'], "path" => $unidade->path_antigo];
    }
  }

  public function getToken($config)
  {
    if (empty($this->token)) {
      $this->token = $config["token"];
      if (empty($this->token) && !empty($config["generate"]["url"])) {
        $response = Http::withHeaders([
          'Authorization' => 'Basic ' . $config["generate"]["authorization"]
        ])->post($config["generate"]["url"], [
          'grant_type' => 'password',
          'username' => $config["generate"]['user'],
          'password' => $config["generate"]['password']
        ]);
        if ($response->ok()) {
          $data = $response->json();
          $this->token = $data["access_token"];
        }
      }
    }
    return $this->token;
  }

  /**
   * Método usado quando a rotina de Integração é chamada de dentro do Petrvs (pelo grid de Integrações).
   */
  public function sincronizarPetrvs($data, $usuario_id, $request)
  {
    $dados = $data['entity'];
    $this->logged_user_id = Auth::user() ? Auth::user()->id : null;
    $this->useLocalFiles = config('app')['env'] == 'local' ? $dados['usar_arquivos_locais'] : false;
    $this->storeLocalFiles = config('app')['env'] == 'local' ? $dados['gravar_arquivos_locais'] : false;
    $inputs['entidade'] = $dados['entidade_id'];
    $inputs['unidades'] = $dados['atualizar_unidades'];
    $inputs['servidores'] = $dados['atualizar_servidores'];
    $inputs['gestores'] = $dados['atualizar_gestores'];
    $dados['usar_arquivos_locais'] = $this->useLocalFiles; // Atualiza esse parâmetro para que seja salvo no banco corretamente.
    $dados['gravar_arquivos_locais'] = $this->storeLocalFiles; // Atualiza esse parâmetro para que seja salvo no banco corretamente.
    $this->sincronizacao($inputs);
    $unidadeLogin = Auth::user()->areasTrabalho[0]->unidade;
    return $this->store(array_merge($dados, [
      'usuario_id' => $usuario_id,
      'data_execucao' => $this->unidadeService->hora($unidadeLogin->id),
      'resultado' => json_encode($this->result)
    ]), null);
  }

  /**
   * Método usado quando a rotina de Integração é chamada direto na linha de comando:
   * curl -G 'http://localhost/api/integracao' -d servidores=true -d unidades=true -d entidade=? -H 'X-ENTIDADE: SIGLA(ID) da Unidade (tabela tenant)'
   */
  public function sincronizar($inputs)
  {
    SiapeLog::info("Iniciando sincronização de dados do SIAPE");
    $inputs['entidade_id'] = $inputs['entidade'];
    $this->echo = true;

    // Validação manual de dados passados na requisição de integração.
    if (!empty($inputs['unidades'])) {
      $inputs['unidades'] = strtolower(trim($inputs['unidades']));
      $inputs['unidades'] = ($inputs['unidades'] == 'true' or $inputs['unidades'] == '1') ? boolval(1) : boolval(0);
    } else {
      $inputs['unidades'] = boolval(0);
    };

    if (!empty($inputs['servidores'])) {
      $inputs['servidores'] = strtolower(trim($inputs['servidores']));
      $inputs['servidores'] = ($inputs['servidores'] == 'true' or $inputs['servidores'] == '1') ? boolval(1) : boolval(0);
    } else {
      $inputs['servidores'] = boolval(0);
    };

    $this->sincronizacao($inputs);
    $this->logSiape("Sincronização de dados do SIAPE finalizada", [], Tipo::INFO);

    $integracao = $this->store([
      'entidade_id' => $inputs['entidade'],
      'atualizar_unidades' => $this->validaInput($inputs['unidades']),
      'atualizar_servidores' => $this->validaInput($inputs['servidores']),
      'atualizar_gestores' => true,
      'usar_arquivos_locais' => $this->useLocalFiles,
      'gravar_arquivos_locais' => $this->storeLocalFiles,
      'usuario_id' => null,
      'data_execucao' => Carbon::now(),
      'resultado' => json_encode($this->result, JSON_UNESCAPED_UNICODE)
    ], null);

    return $integracao->resultado;
  }

  private function validaInput($input): bool
  {
    if (is_bool($input)) {
      return $input;
    }
    return $input == "false" ? false : true;
  }

  public function sincronizacao($inputs)
  {
    //ob_start(); // Inicia o buffer de saída.
    // ob_implicit_flush(true); // Libera a chamada explícita para o output buffer.
    ini_set('memory_limit', '-1');
    ini_set('default_socket_timeout', 3000); // 5 minutos.
    set_time_limit(0);
    /**
     * @var IntegracaoService $self
     */
    $self = $this;
    $this->result = [
      'unidades' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
      'servidores' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
      'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []]
    ];
    $token = $this->useLocalFiles ? "LOCAL" : $this->getToken($this->integracao_config);
    $entidade_id = $inputs["entidade"] ?: "";
    $xmlStream = "";
    LogError::newWarn("Sincronizar Entidade: " . $entidade_id);
    // Atualização das unidades.
    if (!empty($inputs['unidades']) && $inputs['unidades'] && !empty($entidade_id)) {
      SiapeLog::info("Iniciando sincronização de Unidades");
      try {
        $uos = $this->IntegracaoSiapeService->retornarUorgs()["uorg"];
        SiapeLog::info("Concluída a fase de obtenção dos dados das unidades informados pelo SIAPE!.....");

        DB::transaction(function () use (&$uos, &$self) {
          foreach ($uos as $uo) {
            $uorg_codigo = UtilService::valueOrDefault($uo["id_servo"]);
            $uorg_ativa = UtilService::valueOrDefault($uo["ativa"]) == 'true';

            $query_iu = DB::table('integracao_unidades')->where('id_servo', $uorg_codigo);
            $query_u = DB::table('unidades')->where('codigo', $uorg_codigo);

            $uorg_siape_data_modificacao = UtilService::asTimeStamp(UtilService::valueOrDefault($uo["data_modificacao"]));

            // Não apagar o comentário, por favor. :)
            # $uorg_siape_data_modificacao = UtilService::asTimeStamp(UtilService::valueOrDefault($uo["data_modificacao"]));
            $iu_data_modificacao = UtilService::asTimeStamp(UtilService::valueOrDefault($query_iu->value('data_modificacao')));
            $u_data_modificacao = UtilService::asTimeStamp(UtilService::valueOrDefault($query_u->value('data_modificacao')));

            if (!empty($uorg_codigo) && $uorg_ativa) {
              $tel = UtilService::valueOrDefault($uo["telefone"], null);
              if (
                !is_null($tel) && strlen($tel) == 19 &&
                substr($tel, 0, 3) == '000' &&
                substr($tel, 14, 5) == '00000'
              ) {
                $tel = substr($tel, 3, 2) . substr($tel, 6, 8);
              }

              $sigla = UtilService::valueOrDefault($uo["siglauorg"], null);
              if (!is_null($sigla)) {
                $sigla = mb_strtoupper(trim($sigla), 'UTF-8');
              }

              $email = UtilService::valueOrDefault($uo["email"], null);
              if (!is_null($email)) {
                $email = mb_strtolower(trim($email), 'UTF-8');
              }

              $cod_municipio_ibge = UtilService::valueOrDefault($uo["municipio_ibge"], null);
              $municipio_nome = UtilService::valueOrDefault($uo["municipio_nome"], null);
              if (!is_null($cod_municipio_ibge)) {
                $query = "SELECT nome FROM cidades where codigo_ibge = :cod_municipio_ibge";
                $db_result = DB::select($query, ["cod_municipio_ibge" => $cod_municipio_ibge]);
                if (is_array($db_result) && !empty($db_result)) $municipio_nome = $db_result[0]->nome;
              }

              $nomeuorg = UtilService::valueOrDefault($uo["nomeuorg"], null);

              if (!is_null($nomeuorg)) $nomeuorg = UtilService::getNomeFormatado($nomeuorg);
              $unidade = [
                'id_servo' => UtilService::valueOrDefault($uo["id_servo"], null, $option = "uorg"),
                'pai_servo' => UtilService::valueOrDefault($uo["pai_servo"], null, $option = "uorg"),
                'codigo_siape' => UtilService::valueOrDefault($uo["codigo_siape"], null, $option = "uorg"),
                'pai_siape' => UtilService::valueOrDefault($uo["pai_siape"], null, $option = "uorg"),
                'codupag' => UtilService::valueOrDefault($uo["codupag"], null, $option = "uorg"),
                'nomeuorg' => $nomeuorg,
                'siglauorg' => $sigla,
                'telefone' => $tel,
                'email' =>  $email,
                'natureza' => UtilService::valueOrDefault($uo["natureza"], null),
                'fronteira' => UtilService::valueOrDefault($uo["fronteira"], null),
                'fuso_horario' => UtilService::valueOrDefault($uo["fuso_horario"], null),
                'cod_uop' => UtilService::valueOrDefault($uo["cod_uop"], null, $option = "uorg"),
                'cod_unidade' => UtilService::valueOrDefault($uo["cod_unidade"], null, $option = "uorg"),
                'tipo' => UtilService::valueOrDefault($uo["tipo"], null),
                'tipo_desc' => UtilService::valueOrDefault($uo["tipo_desc"], null),
                'na_rodovia' => UtilService::valueOrDefault($uo["na_rodovia"], null),
                'logradouro' => UtilService::valueOrDefault($uo["logradouro"], null),
                'bairro' => UtilService::valueOrDefault($uo["bairro"], null),
                'cep' => UtilService::valueOrDefault($uo["cep"], null),
                'ptn_ge_coordenada' => UtilService::valueOrDefault($uo["ptn_ge_coordenada"], null),
                'municipio_siafi_siape' => UtilService::valueOrDefault($uo["municipio_siafi_siape"], null),
                'municipio_siscom' => UtilService::valueOrDefault($uo["municipio_siscom"], null),
                'municipio_ibge' => $cod_municipio_ibge,
                'municipio_nome' => $municipio_nome,
                'municipio_uf' => UtilService::valueOrDefault($uo["municipio_uf"], null),
                'ativa' => UtilService::valueOrDefault($uo["ativa"]),
                'regimental' => UtilService::valueOrDefault($uo["regimental"], null),
                'data_modificacao' => date("Y-m-d H:i:s", $uorg_siape_data_modificacao),
                'und_nu_adicional' => UtilService::valueOrDefault($uo["und_nu_adicional"], null),
                'cnpjupag' => UtilService::valueOrDefault($uo["cnpjupag"], null),
                'cpf_titular_autoridade_uorg' =>  UtilService::valueOrDefault($uo["cpf_titular_autoridade_uorg"], null),
                'cpf_substituto_autoridade_uorg' => UtilService::valueOrDefault($uo["cpf_substituto_autoridade_uorg"], null),
                'deleted_at' => null,
              ];

              if (empty($query_iu->value('id_servo'))) {
                SiapeLog::info("Salvando unidade na tabela Integracao unidade", $unidade);
                $registro = new IntegracaoUnidade($unidade);
                $registro->save();
              } else if ((!empty($query_iu->value('id_servo'))  &&  ($uorg_siape_data_modificacao > $iu_data_modificacao || $uorg_siape_data_modificacao > $u_data_modificacao)) ||
                (!empty($query_iu->value('id_servo')) && $query_iu->value('deleted_at'))
              ) {
                SiapeLog::info("Atualizando unidade na tabela Integracao unidade", $unidade);
                // Atualiza informações de unidade que já existe na tabela integracao_unidades ou remove dados(soft delete).
                $query_iu->update($unidade);
              }
            }
          }
        });

        /*
        Remover uorgs que não existem mais no SIAPE/WSO2, mas ainda constam na tabela integracao_unidades.
        As unidades que não existem mais no SIAPE/WSO2 serão desativadas.
        */
        $unidades_siape =  array_map(function ($uorg) {
          if (!empty($uorg['id_servo'])) return $uorg['id_servo'];
        }, $uos);

        $unidades_integracao = DB::table("integracao_unidades")->get('id_servo')->values('id_servo')->toArray();

        $unidades_integracao = array_map(function ($uorg) {
          if (!empty($uorg->id_servo)) return $uorg->id_servo;
        }, $unidades_integracao);

        //TODO esse codigo será removido e passado para um job a parte.

        // $unidades_integracao_remover = array_diff($unidades_integracao, $unidades_siape);
        // $datahora_remocao = Carbon::now();
        // $unidades_integracao_remover ? DB::table('integracao_unidades')->wherein('id_servo', $unidades_integracao_remover)->update(['deleted_at' => $datahora_remocao]) : true;
        // $this->logSiape("Unidades removidas da tabela integracao_unidades", $unidades_integracao_remover, Tipo::INFO);
        SiapeLog::info("Concluída a fase de reconstrução da tabela integracao_unidades!.....");
        $n = IntegracaoUnidade::count();
        array_push($this->result['unidades']["Observações"], 'Total de unidades importadas do SIAPE: ' . $n . ' (apenas ATIVAS)');
        array_push($this->result['unidades']['Observações'], 'Os dados das Unidades foram obtidos ' . ($this->useLocalFiles ? 'através de arquivo XML armazenado localmente!' : 'através de consulta à API do SIAPE!'));

        $this->processaUnidadeRaiz();
        /**
         * Insere as unidades faltantes ou atualiza dados e seus respectivos pais.
         * OBS.: Não vejo a diferença de usar :entidade_id para restringir as Unidades.
         * OBS.: Essa rotina de integração vai rodar nos diversos servidores onde estarão instaladas a aplicação... então ela tem que atualizar
         * todas as Unidades do SIAPE, de todas as agências que usarão o sistema. O ideal é essa consulta_sql utilizar um parâmetro de
         * identificação da entidade, presente no arquivo de configuração.
         */
        $this->unidadesSelecionadas = [];
        $consulta_sql = "" .
          "SELECT iu.id_servo, u.codigo as codigo_antigo, " .
          "iu.nomeuorg, u.nome as nome_antigo, iu.siglauorg, " .
          "u.sigla as sigla_antiga, iu.pai_servo, " .
          "un_atual_pai.id as id_pai_antigo, u.id, u.path as path_antigo, " .
          "c.id AS cidade_id, u.cidade_id as cidade_antiga, " .
          "und.id AS unidade_pai_id, un_atual_pai.codigo AS codigo_pai_antigo, " .
          "und.path AS path_pai, " .
          "iu.data_modificacao as data_modificacao_siape, " .
          "u.data_modificacao as data_modificacao_und " .
          "" .
          "FROM integracao_unidades iu " .
          "" .
          "LEFT JOIN unidades u ON (iu.id_servo = u.codigo) " .
          "LEFT JOIN unidades un_atual_pai ON (un_atual_pai.id = u.unidade_pai_id) " .
          "LEFT JOIN unidades und ON (iu.pai_servo = und.codigo) " .
          "LEFT JOIN cidades c ON (iu.municipio_ibge = c.codigo_ibge) " .
          "LEFT JOIN cidades c2 ON u.cidade_id = c2.id " .
          "" .
          "WHERE (u.id is null OR c2.id != c.id OR iu.nomeuorg != u.nome " .
          "OR iu.siglauorg != u.sigla " .
          "OR iu.pai_servo != " .
          "(SELECT codigo as cod_unidade_pai FROM unidades u2 " .
          "WHERE id = u.unidade_pai_id)" .
          ") AND iu.ativa = 'true' AND iu.deleted_at is NULL";

        $this->unidadesSelecionadas = DB::select($consulta_sql);
        // Executa atualizações das unidades caso necessário.
        if (!empty($this->unidadesSelecionadas)) {
          SiapeLog::info("Iniciando atualização de unidades selecionadas", ['count' => count($this->unidadesSelecionadas)]);
          DB::transaction(function () use (&$self, $entidade_id) {
            foreach ($self->unidadesSelecionadas as $unidade) {
              SiapeLog::info("Iniciando atualização de unidade", (array) $unidade);
              $db_result = $self->deepReplaceUnidades($unidade, $entidade_id);
            }
          });
        }

        # (RN_UND_E) Quando utilizando integração com o SIAPE, as unidades serão inativadas quando não constarem na lista de unidades vindas do SIAPE, exceto as que se enquadrarem na regra RN_UND_F.
        # (RN_UND_F) Unidades cadastradas (com código vazio) devem permanecer ATIVO mesmo após a execução da rotina de integração com o SIAPE.

        // *** Comentários originários ***
        // Seta inativo nas unidades que não existem em integracao_unidades e garante que não esteja inativo as que existem em integracao_unidades.
        // Agora, essa desativação é baseada no soft delete. As unidades permanecem na tabela integracao_unidades, porém com parâmetro deleted_at configurado.

        //TODO esse codigo será removido e passado para um job a parte.
        // $DbResultDesativadas = $this->inativadas = DB::update("UPDATE unidades AS u SET data_inativacao = NOW() WHERE data_inativacao IS NULL AND u.codigo IS NOT NULL and u.codigo != '' AND EXISTS (SELECT id FROM integracao_unidades iu WHERE iu.id_servo = u.codigo AND iu.deleted_at IS NOT NULL)");
        $DbResultAtivadas = $this->ativadas = DB::update("UPDATE unidades AS u SET data_inativacao = NULL WHERE data_inativacao IS NOT NULL AND EXISTS (SELECT id FROM integracao_unidades iu WHERE iu.id_servo = u.codigo AND iu.deleted_at IS NULL);");

        $this->result['unidades']['Resultado'] = 'Sucesso';
        array_push($this->result['unidades']['Observações'], 'Na tabela Unidades do Petrvs constam agora ' . DB::table('unidades')->get()->count() . ' unidades!');
        $this->result['unidades']['Observações'] = [...$this->result['unidades']['Observações'], ...array_filter([
          count($this->unidadesInseridas) . (count($this->unidadesInseridas) == 1 ? ' unidade nova informada pelo SIAPE foi inserida no Petrvs!' : ' unidades novas informadas pelo SIAPE foram inseridas no Petrvs!'),
          count($this->paisAlterados) . (count($this->paisAlterados) == 1 ? ' unidade sofreu alteração na hierarquia e possivelmente em outros dados e foi atualizada!' : ' unidades sofreram alteração na hierarquia e possivelmente em outros dados e foram atualizadas!'),
          $this->filhasAlteradas . ($this->filhasAlteradas == 1 ? ' unidade filha teve seu path alterado porque sua Unidade-pai mudou sua posição hierárquica!' : ' unidades filhas tiveram seus paths alterados porque sua Unidade-pai mudou sua posição hierárquica!'),
          count($this->unidadesAlteradas) . (count($this->unidadesAlteradas) == 1 ? ' unidade manteve sua hierarquia mas sofreu alteração em outros dados e foi atualizada!' : ' unidades mantiveram sua hierarquia mas sofreram alteração em outros dados e foram atualizadas!'),
          $this->inativadas . ($this->inativadas == 1 ? ' unidade do Petrvs foi INATIVADA porque não existe ou já está inativa no SIAPE!' : ' unidades do Petrvs foram INATIVADAS porque não existem ou já estão inativas no SIAPE!'),
          $this->ativadas . ($this->ativadas == 1 ? ' unidade foi ATIVADA no Petrvs porque constava como inativa mas ainda está ativa no SIAPE!' : ' unidades foram ATIVADAS no Petrvs porque constavam como inativas mas ainda estão ativas no SIAPE!')
        ], fn($o) => intval(substr($o, 0, strpos($o, 'unidade') - 1)) > 0)];
        // Unidades que foram removidas em integracao_unidades vão permanecer no sistema por questões de integridade.
      } catch (Throwable $e) {
        SiapeLog::info(sprintf("Erro ao importar unidades: %s", $e->getMessage()));
        LogError::newError("Erro ao importar unidades", $e);
        $this->result['unidades']['Resultado'] = 'ERRO: ' . $e->getMessage();
      }
    }
    SiapeLog::info("Concluída a fase de atualização da tabela unidades ou opção não selecionada!.....");

    if (!empty($inputs["servidores"]) && $inputs["servidores"] && !empty($entidade_id)) {
      SiapeLog::info("Iniciando sincronização de Servidores");
      try {
        $servidores = [];
        $servidores = $this->IntegracaoSiapeService->retornarServidores()["Pessoas"];
        SiapeLog::info("Concluída a fase de obtenção dos dados dos servidores informados pelo SIAPE.....");

        DB::transaction(function () use (
          &$servidores,
        ) {

          $integracaoServidoresRepository = new IntegracaoServidorRepository(new IntegracaoServidor);
          try {
            $integracaoServidorProcessar =  new Integracao($integracaoServidoresRepository);
          } catch (Throwable $e) {
            LogError::newError("Erro ao truncar a tabela integracao_servidores", $e);
            SiapeLog::info(sprintf("Erro ao truncar a tabela integracao_servidores: %s", $e->getMessage()), throwableToArray($e));
          }
          $this->logSiape("Iniciando processo de atualização de servidores", [], Tipo::INFO);
          $integracaoServidorProcessar->setServidores($servidores)->setEcho($this->echo)->setIntegracaoConfig($this->integracao_config)
            ->setResult($this->result);
          $integracaoServidorProcessar->processar();

          $this->result = $integracaoServidorProcessar->getResult();
        });


        // Seleciona todos os servidores que sofreram alteração nos seus dados pessoais ou atingiu critério quanto data_modificação.
        $atualizacoesDados = DB::select(
          "SELECT
        u.id,
        isr.matriculasiape,
        isr.cpf AS cpf_servidor,
        u.nome AS nome_anterior,
        isr.nome AS nome_servidor,
        u.apelido AS apelido_anterior,
        isr.nomeguerra AS nome_guerra,
        u.email AS email_anterior,
        isr.emailfuncional,
        u.telefone AS telefone_anterior,
        isr.telefone,
        isr.data_modificacao AS data_modificacao,
        u.data_modificacao AS data_modificacao_anterior,
        isr.data_nascimento,
        isr.ident_unica AS ident_unica,
        u.ident_unica AS ident_unica_anterior,
        u.nome_jornada AS nome_jornada_antigo,
        isr.nome_jornada AS nome_jornada,
        u.cod_jornada AS cod_jornada_antigo,
        isr.cod_jornada AS cod_jornada,
        u.tipo_modalidade_id AS tipo_modalidade_id_anterior,
        isr.modalidade_pgd,
        u.participa_pgd AS participa_pgd_anterior,
        isr.participa_pgd
    FROM
        integracao_servidores isr
        LEFT JOIN usuarios u ON (isr.matriculasiape = u.matricula)
    WHERE
        isr.nome != u.nome OR
        isr.emailfuncional != u.email OR
        isr.nomeguerra != u.apelido OR
        isr.telefone != u.telefone OR
        (isr.nome_jornada != u.nome_jornada OR isr.nome_jornada IS NOT NULL AND u.nome_jornada IS NULL) OR
        (isr.cod_jornada != u.cod_jornada OR isr.cod_jornada IS NOT NULL AND u.cod_jornada IS NULL) OR
        (isr.modalidade_pgd IS NOT NULL AND u.tipo_modalidade_id IS NULL) OR
        (isr.participa_pgd != u.participa_pgd OR isr.participa_pgd IS NOT NULL AND u.participa_pgd IS NULL) OR
        (isr.data_modificacao > u.data_modificacao OR isr.data_modificacao IS NOT NULL AND u.data_nascimento IS NULL )
        "
        );
        $sqlUpdateDados = "UPDATE usuarios SET " .
          "nome = :nome, apelido = :nomeguerra, " .
          "email = :email, " .
          "ident_unica = :ident_unica, " .
          "cod_jornada = :cod_jornada, " .
          "nome_jornada = :nome_jornada, " .
          "data_nascimento = :data_nascimento, " .
        "tipo_modalidade_id = :tipo_modalidade_id, " .
          "participa_pgd = :participa_pgd, " .
          "data_modificacao = :data_modificacao WHERE id = :id";

        // Adicionar algoritmo para trocar lotação.
        // Se não conseguir mudar, avisar no log uma vez que virá mensagem do salvarIntegrantes.

        $atualizacoesLotacoes = DB::select(
          "SELECT usuario.id AS usuario_id, isr.nome AS nome, " .
            "  u.codigo AS exercicio_antigo, " .
            "  isr.codigo_servo_exercicio AS exercicio_atual, " .
            "  u.id AS exercicio_antigo_id, " .

            "(SELECT u2.id " .
            "FROM unidades AS u2 " .
            "WHERE isr.codigo_servo_exercicio = u2.codigo LIMIT 1) AS exercicio_atual_id, " .

            " uia.atribuicao AS atribuicao " .

            "FROM unidades_integrantes_atribuicoes AS uia " .
            "JOIN unidades_integrantes AS ui ON ui.id = uia.unidade_integrante_id " .
            "JOIN unidades AS u ON ui.unidade_id = u.id " .
            "JOIN usuarios AS usuario ON ui.usuario_id = usuario.id " .
            "JOIN integracao_servidores AS isr ON isr.matriculasiape = usuario.matricula " .
            "WHERE uia.atribuicao = 'LOTADO' AND u.codigo <> isr.codigo_servo_exercicio and ui.deleted_at IS NULL " .
            "AND uia.deleted_at IS NULL " .
            "ORDER BY exercicio_antigo ASC"
        );


        $sqlServidoresInseridosNaoLotados = DB::select(
          "SELECT u.id AS usuario_id, un.id AS unidade_id , u.matricula
          FROM usuarios AS u
          INNER JOIN integracao_servidores AS ius ON u.matricula = ius.matriculasiape
          INNER JOIN unidades AS un ON un.codigo = ius.codigo_servo_exercicio
          WHERE u.id NOT IN
              (SELECT u.id
              FROM usuarios AS u
              INNER JOIN integracao_servidores AS ius ON u.matricula = ius.matriculasiape
              INNER JOIN unidades_integrantes AS ui ON u.id = ui.usuario_id
              INNER  JOIN unidades_integrantes_atribuicoes AS uia ON ui.id = uia.unidade_integrante_id
              WHERE uia.atribuicao = 'LOTADO'
                AND uia.deleted_at IS NULL
              GROUP BY u.id)"
        );
        $atualizacoesLotacoesResult = [];

        $this->processarAtualizacoesDados($atualizacoesDados, $sqlUpdateDados);

        DB::transaction(function () use (&$atualizacoesDados, &$atualizacoesLotacoes, &$sqlServidoresInseridosNaoLotados, &$atualizacoesLotacoesResult) {

          $this->atualizarMatriculasUsuariosSemMatricula();

          if (!empty($sqlServidoresInseridosNaoLotados)) {
            foreach ($sqlServidoresInseridosNaoLotados as $inserirLotacao) {

              if (empty($inserirLotacao->unidade_id)) {
                SiapeLog::info(sprintf("O servidor cpf #%s não tem unidade de  exercicio, não será alocado", $inserirLotacao['cpf']));
                continue;
              }

              $vinculo = array([
                'usuario_id' => $inserirLotacao->usuario_id,
                'unidade_id' => $inserirLotacao->unidade_id,
                'atribuicoes' => ["LOTADO"],
              ]);
              try {
                $dbResult = $this->unidadeIntegrante->salvarIntegrantes($vinculo, false);
              } catch (\Throwable $th) {
                report($th);
                SiapeLog::error("IntegracaoService: Durante integração não foi possível alterar lotação!", [$vinculo]);
              }
              if (!isset($dbResult)) {
                SiapeLog::error("IntegracaoService: Houve uma falha na tentantiva de alterar a lotação", [$vinculo]);
              } else {
                array_push($atualizacoesLotacoesResult, $dbResult);
              }
            }
          }

          if (!empty($atualizacoesLotacoes)) {
            foreach ($atualizacoesLotacoes as $linha) {
              $usuarioId = $linha->usuario_id;

              if (isset($linha->exercicio_atual_id)) {
                $unidadeExercicioId = $linha->exercicio_atual_id;
              } else {
                //FIXME não sera mais alocado em nenhuma unidade se não existir.
                // $unidadeExercicioId = $unidadeExercicioRaizId;
                SiapeLog::error("IntegracaoService: Durante atualização de lotações, agente público informou unidade de exercício não ativa ou inexistente.", [$linha]);
                continue;
              }

              $vinculo = array([
                'usuario_id' => $usuarioId,
                'unidade_id' => $unidadeExercicioId,
                'atribuicoes' => ["LOTADO"],
              ]);
              try {
                $dbResult = $this->unidadeIntegrante->salvarIntegrantes($vinculo, false);
              } catch (\Throwable $th) {
                SiapeLog::error("IntegracaoService: Durante integração não foi possível alterar lotação!", [$dbResult, $vinculo]);
              }
              if (!$dbResult) {
                SiapeLog::error("IntegracaoService: Houve uma falha na tentantiva de alterar a lotação", [$dbResult, $vinculo]);
              } else {
                array_push($atualizacoesLotacoesResult, $dbResult);
              }
            }
          }
          SiapeLog::info('Concluída a fase de atualização de servidores que apresentaram alteração nos seus dados pessoais!.....');

          $n = count($atualizacoesDados);
          $nLotacoes = count($atualizacoesLotacoes);

          if ($n > 0) array_push($this->result['servidores']["Observações"], $n . ($n == 1 ? ' servidor foi atualizado porque sofreu alteração em seus dados pessoais!' : ' servidores foram atualizados porque sofreram alteração em seus dados pessoais!'));
          if ($nLotacoes > 0) array_push($this->result['servidores']["Observações"], $n . ($n == 1 ? ' servidor foi atualizado porque sofreu alteração na sua lotação!' : ' servidores foram atualizados porque sofreram alterações nas lotações!'));

          /**
           * Incluir todos servidores da tabela integracao_servidores que não estejam na tabela usuarios.
           * Foi modificado a ideia original onde era uma opção o autoincluir.
           * Obs.:: Inserção de novos servidores automaticamente.
           */

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
            "isr.ident_unica as ident_unica, " .
            "isr.modalidade_pgd, ".
            "isr.funcoes as gestor " .
            "FROM integracao_servidores as isr LEFT JOIN usuarios as u " .
            "ON isr.matriculasiape = u.matricula " .
            "WHERE u.matricula is NULL";

          $vinculos_isr = DB::select($query);

          $usuarioComum = $this->integracao_config["perfilComum"];
          $perfilParticipante = $this->nivelAcessoService->getPerfilParticipante();
          $perfilParticipanteId = null;
          if (!empty($perfilParticipante)) $perfilParticipanteId = $perfilParticipante->id;

          if (empty($perfilParticipanteId)) throw new ServerException("ValidateUsuario", "Perfil usuário comum (" . $usuarioComum . ") não encontrado no banco de dados. Verificar configuração no painel SaaS.\n[ver XXX_XXX]");
          
          $tipoModalidadeNaoIdentificada = $this->validarModalidadePgd('');
          
          if (empty($vinculos_isr) || !is_array($vinculos_isr)) {
            SiapeLog::info("Não foram encontrados servidores para serem inseridos na tabela usuários.");
          }

          foreach ($vinculos_isr as $v_isr) {
            $v_isr = UtilService::object2array($v_isr);
            $cpfCheck = UtilService::valueOrDefault($v_isr['cpf']);
            $matriculaNova = UtilService::valueOrDefault($v_isr['matricula']);
            $codigoExercicio = UtilService::valueOrDefault($v_isr['exercicio']);
            $tipoModalidadePgd = UtilService::valueOrDefault($v_isr['modalidade_pgd']);
            $unidadeExercicio = Unidade::where('codigo', $codigoExercicio)->first();
            $unidadeExercicioIdCheck = isset($unidadeExercicio->id) ? $unidadeExercicio->id : null;

           if(!$this->verificaSeUsuarioSoMudouMatricula($cpfCheck, $unidadeExercicioIdCheck, $matriculaNova, $codigoExercicio)) {
            continue;
           }

          $tipoModalidadePgd = empty($tipoModalidadePgd)? $tipoModalidadeNaoIdentificada : $this->validarModalidadePgd($tipoModalidadePgd);
           
           $registro = new Usuario([
              'id' => Uuid::uuid4(),
              'email' => UtilService::valueOrDefault($v_isr['emailfuncional']),
              'nome' => UtilService::valueOrDefault($v_isr['nome']),
              'cpf' => UtilService::valueOrDefault($v_isr['cpf']),
              'matricula' => UtilService::valueOrDefault($v_isr['matricula']),
              'apelido' => UtilService::valueOrDefault($v_isr['apelido']),
              'telefone' => UtilService::valueOrDefault($v_isr['telefone'], null),
              'data_nascimento' => UtilService::valueOrDefault($v_isr['data_nascimento'], null),
              'sexo' => UtilService::valueOrDefault($v_isr['sexo']),
              'situacao_funcional' => UtilService::valueOrDefault($v_isr['situacao_funcional'], "DESCONHECIDO"),
              'perfil_id' => $perfilParticipanteId,
              'tipo_modalidade_id' => $tipoModalidadePgd,
              'exercicio' => UtilService::valueOrDefault($v_isr['exercicio']),
              'uf' => UtilService::valueOrDefault($v_isr['uf'], null),
              'data_modificacao' => UtilService::asDateTime($v_isr['data_modificacao']),
              'ident_unica' => UtilService::valueOrDefault($v_isr['ident_unica']),
            ]);

            $this->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($registro->email, $registro->matricula);

            SiapeLog::info("Inserindo servidor na tabela Usuários", $registro->toArray());
            $registro->save();

            $usuarioId = $registro->id;

            $unidadeExercicioId = null;
            $unidadeExercicioId = Unidade::where("codigo", $v_isr["exercicio"])->first();
            isset($unidadeExercicioId->id) ? $unidadeExercicioId = $unidadeExercicioId->id : $unidadeExercicioId = null;

            if (is_null($unidadeExercicioId)) {
              SiapeLog::info(sprintf("O servidor matricula #%s não tem unidade de  exercicio, não será alocado", $registro['matricula']));
              continue;
            }

            $queryAtribuicoes = $registro->getUnidadesAtribuicoesAttribute();
            $atribuicoes = [];

            if (!empty($queryAtribuicoes) && is_array($queryAtribuicoes) && array_key_exists($unidadeExercicioId, $queryAtribuicoes) && $queryAtribuicoes[$unidadeExercicioId]) {
              $atribuicoes = $queryAtribuicoes[$unidadeExercicioId];
              if (!in_array("LOTADO", $atribuicoes)) array_push($atribuicoes, "LOTADO");
              $atribuicoes = array_values(array_unique($atribuicoes));
            } else {
              $atribuicoes = ["LOTADO"];
            }

            $vinculo = array([
              'usuario_id' => $usuarioId,
              'unidade_id' => $unidadeExercicioId,
              'atribuicoes' => $atribuicoes,
            ]);

            $this->unidadeIntegrante->salvarIntegrantes($vinculo, false);
          }
          SiapeLog::info('Concluída a fase de atualização das lotações dos servidores!.....');
        });

        $this->result['servidores']['Resultado'] = 'Sucesso';
        array_push($this->result['servidores']["Observações"], 'Na tabela Usuários constam agora ' .
          Usuario::count() . ' servidores!');
      } catch (Throwable $e) {
        report($e);
        SiapeLog::info("Erro ao importar servidores: " . $e->getMessage());
        LogError::newError("Erro ao importar servidores", $e);
        $this->result["servidores"]['Resultado'] = 'ERRO: ' . $e->getMessage() . ' - Linha: ' . $e->getLine();
      }
    }

    /**
     * Atualização dos Gestores.
     */
    $this->result["gestores"] = $this->integracaoGestorService->atualizarGestores($inputs, $this->integracao_config);
  }

  private function verificaSeUsuarioSoMudouMatricula(string $cpfCheck, ?string $unidadeExercicioIdCheck, string $matriculaNova, string $codigoExercicio): bool
  {

    if (!empty($cpfCheck) && !empty($unidadeExercicioIdCheck)) {
      $usuarioLotadoMesmaUnidade = DB::table('usuarios as u')
        ->join('unidades_integrantes as ui', 'ui.usuario_id', '=', 'u.id')
        ->join('unidades_integrantes_atribuicoes as uia', 'uia.unidade_integrante_id', '=', 'ui.id')
        ->where('u.cpf', $cpfCheck)
        ->where('ui.unidade_id', $unidadeExercicioIdCheck)
        ->where('uia.atribuicao', 'LOTADO')
        ->whereNull('u.deleted_at')
        ->whereNull('uia.deleted_at')
        ->select('u.id')
        ->orderBy('u.created_at', 'asc')
        ->first();

      if (!empty($usuarioLotadoMesmaUnidade) && isset($usuarioLotadoMesmaUnidade->id)) {
        DB::table('usuarios')
          ->where('id', $usuarioLotadoMesmaUnidade->id)
          ->update(['matricula' => $matriculaNova]);
        SiapeLog::info(sprintf(
          'Atualizada matrícula do usuário CPF %s para %s (unidade exercício código %s) sem criar novo usuário.',
          (string) $cpfCheck,
          (string) $matriculaNova,
          (string) $codigoExercicio
        ));
        return false;
      }
      return true;
    }
    return true;
  }

  public function verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake(string $email, ?string $matricula, string $ignoreId = null): void
  {
    $email = trim(mb_strtolower($email, 'UTF-8'));
    
    $usuarios = Usuario::withoutGlobalScopes()
        ->where('email', $email)
        ->when($ignoreId, function ($query) use ($ignoreId) {
            return $query->where('id', '!=', $ignoreId);
        })
        ->get();

    foreach ($usuarios as $usuario) {
      if (!empty($usuario)) {
        LogError::newError(sprintf("IntegracaoService: Durante integração, foi encontrado email duplicado na tabela usuários. Matricula: %s, Email: %s", $matricula, $email));
        
        $novoemailBase = $usuario->matricula;
        if (empty($novoemailBase)) {
          $novoemailBase = \Illuminate\Support\Str::uuid()->toString();
        }
        
        $novoemail = $novoemailBase . "@petrvs.gov.br";
        
        $this->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($novoemail, $usuario->matricula, $usuario->id);
        
        SiapeLog::info("IntegracaoService: Alterando email duplicado para email fake", ['matricula' => $matricula, 'email' => $email, 'usuario' => $usuario->toJson()]);
        
        DB::table('usuarios')->where('id', $usuario->id)->update(['email' => $novoemail]);
      }
    }
  }

  /**
   * Cria uma lotação para o Usuário, se seus dados já existirem na tabela integracao_servidores,
   * e se ela já constar na tabela Unidades. Salva o novo usuário, independentemente da lotação
   */
  public function salvarUsuarioLotacao(&$usuario, &$lotacao)
  {
    if ($this->fillUsuarioWithSiape($usuario, $lotacao)) { //se quem está logado existe na tabela integracao_servidores
      $perfil_nivel_5_id = $this->nivelAcessoService->getPerfilParticipante()->id;
      $usuario->perfil_id = $perfil_nivel_5_id;
      $this->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($usuario->email, $usuario->matricula, $usuario->id);
      $usuario->save();
      $usuario->fresh();
      if (!empty($lotacao->unidade_id)) { // se sua Unidade estiver cadastrada, insere-se uma lotação principal pra ele
        $lotacao->usuario_id = $usuario->id;
        $lotacao->save();
        $lotacao->refresh();
        UnidadeIntegranteAtribuicao::create(['unidade_integrante_id' => $lotacao->id, 'atribuicao' => 'LOTADO'])->save();
      }
    } else {
      $usuario = null; // se quem está logando não existe na tabela integracao_servidores
    }
  }

  /**
   * SHOW RESPONSÁVEIS
   * Devolve um array de objetos do tipo {'key' => 'value'}, onde 'value' é o nome do usuário que executou alguma vez
   * a rotina de integração e 'key' é o seu ID. No caso de a rotina de integração ter sido executada por um processo/alguém "por fora" do Petrvs,
   * o seu ID será nulo e o nome será setado para "Usuário não logado".
   */
  public function showResponsaveis()
  {
    $a = array_map(fn($u) => ['key' => $u['id'], 'value' => $u['nome']], Usuario::select(['id', 'nome'])->has('integracoes')->get()->toArray());
    $b = array_merge([['key' => "null", 'value' => 'Sistema']], $a);
    usort($b, function ($a, $b) {
      return strnatcmp($a['value'], $b['value']);
    });
    return $b;
  }

  public function buscaProcessamentosPendentes(): array
  {
    $siapeDadosUORG = SiapeDadosUORG::where('processado', 0)->count() > 1;
    $siapeDadosPessoais = SiapeConsultaDadosPessoais::where('processado', 0)->count() > 1;
    $siapeDadosFuncionais = SiapeConsultaDadosFuncionais::where('processado', 0)->count() > 1;

    return [
      'siapeDadosUORG' => $siapeDadosUORG,
      'siapeDadosPessoais' => $siapeDadosPessoais,
      'siapeDadosFuncionais' => $siapeDadosFuncionais
    ];
  }

  private function processaUnidadeRaiz(): void
  {
    $siapeUnidadeRaiz = IntegracaoUnidade::where('pai_servo', self::CODIGO_SIAPE_UNIDADE_RAIZ_PELO_PAI)->first();
    if (is_null($siapeUnidadeRaiz)) {
      SiapeLog::info("Unidade raiz nao encontrada na tabela de integracao_unidades.");
      return;
    }

    $unidadeRaiz = Unidade::where('sigla', $siapeUnidadeRaiz->siglauorg)->first();
    if (is_null($unidadeRaiz)) {
      SiapeLog::info(sprintf("Unidade raiz %s nao encontrada na tabela de unidades.", $siapeUnidadeRaiz->siglauorg));
      return;
    }

    if ($unidadeRaiz->codigo != $siapeUnidadeRaiz->codigo_siape) {
      $unidadeRaiz->codigo = $siapeUnidadeRaiz->codigo_siape;
      SiapeLog::info(sprintf("Corrigindo unidade raiz %s", $siapeUnidadeRaiz->siglauorg));
      $unidadeRaiz->save();
    }
  }
protected function validarModalidadePgd($modalidadeString)
  {
    $fallbackId = DB::table('tipos_modalidades')
      ->where('nome', 'Sem dados do SIAPE')
      ->whereNull('deleted_at')
      ->value('id');

    if (empty($modalidadeString)) {
      return $fallbackId;
    }

    if (preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $modalidadeString)) {
      $tipoId = DB::table('tipos_modalidades_siape')
        ->where('id', $modalidadeString)
        ->value('tipo_modalidade_id');
      return $tipoId ?? $fallbackId;
    }

    $tipoId = DB::table('tipos_modalidades_siape')
      ->where('nome', $modalidadeString)
      ->value('tipo_modalidade_id');

    if ($tipoId) {
      SiapeLog::info("Modalidade '{$modalidadeString}' convertida para TipoModalidade: {$tipoId}");
      return $tipoId;
    }

    SiapeLog::warning("Modalidade '{$modalidadeString}' não encontrada na tabela tipos_modalidades_siape. Valor será definido para 'Sem dados do SIAPE'.");
    return $fallbackId;
  }  
  
  private function atualizarMatriculasUsuariosSemMatricula(): void
  {
    try {
      $usuariosSemMatricula = DB::table('usuarios')
        ->whereNull('deleted_at')
        ->where(function ($q) {
          $q->whereNull('matricula')
            ->orWhere('matricula', '');
        })
        ->whereNotNull('cpf')
        ->whereRaw("cpf <> ''")
        ->select('id', 'cpf')
        ->get();

      if ($usuariosSemMatricula->isEmpty()) {
        return;
      }

      foreach ($usuariosSemMatricula as $usr) {
        $matriculaSiape = DB::table('integracao_servidores')
          ->where('cpf', $usr->cpf)
          ->value('matriculasiape');

        if (!empty($matriculaSiape)) {
          DB::table('usuarios')
            ->where('id', $usr->id)
            ->update(['matricula' => $matriculaSiape]);
          SiapeLog::info(sprintf("Atualizada matrícula do usuário id=%s a partir do SIAPE.", $usr->id));
        } else {
          SiapeLog::warning(sprintf("Matrícula SIAPE não encontrada para usuário id=%s com CPF %s.", $usr->id, $usr->cpf));
        }
      }
    } catch (Throwable $e) {
      report($e);
      SiapeLog::error(sprintf("Erro ao atualizar matrículas de usuários sem matrícula: %s", $e->getMessage()));
    }
  }
  
  private function verificarUsuariosExternosIntegracao(): void
  {
    try {
      $usuariosExternos = DB::select(
        "SELECT u.* FROM usuarios AS u 
         INNER JOIN integracao_servidores AS ise ON u.matricula = ise.matriculasiape 
         WHERE u.usuario_externo = 1"
      );

      if (empty($usuariosExternos)) {
        return;
      }

      SiapeLog::info(sprintf("Encontrados %d usuários externos para atualizar.", count($usuariosExternos)));

      foreach ($usuariosExternos as $usuarioData) {
        DB::update(
          "UPDATE usuarios SET usuario_externo = 0 WHERE id = ?",
          [$usuarioData->id]
        );

        $usuario = Usuario::find($usuarioData->id);
        if ($usuario && $usuario->perfil) {
          $perfilColaborador = $this->nivelAcessoService->getPerfilColaborador();
          $perfilParticipante = $this->nivelAcessoService->getPerfilParticipante();

          if ($perfilColaborador && $perfilParticipante && 
              $usuario->perfil->id === $perfilColaborador->id) {
            $this->perfilService->alteraPerfilUsuario($usuario->id, $perfilParticipante->id);
            SiapeLog::info(sprintf(
              "Usuário %s (%s) teve perfil alterado de Colaborador para Participante.",
              $usuario->nome,
              $usuario->matricula
            ));
          }
        }

        SiapeLog::info(sprintf(
          "Usuário %s (%s) atualizado: usuario_externo = 0.",
          $usuarioData->nome,
          $usuarioData->matricula
        ));
      }
    } catch (Throwable $e) {
      report($e);
      SiapeLog::error(sprintf(
        "Erro ao verificar usuários externos na integração: %s",
        $e->getMessage()
      ));
    }
  }

  /**
   * Processa as atualizações de dados dos servidores em lotes.
   *
   * @param array $atualizacoesDados
   * @param string $sqlUpdateDados
   * @return void
   */
  private function processarAtualizacoesDados(array $atualizacoesDados, string $sqlUpdateDados): void
  {
    $chunkSize = 50;
    $transactionRetries = 3;
    $chunks = array_chunk($atualizacoesDados, $chunkSize);

    foreach ($chunks as $chunk) {
      DB::transaction(function () use ($chunk, $sqlUpdateDados) {
        foreach ($chunk as $linha) {
          SiapeLog::info("Atualizando dados do servidor Matricula: " . $linha->matriculasiape);

          $this->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($linha->emailfuncional, $linha->matriculasiape, $linha->id);
          $modalidadePgdValida = $this->validarModalidadePgd($linha->modalidade_pgd);

          DB::update($sqlUpdateDados, [
            'nome'          => $linha->nome_servidor,
            'nomeguerra'    => $linha->nome_guerra,
            'email'         => $linha->emailfuncional,
            'cod_jornada'   => $linha->cod_jornada,
            'nome_jornada'  => $linha->nome_jornada,
            'tipo_modalidade_id' => $modalidadePgdValida,
            'participa_pgd' => $linha->participa_pgd,
            'id'            => $linha->id,
            'ident_unica'   => $linha->ident_unica,
            'data_modificacao' => UtilService::asDateTime($linha->data_modificacao),
            'data_nascimento' => $linha->data_nascimento,
          ]);
        }
      }, $transactionRetries);
    }
  }
}