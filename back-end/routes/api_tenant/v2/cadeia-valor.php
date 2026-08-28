<?php

use App\V2\CadeiaValor\CadeiaValorArvoreController as CadeiaValorArvoreV2;
use Illuminate\Support\Facades\Route;

Route::get('cadeia-valor/{cadeiaValorId}/arvore/{processoId}', [CadeiaValorArvoreV2::class, 'arvore'])
    ->whereUuid('cadeiaValorId')
    ->whereUuid('processoId');
Route::get('cadeia-valor/{cadeiaValorId}/processo/{processoId}/resumo', [CadeiaValorArvoreV2::class, 'resumo'])
    ->whereUuid('cadeiaValorId')
    ->whereUuid('processoId');
Route::get('cadeia-valor/{cadeiaValorId}/processo/{processoId}/entregas-detalhamento', [CadeiaValorArvoreV2::class, 'entregas'])
    ->whereUuid('cadeiaValorId')
    ->whereUuid('processoId');
