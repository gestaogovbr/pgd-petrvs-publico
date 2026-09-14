<?php

use App\V2\CadeiaValor\CadeiaValorProcessoController as CadeiaValorProcessoV2;
use Illuminate\Support\Facades\Route;

Route::get('cadeia-valor/{cadeiaValorId}/arvore/{processoId}', [CadeiaValorProcessoV2::class, 'arvore'])
    ->whereUuid('cadeiaValorId')
    ->whereUuid('processoId');
Route::get('cadeia-valor/{cadeiaValorId}/processo/{processoId}/resumo', [CadeiaValorProcessoV2::class, 'resumo'])
    ->whereUuid('cadeiaValorId')
    ->whereUuid('processoId');
Route::get('cadeia-valor/{cadeiaValorId}/processo/{processoId}/entregas-detalhamento', [CadeiaValorProcessoV2::class, 'entregas'])
    ->whereUuid('cadeiaValorId')
    ->whereUuid('processoId');
Route::get('cadeia-valor/{cadeiaValorId}/processo/{processoId}/entregas', [CadeiaValorProcessoV2::class, 'entregasPorNo'])
    ->whereUuid('cadeiaValorId')
    ->whereUuid('processoId');
Route::get('cadeia-valor/{cadeiaValorId}/processo/{processoId}/equipes', [CadeiaValorProcessoV2::class, 'equipes'])
    ->whereUuid('cadeiaValorId')
    ->whereUuid('processoId');
