<?php

use App\V2\Relatorio\LacunaPlanoTrabalho\LacunaPlanoTrabalhoController;
use Illuminate\Support\Facades\Route;

Route::get('relatorio-lacuna-plano-trabalho', [LacunaPlanoTrabalhoController::class, 'index']);
Route::get('relatorio-lacuna-plano-trabalho/xls', [LacunaPlanoTrabalhoController::class, 'export']);
