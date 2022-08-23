<?php

namespace App\Exceptions;

use Exception;

class ServerException extends Exception
{
    private $exceptions = [
        "GapiService_Invalid_Token" => "Token de autenticação inválido",
        "DprfSegurancaAuthService_User_Not_Found" => "Usuário não encontrado",
        "DprfSegurancaAuthService_Invalid_User_Or_Password" => "Usuário ou senha inválidos",
        "CapacidadeSearchText" => "Usuário não tem permissão para pesquisar nessa tabela",
        "CapacidadeStore" => "Usuário não tem permissão para gravar nessa tabela",
        "ValidateAtividade" => "Erro ao validar atividade",
        "ValidateDemanda" => "Erro ao validar demanda",
        "ValidatePlano" => "Erro ao validar Plano",
        "ValidateDocumento" => "Erro ao validar Documento"
    ];

    function __construct($code, $extra = "") {
        parent::__construct($this->exceptions[$code] . (empty($extra) ? "" : " (" . $extra . ")"));
    }
}
