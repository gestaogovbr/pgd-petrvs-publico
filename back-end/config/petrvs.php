<?php

return [
    'tenant' => [
        'type' => env('PETRVS_TENANT_TYPE', 'request')
    ],
    'entidade' => env('PETRVS_ENTIDADE', 'PRF'),
    'auto-login' => env('PETRVS_AUTO_LOGIN', ''),
    'suporte' => env('PETRVS_SUPORTE', ''),
    'logo' => env('PETRVS_LOGO', ''),
    'timezone' => env('PETRVS_SERVIDOR_TIMEZONE', -3),
    'api-max-expiration-time-token' => env('PETRVS_API_MAX_EXPIRATION_TIME_TOKEN', 60000),
    'rotinas-diarias' => [
        'token' => env('PETRVS_ROTINAS_DIARIAS_TOKEN', '')
    ],
    'actions' => [
        'web' => [
            'login-user-password' => env('PETRVS_ACTION_LOGIN_USER_PASSWORD', 'authenticateUserPassword'),
            'login-firebase-token' => env('PETRVS_ACTION_LOGIN_FIREBASE_TOKEN', 'authenticateFirebaseToken'),
            'login-google-token' => env('PETRVS_ACTION_LOGIN_GOOGLE_TOKEN', env('PETRVS_ACTION_LOGIN_GAPI_TOKEN', 'authenticateGoogleToken')),
            'login-institucional' => env('PETRVS_ACTION_LOGIN_INSTITUCIONAL', 'authenticateDepenLdap'),
            'login-unico' => env('PETRVS_ACTION_LOGIN_UNICO', 'authenticateApiLoginUnico')
        ],
        'api' => [
            'login-user-password' => env('PETRVS_API_LOGIN_USER_PASSWORD', 'authenticateApiUserPassword'),
            'login-firebase-token' => env('PETRVS_API_LOGIN_FIREBASE_TOKEN', 'authenticatApieFirebaseToken'),
            'login-google-token' => env('PETRVS_API_LOGIN_GOOGLE_TOKEN', env('PETRVS_API_LOGIN_GAPI_TOKEN', 'authenticateApiGoogleToken')),
            'login-institucional' => env('PETRVS_API_LOGIN_INSTITUCIONAL', 'authenticateApiDepenLdap'),
            'login-unico' => env('PETRVS_API_LOGIN_UNICO', 'authenticateApiLoginUnico'),
            'generate-session-token' => env('PETRVS_API_SESSION_TOKEN', 'generateApiPrfSessionToken'),
        ]
    ],
    'login' => [
        "user-password" => env('PETRVS_LOGIN_USER_PASSWORD', false),
        "gsuit" => env('PETRVS_LOGIN_GSUIT', true),
        "azure" => env('PETRVS_LOGIN_AZURE', true),
        "institucional" => env('PETRVS_LOGIN_INSTITUCIONAL', false),
        "firebase" => env('PETRVS_LOGIN_FIREBASE', false),
        "login-unico" => env('PETRVS_LOGIN_UNICO', true)
    ],
    'ids-fixos' => [
        'developer-id' => env('PETRVS_PERFIS_DEV', null),
    ],
    'panel' => [
        'username' => env('PETRVS_PANEL_USERNAME', 'petrvs'),
        'password' => env('PETRVS_PANEL_PASSWORD', 'petrvs@123'),
    ],
    'schemas' => [
        'base'=> env('DB_DATABASE', 'petrvs'),
        'tenant_aplicacao'=> '',
        'tenant_log'=> '',
    ]
];
