<?php

use App\Http\Controllers\OcorrenciaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Ocorrencia')->group(function () {
    defaultRoutes(OcorrenciaController::class);
});
