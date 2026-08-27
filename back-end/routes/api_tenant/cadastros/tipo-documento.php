<?php

use App\Http\Controllers\TipoDocumentoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoDocumento')->group(function () {
    defaultRoutes(TipoDocumentoController::class);
    Route::post('atualizar', [TipoDocumentoController::class, 'atualizar']);
});
