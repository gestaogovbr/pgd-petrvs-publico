<?php

use App\Http\Controllers\IntegracaoController;
use Illuminate\Support\Facades\Route;

Route::get('/integracao', [IntegracaoController::class, 'sincronizar']);

Route::middleware(['auth:sanctum'])->prefix('Integracao')->group(function () {
    Route::post('store', [IntegracaoController::class, 'sincronizarPetrvs']);
    Route::post('query', [IntegracaoController::class, 'query']);
    Route::post('destroy', [IntegracaoController::class, 'destroy']);
    Route::post('showResponsaveis', [IntegracaoController::class, 'showResponsaveis']);
    Route::post('get-by-id', [IntegracaoController::class, 'getById']);
    Route::get('busca-processamentos-pendentes', [IntegracaoController::class, 'buscaProcessamentosPendentes']);
});
