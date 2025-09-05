<?php

namespace App\Exceptions;

use App\Exceptions\Contracts\IBaseException;
use Exception;

class ServerException extends Exception implements IBaseException
{
    private $exceptions = [
        "Api_Service_Invalid_Token" => "Token de autenticação inválido",
        "Api_Service_Expirad_Token" => "Token de autenticação expirado",
        "Api_Service_Invalid_Credentials" => "Token de autenticação com credenciais inválidas",
        "Google_Service_Invalid_Token" => "Token de autenticação inválido",
        "CapacidadeSearchText" => "Usuário não tem permissão para pesquisar nessa tabela",
        "CapacidadeStore" => "Usuário não tem permissão para inserir/alterar nessa tabela",
        "CapacidadeUpdate" => "Usuário não tem permissão para realizar esta alteração",
        "CapacidadeDestroy" => "Usuário não tem permissão para excluir registros desta tabela",
        "ProdutoStore" => "Usuário não tem permissão para inserir/alterar Produtos",
        "ProdutoUpdate" => "Usuário não tem permissão para ativar/desativar Produtos",
        "ProdutoDestroy" => "Usuário não tem permissão para excluir Produtos",
        "ProdutoEnableAll" => "Erro ao Ativar Todos os Produtos/Serviços",
        "ProdutoDisableAll" => "Erro ao Desativar Todos os Produtos/Serviços",
        "ProgramaStore" => "Usuário não tem permissão para inserir/alterar regramentos",
        "SolucaoStore" => "Usuário não tem permissão para inserir/alterar Soluções",
        "SolucaoUpdate" => "Usuário não tem permissão para alterar Soluções",
        "SolucaoDestroy" => "Usuário não tem permissão para excluir Soluções",
        "SolucaoComProdutosUpdate" => "Esta Solução possui produtos vinculados e não pode ser alterada",
        "SolucaoComProdutosDestroy" => "Esta Solução possui produtos vinculados e não pode ser excluída",
        "SolucaoEnableAll" => "Erro ao Ativar Todas as Soluções",
        "SolucaoDisableAll" => "Erro ao Desativar Todas as Soluções",
        "ProgramaConcluir" => "Usuário não tem permissão para concluir regramentos",
        "ProgramaUpdate" => "Usuário não tem permissão para alterar regramentos",
        "ProgramaDestroy" => "Usuário não tem permissão para excluir regramentos",
        "RelatorioCapacidade" => "Usuário não tem permissão para abrir este Relatório",
        "ValidateAvaliacao" => "Erro ao validar avaliacao",
        "ValidateRecursoAvaliacao" => "Erro ao validar o recurso da avaliação",
        "ValidateAtividade" => "Erro ao validar atividade",
        "ValidateAtividadeTarefa" => "Erro ao validar tarefa da atividade",
        "ValidateDocumento" => "Erro ao validar Documento",
        "ValidateIntegrante" => "Erro ao validar vínculos/atribuições entre Unidade e Usuário",
        "ValidateLotacao" => "Erro ao validar Lotação do usuário",
        "ValidateOcorrencia" => "Erro ao validar Ocorrencia",
        "ValidatePainel" => "Erro ao validar Painel",
        "ValidatePlanejamentoInstitucional" => "Erro ao validar Planejamento Institucional",
        "ValidatePlanoEntrega" => "Erro ao validar Plano de Entregas",
        "ValidateProduto" => "Erro ao validar Produto/Serviço",
        "ValidatePlanoTrabalho" => "Erro ao validar Plano de Trabalho",
        "ValidatePlanoTrabalhoConsolidacao" => "Erro ao validar Consolidação do Plano de Trabalho",
        "ValidatePlanoTrabalhoEntrega" => "Erro ao validar Entrega do Plano de Trabalho",
        "ValidateProgramaParticipante" => "Erro ao validar o Participante",
        "ValidatePrograma" => "Erro ao validar o Regramento",
        "ValidateProgramaPendencia" => "",
        "ValidateProgramaDestroy" => "Este regramento possui planos de entrega ou planos de trabalho vinculados e não pode ser excluído, apenas encerrado",
        "ValidateRelato" => "Erro ao enviar o relato",
        "ValidateUnidade" => "Erro ao validar Unidade",
        "ValidateUsuario" => "Erro ao validar o usuário",
        "TipoClienteExcluir" => "Tipo de Cliente",
    ];

    function __construct(string $code, string $extra = "", string $separator = " : ") {
        $message  = [$this->getMessageException($code)];
        if(!empty($extra)) {
            $message[] = $extra;
        }
        parent::__construct(implode($separator, $message));
    }

    private function getMessageException(string $code) : string
    {
        return array_key_exists($code, $this->exceptions) ? $this->exceptions[$code] : "Erro desconhecido";
    }
}
