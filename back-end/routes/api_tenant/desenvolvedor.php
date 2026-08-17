<?php

use App\Http\Controllers\BatchController;
use App\Http\Controllers\ChangeController;
use App\Http\Controllers\EnvioController;
use App\Http\Controllers\EnvioItemController;
use App\Http\Controllers\EnvioPlanoEntregaController;
use App\Http\Controllers\EnvioPlanoTrabalhoController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\IntegracaoController;
use App\Http\Controllers\PetrvsController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('Change')->group(function () {
    Route::post('query', [ChangeController::class, 'query']);
    Route::post('get-by-id', [ChangeController::class, 'getById']);
    Route::post('showResponsaveis', [ChangeController::class, 'showResponsaveis']);
    Route::post('list-models', [ChangeController::class, 'loadModels']);
});
Route::middleware('auth:sanctum')->prefix('Error')->group(function () {
    Route::post('query', [ErrorController::class, 'query']);
    Route::post('get-by-id', [ErrorController::class, 'getById']);
    Route::post('showResponsaveis', [ErrorController::class, 'showResponsaveis']);
});
Route::middleware('auth:sanctum')->prefix('Envio')->group(function () {
    Route::post('query', [EnvioController::class, 'query']);
    Route::post('get-by-id', [EnvioController::class, 'getById']);
    Route::post('reiniciar', [EnvioController::class, 'reiniciar']);
    Route::post('forcar', [EnvioController::class, 'forcar']);
});
Route::middleware('auth:sanctum')->prefix('EnvioItem')->group(function () {
    Route::post('query', [EnvioItemController::class, 'query']);
    Route::post('get-by-id', [EnvioItemController::class, 'getById']);
});
Route::middleware('auth:sanctum')->prefix('EnvioPlanoEntrega')->group(function () {
    Route::post('query', [EnvioPlanoEntregaController::class, 'query']);
});
Route::middleware('auth:sanctum')->prefix('EnvioPlanoTrabalho')->group(function () {
    Route::post('query', [EnvioPlanoTrabalhoController::class, 'query']);
});
Route::middleware('auth:sanctum')->post('/Petrvs/showTables', [PetrvsController::class, 'showTables']);
Route::middleware(['auth:sanctum'])->prefix('Integracao')->group(function () {
    Route::post('store', [IntegracaoController::class, 'sincronizarPetrvs']);
    Route::post('query', [IntegracaoController::class, 'query']);
    Route::post('destroy', [IntegracaoController::class, 'destroy']);
    Route::post('showResponsaveis', [IntegracaoController::class, 'showResponsaveis']);
    Route::post('get-by-id', [IntegracaoController::class, 'getById']);
    Route::get('busca-processamentos-pendentes', [IntegracaoController::class, 'buscaProcessamentosPendentes']);
});

Route::middleware('auth:sanctum')->post('/Teste/calculaDataTempoUnidade', [UsuarioController::class, 'calculaDataTempoUnidade']);

Route::middleware(['auth:sanctum'])->post('batch', [BatchController::class, 'run']);
