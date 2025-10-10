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
    'azure' => [
        'client_id' => null,
        'client_secret' => null,
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
    'microsoft_teams' => [
        'coges_url' => env('TEAMS_COGES_URL', 'https://default3ec929695a514f188ac9ef98fbafa9.78.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/2a67cf86109142f39b1146fa6d05213e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eKJK1pg7BIjsYlR-2LNHSeENVP1QSiux5ZesNxw3H6Q'),
    ],
];
