<?php

use App\Http\Controllers\ProgramaParticipanteController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('ProgramaParticipante')->group(function () {
    defaultRoutes(ProgramaParticipanteController::class);
    Route::post('quantidade-planos-trabalho-ativos', [ProgramaParticipanteController::class, 'quantidadePlanosTrabalhoAtivos']);
    Route::post('habilitar', [ProgramaParticipanteController::class, 'habilitar']);
    Route::post('notificar', [ProgramaParticipanteController::class, 'notificar']);
});
