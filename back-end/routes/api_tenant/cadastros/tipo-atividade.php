<?php

use App\Http\Controllers\TipoAtividadeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('TipoAtividade')->group(function () {
    defaultRoutes(TipoAtividadeController::class);
});
