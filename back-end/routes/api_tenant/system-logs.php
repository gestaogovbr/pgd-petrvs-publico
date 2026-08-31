<?php

use App\Http\Controllers\SystemLogsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('SystemLogs')->group(function () {
    Route::get('getAll', [SystemLogsController::class, 'index']);
    Route::get('download/{tenantId}/{file}', [SystemLogsController::class, 'download'])->middleware('throttle:60,1');
});
