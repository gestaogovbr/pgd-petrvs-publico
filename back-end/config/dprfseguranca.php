<?php

return [
    'producao' => env('DPRFSEGURANCA_PRODUCAO', false),
    'auto_incluir' => env('DPRFSEGURANCA_AUTO_INCLUIR', false),
    'sigla' => env('DPRFSEGURANCA_SIGLA', ''),
    'url_producao' => env('DPRFSEGURANCA_URL_PRODUCAO', ''),
    'url_homologacao' => env('DPRFSEGURANCA_URL_HOMOLOGACAO', ''),
];