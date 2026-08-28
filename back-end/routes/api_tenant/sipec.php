<?php

use App\Http\Controllers\SipecIndividualController;
use App\Http\Controllers\UnidadeController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/usuario/consultar-cpf-sipec', [UsuarioController::class, 'consultarCPFSipec']);
    Route::post('/usuario/processar-sipec', [SipecIndividualController::class, 'processaServidor']);
    Route::post('/unidade/processar-sipec', [SipecIndividualController::class, 'processaUnidade']);
    Route::post('/unidade/consultar-sipec', [SipecIndividualController::class, 'consultaUnidade']);
});
