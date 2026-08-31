<?php

use App\Http\Controllers\TipoAvaliacaoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoAvaliacao')->group(function () {
    defaultRoutes(TipoAvaliacaoController::class);
});
