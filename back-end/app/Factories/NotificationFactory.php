<?php

namespace App\Factories;

use App\Notifications\SlowQueryNotificacao;
use App\Notifications\InternalServerErrorNotificacao;

class NotificationFactory
{
    public static function make(string $type, array $data = [])
    {
        return match ($type) {
            'slow_query' => new SlowQueryNotificacao($data),
            'error_500' => new InternalServerErrorNotificacao($data),
            default => null,
        };
    }
}
