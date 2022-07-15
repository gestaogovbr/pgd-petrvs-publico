<?php

return [
    'codigoUnidadeRaiz' => env('INTEGRACAO_CODIGO_UNIDADE_RAIZ', ""),
    'baseUrlunidades' => env('INTEGRACAO_BASE_URL_UNIDADES', ""),
    'baseUrlpessoas' => env('INTEGRACAO_BASE_URL_PESSOAS', ""),
    'token' => env('INTEGRACAO_TOKEN', ""),
    'auto_incluir' => env('INTEGRACAO_AUTO_INCLUIR', false),
    'generate' => [
        'url' => env('INTEGRACAO_GENERATE_TOKEN_URL', ""),
        'authorization' => env('INTEGRACAO_GENERATE_TOKEN_AUTHORIZATION', ""),
        'user' => env('INTEGRACAO_GENERATE_TOKEN_USER', ""),
        'password' => env('INTEGRACAO_GENERATE_TOKEN_PASSWORD', "")
    ]
];
