<?php

declare(strict_types=1);

namespace Tests\Helpers;

use App\Cache\CacheInvalidator;
use Illuminate\Support\Facades\Cache;

class CacheInvalidatorE2E extends CacheInvalidator
{
    public function invalidateByPrefix(array $prefixes): void
    {
        Cache::flush();
    }
}
