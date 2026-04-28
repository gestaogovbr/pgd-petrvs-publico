<?php

declare(strict_types=1);

namespace App\Support;

use DateTimeImmutable;
use InvalidArgumentException;

final class SiapeDate
{
    public const FORMATO_DATA_ULTIMA_TRANSACAO = 'dmY';
    public const FORMATO_DATA_BANCO = 'Y-m-d 00:00:00';

    public static function dataUltimaTransacaoParaBanco(mixed $valor): ?string
    {
        if (!is_scalar($valor)) {
            return null;
        }

        $texto = trim((string) $valor);
        if ($texto === '') {
            return null;
        }

        $data = DateTimeImmutable::createFromFormat('!' . self::FORMATO_DATA_ULTIMA_TRANSACAO, $texto);
        $erros = DateTimeImmutable::getLastErrors();

        if (
            $data === false
            || (is_array($erros) && (($erros['warning_count'] ?? 0) > 0 || ($erros['error_count'] ?? 0) > 0))
            || $data->format(self::FORMATO_DATA_ULTIMA_TRANSACAO) !== $texto
        ) {
            return null;
        }

        return $data->format(self::FORMATO_DATA_BANCO);
    }

    public static function dataUltimaTransacaoParaBancoOuFalha(mixed $valor): string
    {
        $data = self::dataUltimaTransacaoParaBanco($valor);

        if ($data === null) {
            throw new InvalidArgumentException('Data da ultima transacao SIAPE invalida.');
        }

        return $data;
    }
}
