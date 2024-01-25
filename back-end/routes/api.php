<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use App\Http\Controllers\SeederController;

/* Testes *
Route::get('/teste', function (Request $request) { return ["CENTRAL"]; }); */
/*Route::middleware([OnlyLocal::class])
    ->get('/rotinas-diarias/run', [RotinasDiariasController::class, 'run']);*/

/*
Rota dinâmica para login social Microsoft (Azure) e
GovBr baseado em B2B (multi-tenancy / multi-tenant)
*/

Route::middleware([InitializeTenancyByPath::class])
    ->get('/login-azure-callback/{tenant}',
          [LoginController::class, 'signInAzureCallback']);

Route::middleware([InitializeTenancyByPath::class])
    ->get('/login-govbr-callback/{tenant}',
          [LoginController::class, 'signInGovBrCallback']);

Route::middleware([InitializeTenancyByPath::class])
    ->get('/login-unico/{tenant}',
        [LoginController::class, 'signInGovBrCallback']);


/* Login Panel */
Route::post('/panel-login', function (Request $request) {
    $return=false;
    if($request->user==config('petrvs')['panel']['username'] && $request->password==config('petrvs')['panel']['password']) {
        $return=true;
    }
    return response()->json($return);
});

/* Seeders */
Route::prefix('Seeder')->group(function () {
    Route::get('getAll', [SeederController::class, 'index']);
    Route::post('execute', [SeederController::class, 'execute']);
});

Route::prefix('Logs')->group(function () {
    Route::post('list', [\App\Http\Controllers\LogsController::class, 'index']);
});
