<?php

use App\Http\Controllers\PlanoTrabalhoConsolidacaoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoConsolidacao')->group(function () {
    defaultRoutes(PlanoTrabalhoConsolidacaoController::class);
    Route::post('consolidacao-dados', [PlanoTrabalhoConsolidacaoController::class, 'consolidacaoDados']);
    Route::post('concluir', [PlanoTrabalhoConsolidacaoController::class, 'concluir']);
    Route::post('cancelar-conclusao', [PlanoTrabalhoConsolidacaoController::class, 'cancelarConclusao']);
    Route::post('pendencias-usuario', [PlanoTrabalhoConsolidacaoController::class, 'pendenciasUsuario']);
    Route::post('inconsistencias', [PlanoTrabalhoConsolidacaoController::class, 'inconsistencias']);
});
