<?php

namespace App\Factories;

use App\Notifications\SlowQueryNotificacao;

class NotificationFactory
{
    public static function make(string $type, array $data = [])
    {
        return match ($type) {
            'slow_query' => new SlowQueryNotificacao($data),
            default => null,
        };
    }
}

