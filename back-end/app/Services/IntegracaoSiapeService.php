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

      $pessoal = $this->processaDadosPessoais($pessoa, $dadosPessoaisOrig);

      $funcionais = [];
      foreach ($dadosFuncionaisOrig as $dadofuncional) {
        $funcional = $this->processaDadosFuncionais($dadofuncional);
        if (is_null($funcional)) {
          continue;
        }
        array_push($funcionais, $funcional);
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

  private function processaDadosPessoais(array $pessoa, array $dadosPessoais): array
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
      'nome'             => UtilService::valueOrDefault($dadosPessoais['nome'] ?? null),
      'sexo'             => UtilService::valueOrDefault($dadosPessoais['nomeSexo'] ?? null),
      'municipio'        => UtilService::valueOrDefault($dadosPessoais['nomeMunicipNasc'] ?? null),
      'uf'               => UtilService::valueOrDefault($dadosPessoais['ufNascimento'] ?? null, null),
      'data_nascimento'  => UtilService::valueOrDefault($dadosPessoais['dataNascimento'] ?? null, null),
      'telefone'         => '',
    ];
    return $pessoal;
  }

  private function processaDadosFuncionais(array $dadosFuncionais): array|null
  {
    if (empty($dadosFuncionais) || !is_array($dadosFuncionais)) {
      return null;
    }

    if (($dadosFuncionais['codSitFuncional'] ?? null) == self::SITUACAO_FUNCIONAL_ATIVO_EM_OUTRO_ORGAO) {
      return null;
    }

    if (!empty($dadosFuncionais['dataOcorrIngressoOrgao'])) {
      $dt = DateTime::createFromFormat('dmY', $dadosFuncionais['dataOcorrIngressoOrgao']);
      $dadosFuncionais['dataOcorrIngressoOrgao'] = $dt ? $dt->format('Y-m-d 00:00:00') : null;
    }

    if (!empty($dadosFuncionais['codUorgExercicio'])) {
      $dadosFuncionais['codUorgExercicio'] = strval(intval($dadosFuncionais['codUorgExercicio']));
    }

    // Contrato temporário: mapear unidade pela sigla da lotação
    if (($dadosFuncionais['codSitFuncional'] ?? null) == self::SITUACAO_FUNCIONAL_CONTRATO_TEMPORARIO) {
      $sigla = trim($dadosFuncionais['siglaUorgLotacao'] ?? '');
      if ($sigla === '') {
        return null;
      }
      $unidadeServidorTemporario = Unidade::where('sigla', $sigla)->first();
      if (!$unidadeServidorTemporario) {
        return null;
      }
      $dadosFuncionais['codUorgExercicio'] = $unidadeServidorTemporario->codigo;
    }

    // Função (legacy/TODO)
    $funcao = null;
    if (!empty($dadosFuncionais['codAtivFun']) && $dadosFuncionais['codAtivFun']) {
      $funcao = [
        'funcao' => [
          'tipo_funcao'  => '1',
          'uorg_funcao'  => $dadosFuncionais['codUorgExercicio'] ?? null,
        ],
      ];
    }

    $matricula = [
      'vinculo_ativo'         => true,
      'matriculasiape'        => UtilService::valueOrDefault($dadosFuncionais['matriculaSiape'] ?? null),
      'tipo'                  => UtilService::valueOrDefault($dadosFuncionais['codCargo'] ?? null),
      'coduorgexercicio'      => UtilService::valueOrDefault($dadosFuncionais['codUorgExercicio'] ?? null),
      'coduorglotacao'        => UtilService::valueOrDefault($dadosFuncionais['codUorgLotacao'] ?? null),
      'codigo_servo_exercicio' => UtilService::valueOrDefault($dadosFuncionais['codUorgExercicio'] ?? null),
      'nomeguerra'            => '',
      'codsitfuncional'       => UtilService::valueOrDefault($dadosFuncionais['codSitFuncional'] ?? null),
      'codupag'               => UtilService::valueOrDefault($dadosFuncionais['codUpag'] ?? null),
      'dataexercicionoorgao'  => UtilService::valueOrDefault($dadosFuncionais['dataOcorrIngressoOrgao'] ?? null),
      'funcoes'               => $funcao,
      'ident_unica'           => UtilService::valueOrDefault($dadosFuncionais['identUnica'] ?? null),
      'modalidade_pgd'        => UtilService::valueOrDefault($dadosFuncionais['modalidadePGD'] ?? null),
      'participa_pgd'         => UtilService::valueOrDefault($dadosFuncionais['participaPGD'] ?? null),
      'cod_jornada'           => UtilService::valueOrDefault($dadosFuncionais['codJornada'] ?? null),
      'nome_jornada'          => UtilService::valueOrDefault($dadosFuncionais['nomeJornada'] ?? null)
    ];

    $funcional = [
      'emailfuncional'        => UtilService::valueOrDefault($dadosFuncionais['emailInstitucional'] ?? null),
      'cpf_chefia_imediata'   => UtilService::valueOrDefault($dadosFuncionais['cpfChefiaImediata'] ?? null, null),
      'email_chefia_imediata' => UtilService::valueOrDefault($dadosFuncionais['emailChefiaImediata'] ?? null, null),
      'matriculas'            => ['dados' => $matricula],
    ];

    return $funcional;
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


          if (!empty(UtilService::valueOrNull($uorgWsdl, "nomeMunicipio"))) {
            $consulta_sql = DB::select("SELECT * FROM cidades WHERE nome LIKE :nomeMunicipio", ['nomeMunicipio' => $uorgWsdl['nomeMunicipio']]);
            if (!empty($consulta_sql)) {
              $consulta_sql = UtilService::object2array($consulta_sql)[0];
              $uorgWsdl['codMunicipio'] = $consulta_sql['codigo_ibge'];
              $uorgWsdl['fuso_horario'] = $consulta_sql['timezone'];
            }
          }

          $inserir_uorg = [
            'id_servo' => strval(intval(UtilService::valueOrNull($uorgWsdl, "codUorg"))) ?: "",
            'pai_servo' => strval(intval(UtilService::valueOrNull($uorgWsdl, "codUorgPai"))) ?: "",
            'codigo_siape' => strval(intval(UtilService::valueOrNull($uorgWsdl, "codUorg"))) ?: "",
            'pai_siape' => strval(intval(UtilService::valueOrNull($uorgWsdl, "codUorgPai"))) ?: "",
            'codupag' => strval(intval(UtilService::valueOrNull($uorgWsdl, "codUorgPagadora"))) ?: "",
            'nomeuorg' => UtilService::valueOrNull($uorgWsdl, "nomeExtendido") ?: "",
            'siglauorg' => UtilService::valueOrNull($uorgWsdl, "siglaUorg") ?: "",
            'telefone' => UtilService::valueOrNull($uorgWsdl, "telefone") ?: "",
            'email' => UtilService::valueOrNull($uorgWsdl, "email") ?: "",
            'natureza' => '',
            'fronteira' => UtilService::valueOrNull($uorgWsdl, "fronteira") ?: "",
            'fuso_horario' => UtilService::valueOrNull($uorgWsdl, "fuso_horario") ?: "",
            'cod_uop' => UtilService::valueOrNull($uorgWsdl, "cod_uop") ?: "",
            'cod_unidade' => UtilService::valueOrNull($uorgWsdl, "cod_unidade") ?: "",
            'tipo' => UtilService::valueOrNull($uorgWsdl, "tipo") ?: "",
            'tipo_desc' => UtilService::valueOrNull($uorgWsdl, "tipo_desc") ?: "",
            'na_rodovia' => UtilService::valueOrNull($uorgWsdl, "na_rodovia") ?: "",
            'logradouro' => UtilService::valueOrNull($uorgWsdl, "logradouro") ?: "",
            'bairro' => UtilService::valueOrNull($uorgWsdl, "bairro") ?: "",
            'cep' => UtilService::valueOrNull($uorgWsdl, "cep") ?: "",
            'ptn_ge_coordenada' => UtilService::valueOrNull($uorgWsdl, "ptn_ge_coordenada") ?: "",
            'municipio_siafi_siape' => UtilService::valueOrNull($uorgWsdl, "codMunicipio") ?: "",
            'municipio_siscom' => UtilService::valueOrNull($uorgWsdl, "codMunicipio") ?: "",
            'municipio_ibge' => UtilService::valueOrNull($uorgWsdl, "codMunicipio") ?: "",
            'municipio_nome' => UtilService::valueOrNull($uorgWsdl, "nomeMunicipio") ?: "",
            'municipio_uf' => UtilService::valueOrNull($uorgWsdl, "siglaUfMunicipio") ?: "",
            'ativa' => "true",
            'regimental' => UtilService::valueOrNull($uorgWsdl, "indicadorUorgRegimenta") ?: "",
            'data_modificacao' => $dataUltimaTransacao,
            'und_nu_adicional' => UtilService::valueOrNull($uorgWsdl, "und_nu_adicional") ?: "",
            'cnpjupag' => UtilService::valueOrNull($uorgWsdl, "cnpjUpag") ?: "",
            'cpf_titular_autoridade_uorg' => UtilService::valueOrNull($uorgWsdl, "cpfTitularAutoridadeUorg") ?: "",
            'cpf_substituto_autoridade_uorg' => UtilService::valueOrNull($uorgWsdl, "cpfSubstitutoAutoridadeUorg") ?: "",
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