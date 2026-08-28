<?php

use App\Http\Controllers\EixoTematicoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('EixoTematico')->group(function () {
    defaultRoutes(EixoTematicoController::class);
});
