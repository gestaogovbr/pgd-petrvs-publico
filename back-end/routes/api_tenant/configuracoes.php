<?php

use App\Http\Controllers\CapacidadeController;
use App\Http\Controllers\EntidadeController;
use App\Http\Controllers\PerfilController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Perfil')->group(function () {
    defaultRoutes(PerfilController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Entidade')->group(function () {
    defaultRoutes(EntidadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Capacidade')->group(function () {
    defaultRoutes(CapacidadeController::class);
});
