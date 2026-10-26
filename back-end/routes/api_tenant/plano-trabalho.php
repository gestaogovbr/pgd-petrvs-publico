<?php

use App\Http\Controllers\PlanoTrabalhoController;
use App\Http\Controllers\PlanoTrabalhoLegacyDisabledController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalho')->group(function () {
    Route::post('search-text', [PlanoTrabalhoController::class, 'searchText']);
    Route::post('search-key', [PlanoTrabalhoController::class, 'searchKey']);
    Route::post('get-by-id', [PlanoTrabalhoController::class, 'getById']);
    Route::post('get-all-ids', [PlanoTrabalhoController::class, 'getAllIds']);
    Route::post('query', [PlanoTrabalhoController::class, 'query']);
    Route::post('download-url', [PlanoTrabalhoController::class, 'downloadUrl']);
    Route::post('metadados-plano', [PlanoTrabalhoController::class, 'metadadosPlano']);
    Route::post('get-by-usuario', [PlanoTrabalhoController::class, 'getByUsuario']);
    Route::post('planos-usuario-com-pendencias', [PlanoTrabalhoController::class, 'planosUsuarioComPendencias']);

    foreach ([
        'store',
        'update',
        'update-json',
        'destroy',
        'upload',
        'delete-file',
        'cancelar-plano',
        'cancelar-assinatura',
        'cancelar-avaliacao',
        'ativar',
        'reativar',
        'suspender',
        'arquivar',
        'enviar-para-assinatura',
    ] as $action) {
        Route::post($action, PlanoTrabalhoLegacyDisabledController::class);
    }
});
