<?php

return [
    'project_id' => env('FIREBASE_PROJECT_ID', 'sei-pro'),
    'authentication' => [
        'keys_file' => storage_path('app/cache/securetoken.json'), // the file for the downloaded public keys
        'cache_file' => storage_path('app/cache/pkeys.cache'), // this file contains the next time the system has to revalidate the keys
    ],
];