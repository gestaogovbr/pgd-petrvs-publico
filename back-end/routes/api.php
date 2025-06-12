<?php

use App\Http\Controllers\AuditController;
use App\Http\Controllers\EnvController;
use App\Http\Controllers\PainelUsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use App\Http\Controllers\SeederController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\JobScheduleController;


/* Testes *
Route::get('/teste', function (Request $request) { return ["CENTRAL"]; }); */
/*Route::middleware([OnlyLocal::class])
    ->get('/rotinas-diarias/run', [RotinasDiariasController::class, 'run']);*/

/*
Rota dinâmica para login social Microsoft (Azure) e
GovBr baseado em B2B (multi-tenancy / multi-tenant)
*/

Route::middleware([InitializeTenancyByPath::class])
  ->get(
    '/login-azure-callback/{tenant}',
    [LoginController::class, 'signInAzureCallback']
  );

Route::middleware([InitializeTenancyByPath::class])
  ->get(
    '/login-govbr-callback/{tenant}',
    [LoginController::class, 'signInGovBrCallback']
  );

Route::middleware([InitializeTenancyByPath::class])
  ->get(
    '/login-unico/{tenant}',
    [LoginController::class, 'signInGovBrCallback']
  );


/* Login Panel */
Route::post('/panel-login', [PainelUsuarioController::class, 'login']);
Route::get('/panel-login-check', [PainelUsuarioController::class, 'checkAuthentication']);
Route::get('/panel-login-detail', [PainelUsuarioController::class, 'detail']);
Route::get('/panel-logout', [PainelUsuarioController::class, 'logout']);
Route::post('/panel-update-password', [PainelUsuarioController::class, 'updatePassword']);

Route::middleware(['panel'])->prefix('Seeder')->group(function () {
    Route::get('getAll', [SeederController::class, 'index']);
    Route::post('execute', [SeederController::class, 'execute']);
});

Route::middleware(['panel'])->prefix('JobAgendado')->group(function () {
    defaultRoutes(JobScheduleController::class);
    Route::get('/getAll', [JobScheduleController::class, 'listar']);
    Route::get('/getClassJobs', [JobScheduleController::class, 'getClassJobs']);
});

Route::middleware(['panel'])->prefix('Env')->group(function () {
    Route::get('/query', [EnvController::class, 'query']);
    Route::post('/update', [EnvController::class, 'update']);
});

Route::middleware(['panel'])->prefix('UserPanel')->group(function () {
  Route::post('query', [PainelUsuarioController::class, 'query']);
  Route::post('get-by-id', [PainelUsuarioController::class, 'getById']);
  Route::post('store', [PainelUsuarioController::class, 'store']);
  Route::post('destroy', [PainelUsuarioController::class, 'destroy']);
});

Route::middleware(['panel'])->prefix('Audit')->group(function () {
    Route::get('getAll', [AuditController::class, 'listar']);
    Route::post('query', [AuditController::class, 'query']);
});
