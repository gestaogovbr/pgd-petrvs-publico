<?php

declare(strict_types=1);

namespace App\Cache;

use Closure;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class GestorHierarquiaCache
{
    private const TTL_SECONDS = 3600;
    private const PREFIX_HIERARQUIA = 'unidade-hierarquia:';
    private const PREFIX_GERIDAS = 'unidades-geridas:';

    /** @return string[] */
    public static function getUnidadesGeridas(string $usuarioId, Closure $loader): array
    {
        return Cache::remember(
            self::PREFIX_GERIDAS . $usuarioId,
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
    }

    public static function invalidarTudo(): void
    {
        if (!(Cache::getStore() instanceof \Illuminate\Cache\RedisStore)) {
            return;
        }

        $prefix = config('cache.prefix', '') . ':';
        $patterns = [
            $prefix . self::PREFIX_HIERARQUIA . '*',
            $prefix . self::PREFIX_GERIDAS . '*',
        ];

        foreach ($patterns as $pattern) {
            $cursor = null;
            do {
                [$cursor, $keys] = Redis::scan($cursor, ['match' => $pattern, 'count' => 100]);
                if (!empty($keys)) {
                    Redis::del(...$keys);
                }
            } while ($cursor);
        }
    }
}
