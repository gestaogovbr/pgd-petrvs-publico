<?php

use App\Http\Controllers\PlanejamentoObjetivoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('PlanejamentoObjetivo')->group(function () {
    defaultRoutes(PlanejamentoObjetivoController::class);
    Route::post('ordenar', [PlanejamentoObjetivoController::class, 'ordenar']);
});
