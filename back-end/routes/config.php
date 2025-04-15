<?php

use App\Http\Controllers\SeederController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\TenantsLogsController;
use App\Http\Controllers\LogsController;
use App\Http\Middleware\Panel;

/* Painel de controle */
Route::middleware(['api', 'panel'])->prefix('Tenant')->group(function () {
    Route::post('store', [TenantController::class, 'store']);
    Route::post('destroy', [TenantController::class, 'destroy']);

    Route::post('get-by-id', [TenantController::class, 'getById']);
    Route::post('query', [TenantController::class, 'query']);
    Route::post('search-text', [TenantController::class, 'searchText']);
    Route::post('query', [TenantController::class, 'query']);
    Route::post('generate-certificate-keys', [TenantController::class, 'generateCertificateKeys']);
    Route::post('cidades', [TenantController::class, 'cidades']);
    Route::post('usuario', [TenantController::class, 'usuario']);
    Route::post('entidade', [TenantController::class, 'entidade']);
    Route::post('database', [TenantController::class, 'database']);
    Route::post('tipo-capacidade', [TenantController::class, 'tiposCapacidades']);
    Route::post('migrations', [TenantController::class, 'migrations']);
    Route::post('seeders', [TenantController::class, 'seeders']);    
    Route::post('forcar-siape', [TenantController::class, 'forcarSiape']);
    Route::get('users-in-PGD',[TenantController::class, 'usersInPGD']);
    Route::post('forcar-envio', [TenantController::class, 'forcarEnvio']);    
});

Route::middleware(['api', 'panel'])->prefix('Tenant')->group(function () {
    Route::get('resetdb', [TenantController::class, 'resetdb']);
    Route::post('cleandb', [TenantController::class, 'cleandb']);
    Route::post('dumpdb', [TenantController::class, 'dumpDatabase']);
    Route::post('delete-tenant', [TenantController::class, 'deleteTenant']);
});

Route::middleware(['api', 'panel'])->prefix('TenantLogs')->group(function () {
    Route::post('store', [TenantsLogsController::class, 'store']);
    Route::post('destroy', [TenantsLogsController::class, 'destroy']);
    Route::post('get-by-id', [TenantsLogsController::class, 'getById']);
    Route::post('query', [TenantsLogsController::class, 'query']);
});

Route::middleware(['api', 'panel'])->prefix('Logs')->group(function () {
    Route::post('query', [LogsController::class, 'query']);
});

Route::get('resetqueues', [QueueController::class, 'resetQueues']);
