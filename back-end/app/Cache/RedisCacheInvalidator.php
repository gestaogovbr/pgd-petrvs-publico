<?php

declare(strict_types=1);

namespace App\Cache;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class RedisCacheInvalidator extends CacheInvalidator
{
    public function invalidateByPrefix(array $prefixes): void
    {
        if (empty($prefixes)) {
            return;
        }

        if (!(Cache::getStore() instanceof \Illuminate\Cache\RedisStore)) {
            Log::error('[RedisCacheInvalidator] Cache driver não é Redis. Invalidação por prefixo requer RedisStore.');
            return;
        }

        $connectionName = config('cache.stores.redis.connection', 'cache');

        /** @var \Redis $client */
        $client = Redis::connection($connectionName)->client();

        $clientPrefix = $client->getOption(\Redis::OPT_PREFIX) ?: '';
        $storePrefix = Cache::getStore()->getPrefix();
        $fullPrefix = $clientPrefix . $storePrefix;

        $client->setOption(\Redis::OPT_PREFIX, '');

        foreach ($prefixes as $prefix) {
            $pattern = $fullPrefix . '*' . $prefix . '*';
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
