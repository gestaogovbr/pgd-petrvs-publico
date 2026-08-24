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

    /** @return string[] */
    public static function getUnidadesGeridas(string $usuarioId, Closure $loader, bool $incluirDelegado = true): array
    {
        return Cache::remember(
            self::keyGeridas($usuarioId, $incluirDelegado),
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
        Cache::forget(self::keyGeridas($usuarioId, true));
        Cache::forget(self::keyGeridas($usuarioId, false));
    }

    private static function keyGeridas(string $usuarioId, bool $incluirDelegado): string
    {
        return self::PREFIX_GERIDAS . $usuarioId . ($incluirDelegado ? '' : ':sem-delegado');
    }

    public static function invalidarTudo(): void
    {
        $invalidator = app(CacheInvalidator::class);
        $invalidator->invalidateByPrefix([
            self::PREFIX_HIERARQUIA,
            self::PREFIX_GERIDAS,
        ]);
    }
}
