<?php

use App\Http\Controllers\TipoTarefaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoTarefa')->group(function () {
    defaultRoutes(TipoTarefaController::class);
});
