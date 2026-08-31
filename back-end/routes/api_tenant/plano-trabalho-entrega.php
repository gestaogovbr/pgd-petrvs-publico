<?php

use App\Http\Controllers\PlanoTrabalhoEntregaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoEntrega')->group(function () {
    defaultRoutes(PlanoTrabalhoEntregaController::class);
});
