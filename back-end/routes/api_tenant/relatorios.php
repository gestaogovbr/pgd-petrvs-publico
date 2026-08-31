<?php

use App\Http\Controllers\RelatorioAgenteController;
use App\Http\Controllers\RelatorioController;
use App\Http\Controllers\RelatorioLacunaPlanoTrabalhoController;
use App\Http\Controllers\RelatorioPlanoEntregaController;
use App\Http\Controllers\RelatorioUnidadeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Relatorio')->group(function () {
    Route::post('planos-trabalho/query', [RelatorioController::class, 'queryPlanosTrabalho']);
    Route::post('planos-trabalho/csv', [RelatorioController::class, 'queryPlanosTrabalho']);
    Route::post('planos-trabalho/xls', [RelatorioController::class, 'queryPlanosTrabalho']);

    Route::post('planos-trabalho-detalhado/query', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);
    Route::post('planos-trabalho-detalhado/csv', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);
    Route::post('planos-trabalho-detalhado/xls', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);

    Route::post('planos-entrega/query', [RelatorioPlanoEntregaController::class, 'query']);
    Route::post('planos-entrega/xls', [RelatorioPlanoEntregaController::class, 'query']);
});

Route::middleware(['auth:sanctum'])->prefix('RelatorioAgente')->group(function () {
    Route::post('query', [RelatorioAgenteController::class, 'query']);
    Route::post('xls', [RelatorioAgenteController::class, 'query']);
});

Route::middleware(['auth:sanctum'])->prefix('RelatorioLacunaPlanoTrabalho')->group(function () {
    Route::post('query', [RelatorioLacunaPlanoTrabalhoController::class, 'query']);
    Route::post('xls', [RelatorioLacunaPlanoTrabalhoController::class, 'query']);
});

Route::middleware(['auth:sanctum'])->prefix('RelatorioUnidade')->group(function () {
    Route::post('query', [RelatorioUnidadeController::class, 'query']);
    Route::post('xls', [RelatorioUnidadeController::class, 'query']);
});
