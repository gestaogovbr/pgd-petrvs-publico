<?php

declare(strict_types=1);

namespace App\Traits;

trait SqlPlaceholders
{
    private function sqlPlaceholders(array $items): string
    {
        return implode(',', array_fill(0, count($items), '?'));
    }
}
