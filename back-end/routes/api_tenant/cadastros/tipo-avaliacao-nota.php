<?php

use App\Http\Controllers\TipoAvaliacaoNotaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoAvaliacaoNota')->group(function () {
    Route::post('query', [TipoAvaliacaoNotaController::class, 'query']);
});
