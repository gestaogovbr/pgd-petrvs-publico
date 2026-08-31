<?php

use App\Http\Controllers\TipoJustificativaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoJustificativa')->group(function () {
    defaultRoutes(TipoJustificativaController::class);
});
