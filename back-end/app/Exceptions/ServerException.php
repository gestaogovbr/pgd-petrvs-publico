<?php

namespace App\Exceptions;

use Exception;

class ServerException extends Exception
{
    private $exceptions = [
        "Api_Service_Invalid_Token" => "Token de autenticação inválido",
        "Api_Service_Expirad_Token" => "Token de autenticação expirado",
        "Api_Service_Invalid_Credentials" => "Token de autenticação com credenciais inválidas",
        "Google_Service_Invalid_Token" => "Token de autenticação inválido",
        "DprfSegurancaAuthService_User_Not_Found" => "Usuário não encontrado",
        "DprfSegurancaAuthService_Invalid_User_Or_Password" => "Usuário ou senha inválidos",
        "CapacidadeSearchText" => "Usuário não tem permissão para pesquisar nessa tabela",
        "CapacidadeStore" => "Usuário não tem permissão para inserir/alterar nessa tabela",
        "CapacidadeUpdate" => "Usuário não tem permissão para realizar esta alteração",
        "CapacidadeDestroy" => "Usuário não tem permissão para excluir registros desta tabela",
        "ValidateAvaliacao" => "Erro ao validar avaliacao",
        "ValidateAtividade" => "Erro ao validar atividade",
        "ValidateAtividadeTarefa" => "Erro ao validar tarefa da atividade",
        "ValidateDocumento" => "Erro ao validar Documento",
        "ValidateIntegrante" => "Erro ao validar vínculos/atribuições entre Unidade e Usuário",
        "ValidateLotacao" => "Erro ao validar Lotação do usuário",
        "ValidateOcorrencia" => "Erro ao validar Ocorrencia",
        "ValidatePainel" => "Erro ao validar Painel",
        "ValidatePlanejamentoInstitucional" => "Erro ao validar Planejamento Institucional",
        "ValidatePlanoEntrega" => "Erro ao validar Plano de Entregas",
        "ValidatePlanoTrabalho" => "Erro ao validar Plano de Trabalho",
        "ValidatePlanoTrabalhoConsolidacao" => "Erro ao validar Consolidação do Plano de Trabalho",
        "ValidatePlanoTrabalhoEntrega" => "Erro ao validar Entrega do Plano de Trabalho",
        "ValidateProgramaParticipante" => "Erro ao validar o Participante",
        "ValidatePrograma" => "Erro ao validar o Regramento",
        "ValidateUnidade" => "Erro ao validar Unidade",
        "ValidateUsuario" => "Erro ao validar o usuário"
    ];

    function __construct(string $code, string $extra = "") {
        $message  = [$this->getMessageException($code)];
        if(!empty($extra)) {
            $message[] = $extra;
        }
        parent::__construct(implode(" : ", $message));
    }

    private function getMessageException(string $code) : string
    {
        return array_key_exists($code, $this->exceptions) ? $this->exceptions[$code] : "Erro desconhecido";
    }
}
