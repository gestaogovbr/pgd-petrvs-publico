<?php

return [
    'entidade' => env('PETRVS_ENTIDADE', ''),
    'suporte' => env('PETRVS_SUPORTE', ''),
    'logo' => env('PETRVS_LOGO', ''),
    'timezone' => env('PETRVS_SERVIDOR_TIMEZONE', -3),
    'rotinas-diarias' => [
        'token' => env('PETRVS_ROTINAS_DIARIAS_TOKEN', '')
    ],
    'actions' => [
        'web' => [
            'login-user-password' => env('PETRVS_ACTION_LOGIN_USER_PASSWORD', ''),
            'login-firebase-token' => env('PETRVS_ACTION_LOGIN_FIREBASE_TOKEN', ''),
            'login-google-token' => env('PETRVS_ACTION_LOGIN_GOOGLE_TOKEN', env('PETRVS_ACTION_LOGIN_GAPI_TOKEN', '')),
            'login-institucional' => env('PETRVS_ACTION_LOGIN_INSTITUCIONAL', '')
        ],
        'api' => [
            'login-user-password' => env('PETRVS_API_LOGIN_USER_PASSWORD', ''),
            'login-firebase-token' => env('PETRVS_API_LOGIN_FIREBASE_TOKEN', ''),
            'login-google-token' => env('PETRVS_API_LOGIN_GOOGLE_TOKEN', env('PETRVS_API_LOGIN_GAPI_TOKEN', '')),
            'login-institucional' => env('PETRVS_API_LOGIN_INSTITUCIONAL', '')
        ]
    ],
    'login' => [
        "user-password" => env('PETRVS_LOGIN_USER_PASSWORD', false),
        "gsuit" => env('PETRVS_LOGIN_GSUIT', true),
        "azure" => env('PETRVS_LOGIN_AZURE', true),
        "institucional" => env('PETRVS_LOGIN_INSTITUCIONAL', false),
        "firebase" => env('PETRVS_LOGIN_FIREBASE', false)
    ]
];
