<?php

use App\Http\Controllers\ImpersonationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/impersonate', [ImpersonationController::class, 'impersonate'])
        ->name('impersonate');
    Route::get('/impersonate/stop', [ImpersonationController::class, 'stopImpersonating'])->name('impersonate.stop');
});
