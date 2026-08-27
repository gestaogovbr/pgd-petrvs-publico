<?php

use App\Http\Controllers\CadeiaValorController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('CadeiaValor')->group(function () {
    defaultRoutes(CadeiaValorController::class);
});
