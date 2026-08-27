<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->post('/usuarios/query', [UsuarioController::class, 'query']);
Route::middleware('auth:sanctum')->post('/usuario/matriculas', [UsuarioController::class, 'matriculas']);
Route::middleware('auth:sanctum')->post('/usuario/unidades-vinculadas', [UsuarioController::class, 'unidadesVinculadas']);

Route::middleware(['auth:sanctum'])->prefix('Usuario')->group(function () {
    defaultRoutes(UsuarioController::class);
    Route::post('atualiza-pedagio', [UsuarioController::class, 'atualizaPedagio']);
    Route::post('remove-pedagio', [UsuarioController::class, 'removerPedagio']);
    Route::post('ativar-temporariamente', [UsuarioController::class, 'ativarTemporariamente']);
    Route::post('pendencias-chefe', [UsuarioController::class, 'pendenciasChefe']);
});
