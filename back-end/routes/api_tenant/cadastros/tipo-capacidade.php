<?php

use App\Http\Controllers\TipoCapacidadeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoCapacidade')->group(function () {
    defaultRoutes(TipoCapacidadeController::class);
});
