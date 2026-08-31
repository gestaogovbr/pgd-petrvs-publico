<?php

use App\Http\Controllers\AvaliacaoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Avaliacao')->group(function () {
    defaultRoutes(AvaliacaoController::class);
    Route::post('cancelar-avaliacao', [AvaliacaoController::class, 'cancelarAvaliacao']);
    Route::post('recorrer', [AvaliacaoController::class, 'recorrer']);
});
