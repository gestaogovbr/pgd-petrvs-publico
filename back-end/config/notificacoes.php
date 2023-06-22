<?php

return [
    'email' => [
        'enviar' => env('NOTIFICACOES_EMAIL', false),
        'url' => env('NOTIFICACOES_WHATSAPP_URL', ''),
        'signature' => env('NOTIFICACOES_SIGNATURE', '<b>Petrvs</b>')
    ],
    'whatsapp' => [
        'authorization' => env('NOTIFICACOES_WHATSAPP_AUTHORIZATION', "SENHA_SECRETA"),
        'enviar' => env('NOTIFICACOES_WHATSAPP', false),
        'url' => env('NOTIFICACOES_WHATSAPP_URL', '')
    ],
    'petrvs' => [
        'enviar' => true
    ]
];