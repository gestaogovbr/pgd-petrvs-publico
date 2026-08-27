<?php

use App\Http\Controllers\AtividadeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Atividade')->group(function () {
    defaultRoutes(AtividadeController::class);
    Route::post('prazo', [AtividadeController::class, 'prazo']);
    Route::post('iniciadas', [AtividadeController::class, 'iniciadas']);
    Route::post('iniciar', [AtividadeController::class, 'iniciar']);
    Route::post('cancelar-inicio', [AtividadeController::class, 'cancelarInicio']);
    Route::post('concluir', [AtividadeController::class, 'concluir']);
    Route::post('cancelar-conclusao', [AtividadeController::class, 'cancelarConclusao']);
    Route::post('pausar', [AtividadeController::class, 'pausar']);
    Route::post('reiniciar', [AtividadeController::class, 'reiniciar']);
    Route::post('prorrogar', [AtividadeController::class, 'prorrogar']);
    Route::post('arquivar', [AtividadeController::class, 'arquivar']);
    Route::post('hierarquia', [AtividadeController::class, 'hierarquia']);
});
