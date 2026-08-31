<?php

use App\Http\Controllers\PlanoEntregaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('PlanoEntrega')->group(function () {
    defaultRoutes(PlanoEntregaController::class);
    Route::post('arquivar', [PlanoEntregaController::class, 'arquivar']);
    Route::post('cancelar-avaliacao', [PlanoEntregaController::class, 'cancelarAvaliacao']);
    Route::post('cancelar-conclusao', [PlanoEntregaController::class, 'cancelarConclusao']);
    Route::post('cancelar-homologacao', [PlanoEntregaController::class, 'cancelarHomologacao']);
    Route::post('cancelar-plano', [PlanoEntregaController::class, 'cancelarPlano']);
    Route::post('concluir', [PlanoEntregaController::class, 'concluir']);
    Route::post('desativar', [PlanoEntregaController::class, 'desativar']);
    Route::post('homologar', [PlanoEntregaController::class, 'homologar']);
    Route::post('liberar-homologacao', [PlanoEntregaController::class, 'liberarHomologacao']);
    Route::post('reativar', [PlanoEntregaController::class, 'reativar']);
    Route::post('retirar-homologacao', [PlanoEntregaController::class, 'retirarHomologacao']);
    Route::post('suspender', [PlanoEntregaController::class, 'suspender']);
    Route::post('planos-impactados-por-alteracao-entrega', [PlanoEntregaController::class, 'planosImpactadosPorAlteracaoEntrega']);
    Route::post('permissao-incluir', [PlanoEntregaController::class, 'permissaoIncluir']);
});
