<?php

use App\Http\Controllers\SiapeBlackListServidorController;
use App\Http\Controllers\SiapeBlacklistUnidadeController;
use App\Http\Controllers\SiapeIndividualController;
use App\Http\Controllers\UnidadeController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/usuario/consultar-cpf-siape', [UsuarioController::class, 'consultarCPFSiape']);
    Route::post('/usuario/exportar-cpf-siape', [UsuarioController::class, 'exportarCPFSiape']);
    Route::post('/usuario/download-cpf-siape', [UsuarioController::class, 'downloadLogSiape']);
    Route::post('/unidade/consultar-unidade-siape', [UnidadeController::class, 'consultaUnidadeSiape']);
    Route::post('/unidade/exportar-unidade-siape', [UnidadeController::class, 'exportarUnidadeSiape']);
    Route::post('/unidade/download-unidade-siape', [UnidadeController::class, 'downloadLogSiape']);
    Route::post('/usuario/processar-siape', [SiapeIndividualController::class, 'processaServidor']);
    Route::post('/unidade/processar-siape', [SiapeIndividualController::class, 'processaUnidade']);
    Route::post('/unidade/relatorio-processamento-siape', [SiapeIndividualController::class, 'relatorioProcessamentoUnidade']);
    Route::post('/siape/relatorio-carga-individual', [SiapeIndividualController::class, 'relatorioCargaIndividual']);
    Route::post('/siape-blacklist/remover-cpf', [SiapeBlackListServidorController::class, 'remover']);
    Route::post('/SiapeBlacklistServidor/query', [SiapeBlackListServidorController::class, 'query']);
    Route::post('/unidade/remover-blacklist', [SiapeBlacklistUnidadeController::class, 'remover']);
    Route::post('/SiapeBlacklistUnidade/query', [SiapeBlacklistUnidadeController::class, 'query']);
});
