<?php

declare(strict_types=1);

namespace App\Services\Siape;

use App\Exceptions\ErrorDataSiapeFaultCodeException;
use Throwable;

final class MensagemConsultaServidorSiape
{
    public const DADOS_FUNCIONAIS_AUSENTES = 'O SIAPE não retornou os dados funcionais deste CPF para este órgão. Confira o CPF informado. Se estiver correto, peça à gestão de pessoas que verifique o vínculo do servidor no SIAPE. Depois da regularização, faça uma nova busca.';
    public const FALHA_CONSULTA = 'Não foi possível consultar o SIAPE neste momento. Aguarde alguns minutos e tente novamente. Se o problema continuar, baixe o log desta tentativa e anexe-o ao chamado de atendimento.';
    public const DADOS_FUNCIONAIS_INVALIDOS = 'Não foi possível concluir a consulta com os dados recebidos do SIAPE. Tente novamente. Se o problema continuar, baixe o log desta tentativa e anexe-o ao chamado de atendimento.';
    public const DADOS_PGD_AUSENTES = 'Encontramos o servidor, mas faltam informações sobre sua participação ou modalidade no PGD. Peça à gestão de pessoas que confira essas informações no SIAPE. Depois da atualização, faça uma nova busca no Petrvs.';

    public static function falhaFuncional(Throwable $erro): string
    {
        do {
            if ($erro instanceof ErrorDataSiapeFaultCodeException) {
                return self::DADOS_FUNCIONAIS_AUSENTES;
            }
            $erro = $erro->getPrevious();
        } while ($erro !== null);

        return self::DADOS_FUNCIONAIS_INVALIDOS;
    }
}
