<?php

use App\V2\RelatorioEntrega\RelatorioEntregaController as RelatorioEntregaV2Controller;
use Illuminate\Support\Facades\Route;

Route::get('relatorio-entrega/unidade-padrao', [RelatorioEntregaV2Controller::class, 'unidadePadrao']);
Route::get('relatorio-entrega/xls', [RelatorioEntregaV2Controller::class, 'export']);
Route::get('relatorio-entrega', [RelatorioEntregaV2Controller::class, 'index']);
