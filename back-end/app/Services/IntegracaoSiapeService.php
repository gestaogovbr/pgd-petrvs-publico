<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\ApiSiapeUorg;
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

    public function valueOrDefault2($key, $array) {
        if (array_key_exists($key, $array) and isset($array[$key])){
            return $array[$key];
        } else {
            return "";
        }
    }

    public function retornarUorgs($codUorg = 1, $id_servo = 1126){
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
                    $codUorg); # Obs.: Web Service Siape listará as uorgs a partir desse número.

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

                        # Entender natureza
                        'natureza' => '', #$self->valueOrDefault2("nomeAreaAtuaUorg", $uorgWsdl),

                        # Fronteira não consta no Web Service SIAPE
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

                        # Todas as uorgs listadas são ativas no webservice siape.
                        'ativa' => true,

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
}
