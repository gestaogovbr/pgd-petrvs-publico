<?php

declare(strict_types=1);

namespace App\Cache;

use Closure;
use Illuminate\Support\Facades\Cache;

class GestorHierarquiaCache
{
    private const TTL_SECONDS = 3600;
    private const PREFIX_HIERARQUIA = 'unidade-hierarquia:';
    private const PREFIX_GERIDAS = 'unidades-geridas:';
    private const PREFIX_ATRIBUICOES = 'unidades-atribuicoes:';

    /** @return string[] */
    public static function getUnidadesGeridas(string $usuarioId, Closure $loader): array
    {
        return Cache::remember(
            self::PREFIX_GERIDAS . $usuarioId,
            self::TTL_SECONDS,
            $loader,
        );
    }

    /** @return string[] IDs das unidades onde o usuário possui qualquer atribuição ativa */
    public static function getUnidadesComAtribuicao(string $usuarioId, Closure $loader): array
    {
        return Cache::remember(
            self::PREFIX_ATRIBUICOES . $usuarioId,
            self::TTL_SECONDS,
            $loader,
        );
    }

    /** @return string[] */
    public static function getSubordinadas(string $unidadeId, Closure $loader): array
    {
        return Cache::remember(
            self::PREFIX_HIERARQUIA . $unidadeId,
            self::TTL_SECONDS,
            $loader,
        );
    }

    public static function forgetUsuario(string $usuarioId): void
    {
        Cache::forget(self::PREFIX_GERIDAS . $usuarioId);
        Cache::forget(self::PREFIX_ATRIBUICOES . $usuarioId);
    }

    public static function forgetAtribuicoesUsuario(string $usuarioId): void
    {
        Cache::forget(self::PREFIX_ATRIBUICOES . $usuarioId);
    }

    public static function invalidarTudo(): void
    {
        $invalidator = app(CacheInvalidator::class);
        $invalidator->invalidateByPrefix([
            self::PREFIX_HIERARQUIA,
            self::PREFIX_GERIDAS,
            self::PREFIX_ATRIBUICOES,
        ]);
    }
}
