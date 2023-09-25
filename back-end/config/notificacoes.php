<?php

return [
    'email' => [
        'enviar' => env('NOTIFICACOES_EMAIL', true),
        'url' => env('NOTIFICACOES_WHATSAPP_URL', 'http://localhost:8082'),
        'signature' => env('NOTIFICACOES_SIGNATURE', 'assets/images/signature.png')
    ],
    'whatsapp' => [
        'authorization' => env('NOTIFICACOES_WHATSAPP_AUTHORIZATION', "537cf26417560a177e1ae32c91f0eeff"),
        'enviar' => env('NOTIFICACOES_WHATSAPP', false),
        'url' => env('NOTIFICACOES_WHATSAPP_URL', 'http://localhost:8082')
    ],
    'petrvs' => [
        'enviar' => true
    ]
];