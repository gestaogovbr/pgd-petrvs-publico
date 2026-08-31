<?php

use App\Http\Controllers\PlanoEntregaEntregaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('PlanoEntregaEntrega')->group(function () {
    defaultRoutes(PlanoEntregaEntregaController::class);
    Route::post('hierarquia', [PlanoEntregaEntregaController::class, 'hierarquia']);
    Route::post('possui-vinculos-excluidos', [PlanoEntregaEntregaController::class, 'possuiVinculosExcluidos']);
    Route::post('validate-destroy', [PlanoEntregaEntregaController::class, 'validateDestroy']);
});
