<?php

use App\Http\Controllers\PlanoTrabalhoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalho')->group(function () {
    defaultRoutes(PlanoTrabalhoController::class);
    Route::post('cancelar-plano', [PlanoTrabalhoController::class, 'cancelarPlano']);
    Route::post('cancelar-assinatura', [PlanoTrabalhoController::class, 'cancelarAssinatura']);
    Route::post('cancelar-avaliacao', [PlanoTrabalhoController::class, 'cancelarAvaliacao']);
    Route::post('ativar', [PlanoTrabalhoController::class, 'ativar']);
    Route::post('reativar', [PlanoTrabalhoController::class, 'reativar']);
    Route::post('suspender', [PlanoTrabalhoController::class, 'suspender']);
    Route::post('arquivar', [PlanoTrabalhoController::class, 'arquivar']);
    Route::post('enviar-para-assinatura', [PlanoTrabalhoController::class, 'enviarParaAssinatura']);
    Route::post('metadados-plano', [PlanoTrabalhoController::class, 'metadadosPlano']);
    Route::post('get-by-usuario', [PlanoTrabalhoController::class, 'getByUsuario']);
    Route::post('planos-usuario-com-pendencias', [PlanoTrabalhoController::class, 'planosUsuarioComPendencias']);
});
