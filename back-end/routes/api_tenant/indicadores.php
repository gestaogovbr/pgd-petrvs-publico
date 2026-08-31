<?php

use App\Http\Controllers\IndicadoresController;
use App\Http\Controllers\IndicadoresEntregaController;
use App\Http\Controllers\IndicadoresGestaoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Indicadores')->group(function () {
    Route::post('equipe/query', [IndicadoresController::class, 'query']);
    Route::post('equipe/horas', [IndicadoresController::class, 'horas']);
    Route::post('gestao/query', [IndicadoresGestaoController::class, 'query']);
    Route::post('entrega/query', [IndicadoresEntregaController::class, 'query']);
});
