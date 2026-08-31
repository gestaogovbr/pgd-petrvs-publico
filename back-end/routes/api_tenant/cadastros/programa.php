<?php

use App\Http\Controllers\ProgramaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Programa')->group(function () {
    defaultRoutes(ProgramaController::class);
    Route::post('concluir', [ProgramaController::class, 'concluir']);
});
