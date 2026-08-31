<?php

use App\Http\Controllers\CadeiaValorProcessoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('CadeiaValorProcesso')->group(function () {
    defaultRoutes(CadeiaValorProcessoController::class);
    Route::post('ordenar', [CadeiaValorProcessoController::class, 'ordenar']);
});
