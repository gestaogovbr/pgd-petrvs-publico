<?php

use App\V2\Planejamento\Objetivo\PlanejamentoObjetivoController as PlanejamentoObjetivoV2;
use App\V2\Planejamento\TipoObjetivo\TipoPlanejamentoObjetivoController;
use Illuminate\Support\Facades\Route;

Route::get('planejamento/tipo-objetivo', [TipoPlanejamentoObjetivoController::class, 'index']);
Route::post('planejamento/tipo-objetivo', [TipoPlanejamentoObjetivoController::class, 'store']);
Route::put('planejamento/tipo-objetivo/{id}', [TipoPlanejamentoObjetivoController::class, 'update']);
Route::delete('planejamento/tipo-objetivo/{id}', [TipoPlanejamentoObjetivoController::class, 'destroy']);

Route::get('planejamento/objetivo/{id}/esforco-total', [PlanejamentoObjetivoV2::class, 'esforcoTotal'])->whereUuid('id');
Route::get('planejamento/objetivo/{id}/arvore-visualizacao', [PlanejamentoObjetivoV2::class, 'arvoreVisualizacao'])->whereUuid('id');
Route::get('planejamento/objetivo/{id}/entregas', [PlanejamentoObjetivoV2::class, 'entregas'])->whereUuid('id');
Route::get('planejamento/objetivo/{id}/equipes', [PlanejamentoObjetivoV2::class, 'equipes'])->whereUuid('id');
Route::get('planejamento/objetivo/{id}/painel-resumo', [PlanejamentoObjetivoV2::class, 'painelResumo'])->whereUuid('id');
Route::get('planejamento/objetivo/{id}/entregas-detalhamento', [PlanejamentoObjetivoV2::class, 'entregasDetalhamento'])->whereUuid('id');
