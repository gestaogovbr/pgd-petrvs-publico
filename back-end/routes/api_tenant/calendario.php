<?php

use App\Http\Controllers\CalendarioController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('Calendario')->group(function () {
    Route::post('feriados', [CalendarioController::class, 'feriados']);
    Route::post('feriados-cadastrados', [CalendarioController::class, 'feriadosCadastrados']);
});
