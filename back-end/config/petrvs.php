<?php

return [
    'entidade' => env('PETRVS_ENTIDADE', ''),
    'suporte' => env('PETRVS_SUPORTE', ''),
    'logo' => env('PETRVS_LOGO', ''),
    'timezone' => env('PETRVS_SERVIDOR_TIMEZONE', -3),
    'actions' => [
        'web' => [
            'login-user-password' => env('PETRVS_ACTION_LOGIN_USER_PASSWORD', ''),
            'login-firebase-token' => env('PETRVS_ACTION_LOGIN_FIREBASE_TOKEN', ''),
            'login-gapi-token' => env('PETRVS_ACTION_LOGIN_GAPI_TOKEN', ''),
            'login-institucional' => env('PETRVS_ACTION_LOGIN_INSTITUCIONAL', '')
        ],
        'api' => [
            'login-user-password' => env('PETRVS_API_LOGIN_USER_PASSWORD', ''),
            'login-firebase-token' => env('PETRVS_API_LOGIN_FIREBASE_TOKEN', ''),
            'login-gapi-token' => env('PETRVS_API_LOGIN_GAPI_TOKEN', ''),
            'login-institucional' => env('PETRVS_API_LOGIN_INSTITUCIONAL', '')
        ]
    ]
];