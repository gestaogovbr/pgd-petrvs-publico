<?php

use App\Http\Controllers\ErrorController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('Error')->group(function () {
    Route::post('query', [ErrorController::class, 'query']);
    Route::post('get-by-id', [ErrorController::class, 'getById']);
    Route::post('showResponsaveis', [ErrorController::class, 'showResponsaveis']);
});
