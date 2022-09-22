<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\ApiSiapeUorg;
use App\Services\ServiceBase;
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

    public function valueOrDefault2($key, $array) {
        if (array_key_exists($key, $array) and isset($array[$key])){
            return $array[$key];
        } else {
            return "";
        }
    }

    public function object2array($object) {
        return @json_decode(@json_encode($object),1);
    }

    public function retornarUorgs($codUorg = 1, $id_servo = 1126){
        $self = $this;
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

                $uorgsWsdl = $this->object2array($uorgsWsdl);
                $uorgsWsdl = $uorgsWsdl['Uorg'];
            }
        } catch (Exception $e) {
            LogError::newWarn("Web Service Siape: erro de conexão.", $values);
        }

        try {
            if(!empty($uorgsWsdl)){
                $sql = "INSERT INTO api_siape_uorgs(id_servo, pai_servo, codigo_siape, pai_siape, codupag, nomeuorg, siglauorg, telefone, email, natureza, fronteira, fuso_horario, cod_uop, cod_unidade, tipo, tipo_desc, na_rodovia, logradouro, bairro, cep, ptn_ge_coordenada, municipio_siafi_siape, municipio_siscom, municipio_ibge, municipio_nome, municipio_uf, ativa, regimental, datamodificacao, und_nu_adicional, cnpjupag) ".
                    "VALUES (:id_servo, :pai_servo, :codigo_siape, :pai_siape, :codupag, :nomeuorg, :siglauorg, :telefone, :email, :natureza, :fronteira, :fuso_horario, :cod_uop, :cod_unidade, :tipo, :tipo_desc, :na_rodovia, :logradouro, :bairro, :cep, :ptn_ge_coordenada, :municipio_siafi_siape, :municipio_siscom, :municipio_ibge, :municipio_nome, :municipio_uf, :ativa, :regimental, :datamodificacao, :und_nu_adicional, :cnpjupag)";

                DB::transaction(function () use (&$uorgsWsdl, &$codUorg, &$id_servo, &$value, &$sql, &$self) {
                    DB::delete('DELETE FROM api_siape_uorgs');
                    foreach($uorgsWsdl as $value){
                        print($value['codigo']." - ".$value['nome']."\n");
                        #codUorg = strval($value['codigo']);
                        $uorgWsdl = $this->siape->dadosUorg(
                            $this->siapeSiglaSistema,
                            $this->siapeNomeSistema,
                            $this->siapeSenha,
                            $this->siapeCpf,
                            $this->siapeCodOrgao,
                            $value['codigo']);

                        $uorgWsdl = $this->object2array($uorgWsdl);

                        DB::insert($sql, [
                            ':id_servo' => $id_servo,
                            ':pai_servo' => $id_servo,
                            ':codigo_siape' => $self->valueOrDefault2("codUorg", $uorgWsdl),
                            ':pai_siape' => $self->valueOrDefault2("codUorgPai", $uorgWsdl),
                            ':codupag' => $self->valueOrDefault2("codUorgPagadora", $uorgWsdl),
                            ':nomeuorg' => $self->valueOrDefault2("nomeExtendido", $uorgWsdl),
                            ':siglauorg' => $self->valueOrDefault2("siglaUorg", $uorgWsdl),
                            ':telefone' => $self->valueOrDefault2("telefone", $uorgWsdl),
                            ':email' => $self->valueOrDefault2("email", $uorgWsdl),

                            # Entender natureza
                            ':natureza' => '', #$self->valueOrDefault2("nomeAreaAtuaUorg", $uorgWsdl),

                            # Fronteira não consta no Web Service SIAPE
                            ':fronteira' => $self->valueOrDefault2("fronteira", $uorgWsdl),

                            ':fuso_horario' => $self->valueOrDefault2("fuso_horario", $uorgWsdl),
                            ':cod_uop' => $self->valueOrDefault2("cod_uop", $uorgWsdl),
                            ':cod_unidade' => $self->valueOrDefault2("cod_unidade", $uorgWsdl),
                            ':tipo' => $self->valueOrDefault2("tipo", $uorgWsdl),
                            ':tipo_desc' => $self->valueOrDefault2("tipo_desc", $uorgWsdl),
                            ':na_rodovia' => $self->valueOrDefault2("na_rodovia", $uorgWsdl),
                            ':logradouro' => $self->valueOrDefault2("logradouro", $uorgWsdl),
                            ':bairro' => $self->valueOrDefault2("bairro", $uorgWsdl),
                            ':cep' => $self->valueOrDefault2("cep", $uorgWsdl),
                            ':ptn_ge_coordenada' => $self->valueOrDefault2("ptn_ge_coordenada", $uorgWsdl),
                            ':municipio_siafi_siape' => $self->valueOrDefault2("codMunicipio", $uorgWsdl),
                            ':municipio_siscom' => $self->valueOrDefault2("codMunicipio", $uorgWsdl),
                            ':municipio_ibge' => $self->valueOrDefault2("codMunicipio", $uorgWsdl),
                            ':municipio_nome' => $self->valueOrDefault2("nomeMunicipio", $uorgWsdl),
                            ':municipio_uf' => $self->valueOrDefault2("siglaUfMunicipio", $uorgWsdl),

                            # Todas as uorgs listadas são ativas no webservice siape.
                            ':ativa' => true,

                            ':regimental' => $self->valueOrDefault2("indicadorUorgRegimenta", $uorgWsdl),
                            ':datamodificacao' => $self->valueOrDefault2("dataUltimaTransacao", $value),
                            ':und_nu_adicional' => $self->valueOrDefault2("und_nu_adicional", $uorgWsdl),
                            ':cnpjupag' => $self->valueOrDefault2("cnpjUpag", $uorgWsdl)
                        ]);
                    }
                });
            }
        }
        catch (Exception $e) {
            LogError::newWarn("Web Service Siape: não foi possível recuperar dados de determinada uorg.", $e->getMessage());
        }
    }
}
