<?php

return [
    'tipo' => env('INTEGRACAO_TIPO', "WSO2"),
    'codigoUnidadeRaiz' => env('INTEGRACAO_CODIGO_UNIDADE_RAIZ', ""),
    'baseUrlunidades' => env('INTEGRACAO_BASE_URL_UNIDADES', ""),
    'baseUrlpessoas' => env('INTEGRACAO_BASE_URL_PESSOAS', ""),
    'validaCertificado' => env('INTEGRACAO_VALIDA_CERTIFICADO', true),
    'useLocalFiles' => env('INTEGRACAO_USE_LOCAL_FILES', false),
    'storeLocalFiles' => env('INTEGRACAO_STORE_LOCAL_FILES', false),
    'localUnidades' => env('INTEGRACAO_LOCAL_UNIDADES', ""),
    'localServidores' => env('INTEGRACAO_LOCAL_SERVIDORES', ""),
    'token' => env('INTEGRACAO_TOKEN', ""),
    'auto_incluir' => env('INTEGRACAO_AUTO_INCLUIR', false),
    'generate' => [
        'url' => env('INTEGRACAO_GENERATE_TOKEN_URL', ""),
        'authorization' => env('INTEGRACAO_GENERATE_TOKEN_AUTHORIZATION', ""),
        'user' => env('INTEGRACAO_GENERATE_TOKEN_USER', ""),
        'password' => env('INTEGRACAO_GENERATE_TOKEN_PASSWORD', "")
    ],
    'siape' => [
        'host' => env('INTEGRACAO_SIAPE_UPAG', ""),
        'port' => env('INTEGRACAO_SIAPE_URL', ""),
        'database' => env('INTEGRACAO_SIAPE_SIGLASISTEMA', ""),
        'username' => env('INTEGRACAO_SIAPE_SIGLASISTEMA', ""),
        'password' => env('INTEGRACAO_SIAPE_NOMESISTEMA', "")
    ]
];
