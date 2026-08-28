<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\AtividadeController as AtividadeV2;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoController as AvaliacaoV2;
use App\V2\PlanoTrabalho\Consolidacao\PlanoTrabalhoConsolidacaoController as PlanoTrabalhoConsolidacaoV2;
use App\V2\PlanoTrabalho\Documento\DocumentoController as DocumentoV2;
use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaController as PlanoTrabalhoEntregaV2;
use App\V2\PlanoTrabalho\Log\PlanoTrabalhoLogController as PlanoTrabalhoLogV2;
use App\V2\PlanoTrabalho\PlanoTrabalhoController as PlanoTrabalhoV2;
use Illuminate\Support\Facades\Route;

Route::get('plano-trabalho', [PlanoTrabalhoV2::class, 'index']);
Route::get('plano-trabalho/statuses', [PlanoTrabalhoV2::class, 'statuses']);
Route::get('plano-trabalho/{id}', [PlanoTrabalhoV2::class, 'show']);
Route::post('plano-trabalho', [PlanoTrabalhoV2::class, 'store']);
Route::patch('plano-trabalho/{id}', [PlanoTrabalhoV2::class, 'update']);
Route::delete('plano-trabalho/{id}', [PlanoTrabalhoV2::class, 'destroy']);
Route::patch('plano-trabalho/{id}/cancelar', [PlanoTrabalhoV2::class, 'cancelar']);
Route::patch('plano-trabalho/{id}/encerrar', [PlanoTrabalhoV2::class, 'encerrar']);
Route::patch('plano-trabalho/{id}/arquivar', [PlanoTrabalhoV2::class, 'arquivar']);
Route::patch('plano-trabalho/{id}/desarquivar', [PlanoTrabalhoV2::class, 'desarquivar']);
Route::post('plano-trabalho/{id}/clonar', [PlanoTrabalhoV2::class, 'clonar']);
Route::get('plano-trabalho/{planoTrabalhoId}/logs', [PlanoTrabalhoLogV2::class, 'index']);
Route::get('plano-trabalho/{planoTrabalhoId}/logs/modelos', [PlanoTrabalhoLogV2::class, 'modelos']);

Route::post('plano-trabalho/{planoTrabalhoId}/entrega', [PlanoTrabalhoEntregaV2::class, 'store']);
Route::put('plano-trabalho/{planoTrabalhoId}/entrega/{entregaId}', [PlanoTrabalhoEntregaV2::class, 'update']);
Route::delete('plano-trabalho/{planoTrabalhoId}/entrega/{entregaId}', [PlanoTrabalhoEntregaV2::class, 'destroy']);

Route::post('plano-trabalho/{planoTrabalhoId}/documento', [DocumentoV2::class, 'store']);
Route::get('plano-trabalho/{planoTrabalhoId}/documento', [DocumentoV2::class, 'show']);
Route::post('plano-trabalho/{planoTrabalhoId}/documento/assinatura-tcr', [DocumentoV2::class, 'assinar']);
Route::delete('plano-trabalho/{planoTrabalhoId}/documento/assinatura-tcr', [DocumentoV2::class, 'cancelarAssinatura']);

Route::get('plano-trabalho/{planoTrabalhoId}/consolidacao', [PlanoTrabalhoConsolidacaoV2::class, 'index']);
Route::get('plano-trabalho/{planoTrabalhoId}/consolidacao/dispensas', [PlanoTrabalhoConsolidacaoV2::class, 'dispensas']);
Route::get('plano-trabalho/{planoTrabalhoId}/consolidacao/notas-avaliacao', [PlanoTrabalhoConsolidacaoV2::class, 'notasAvaliacao']);
Route::get('plano-trabalho-consolidacao/{consolidacaoId}/ocorrencias', [PlanoTrabalhoConsolidacaoV2::class, 'ocorrencias']);
Route::patch('plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/concluir', [PlanoTrabalhoConsolidacaoV2::class, 'concluir']);
Route::patch('plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/reabrir', [PlanoTrabalhoConsolidacaoV2::class, 'reabrir']);
Route::patch('plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/recurso', [PlanoTrabalhoConsolidacaoV2::class, 'recurso']);

Route::post('plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/avaliacao', [AvaliacaoV2::class, 'store']);
Route::delete('plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/avaliacao/{avaliacaoId}', [AvaliacaoV2::class, 'destroy']);

Route::post('plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/atividade', [AtividadeV2::class, 'store']);
Route::put('plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/atividade/{atividadeId}', [AtividadeV2::class, 'update']);
Route::delete('plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/atividade/{atividadeId}', [AtividadeV2::class, 'destroy']);
