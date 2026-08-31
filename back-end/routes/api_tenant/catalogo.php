<?php

use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PlanoEntregaEntregaProgressoController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\ReacaoController;
use App\Http\Controllers\RelatoController;
use App\Http\Controllers\SolucaoController;
use App\Http\Controllers\SolucaoUnidadeController;
use App\Http\Controllers\TipoClienteController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Reacao')->group(function () {
    defaultRoutes(ReacaoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoEntregaEntregaProgresso')->group(function () {
    defaultRoutes(PlanoEntregaEntregaProgressoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Relato')->group(function () {
    Route::post('store', [RelatoController::class, 'store']);
    Route::get('confirmar/{email}/{nome}', [RelatoController::class, 'confirmar']);
});
Route::middleware(['auth:sanctum'])->prefix('Produto')->group(function () {
    defaultRoutes(ProdutoController::class);
    Route::post('ativar-todos', [ProdutoController::class, 'atribuirTodos']);
    Route::post('desativar-todos', [ProdutoController::class, 'desatribuirTodos']);
});
Route::middleware(['auth:sanctum'])->prefix('Catalogo')->group(function () {
    defaultRoutes(CatalogoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Solucao')->group(function () {
    defaultRoutes(SolucaoController::class);
    Route::post('ativar-todos', [SolucaoController::class, 'atribuirTodos']);
    Route::post('desativar-todos', [SolucaoController::class, 'desatribuirTodos']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoCliente')->group(function () {
    defaultRoutes(TipoClienteController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Cliente')->group(function () {
    defaultRoutes(ClienteController::class);
});
Route::middleware(['auth:sanctum'])->prefix('SolucaoUnidade')->group(function () {
    defaultRoutes(SolucaoUnidadeController::class);
});
