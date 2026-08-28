<?php

use App\Http\Controllers\FeriadoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Feriado')->group(function () {
    defaultRoutes(FeriadoController::class);
});
