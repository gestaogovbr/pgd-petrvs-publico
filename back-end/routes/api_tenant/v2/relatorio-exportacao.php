<?php

use App\V2\RelatorioGeracao\RelatorioGeracaoController;
use Illuminate\Support\Facades\Route;

Route::get('relatorio-exportacao/status', [RelatorioGeracaoController::class, 'status']);
Route::get('relatorio-exportacao', [RelatorioGeracaoController::class, 'index']);
Route::post('relatorio-exportacao', [RelatorioGeracaoController::class, 'store']);
Route::get('relatorio-exportacao/{id}/download', [RelatorioGeracaoController::class, 'download']);
