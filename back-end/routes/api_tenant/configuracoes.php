<?php

use App\Http\Controllers\CapacidadeController;
use App\Http\Controllers\EntidadeController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\UnidadeController;
use App\Http\Controllers\UnidadeIntegranteAtribuicaoController;
use App\Http\Controllers\UnidadeIntegranteController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Usuario')->group(function () {
    defaultRoutes(UsuarioController::class);
    Route::post('atualiza-pedagio', [UsuarioController::class, 'atualizaPedagio']);
    Route::post('remove-pedagio', [UsuarioController::class, 'removerPedagio']);
    Route::post('ativar-temporariamente', [UsuarioController::class, 'ativarTemporariamente']);
    Route::post('pendencias-chefe', [UsuarioController::class, 'pendenciasChefe']);
});
Route::middleware(['auth:sanctum'])->prefix('Perfil')->group(function () {
    defaultRoutes(PerfilController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Entidade')->group(function () {
    defaultRoutes(EntidadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Unidade')->group(function () {
    defaultRoutes(UnidadeController::class);
    Route::post('metadados-area', [UnidadeController::class, 'metadadosArea']);
    Route::post('mesma-sigla', [UnidadeController::class, 'mesmaSigla']);
    Route::post('unificar', [UnidadeController::class, 'unificar']);
    Route::post('dashboards', [UnidadeController::class, 'dashboards']);
    Route::post('inativar', [UnidadeController::class, 'inativar']);
    Route::post('lotados', [UnidadeController::class, 'lotados']);
    Route::post('hierarquia', [UnidadeController::class, 'hierarquia']);
    Route::post('filhas', [UnidadeController::class, 'filhas']);
    Route::post('subordinadas', [UnidadeController::class, 'subordinadas']);
    Route::post('linhaAscendente', [UnidadeController::class, 'linhaAscendente']);
    Route::post('lookup-todas-unidades', [UnidadeController::class, 'lookupTodasUnidades']);
    Route::post('obter-instituidora', [UnidadeController::class, 'obterInstitudora']);
    Route::post('ativar-temporariamente', [UnidadeController::class, 'ativarTemporariamente']);
});
Route::middleware(['auth:sanctum'])->prefix('UnidadeIntegrante')->group(function () {
    Route::post('carregar-integrantes', [UnidadeIntegranteController::class, 'carregarIntegrantes']);
    Route::post('salvar-integrantes', [UnidadeIntegranteController::class, 'salvarIntegrantes']);
});
Route::middleware(['auth:sanctum'])->prefix('UnidadeIntegranteAtribuicao')->group(function () {
    Route::post('destroy', [UnidadeIntegranteAtribuicaoController::class, 'destroy']);
});
Route::middleware(['auth:sanctum'])->prefix('Capacidade')->group(function () {
    defaultRoutes(CapacidadeController::class);
});
