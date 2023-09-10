<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\TenantsLogsController;

/* Painel de controle */
Route::middleware(['panel'])->prefix('Tenant')->group(function () { 
    Route::post('store', [TenantController::class, 'store']);
    Route::post('destroy', [TenantController::class, 'destroy']);
    Route::post('get-by-id', [TenantController::class, 'getById']);
    Route::post('query', [TenantController::class, 'query']);
    Route::post('cidades', [TenantController::class, 'cidades']);
    Route::post('usuario', [TenantController::class, 'usuario']);
    Route::post('entidade', [TenantController::class, 'entidade']);
    Route::post('database', [TenantController::class, 'database']);
    Route::post('tipo-capacidade', [TenantController::class, 'tiposCapacidades']);
    Route::post('migrations', [TenantController::class, 'migrations']);
    Route::post('seeders', [TenantController::class, 'seeders']);
});
Route::middleware(['panel'])->prefix('TenantLogs')->group(function () { 
    Route::post('store', [TenantsLogsController::class, 'store']);
    Route::post('destroy', [TenantsLogsController::class, 'destroy']);
    Route::post('get-by-id', [TenantsLogsController::class, 'getById']);
    Route::post('query', [TenantsLogsController::class, 'query']);
});
