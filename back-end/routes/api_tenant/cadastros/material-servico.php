<?php

use App\Http\Controllers\MaterialServicoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('MaterialServico')->group(function () {
    defaultRoutes(MaterialServicoController::class);
});
