<?php

use App\Http\Controllers\PlanejamentoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Planejamento')->group(function () {
    defaultRoutes(PlanejamentoController::class);
});
