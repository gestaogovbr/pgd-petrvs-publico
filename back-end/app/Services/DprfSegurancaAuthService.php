<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use phpseclib\Crypt\RSA;
use App\Exceptions\ServerException;
use Exception;

class DprfSegurancaAuthService
{
    private $siglaSistema = "";
    private $producao = false;
    private $urlProducao = "";
    private $urlHomologacao = "";
    public $autoIncluir = false;

    function __construct($config = null) {
        $dprfseguranca_config = $config ?: config('dprfseguranca');
        $this->producao = $dprfseguranca_config["producao"];
        $this->autoIncluir = $dprfseguranca_config["auto_incluir"];
        $this->siglaSistema = $dprfseguranca_config["sigla"];
        $this->urlProducao = $dprfseguranca_config["url_producao"];
        $this->urlHomologacao = $dprfseguranca_config["url_homologacao"];
    }

    /**
     * Obtem os dados do usuário pelo CPF
     * 
     * @param string $cpf  CPF do usuário
     * @return mixed  Profile ou ["error" => string]
     */
    public function getUsuarioByCPF($cpf) {
        try {
            Validator::make(["cpf" => $cpf], ["cpf" => ['regex:/^\d{11}$/']]);
            $response = Http::get($this->getUrl() . '/usuario/cpf/' . $cpf);
            if($response->successful()) {
                return $response->json();
            } else {
                throw new ServerException("DprfSegurancaAuthService_User_Not_Found");
            }
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Faz login com usuário e senha
     * 
     * @param string $cpf  CPF do usuário
     * @param string $senha  Senha do usuário (sem hash)
     * @return mixed  Profile ou ["error" => string]
     */
    public function login($cpf, $senha)
    {
        try {
            Validator::make(["cpf" => $cpf, "senha" => $senha], ["cpf" => 'regex:/^\d{11}$/', "senha" => 'required']);
            $response = Http::get($this->getUrl() . '/logon', [
                'cpf' => $cpf, 
                'senha' => base64_encode(hash('md5', $senha, true)), 
                'ip' => $this->getIp(), 
                'siglaSistema' => $this->siglaSistema, 
                'cript' => 'true'
            ]);
            if($response->successful()) {
                return $response->json();
            } else {
                throw new ServerException("DprfSegurancaAuthService_Invalid_User_Or_Password");
            }
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Faz login pelo CPF e a senha do usuário (não requer que o sistema esteja cadastrado)
     * ATENÇÃO: NÃO UTILIZAR ESSA FUNÇÃO EM PRODUÇÃO
     * 
     * @param string $cpf  CPF do usuário
     * @param string $senha  Senha do usuário (sem hash)
     * @return mixed  Profile ou ["error" => string]
     */
    public function loginCpf($cpf, $senha)
    {
        $usuario = $this->getUsuarioByCPF($cpf);
        if(isset($usuario['error'])) {
            return $usuario;
        } else if(!isset($usuario['email'])) {
            return ['error' => 'Usuário não possui email'];
        } else if(!isset($usuario['senha']) || $usuario['senha'] != base64_encode(hash('md5', $senha, true))) {
            return ['error' => 'Senha inválida'];
        }
        return $usuario;
    }

    /**
     * Faz login pelo CPF, senha e token
     * 
     * @param string $cpf  CPF do usuário
     * @param string $senha  Senha do usuário (sem hash)
     * @param string $token  Token do Google Authentication
     * @return mixed  Profile ou ["error" => string]
     */
    public function loginToken($cpf, $senha, $token)
    {
        try {
            Validator::make(["cpf" => $cpf, "senha" => $senha, "token" => $token], ["cpf" => 'regex:/^\d{11}$/', "senha" => 'required', "token" => 'required']);
            $chave = $this->getPublicKey();
            $rsa = new RSA();
            $rsa->setMGFHash('sha1');
            $rsa->setHash('sha256');
            $rsa->loadKey($chave);
            /*$response = Http::post($this->getUrl() . '/logon/logonPost', [
                'chave' => $cpf,
                'senha' => base64_encode($rsa->encrypt($senha)),
                'ip' => $this->getIp(),
                'siglaSistema' => $this->siglaSistema,
                'cript' => true,
                'token' => $token
            ]);*/
            $credenciais = [
                'chave' => $cpf,
                'senha' => base64_encode($rsa->encrypt($senha)),
                'ip' => $this->getIp(),
                'siglaSistema' => $this->siglaSistema,
                'cript' => true,
                'token' => $token
            ];
            $response = Http::withoutVerifying()->withOptions(["verify"=>false])->post($this->getUrl() . '/logon/logonPost', $credenciais);
            if($response->successful()) {
                return $response->json();
            } else {
                throw new Exception("Credenciais inválidas");
            }
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Obtem a chave pública do certificado
     * 
     * @throws Exception  Erro
     * @return string  Chave do certificado
     */
    public function getPublicKey() {
        $response = Http::get($this->getUrl() . '/logon/chavePublica');
        if($response->successful()) {
            $result = $response->json();
            if(isset($result['chaveString'])) {
                return $result['chaveString'];
            } else {
                throw new Exception("Chave de certificado não encontrado");
            }
        } else {
            throw new Exception("Credenciais inválidas");
        }
    }

    /**
     * Obtem a URL do WebService do DPRFSegurança
     * 
     * @return string  Url base do serviço
     */
    function getUrl() {
        return $this->producao ? $this->urlProducao : $this->urlHomologacao;
    }

    /**
     * Obtem o IP da requisição
     * 
     * @return string  IP
     */
    public function getIp()
    {
        if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }

    /**
     * Obtem o IP da requisição
     * 
     * @param Usuario $usuario Usuário model
     * @param mixed $profile  Dados retornados do login
     */
    public function fillUsuarioWithProfile(&$usuario, $profile) {
        $usuario->password = Hash::make($profile["cpf"]);
        $usuario->email = str_contains($profile["email"], "@") ? $profile["email"] : $profile["email"] . "@prf.gov.br";
        $usuario->nome = $profile["nome"];
        $usuario->apelido = $profile["nomeGuerra"];
        $usuario->cpf = $profile["cpf"];
        $usuario->matricula = $profile["matriculaSiape"];
        $usuario->telefone = $profile["telefoneContato"];
        //$usuario->uf = $profile["fkUfUf"];
    }
}
