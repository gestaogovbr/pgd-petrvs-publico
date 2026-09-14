<?php

namespace App\Services;

use App\Exceptions\ServerException;

class CodigoOrgaoService
{
    public const MENSAGEM_OBRIGATORIO = 'O Código do Órgão da API Consulta SIAPE é obrigatório para criar o tenant.';
    public const MENSAGEM_TAMANHO = 'O Código do Órgão da API Consulta SIAPE deve ter no máximo 20 caracteres.';

    public static function normalizar(mixed $codigo): ?string
    {
        if ($codigo === null) {
            return null;
        }

        $codigo = trim((string) $codigo);

        if ($codigo === '') {
            return null;
        }

        return ctype_digit($codigo) ? (ltrim($codigo, '0') ?: '0') : $codigo;
    }

    public static function obrigatorio(mixed $codigo, ?string $mensagem = null): string
    {
        $normalizado = self::normalizar($codigo);

        if ($normalizado === null) {
            throw new ServerException('Tenant', $mensagem ?? self::MENSAGEM_OBRIGATORIO);
        }

        if (mb_strlen($normalizado) > 20) {
            throw new ServerException('Tenant', self::MENSAGEM_TAMANHO);
        }

        return $normalizado;
    }

    public static function atual(): string
    {
        $codigo = config('integracao.siape.codOrgao');

        if (tenancy()->initialized && tenant()) {
            $codigo = tenant('integracao_siape_codorgao') ?? $codigo;
        }

        return self::obrigatorio(
            $codigo,
            'O Código do Órgão da API Consulta SIAPE é obrigatório para criar uma unidade.'
        );
    }
}
