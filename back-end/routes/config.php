<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TenantController;

/* Painel de controle */
Route::middleware(['panel'])->prefix('Tenant')->group(function () { 
    Route::post('store', [TenantController::class, 'store']);
    Route::post('destroy', [TenantController::class, 'destroy']);
    Route::post('get-by-id', [TenantController::class, 'getById']);
    Route::post('query', [TenantController::class, 'query']);
});
