<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Services\ServiceBase;
use App\Exceptions\LogError;
use App\Models\Unidade;
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

  private function retornarPessoa(array $pessoa): array|null
  {
    if (
      empty($pessoa['dadosPessoais']) ||
      empty($pessoa['dadosFuncionais']) ||
      !is_array($pessoa['dadosFuncionais'])
    ) {
      LogError::newWarn(
        "ISiape: Erro de conexão ou problemas com CPF " . ($pessoa['cpf'] ?? '(desconhecido)') . " durante consulta aos dados pessoais.",
        "Dados pessoais ou funcionais não encontrados."
      );
      return null;
    }

    try {
      $dadosPessoaisOrig = $pessoa['dadosPessoais'];
      $dadosFuncionaisOrig = $pessoa['dadosFuncionais'];

      $pessoal = $this->processaDadosPessoais($dadosPessoaisOrig);

      $funcionais = [];
      foreach ($dadosFuncionaisOrig as $dadofuncional) {
        $funcional = $this->processaDadosFuncionais($dadofuncional);
        if (is_null($funcional)) {
          continue;
        }
        $funcionais[] = $funcional;
      }

      if (empty($funcionais)) {
        return null;
      }

      return [
        'pessoal'    => $pessoal,
        'funcionais' => $funcionais,
      ];
    } catch (Throwable $e) {
      Log::error(
        "ISiape: Erro de conexão ou problemas com CPF " . ($pessoa['cpf'] ?? '(desconhecido)') . " durante consulta aos dados pessoais.",
        [$e]
      );
      LogError::newWarn(
        "ISiape: Erro de conexão ou problemas com CPF " . ($pessoa['cpf'] ?? '(desconhecido)') . " durante consulta aos dados pessoais.",
        $e->getMessage()
      );
      return null;
    }
  }

  private function processaDadosPessoais(array $dadosPessoais): array
  {

    if (!empty($dadosPessoais['dataNascimento'])) {
      $dt = DateTime::createFromFormat('dmY', $dadosPessoais['dataNascimento']);
      if ($dt !== false) {
        $dadosPessoais['dataNascimento'] = $dt->format('Y-m-d 00:00:00');
      } else {
        $dadosPessoais['dataNascimento'] = null;
      }
    }

    $pessoal = [
      'cpf_ativo'        => true,
      'data_modificacao' => $pessoa['data_modificacao'] ?? null,
      'cpf'              => $pessoa['cpf'] ?? null,
      'nome'             => $this->UtilService->valueOrDefault($dadosPessoais['nome'] ?? null),
      'sexo'             => $this->UtilService->valueOrDefault($dadosPessoais['nomeSexo'] ?? null),
      'municipio'        => $this->UtilService->valueOrDefault($dadosPessoais['nomeMunicipNasc'] ?? null),
      'uf'               => $this->UtilService->valueOrDefault($dadosPessoais['ufNascimento'] ?? null, null),
      'data_nascimento'  => $this->UtilService->valueOrDefault($dadosPessoais['dataNascimento'] ?? null, null),
      'telefone'         => '',
    ];
    return $pessoal;
  }

  private function processaDadosFuncionais(array $df): array|null
  {
    if (empty($df) || !is_array($df)) {
      return null;
    }

    if (($df['codSitFuncional'] ?? null) == self::SITUACAO_FUNCIONAL_ATIVO_EM_OUTRO_ORGAO) {
      return null;
    }

    if (!empty($df['dataOcorrIngressoOrgao'])) {
      $dt = DateTime::createFromFormat('dmY', $df['dataOcorrIngressoOrgao']);
      $df['dataOcorrIngressoOrgao'] = $dt ? $dt->format('Y-m-d 00:00:00') : null;
    }

    if (!empty($df['codUorgExercicio'])) {
      $df['codUorgExercicio'] = strval(intval($df['codUorgExercicio']));
    }

    // Contrato temporário: mapear unidade pela sigla da lotação
    if (($df['codSitFuncional'] ?? null) == self::SITUACAO_FUNCIONAL_CONTRATO_TEMPORARIO) {
      $sigla = trim($df['siglaUorgLotacao'] ?? '');
      if ($sigla === '') {
        return null;
      }
      $unidadeServidorTemporario = Unidade::where('sigla', $sigla)->first();
      if (!$unidadeServidorTemporario) {
        return null;
      }
      $df['codUorgExercicio'] = $unidadeServidorTemporario->codigo;
    }

    // Função (legacy/TODO)
    $funcao = null;
    if (!empty($df['codAtivFun']) && $df['codAtivFun']) {
      $funcao = [
        'funcao' => [
          'tipo_funcao'  => '1',
          'uorg_funcao'  => $df['codUorgExercicio'] ?? null,
        ],
      ];
    }

    $matricula = [
      'vinculo_ativo'         => true,
      'matriculasiape'        => $this->UtilService->valueOrDefault($df['matriculaSiape'] ?? null),
      'tipo'                  => $this->UtilService->valueOrDefault($df['codCargo'] ?? null),
      'coduorgexercicio'      => $this->UtilService->valueOrDefault($df['codUorgExercicio'] ?? null),
      'coduorglotacao'        => $this->UtilService->valueOrDefault($df['codUorgLotacao'] ?? null),
      'codigo_servo_exercicio' => $this->UtilService->valueOrDefault($df['codUorgExercicio'] ?? null),
      'nomeguerra'            => '',
      'codsitfuncional'       => $this->UtilService->valueOrDefault($df['codSitFuncional'] ?? null),
      'codupag'               => $this->UtilService->valueOrDefault($df['codUpag'] ?? null),
      'dataexercicionoorgao'  => $this->UtilService->valueOrDefault($df['dataOcorrIngressoOrgao'] ?? null),
      'funcoes'               => $funcao,
      'ident_unica'           => $this->UtilService->valueOrDefault($df['identUnica'] ?? null),
    ];

    $funcionais[] = [
      'identUnica'        => $this->UtilService->valueOrDefault($df['identUnica'] ?? null),
      'emailfuncional'        => $this->UtilService->valueOrDefault($df['emailInstitucional'] ?? null),
      'cpf_chefia_imediata'   => $this->UtilService->valueOrDefault($df['cpfChefiaImediata'] ?? null, null),
      'email_chefia_imediata' => $this->UtilService->valueOrDefault($df['emailChefiaImediata'] ?? null, null),
      'matriculas'            => ['dados' => $matricula],
    ];

    return $funcionais;
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
}
