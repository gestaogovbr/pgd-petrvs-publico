<?php

use App\Http\Controllers\AtividadeTarefaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('AtividadeTarefa')->group(function () {
    defaultRoutes(AtividadeTarefaController::class);
});
