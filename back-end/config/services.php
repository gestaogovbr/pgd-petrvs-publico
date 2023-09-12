<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    # Azure: token válido até 21/09/2024
    'azure' => [
        'client_id' => '0b50b859-2615-403a-876e-05dbbd6aa240',
        'client_secret' => 'QbD8Q~mMSFAmC~B-wYCL2BcHbb0TQO8xIf9redb3',
        'redirect' => config('app.url') . '/web/login-azure-callback',
        'tenant' => 'common',
    ],
    # Login Único: Uhull..
    'govbr' => [
      'code_verifier' => 'pgd20',
      'code_challenge' => 'LwIDqJyJEGgdSQuwygHlkQDKsUXFz6jMIfkM_Jlv94w',
      'code_challenge_method' => 'S256',
      'client_id' => 'pgd-pre.dth.api.gov.br',
      'client_secret' => 'AO4Gx1ykBB_nQf0aSYEQ4DzEZ0q0XWq-i9ZbvkmD2DjbhjEVjjw1lwsIRNQsLaI6_YhsGkOov7PvHpVguW5bklI',
      'redirect' => 'https://pgd-pre.dth.api.gov.br/api/login-govbr-callback/',
      'environment' => 'staging' //staging ou production
    ],
];
