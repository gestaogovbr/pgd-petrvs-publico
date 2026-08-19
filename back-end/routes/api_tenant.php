<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Tenant Routes
|--------------------------------------------------------------------------
|
| Este arquivo apenas carrega os módulos em routes/api_tenant/.
| Para adicionar rotas de um domínio novo, crie um arquivo novo:
|   - v1: routes/api_tenant/<modulo>.php
|   - v2: routes/api_tenant/v2/<modulo>.php
| Não edite este loader. Assim branches diferentes não conflitam.
|
*/

loadTenantApiRouteFiles(__DIR__ . '/api_tenant');

Route::middleware(['auth:sanctum'])->prefix('v2')->group(function () {
    loadTenantApiRouteFiles(__DIR__ . '/api_tenant/v2');
});
