<?php

use App\Http\Controllers\EntregaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Entrega')->group(function () {
    defaultRoutes(EntregaController::class);
});
