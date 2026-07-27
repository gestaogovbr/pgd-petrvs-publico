<?php

declare(strict_types=1);

namespace App\Cache;

abstract class CacheInvalidator
{
    /**
     * @param string[] $prefixes
     */
    abstract public function invalidateByPrefix(array $prefixes): void;
}
