<?php

use App\Http\Controllers\BatchController;
use App\Http\Controllers\PetrvsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->post('/Petrvs/showTables', [PetrvsController::class, 'showTables']);

Route::middleware(['auth:sanctum'])->post('batch', [BatchController::class, 'run']);
