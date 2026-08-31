<?php

use App\Http\Controllers\ChangeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('Change')->group(function () {
    Route::post('query', [ChangeController::class, 'query']);
    Route::post('get-by-id', [ChangeController::class, 'getById']);
    Route::post('showResponsaveis', [ChangeController::class, 'showResponsaveis']);
    Route::post('list-models', [ChangeController::class, 'loadModels']);
});
