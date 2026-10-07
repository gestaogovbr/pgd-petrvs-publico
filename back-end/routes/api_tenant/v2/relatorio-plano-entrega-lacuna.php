<?php

use App\V2\RelatorioPlanoEntregaLacuna\RelatorioPlanoEntregaLacunaController;
use Illuminate\Support\Facades\Route;

Route::get('relatorio-plano-entrega-lacuna', [RelatorioPlanoEntregaLacunaController::class, 'index']);
Route::get('relatorio-plano-entrega-lacuna/xls', [RelatorioPlanoEntregaLacunaController::class, 'export']);
