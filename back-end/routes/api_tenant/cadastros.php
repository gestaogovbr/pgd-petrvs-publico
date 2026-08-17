<?php

use App\Http\Controllers\CadeiaValorController;
use App\Http\Controllers\CadeiaValorProcessoController;
use App\Http\Controllers\CidadeController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\EixoTematicoController;
use App\Http\Controllers\EntregaController;
use App\Http\Controllers\FeriadoController;
use App\Http\Controllers\MaterialServicoController;
use App\Http\Controllers\PlanejamentoObjetivoController;
use App\Http\Controllers\ProgramaController;
use App\Http\Controllers\ProgramaParticipanteController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\TipoAtividadeController;
use App\Http\Controllers\TipoAvaliacaoController;
use App\Http\Controllers\TipoAvaliacaoNotaController;
use App\Http\Controllers\TipoCapacidadeController;
use App\Http\Controllers\TipoDocumentoController;
use App\Http\Controllers\TipoJustificativaController;
use App\Http\Controllers\TipoMotivoAfastamentoController;
use App\Http\Controllers\TipoProcessoController;
use App\Http\Controllers\TipoTarefaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Cidade')->group(function () {
    defaultRoutes(CidadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Documento')->group(function () {
    defaultRoutes(DocumentoController::class);
    Route::post('pendente-sei', [DocumentoController::class, 'pendenteSei']);
    Route::post('assinar', [DocumentoController::class, 'assinar']);
    Route::get('gerarPDF', [DocumentoController::class, 'gerarPDF']);
});
Route::middleware(['auth:sanctum'])->prefix('EixoTematico')->group(function () {
    defaultRoutes(EixoTematicoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Entrega')->group(function () {
    defaultRoutes(EntregaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Feriado')->group(function () {
    defaultRoutes(FeriadoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('MaterialServico')->group(function () {
    defaultRoutes(MaterialServicoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('PlanejamentoObjetivo')->group(function () {
    defaultRoutes(PlanejamentoObjetivoController::class);
    Route::post('ordenar', [PlanejamentoObjetivoController::class, 'ordenar']);
});
Route::middleware(['auth:sanctum'])->prefix('Programa')->group(function () {
    defaultRoutes(ProgramaController::class);
    Route::post('concluir', [ProgramaController::class, 'concluir']);
});
Route::middleware(['auth:sanctum'])->prefix('ProgramaParticipante')->group(function () {
    defaultRoutes(ProgramaParticipanteController::class);
    Route::post('quantidade-planos-trabalho-ativos', [ProgramaParticipanteController::class, 'quantidadePlanosTrabalhoAtivos']);
    Route::post('habilitar', [ProgramaParticipanteController::class, 'habilitar']);
    Route::post('notificar', [ProgramaParticipanteController::class, 'notificar']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoTarefa')->group(function () {
    defaultRoutes(TipoTarefaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Template')->group(function () {
    defaultRoutes(TemplateController::class);
    Route::post('teste', [TemplateController::class, 'teste']);
    Route::post('gera-relatorio', [TemplateController::class, 'geraRelatorio']);
    Route::post('carrega-dataset', [TemplateController::class, 'carregaDataset']);
});
Route::middleware(['auth:sanctum'])->prefix('CadeiaValor')->group(function () {
    defaultRoutes(CadeiaValorController::class);
});
Route::middleware(['auth:sanctum'])->prefix('CadeiaValorProcesso')->group(function () {
    defaultRoutes(CadeiaValorProcessoController::class);
    Route::post('ordenar', [CadeiaValorProcessoController::class, 'ordenar']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoAtividade')->group(function () {
    defaultRoutes(TipoAtividadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoJustificativa')->group(function () {
    defaultRoutes(TipoJustificativaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoAvaliacao')->group(function () {
    defaultRoutes(TipoAvaliacaoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoAvaliacaoNota')->group(function () {
    Route::post('query', [TipoAvaliacaoNotaController::class, 'query']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoMotivoAfastamento')->group(function () {
    defaultRoutes(TipoMotivoAfastamentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoCapacidade')->group(function () {
    defaultRoutes(TipoCapacidadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoDocumento')->group(function () {
    defaultRoutes(TipoDocumentoController::class);
    Route::post('atualizar', [TipoDocumentoController::class, 'atualizar']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoProcesso')->group(function () {
    defaultRoutes(TipoProcessoController::class);
    Route::post('atualizar', [TipoProcessoController::class, 'atualizar']);
});
