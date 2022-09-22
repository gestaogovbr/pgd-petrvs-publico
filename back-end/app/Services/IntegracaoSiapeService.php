<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\ApiSiapeUorg;
use App\Exceptions\LogError;
use SoapClient;
use Exception;

class IntegracaoSiapeService {

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
        $this->siapeUpag = env('SIAPE_UPAG');
        $this->siapeUrl = env('SIAPE_URL');
        $this->siapeSiglaSistema = env('SIAPE_SIGLASISTEMA');
        $this->siapeNomeSistema = env('SIAPE_NOMESISTEMA');
        $this->siapeSenha = env('SIAPE_SENHA');
        $this->siapeCpf = env('SIAPE_CPF');
        $this->siapeCodOrgao = env('SIAPE_CODORGAO');
        $this->siapeCodUorg = env('SIAPE_CODUORG');
        $this->siapeParmExistPag = env('SIAPE_PARMEXISTPAG');
        $this->siapeParmTipoVinculo = env('SIAPE_PARMTIPOVINCULO');

        $this->siape = new SoapClient($this->siapeUrl);
    }

    public function retornarUorgs($codUorg = 1){

        $uorgsWsdl = "";

        try {
            if(!empty($this->siape)){
                $uorgsWsdl = $this->siape->listaUorgs(
                    $this->siapeSiglaSistema,
                    $this->siapeNomeSistema,
                    $this->siapeSenha,
                    $this->siapeCpf,
                    $this->siapeCodOrgao,
                    $codUorg); # Obs.: Web Service Siape listará as uorgs a partir desse número.
                $uorgsWsdl = json_encode($uorgsWsdl);
                $uorgsWsdl = json_decode($uorgsWsdl, true);
                $uorgsWsdl = $uorgsWsdl['Uorg'];
            }
        } catch (Exception $e) {
            LogError::newWarn("Web Service Siape: erro de conexão.", $values);
        }


        try {
            if(!empty($uorgsWsdl)){
                foreach($uorgsWsdl as $value){
                    print($value['codigo']." - ".$value['nome']."\n");
                    $codUorg = strval($value['codigo']);
                    $uorgWsdl = $this->siape->dadosUorg(
                        $this->siapeSiglaSistema,
                        $this->siapeNomeSistema,
                        $this->siapeSenha,
                        $this->siapeCpf,
                        $this->siapeCodOrgao,
                        $codUorg);
                }
            }
        }
        catch (Exception $e) {
            LogError::newWarn("Web Service Siape: não foi possível recuperar dados de determinada uorg.", $values);
        }
    }
}
