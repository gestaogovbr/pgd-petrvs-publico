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

        $connectionName = config('cache.stores.redis.connection', 'cache');

        /** @var \Redis $client */
        $client = Redis::connection($connectionName)->client();

        $clientPrefix = $client->getOption(\Redis::OPT_PREFIX) ?: '';
        $storePrefix = Cache::getStore()->getPrefix();
        $fullPrefix = $clientPrefix . $storePrefix;

        $patterns = [
            $fullPrefix . '*' . self::PREFIX_HIERARQUIA . '*',
            $fullPrefix . '*' . self::PREFIX_GERIDAS . '*',
        ];

        $client->setOption(\Redis::OPT_PREFIX, '');

        foreach ($patterns as $pattern) {
            $cursor = null;
            do {
                $keys = $client->scan($cursor, $pattern, 100);
                if ($keys !== false && !empty($keys)) {
                    $client->del(...$keys);
                }
            } while ($cursor > 0);
        }

        $client->setOption(\Redis::OPT_PREFIX, $clientPrefix);
    }
}
