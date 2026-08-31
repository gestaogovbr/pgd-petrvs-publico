<?php

use App\Http\Controllers\CidadeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Cidade')->group(function () {
    defaultRoutes(CidadeController::class);
});
