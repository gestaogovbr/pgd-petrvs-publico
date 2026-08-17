<?php

use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\AtividadeTarefaController;
use App\Http\Controllers\AvaliacaoController;
use App\Http\Controllers\ComparecimentoController;
use App\Http\Controllers\OcorrenciaController;
use App\Http\Controllers\PlanejamentoController;
use App\Http\Controllers\PlanoEntregaController;
use App\Http\Controllers\PlanoEntregaEntregaController;
use App\Http\Controllers\PlanoTrabalhoConsolidacaoController;
use App\Http\Controllers\PlanoTrabalhoController;
use App\Http\Controllers\PlanoTrabalhoEntregaController;
use App\Http\Controllers\ProjetoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Ocorrencia')->group(function () {
    defaultRoutes(OcorrenciaController::class);
});
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
Route::middleware(['auth:sanctum'])->prefix('AtividadeTarefa')->group(function () {
    defaultRoutes(AtividadeTarefaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Avaliacao')->group(function () {
    defaultRoutes(AvaliacaoController::class);
    Route::post('cancelar-avaliacao', [AvaliacaoController::class, 'cancelarAvaliacao']);
    Route::post('recorrer', [AvaliacaoController::class, 'recorrer']);
});
Route::middleware(['auth:sanctum'])->prefix('Planejamento')->group(function () {
    defaultRoutes(PlanejamentoController::class);
});
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
Route::middleware(['auth:sanctum'])->prefix('Comparecimento')->group(function () {
    defaultRoutes(ComparecimentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoEntrega')->group(function () {
    defaultRoutes(PlanoTrabalhoEntregaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoConsolidacao')->group(function () {
    defaultRoutes(PlanoTrabalhoConsolidacaoController::class);
    Route::post('consolidacao-dados', [PlanoTrabalhoConsolidacaoController::class, 'consolidacaoDados']);
    Route::post('concluir', [PlanoTrabalhoConsolidacaoController::class, 'concluir']);
    Route::post('cancelar-conclusao', [PlanoTrabalhoConsolidacaoController::class, 'cancelarConclusao']);
    Route::post('pendencias-usuario', [PlanoTrabalhoConsolidacaoController::class, 'pendenciasUsuario']);
    Route::post('inconsistencias', [PlanoTrabalhoConsolidacaoController::class, 'inconsistencias']);
});
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
Route::middleware(['auth:sanctum'])->prefix('PlanoEntregaEntrega')->group(function () {
    defaultRoutes(PlanoEntregaEntregaController::class);
    Route::post('hierarquia', [PlanoEntregaEntregaController::class, 'hierarquia']);
    Route::post('possui-vinculos-excluidos', [PlanoEntregaEntregaController::class, 'possuiVinculosExcluidos']);
    Route::post('validate-destroy', [PlanoEntregaEntregaController::class, 'validateDestroy']);
});
Route::middleware(['auth:sanctum'])->prefix('Projeto')->group(function () {
    defaultRoutes(ProjetoController::class);
});
