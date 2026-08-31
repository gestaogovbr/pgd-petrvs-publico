<?php

use App\Http\Controllers\TipoMotivoAfastamentoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoMotivoAfastamento')->group(function () {
    defaultRoutes(TipoMotivoAfastamentoController::class);
});
