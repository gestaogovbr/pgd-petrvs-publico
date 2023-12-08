<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;

/* Testes *
Route::get('/teste', function (Request $request) { return ["CENTRAL"]; }); */
Route::middleware([OnlyLocal::class])
    ->get('/rotinas-diarias/run', [RotinasDiariasController::class, 'run']);

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