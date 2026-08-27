<?php

use App\Http\Controllers\ComparecimentoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Comparecimento')->group(function () {
    defaultRoutes(ComparecimentoController::class);
});
