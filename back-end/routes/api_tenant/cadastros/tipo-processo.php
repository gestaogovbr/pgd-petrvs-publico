<?php

use App\Http\Controllers\TipoProcessoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoProcesso')->group(function () {
    defaultRoutes(TipoProcessoController::class);
    Route::post('atualizar', [TipoProcessoController::class, 'atualizar']);
});
