<?php

use App\Http\Controllers\NotificacaoController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('Notificacao')->group(function () {
    defaultRoutes(NotificacaoController::class);
    Route::post('nao-lidas', [NotificacaoController::class, 'naoLidas']);
    Route::post('marcar-como-lido', [NotificacaoController::class, 'marcarComoLido']);
});
