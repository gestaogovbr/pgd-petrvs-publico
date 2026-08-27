<?php

use App\V2\Ocorrencia\OcorrenciaController as OcorrenciaV2;
use Illuminate\Support\Facades\Route;

Route::get('ocorrencia/agentes', [OcorrenciaV2::class, 'agentes']);
Route::get('ocorrencia', [OcorrenciaV2::class, 'index']);
Route::get('ocorrencia/impacto-consolidacoes', [OcorrenciaV2::class, 'impactoConsolidacoes']);
Route::post('ocorrencia', [OcorrenciaV2::class, 'store']);
Route::delete('ocorrencia/{ocorrenciaId}', [OcorrenciaV2::class, 'destroy']);
