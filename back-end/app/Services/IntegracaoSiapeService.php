<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Services\ServiceBase;
use App\Models\Cidade;
use App\Exceptions\LogError;
use DateTime;
use SoapClient;
use Throwable;

class IntegracaoSiapeService extends ServiceBase {

    public $siape = '';
    private $siapeUpag = '';
    private $siapeUrl = '';
    private $siapeSiglaSistema = '';
    private $siapeNomeSistema = '';
    private $siapeSenha= '';
    private $siapeCpf= '';
    private $siapeCodOrgao = '';
    private $siapeCodUorg = '';
    private $siapeParmExistPag = '';
    private $siapeParmTipoVinculo = '';

    function __construct($config = null) {
        $config = $config ?: config("integracao")["siape"];
        $this->siapeUpag = strval(intval($config['upag']));
        $this->siapeUrl = $config['url'];
        $this->siapeSiglaSistema = $config['siglaSistema'];
        $this->siapeNomeSistema = $config['nomeSistema'];
        $this->siapeSenha = $config['senha'];
        $this->siapeCpf = $config['cpf'];
        $this->siapeCodOrgao = strval(intval($config['codOrgao']));
        $this->siapeCodUorg = strval(intval($config['codUorg']));
        $this->siapeParmExistPag = $config['parmExistPag'];
        $this->siapeParmTipoVinculo = $config['parmTipoVinculo'];
        // Inicializando o Soap (API Siape).
        $this->siape = new SoapClient($this->siapeUrl);
    }

    public function retornarUorgs($uorgInicial = 1){
        // Altera a uorg inicial caso seja
        // especificado nas configurações do sistema.
        $uorgInicial = $this->siapeCodUorg ? $this->siapeCodUorg : $uorgInicial;

        $uorgsWsdl = "";
        $uorgsPetrvs = [ "uorg" => []];
        $date = new Datetime();

        try {
            if(!empty($this->siape)){
                $uorgsWsdl = $this->siape->listaUorgs(
                    $this->siapeSiglaSistema,
                    $this->siapeNomeSistema,
                    $this->siapeSenha,
                    $this->siapeCpf,
                    $this->siapeCodOrgao,
                    $uorgInicial); // Obs.: Web Service Siape listará as uorgs a partir desse número.

                $uorgsWsdl = $this->UtilService->object2array($uorgsWsdl);
                $uorgsWsdl = $uorgsWsdl['Uorg'];

            }
        } catch (Throwable $e) {
            // Informa erro de conexão ao Web Service SIAPE e aborta procedimento.
            LogError::newError("Web Service Siape: erro de conexão.", $e->getMessage());
        }

        // Remove da integração uorgs que não tiveram data_modificacao alteradas no SIAPE.
        /*
        $uorgs_para_consulta = [];

        if($uorgsWsdl){
            foreach($uorgsWsdl as $uo){
                $uo_data = $date->createFromFormat('dmY', $uo['dataUltimaTransacao'])->format('Y-m-d 00:00:00');
                $uo_data = $this->UtilService->asTimestamp($uo_data);

                $query = DB::table('unidades')->where('codigo', $uo['codigo']);

                if($query->value('codigo')){
                    $unidade_datamodificacao = $this->UtilService->asTimestamp($query->value('datamodificacao'));

                    if(is_null($unidade_datamodificacao) || ($unidade_datamodificacao < $uo_data)) {
                        array_push($uorgs_para_consulta, $uo);
                    } else {
                        LogError::newWarn('Unidade lida do SIAPE: (' . $uo['codigo'] . ' - ' .  $uo['nome'] .') não possui atualização.');
                    }
                } else { // Se for nova, deve ser atualizada
                    array_push($uorgs_para_consulta, $uo);
                }
            }
        }
        */

        try {
            if(!empty($uorgsWsdl)){
                foreach($uorgsWsdl as $value){
                    if(!empty($value['codigo'])){
                        $uorgWsdl = $this->siape->dadosUorg(
                            $this->siapeSiglaSistema,
                            $this->siapeNomeSistema,
                            $this->siapeSenha,
                            $this->siapeCpf,
                            $this->siapeCodOrgao,
                            $value['codigo']);

                        $uorgWsdl = $this->UtilService->object2array($uorgWsdl);
                        if($this->UtilService->valueOrNull($uorgWsdl, "codUorgPagadora") == $this->siapeUpag){
                            // Identifica informações sobre município e demais variáveis.
                            if(!empty($this->UtilService->valueOrNull($uorgWsdl, "nomeMunicipio"))){
                                $consulta_sql = "SELECT * FROM cidades WHERE nome LIKE '".$uorgWsdl['nomeMunicipio']."'";
                                $consulta_sql = DB::select($consulta_sql);
                                if(!empty($consulta_sql)) {
                                    $consulta_sql = $this->UtilService->object2array($consulta_sql)[0];
                                    $uorgWsdl['codMunicipio'] = $consulta_sql['codigo_ibge'];
                                    $uorgWsdl['fuso_horario'] = $consulta_sql['timezone'];
                                    }
                                }

                            $value['dataUltimaTransacao'] = $date->createFromFormat('dmY', $value['dataUltimaTransacao'])->format('Y-m-d 00:00:00');

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
                                'natureza' => '', // #$this->valueOrDefault2("nomeAreaAtuaUorg", $uorgWsdl), (Entender campo natureza).
                                'fronteira' => $this->UtilService->valueOrNull($uorgWsdl, "fronteira") ?: "", // Fronteira não consta no Web Service SIAPE.
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
                                'ativa' => "true", // Todas as uorgs listadas são ativas no webservice siape.
                                'regimental' => $this->UtilService->valueOrNull($uorgWsdl, "indicadorUorgRegimenta") ?: "",
                                'datamodificacao' => $this->UtilService->valueOrNull($value, "dataUltimaTransacao") ?: "",
                                'und_nu_adicional' => $this->UtilService->valueOrNull($uorgWsdl, "und_nu_adicional") ?: "",
                                'cnpjupag' => $this->UtilService->valueOrNull($uorgWsdl, "cnpjUpag") ?: ""
                            ];
                            array_push($uorgsPetrvs['uorg'], $inserir_uorg);
                        } else{
                              LogError::newWarn("Web Service Siape: Uorg ".$this->UtilService->valueOrNull($uorgWsdl, "codUorg")." não pertence a(s) unidade(s) pagadora(s).", $this->siapeUpag);
                        }
                      } else {
                            LogError::newWarn("Web Service Siape: Ausência de código uorg.");
                      }
                }
            }
            return $uorgsPetrvs;
        }
        catch (Throwable $e) {
            LogError::newWarn("Web Service Siape: não foi possível recuperar dados de determinada uorg.", $e->getMessage());
        }
    }

    public function retornarPessoas(){
        $cpfsPorUorgsWsdl = [];
        $PessoasPetrvs = [ 'Pessoas' => []];
        $date = new Datetime();

        $uorgs = DB::select("SELECT codigo_siape from integracao_unidades WHERE codupag=".$this->siapeUpag."");
        $uorgs = $this->UtilService->object2array($uorgs);

        if(!empty($this->siape) and !empty($uorgs)){
            foreach($uorgs as $codUorg){
                try{
                    $cpfsPorUorgWsdl = $this->siape->listaServidores(
                        $this->siapeSiglaSistema,
                        $this->siapeNomeSistema,
                        $this->siapeSenha,
                        $this->siapeCpf,
                        $this->siapeCodOrgao,
                        $codUorg['codigo_siape']); // Obs.: Web Service Siape listará os cpfs de todos os servidores ativos nessa uorg.
                    $cpfsPorUorgWsdl = $this->UtilService->object2array($cpfsPorUorgWsdl);
                    if(array_key_exists('Servidor', $cpfsPorUorgWsdl)){
                        if(array_key_exists('cpf', $cpfsPorUorgWsdl['Servidor'])){
                            $cpf = ['cpf' => $cpfsPorUorgWsdl['Servidor']['cpf'], 'dataUltimaTransacao' => $cpfsPorUorgWsdl['Servidor']['dataUltimaTransacao']];
                            array_push($cpfsPorUorgsWsdl, $cpf);
                        } else{
                            foreach ($cpfsPorUorgWsdl['Servidor'] as $cpf){
                                array_push($cpfsPorUorgsWsdl, $cpf);
                            }
                        }
                    }
                } catch (Throwable $e){
                      LogError::newWarn('Web Service Siape: não existe servidores ativos na UORG '.$codUorg['codigo_siape'].'.', $e->getMessage());
                      continue;
                }
            }
        }

        /*
        Aqui temos todos os CPF's. Vamos pegar os dados dos servidores
        print_r($cpfsPorUorgsWsdl);
        */

        try {
            if(!empty($this->siape) and !empty($cpfsPorUorgsWsdl)){
                foreach($cpfsPorUorgsWsdl as $pessoa){
                    // Busca dados pessoais.
                    if(!empty($pessoa['cpf'])){
                      try {
                          $dadosPessoais = $this->siape->consultaDadosPessoais(
                              $this->siapeSiglaSistema,
                              $this->siapeNomeSistema,
                              $this->siapeSenha,
                              $pessoa['cpf'], // Obs.: Web Service Siape listará as uorgs a partir desse número.
                              $this->siapeCodOrgao,
                              $this->siapeParmExistPag,
                              $this->siapeParmTipoVinculo
                          );
                      } catch (Throwable $e) {
                        /*
                        Pula interação se resposta for uma string (sem dados para consulta): possivelmente
                        sem dados considerando parmExistPag=a, parmTipoVinculo=a
                        */
                          LogError::newWarn("Web Service Siape: Erro de conexão ou problemas com CPF ".$pessoa['cpf']." durante consulta aos dados pessoais.", $e->getMessage());
                          continue;
                      }
                    } else {
                        LogError::newWarn("Web Service Siape: erro de conexão ou incosistência no cpf.");
                        continue;
                    }
                    $dadosPessoais = $this->UtilService->object2array($dadosPessoais);

                    // Busca dados funcionais
                    $dadosFuncionais = $this->siape->consultaDadosFuncionais(
                        $this->siapeSiglaSistema,
                        $this->siapeNomeSistema,
                        $this->siapeSenha,
                        $pessoa['cpf'], // Obs.: Web Service Siape listará as uorgs a partir desse número.
                        $this->siapeCodOrgao,
                        $this->siapeParmExistPag,
                        $this->siapeParmTipoVinculo
                    );
                    $dadosFuncionais = $this->UtilService->object2array($dadosFuncionais)['dadosFuncionais']['DadosFuncionais'];

                    $funcao = null;
                    if(!empty($dadosFuncionais['codAtivFun']) && $dadosFuncionais['codAtivFun']){
                        $funcao = array('funcao' => ['tipo_funcao' => '1', 'uorg_funcao' => $dadosFuncionais['codUorgExercicio']]);
                        // Caso tenha mais de uma função, inserir mais arrays com a mesma estrutura.
                        // Dessa forma, bate com informações também tratadas pela PRF.
                        // Aguardando evolução de ticket aberto no MGI para reparo no SIAPE WEB SERVICE na data de 09/08/2023 20:22.
                    }

                    if(!empty($pessoa['dataUltimaTransacao'])){
                        $pessoa['dataUltimaTransacao'] = $date->createFromFormat('dmY', $pessoa['dataUltimaTransacao'])->format('Y-m-d 00:00:00');
                    }

                    if(!empty($dadosPessoais['dataNascimento'])){
                      $dadosPessoais['dataNascimento'] = $date->createFromFormat('dmY', $dadosPessoais['dataNascimento'])->format('Y-m-d 00:00:00');
                    }

                    if(!empty($dadosFuncionais['dataOcorrIngressoOrgao'])){
                      $dadosFuncionais['dataOcorrIngressoOrgao'] = $date->createFromFormat('dmY', $dadosFuncionais['dataOcorrIngressoOrgao'])->format('Y-m-d 00:00:00');
                    }

                    if(!empty($dadosFuncionais['codUorgExercicio'])){
                      $dadosFuncionais['codUorgExercicio'] = strval(intval($dadosFuncionais['codUorgExercicio']));
                    }

                    $Pessoa = [
                        'cpf_ativo' => true,
                        'data_modificacao' => $pessoa['dataUltimaTransacao'],
                        'cpf' => $pessoa['cpf'],
                        'nome' => $this->UtilService->valueOrDefault($dadosPessoais['nome']),
                        'emailfuncional' => $this->UtilService->valueOrDefault($dadosFuncionais['emailInstitucional']),
                        'sexo' => $this->UtilService->valueOrDefault($dadosPessoais['nomeSexo']),
                        'municipio' => $this->UtilService->valueOrDefault($dadosPessoais['nomeMunicipNasc']),
                        'uf' => $this->UtilService->valueOrDefault($dadosPessoais['ufNascimento']),
                        'datanascimento' => $this->UtilService->valueOrDefault($dadosPessoais['dataNascimento']),
                        'telefone' =>  '', // Web Service Siape não fornece (23/09/2022) informação.
                        'matriculas' => [ 'dados' => [
                            'vinculo_ativo' => true, // CPF sempre será ativo no Web Service Siape (parmExistPag=a, parmTipoVinculo=a)
                            'matriculasiape' => $this->UtilService->valueOrDefault($dadosFuncionais['matriculaSiape']),
                            'tipo' => $this->UtilService->valueOrDefault($dadosFuncionais['codCargo']),
                            'coduorgexercicio' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgExercicio']),
                            'coduorglotacao' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgLotacao']),
                            'codigo_servo_exercicio' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgExercicio']),
                            'nomeguerra' => '', // Web Service Siape não fornece (23/09/2022) informação. Tratada no IntegracaoService.
                            'codsitfuncional' => $this->UtilService->valueOrDefault($dadosFuncionais['codSitFuncional']),
                            'codupag' => $this->UtilService->valueOrDefault($dadosFuncionais['codUpag']),
                            'dataexercicionoorgao' => $this->UtilService->valueOrDefault($dadosFuncionais['dataOcorrIngressoOrgao']),
                            'funcoes' => $funcao
                            ]
                        ]
                    ];
                    array_push($PessoasPetrvs['Pessoas'], $Pessoa);
                }
            }
        } catch (Throwable $e) {
            LogError::newWarn("Web Service Siape: erro/falha de conexão ou ausência de cpf(s).", $e->getMessage());
        }
        // Aqui temos todas os dados após processamento de consulta ao Web Service Siape.
        return $PessoasPetrvs;
    }
}
