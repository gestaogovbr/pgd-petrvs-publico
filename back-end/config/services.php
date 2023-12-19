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
      'code_verifier' => env('LOGIN_UNICO_CODE_CHALLENGE'),
      'code_challenge' => env('LOGIN_UNICO_CODE_CHALLENGE_HASH'),
      'code_challenge_method' => env('LOGIN_UNICO_CODE_CHALLENGE_METHOD'),
      'client_id' => env('LOGIN_UNICO_CLIENT_ID'),
      'client_secret' => env('LOGIN_UNICO_CLIENT_SECRET'),
      'redirect' => env('LOGIN_UNICO_REDIRECT_URI'),
      'environment' => env('LOGIN_UNICO_ENV')
    ],
];
