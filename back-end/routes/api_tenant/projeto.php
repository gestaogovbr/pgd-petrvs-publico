<?php

use App\Http\Controllers\ProjetoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Projeto')->group(function () {
    defaultRoutes(ProjetoController::class);
});
