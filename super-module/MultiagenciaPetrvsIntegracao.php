<?

class MultiagenciaPetrvsIntegracao extends SeiIntegracao
{
    const USUARIO_NAO_ENCONTRADO = 'USER_NOT_FOUND';
    const RECURSO_SISTEMA_PETRVS = 'md_multiagencia_petrvs';
    const PARAMETRO_URL_B2B_API = 'MD_MULTIAGENCIA_PETRVS_URL_B2B_API';
    const PARAMETRO_URL = 'MD_MULTIAGENCIA_PETRVS_URL';
    const PARAMETRO_ENTIDADE = 'MD_MULTIAGENCIA_PETRVS_ENTIDADE';
    const PARAMETRO_API_PUBLIC_KEY = 'MD_MULTIAGENCIA_PETRVS_API_PUBLIC_KEY';
    const SESSAO_SESSION_TOKEN = 'MD_MULTIAGENCIA_PETRVS_SESSION_TOKEN';

    public function getNome() {
        return 'Módulo PETRVS: Plataforma Eletrônica de Trabalho e Visão Sistêmica';
    }
    public function getVersao() {
        return '1.0.0';
    }
    public function getInstituicao() {
        return 'Multiagência: Desenvolvimento colaborativo entre entes públicos';
    }
    /*public function processarControlador($strAcao){
        $retorno = false;
        switch($strAcao) {
            case 'md_multiagencia_petrvs_ALGUMACOISA':
                require_once dirname(__FILE__).'/.php';
                $retorno = true;
                break;
        }
        return $retorno;
    }*/

    /**
     * Monta os scripts necessários para o bootstrap da aplicação Petrvs
     * Necessário antes configurar o parâmetro MD_MULTIAGENCIA_PETRVS_URL
     * 
     * @return string[]
     */
    public function montarJavaScript($strAcao) {
        $objSessaoSEI = SessaoSEI::getInstance();
        $retorno = [];
        try {
            $objInfraParametro = new InfraParametro(BancoSEI::getInstance());
            $urlB2B = $objInfraParametro->isSetValor(self::PARAMETRO_URL_B2B_API) ? $objInfraParametro->getValor(self::PARAMETRO_URL_B2B_API) : null;
            $url = $objInfraParametro->isSetValor(self::PARAMETRO_URL) ? $objInfraParametro->getValor(self::PARAMETRO_URL) : "";
            $entidade = $objInfraParametro->isSetValor(self::PARAMETRO_ENTIDADE) ? $objInfraParametro->getValor(self::PARAMETRO_ENTIDADE) : "";
            $chave = $objInfraParametro->isSetValor(self::PARAMETRO_API_PUBLIC_KEY) ? $objInfraParametro->getValor(self::PARAMETRO_API_PUBLIC_KEY) : "";
            $token = $objSessaoSEI->isSetAtributo(self::SESSAO_SESSION_TOKEN) ? $objSessaoSEI->getAtributo(self::SESSAO_SESSION_TOKEN) : "";
            if (!empty($objSessaoSEI->getNumIdUsuario()) /*&& $objSessaoSEI->validarPermissao(self::RECURSO_SISTEMA_PETRVS)*/ && !empty($url) && !empty($entidade) && !empty($chave)) {
                if (empty($token)) {
                    // Faz o login no Petrvs passando as credenciais do usuário criptografadas com a chave privada MD_MULTIAGENCIA_PETRVS_PUBLIC_KEY
                    $token = $this->gerarTokenSessao($urlB2B ?: $url, $chave, $entidade);
                    $objSessaoSEI->setAtributo(self::SESSAO_SESSION_TOKEN, $token);
                } 
                $token = $objSessaoSEI->isSetAtributo(self::SESSAO_SESSION_TOKEN) ? $objSessaoSEI->getAtributo(self::SESSAO_SESSION_TOKEN) : "";
                if(!empty($token) && $token != self::USUARIO_NAO_ENCONTRADO) {
                    $retorno = [
                        "<script type='text/javascript'>\n".
                            "var MD_MULTIAGENCIA_PETRVS_SESSION_TOKEN='{$token}';\n".
                            "var MD_MULTIAGENCIA_PETRVS_URL='{$url}';\n".
                            "var MD_MULTIAGENCIA_PETRVS_VERSAO='{$this->getVersao()}';\n".
                            "console.warn('Modulo PETRVS carregado');\n".
                        "</script>",
                        "<script type='text/javascript' src='modulos/multiagencia/petrvs/js/functions.js' defer></script>",
                        "<script type='text/javascript' src='modulos/multiagencia/petrvs/js/bootstrap.js' defer></script>"
                    ];
                }
            }
        } catch (Throwable $erro) {
            LogSEI::getInstance()->gravar('PETRVS{montarJavaScript}: ' . $erro->getMessage(), InfraLog::$ERRO);
        }
        return $retorno;
    }

    /**
     * Gera um token para o usuário utilizando as credencias do SUPER (CPF, email, nome)
     * 
     * @param string $urlBase  URL base para a action generate-session-token
     * @param mixed $chaveCriptografica  Chave publica gerada diretamente na configuração da entidade dentro do Petrvs
     * @param array $entidade  Sigla da entidade
     * @return mixed 
     */
    private function gerarTokenSessao($urlBase, $chaveCriptografica, $entidade) {
        try {
            $usuarioId = SessaoSEI::getInstance()->getNumIdUsuario();
            $objSessaoSEI = SessaoSEI::getInstance();
            $objUsuarioDTO = new UsuarioDTO();
            $objUsuarioDTO->retDblCpfContato();
            $objUsuarioDTO->retStrEmailContato();
            $objUsuarioDTO->setNumIdUsuario($usuarioId);
            $objUsuarioRN = new UsuarioRN();
            $objUsuarioDTO = $objUsuarioRN->consultarRN0489($objUsuarioDTO);
            $credencial = [
                "entidade" => utf8_encode($entidade),
                "id_super" => $usuarioId,
                "cpf" => utf8_encode(str_pad($objUsuarioDTO->getDblCpfContato(), 11, '0', STR_PAD_LEFT)),
                "email" => utf8_encode($objUsuarioDTO->getStrEmailContato()),
                "usuario" => utf8_encode($objSessaoSEI->getStrSiglaUsuario()),
                "nome" => utf8_encode($objSessaoSEI->getStrNomeUsuario()),
                "timestamp" => time()
            ];
            $chave = "-----BEGIN PUBLIC KEY-----\n" . $chaveCriptografica . "\n-----END PUBLIC KEY-----";
            openssl_public_encrypt(json_encode($credencial, JSON_FORCE_OBJECT), $encrypted, $chave);
            $data = [
                "entidade" => $entidade,
                "token" => base64_encode($encrypted)
            ];
            $session = $this->httpPostJson(preg_replace("/\/$/", "", $urlBase) . "/api/generate-session-token", $data);
            if(!empty($session["error"]) && $session["error"] == self::USUARIO_NAO_ENCONTRADO) return $session["error"];
            if(empty($session["token"])) throw new Exception("Erro ao obter token do servidor");
            return $session["token"];
        } catch (Throwable $erro) {
            LogSEI::getInstance()->gravar('PETRVS{gerarTokenSessao}: ' . $erro->getMessage(), InfraLog::$ERRO);
            return "";
        }
    }

    /**
     * Faz uma requisição do tipo POST com conteúdo application/json
     * 
     * @param string $url  URL da requisição
     * @param mixed $data  dados a serem enviados (será codificado em JSON) 
     * @param array $headers?  Headers (opicional)
     * @return mixed 
     */
    private function httpPostJson($url, $data, $headers = []) {
        $resposta = null;
        try {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array_merge(['Content-Type: application/json'], $headers));
            $resposta = json_decode(curl_exec($curl), true);
        } catch (Throwable $erro) {
            LogSEI::getInstance()->gravar('PETRVS{httpPostJson}: ' . $erro->getMessage(), InfraLog::$ERRO);
        }
        return $resposta;
    }
}
