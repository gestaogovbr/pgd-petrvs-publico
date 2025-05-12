<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Services\ServiceBase;
use App\Exceptions\LogError;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\Siape\ProcessaDadosSiapeBD;
use DateTime;
use Illuminate\Support\Facades\Log;
use Throwable;

class IntegracaoSiapeService extends ServiceBase
{
  const SITUACAO_FUNCIONAL_ATIVO_EM_OUTRO_ORGAO = 8;
  const SITUACAO_FUNCIONAL_CONTRATO_TEMPORARIO = 76;

  private ProcessaDadosSiapeBD|null $siape = null;

  function __construct()
  {
    $this->siape = new ProcessaDadosSiapeBD();
  }

  function retornarPessoa(array $pessoa): array | null
  {
    if (!isset($pessoa['dadosPessoais']) || !isset($pessoa['dadosFuncionais'])) {
      LogError::newWarn("ISiape: Erro de conexão ou problemas com CPF " . $pessoa['cpf'] . " durante consulta aos dados pessoais.", "Dados pessoais ou funcionais não encontrados.");
      return null;
    }
    $dadosPessoais = [];
    $dadosFuncionais = [];
    try {
      $dadosPessoais = $pessoa['dadosPessoais'];

      $dadosFuncionais = $pessoa['dadosFuncionais'];

      if(empty($dadosFuncionais) || empty($dadosPessoais)){
        return null;
      }

      if ($dadosFuncionais['codSitFuncional'] == self::SITUACAO_FUNCIONAL_ATIVO_EM_OUTRO_ORGAO) return null;

      $funcao = null;

      //TODO remover a opção de função do codigo do banco e esse if abaixo
      if (!empty($dadosFuncionais['codAtivFun']) && $dadosFuncionais['codAtivFun']) {
        $funcao = array('funcao' => ['tipo_funcao' => '1', 'uorg_funcao' => $dadosFuncionais['codUorgExercicio']]);
      }

      if (!empty($dadosPessoais['dataNascimento'])) {
        $dadosPessoais['dataNascimento'] = DateTime::createFromFormat('dmY', $dadosPessoais['dataNascimento'])->format('Y-m-d 00:00:00');
      }

      if (!empty($dadosFuncionais['dataOcorrIngressoOrgao'])) {
        $dadosFuncionais['dataOcorrIngressoOrgao'] = DateTime::createFromFormat('dmY', $dadosFuncionais['dataOcorrIngressoOrgao'])->format('Y-m-d 00:00:00');
      }

      if (!empty($dadosFuncionais['codUorgExercicio'])) {
        $dadosFuncionais['codUorgExercicio'] = strval(intval($dadosFuncionais['codUorgExercicio']));
      }

      if($dadosFuncionais['codSitFuncional']== self::SITUACAO_FUNCIONAL_CONTRATO_TEMPORARIO){
        $unidadeServidorTemporario = Unidade::where('sigla', trim($dadosFuncionais['siglaUorgLotacao']))->first();
        if(!$unidadeServidorTemporario) return null;

        $dadosFuncionais['codUorgExercicio'] = $unidadeServidorTemporario->codigo;
      }

      $Pessoa = [
        'cpf_ativo' => true,
        'data_modificacao' => $pessoa['data_modificacao'],
        'cpf' => $pessoa['cpf'],
        'nome' => $this->UtilService->valueOrDefault($dadosPessoais['nome']),
        'emailfuncional' => $this->UtilService->valueOrDefault($dadosFuncionais['emailInstitucional']),
        'sexo' => $this->UtilService->valueOrDefault($dadosPessoais['nomeSexo']),
        'municipio' => $this->UtilService->valueOrDefault($dadosPessoais['nomeMunicipNasc']),
        'uf' => $this->UtilService->valueOrDefault($dadosPessoais['ufNascimento'], null),
        'data_nascimento' => $this->UtilService->valueOrDefault($dadosPessoais['dataNascimento'], null),
        'telefone' =>  '',
        'cpf_chefia_imediata' => $this->UtilService->valueOrDefault($dadosFuncionais['cpfChefiaImediata'], null),
        'email_chefia_imediata' => $this->UtilService->valueOrDefault($dadosFuncionais['emailChefiaImediata'], null),
        'nome_jornada' => $this->UtilService->valueOrDefault($dadosFuncionais['nomeJornada'], null),
        'cod_jornada' => $this->UtilService->valueOrDefault((int) $dadosFuncionais['codJornada'], null),
        'matriculas' => [
          'dados' => [
            'vinculo_ativo' => true,
            'matriculasiape' => $this->UtilService->valueOrDefault($dadosFuncionais['matriculaSiape']),
            'tipo' => $this->UtilService->valueOrDefault($dadosFuncionais['codCargo']),
            'coduorgexercicio' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgExercicio']),
            'coduorglotacao' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgLotacao']),
            'codigo_servo_exercicio' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgExercicio']),
            'nomeguerra' => '',
            'codsitfuncional' => $this->UtilService->valueOrDefault($dadosFuncionais['codSitFuncional']),
            'codupag' => $this->UtilService->valueOrDefault($dadosFuncionais['codUpag']),
            'dataexercicionoorgao' => $this->UtilService->valueOrDefault($dadosFuncionais['dataOcorrIngressoOrgao']),
            'funcoes' => $funcao
          ]
        ]
      ];
      return $Pessoa;
    } catch (Throwable $e) {
      Log::error("ISiape: Erro de conexão ou problemas com CPF " . $pessoa['cpf'] . " durante consulta aos dados pessoais.", [$e]);
      LogError::newWarn("ISiape: Erro de conexão ou problemas com CPF " . $pessoa['cpf'] . " durante consulta aos dados pessoais.", $e->getMessage());
    }

    return null;
  }

  public function retornarUorgs($uorgInicial = 1)
  {
    $uorgInicial = $this->siapeCodUorg ? $this->siapeCodUorg : $uorgInicial;
    $uorgsWsdl = "";
    $uorgsPetrvs = ["uorg" => []];

    $uorgsWsdl = $this->siape->dadosUorg();


    try {
      if (!empty($uorgsWsdl)) {
        foreach ($uorgsWsdl as $dados) {
          $uorgWsdl = $dados['dados'];
          $dataUltimaTransacao = $dados['data_modificacao'];

          if (!isset($uorgWsdl['codUorg']) && empty($uorgWsdl['codUorg'])) {
            LogError::newWarn("ISiape: não foi possível recuperar dados da UORG.", "Código da UORG não encontrado.");
            Log::error("ISiape: não foi possível recuperar dados da UORG.", "Código da UORG não encontrado.");
            continue;
          }


          if (!empty($this->UtilService->valueOrNull($uorgWsdl, "nomeMunicipio"))) {
              $consulta_sql = DB::select("SELECT * FROM cidades WHERE nome LIKE :nomeMunicipio", ['nomeMunicipio' => $uorgWsdl['nomeMunicipio']]);
            if (!empty($consulta_sql)) {
              $consulta_sql = $this->UtilService->object2array($consulta_sql)[0];
              $uorgWsdl['codMunicipio'] = $consulta_sql['codigo_ibge'];
              $uorgWsdl['fuso_horario'] = $consulta_sql['timezone'];
            }
          }

          $inserir_uorg = [
            'id_servo' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorg"))) ?: "",
            'pai_servo' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorgPai"))) ?: "",
            'codigo_siape' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorg"))) ?: "",
            'pai_siape' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorgPai"))) ?: "",
            'codupag' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorgPagadora"))) ?: "",
            'nomeuorg' => $this->UtilService->valueOrNull($uorgWsdl, "nomeExtendido") ?: "",
            'siglauorg' => $this->UtilService->valueOrNull($uorgWsdl, "siglaUorg") ?: "",
            'telefone' => $this->UtilService->valueOrNull($uorgWsdl, "telefone") ?: "",
            'email' => $this->UtilService->valueOrNull($uorgWsdl, "email") ?: "",
            'natureza' => '',
            'fronteira' => $this->UtilService->valueOrNull($uorgWsdl, "fronteira") ?: "",
            'fuso_horario' => $this->UtilService->valueOrNull($uorgWsdl, "fuso_horario") ?: "",
            'cod_uop' => $this->UtilService->valueOrNull($uorgWsdl, "cod_uop") ?: "",
            'cod_unidade' => $this->UtilService->valueOrNull($uorgWsdl, "cod_unidade") ?: "",
            'tipo' => $this->UtilService->valueOrNull($uorgWsdl, "tipo") ?: "",
            'tipo_desc' => $this->UtilService->valueOrNull($uorgWsdl, "tipo_desc") ?: "",
            'na_rodovia' => $this->UtilService->valueOrNull($uorgWsdl, "na_rodovia") ?: "",
            'logradouro' => $this->UtilService->valueOrNull($uorgWsdl, "logradouro") ?: "",
            'bairro' => $this->UtilService->valueOrNull($uorgWsdl, "bairro") ?: "",
            'cep' => $this->UtilService->valueOrNull($uorgWsdl, "cep") ?: "",
            'ptn_ge_coordenada' => $this->UtilService->valueOrNull($uorgWsdl, "ptn_ge_coordenada") ?: "",
            'municipio_siafi_siape' => $this->UtilService->valueOrNull($uorgWsdl, "codMunicipio") ?: "",
            'municipio_siscom' => $this->UtilService->valueOrNull($uorgWsdl, "codMunicipio") ?: "",
            'municipio_ibge' => $this->UtilService->valueOrNull($uorgWsdl, "codMunicipio") ?: "",
            'municipio_nome' => $this->UtilService->valueOrNull($uorgWsdl, "nomeMunicipio") ?: "",
            'municipio_uf' => $this->UtilService->valueOrNull($uorgWsdl, "siglaUfMunicipio") ?: "",
            'ativa' => "true",
            'regimental' => $this->UtilService->valueOrNull($uorgWsdl, "indicadorUorgRegimenta") ?: "",
            'data_modificacao' => $dataUltimaTransacao,
            'und_nu_adicional' => $this->UtilService->valueOrNull($uorgWsdl, "und_nu_adicional") ?: "",
            'cnpjupag' => $this->UtilService->valueOrNull($uorgWsdl, "cnpjUpag") ?: "",
            'cpf_titular_autoridade_uorg' => $this->UtilService->valueOrNull($uorgWsdl, "cpfTitularAutoridadeUorg") ?: "",
            'cpf_substituto_autoridade_uorg' => $this->UtilService->valueOrNull($uorgWsdl, "cpfSubstitutoAutoridadeUorg") ?: "",
          ];
          array_push($uorgsPetrvs['uorg'], $inserir_uorg);
        }
      }
      return $uorgsPetrvs;
    } catch (Throwable $e) {
      Log::error('ISiape: não foi possível recuperar dados da UORG.', [$e->getMessage()]);
      LogError::newWarn("ISiape: não foi possível recuperar dados da UORG.", $e->getMessage());
    }
  }

  public function retornarServidores()
  {
    $PessoasPetrvs = ['Pessoas' => []];

    $servidores = $this->siape->dadosServidor();

    foreach ($servidores as $pessoa) {
      $query = $this->retornarPessoa($pessoa);

      if (!empty($query)) {
        array_push($PessoasPetrvs['Pessoas'], $query);
        continue;
      }
    }
    return $PessoasPetrvs;
  }

  public function processaServidoresRemovidosNoSiape() : array
  {
    $ids = $this->listIdsUsuariosRemovidosNaoExcluidos();
    
    if (empty($ids)) {
      return [];
    }

    $usuarios = Usuario::whereIn('id', $ids)->get();

    foreach ($usuarios as $usuario) {
      Log::info("Removendo servidor " . $usuario->cpf . " - " . $usuario->nome);
      $usuario->delete();
    }

    return $ids;
  }

  private function listIdsUsuariosRemovidosNaoExcluidos():array
  {
    $ids = Usuario::join('siape_blacklist_servidores as s', 'usuarios.cpf', '=', 's.cpf')
              ->pluck('usuarios.id');

    return $ids->toArray();
  }
}
