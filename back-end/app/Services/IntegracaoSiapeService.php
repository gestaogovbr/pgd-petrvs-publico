<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Services\ServiceBase;
use App\Exceptions\LogError;
use SoapClient;
use Exception;

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
        $this->siapeUpag = $config['upag'];
        $this->siapeUrl = $config['url'];
        $this->siapeSiglaSistema = $config['siglaSistema'];
        $this->siapeNomeSistema = $config['nomeSistema'];
        $this->siapeSenha = $config['senha'];
        $this->siapeCpf = $config['cpf'];
        $this->siapeCodOrgao = $config['codOrgao'];
        $this->siapeCodUorg = $config['codUorg'];
        $this->siapeParmExistPag = $config['parmExistPag'];
        $this->siapeParmTipoVinculo = $config['parmTipoVinculo'];
        /* Instancia o Soap (API Siape) */
        $this->siape = new SoapClient($this->siapeUrl);
    }

    public function retornarUorgs($codUorg = 1){
        $uorgsWsdl = "";
        $uorgsPetrvs = [ "uorg" => []];

        try {
            if(!empty($this->siape)){
                $uorgsWsdl = $this->siape->listaUorgs(
                    $this->siapeSiglaSistema,
                    $this->siapeNomeSistema,
                    $this->siapeSenha,
                    $this->siapeCpf,
                    $this->siapeCodOrgao,
                    $codUorg); /* Obs.: Web Service Siape listará as uorgs a partir desse número. */

                $uorgsWsdl = $this->UtilService->object2array($uorgsWsdl);
                $uorgsWsdl = $uorgsWsdl['Uorg'];
            }
        } catch (Exception $e) {
            LogError::newWarn("Web Service Siape: erro de conexão.", $e->getMessage());
        }

        try {
            if(!empty($uorgsWsdl)){
                foreach($uorgsWsdl as $value){
                    print($value['codigo']." - ".$value['nome']."\n");
                    $uorgWsdl = $this->siape->dadosUorg(
                        $this->siapeSiglaSistema,
                        $this->siapeNomeSistema,
                        $this->siapeSenha,
                        $this->siapeCpf,
                        $this->siapeCodOrgao,
                        $value['codigo']);

                    $uorgWsdl = $this->UtilService->object2array($uorgWsdl);

                    $inserir_uorg = [
                        'id_servo' => $this->UtilService->valueOrNull($uorgWsdl, "codUorg") ?: "",
                        'pai_servo' => $this->UtilService->valueOrNull($uorgWsdl, "codUorgPai") ?: "",
                        'codigo_siape' => $this->UtilService->valueOrNull($uorgWsdl, "codUorg") ?: "",
                        'pai_siape' => $this->UtilService->valueOrNull($uorgWsdl, "codUorgPai") ?: "",
                        'codupag' => $this->UtilService->valueOrNull($uorgWsdl, "codUorgPagadora") ?: "",
                        'nomeuorg' => $this->UtilService->valueOrNull($uorgWsdl, "nomeExtendido") ?: "",
                        'siglauorg' => $this->UtilService->valueOrNull($uorgWsdl, "siglaUorg") ?: "",
                        'telefone' => $this->UtilService->valueOrNull($uorgWsdl, "telefone") ?: "",
                        'email' => $this->UtilService->valueOrNull($uorgWsdl, "email") ?: "",
                        'natureza' => '', /* #$this->valueOrDefault2("nomeAreaAtuaUorg", $uorgWsdl), (Entender campo natureza) */
                        'fronteira' => $this->UtilService->valueOrNull($uorgWsdl, "fronteira") ?: "", /* Fronteira não consta no Web Service SIAPE */
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
                        'ativa' => true, /* Todas as uorgs listadas são ativas no webservice siape. */
                        'regimental' => $this->UtilService->valueOrNull($uorgWsdl, "indicadorUorgRegimenta") ?: "",
                        'datamodificacao' => $this->UtilService->valueOrNull($value, "dataUltimaTransacao") ?: "",
                        'und_nu_adicional' => $this->UtilService->valueOrNull($uorgWsdl, "und_nu_adicional") ?: "",
                        'cnpjupag' => $this->UtilService->valueOrNull($uorgWsdl, "cnpjUpag") ?: ""
                    ];
                    array_push($uorgsPetrvs['uorg'], $inserir_uorg);
                }
            }
        return $uorgsPetrvs;
        }
        catch (Exception $e) {
            LogError::newWarn("Web Service Siape: não foi possível recuperar dados de determinada uorg.", $e->getMessage());
        }
    }

    public function retornarPessoas(){
        $cpfsPorUorgsWsdl = [];
        $PessoasPetrvs = [ 'Pessoas' => []];

        $uorgs = DB::select("SELECT codigo_siape from integracao_unidades WHERE codupag=".$this->siapeUpag."");
        $uorgs = $this->UtilService->object2array($uorgs);

        try {
            if(!empty($this->siape) and !empty($uorgs)){
                foreach($uorgs as $codUorg){
                    $cpfsPorUorgWsdl = $this->siape->listaServidores(
                        $this->siapeSiglaSistema,
                        $this->siapeNomeSistema,
                        $this->siapeSenha,
                        $this->siapeCpf,
                        $this->siapeCodOrgao,
                        $codUorg['codigo_siape']); /* Obs.: Web Service Siape listará os cpfs de todos os servidores ativos nessa uorg */
                    $cpfsPorUorgWsdl = $this->UtilService->object2array($cpfsPorUorgWsdl);
                    if(array_key_exists("Servidor", $cpfsPorUorgWsdl)){
                        foreach ($cpfsPorUorgWsdl["Servidor"] as $cpf){
                            array_push($cpfsPorUorgsWsdl, $cpf);
                        }
                    } else {
                        /* Uorg sem servidor ativo */
                        LogError::newWarn("Web Service Siape: não existe servidores ativos na UORG (".$codUorg['codigo_siape'].").");
                    }
                }
            }
        } catch (Exception $e) {
            LogError::newWarn("Web Service Siape: erro de conexão.", $e->getMessage());
        }

        /*
        Aqui temos todos os CPF's. Vamos pegar os dados dos servidores
        print_r($cpfsPorUorgsWsdl);
        */

        try {
            if(!empty($this->siape) and !empty($cpfsPorUorgsWsdl)){
                foreach($cpfsPorUorgsWsdl as $pessoa){
                    /* Busca dados pessoais */
                    try {
                        $dadosPessoais = $this->siape->consultaDadosPessoais(
                            $this->siapeSiglaSistema,
                            $this->siapeNomeSistema,
                            $this->siapeSenha,
                            $pessoa['cpf'], /* Obs.: Web Service Siape listará as uorgs a partir desse número. */
                            $this->siapeCodOrgao,
                            $this->siapeParmExistPag,
                            $this->siapeParmTipoVinculo
                        );
                    } catch (Exception $e) {
                        /*
                        LogError::newWarn("Web Service Siape: erro de conexão ou incosistência (".$pessoa['cpf'].")", $e->getMessage());
                        Pula interação se resposta for uma string (sem dados para consulta): possivelmente
                        sem dados considerando parmExistPag=a, parmTipoVinculo=a
                        */
                        continue;
                    }
                    $dadosPessoais = $this->UtilService->object2array($dadosPessoais);

                    /* Busca dados funcionais */
                    $dadosFuncionais = $this->siape->consultaDadosFuncionais(
                        $this->siapeSiglaSistema,
                        $this->siapeNomeSistema,
                        $this->siapeSenha,
                        $pessoa['cpf'], /* Obs.: Web Service Siape listará as uorgs a partir desse número. */
                        $this->siapeCodOrgao,
                        $this->siapeParmExistPag,
                        $this->siapeParmTipoVinculo
                    );
                    $dadosFuncionais = $this->UtilService->object2array($dadosFuncionais)['dadosFuncionais']['DadosFuncionais'];

                    $funcao = [];
                    if(!empty($dadosFuncionais['codAtivFun'])){
                        $funcao = [ 'funcao' => ['tipo_funcao' => $dadosFuncionais['codAtivFun'], 'uorg_funcao' => $dadosFuncionais['codUorgExercicio']]];
                    }

                    $Pessoa = [ "Pessoa" => [
                        'cpf_ativo' => true,
                        'data_modificacao' => $pessoa['dataUltimaTransacao'],
                        'cpf' => $pessoa['cpf'],
                        'nome' => $this->UtilService->valueOrDefault($dadosPessoais['nome']),
                        'emailfuncional' => $this->UtilService->valueOrDefault($dadosFuncionais['emailServidor']),
                        'sexo' => $this->UtilService->valueOrDefault($dadosPessoais['nomeSexo']),
                        'municipio' => $this->UtilService->valueOrDefault($dadosPessoais['nomeMunicipNasc']),
                        'uf' => $this->UtilService->valueOrDefault($dadosPessoais['ufNascimento']),
                        'datanascimento' => $this->UtilService->valueOrDefault($dadosPessoais['dataNascimento']),
                        'telefone' =>  '',/* Web Service Siape não fornece (23/09/2022) informação */
                        'vinculo_ativo' => true, /* CPF sempre será ativo no Web Service Siape (parmExistPag=a, parmTipoVinculo=a)*/
                        'matriculasiape' => $this->UtilService->valueOrDefault($dadosFuncionais['matriculaSiape']),
                        'tipo' => $this->UtilService->valueOrDefault($dadosFuncionais['codCargo']),
                        'coduorgexercicio' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgExercicio']),
                        'coduorglotacao' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgLotacao']),
                        'codigo_servo_exercicio' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgExercicio']),
                        'nomeguerra' => '', /* Web Service Siape não fornece (23/09/2022) informação */
                        'codsitfuncional' => $this->UtilService->valueOrDefault($dadosFuncionais['codSitFuncional']),
                        'codupag' => $this->UtilService->valueOrDefault($dadosFuncionais['codUpag']),
                        'dataexercicionoorgao' => $this->UtilService->valueOrDefault($dadosFuncionais['dataOcorrIngressoOrgao']),
                        'funcoes' => $funcao ?: ""
                    ]];
                    array_push($PessoasPetrvs['Pessoas'], $Pessoa);
                }
            }
        } catch (Exception $e) {
            LogError::newWarn("Web Service Siape: erro/falha de conexão ou ausência de cpf(s).", $e->getMessage());
        }
        /* Aqui temos todas os dados após processamento de consulta ao Web Service Siape */
        return $PessoasPetrvs;
    }
}
