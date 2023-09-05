<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Testes *
Route::get('/teste', function (Request $request) { return ["CENTRAL"]; }); */

/* 
Rota dinâmica para login social Microsoft (Azure)
baseado em B2B (multi-tenancy / multi-tenant)
*/
Route::group([
  'prefix' => '/{tenant}',
  'middleware' => [InitializeTenancyByPath::class],
], function () {
  Route::get('/web/login-azure-callback', [LoginController::class, 'signInAzureCallback']);
});