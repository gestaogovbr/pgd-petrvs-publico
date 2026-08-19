<?php

use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->post('/usuarios/query', [UsuarioController::class, 'query']);
Route::middleware('auth:sanctum')->post('/usuario/matriculas', [UsuarioController::class, 'matriculas']);
Route::middleware('auth:sanctum')->post('/usuario/unidades-vinculadas', [UsuarioController::class, 'unidadesVinculadas']);
Route::middleware('auth:sanctum')->prefix('Calendario')->group(function () {
    Route::post('feriados', [CalendarioController::class, 'feriados']);
    Route::post('feriados-cadastrados', [CalendarioController::class, 'feriadosCadastrados']);
});
Route::middleware('auth:sanctum')->prefix('Notificacao')->group(function () {
    defaultRoutes(NotificacaoController::class);
    Route::post('nao-lidas', [NotificacaoController::class, 'naoLidas']);
    Route::post('marcar-como-lido', [NotificacaoController::class, 'marcarComoLido']);
});
