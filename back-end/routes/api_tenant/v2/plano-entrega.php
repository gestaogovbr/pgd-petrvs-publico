<?php

use App\V2\PlanoEntrega\PlanoEntregaController as PlanoEntregaV2;
use Illuminate\Support\Facades\Route;

Route::get('plano-entrega', [PlanoEntregaV2::class, 'buscarPorUnidade']);
Route::get('plano-entrega/avaliacao-pendente', [PlanoEntregaV2::class, 'avaliacaoPendente']);
Route::get('plano-entrega/homologacao-pendente', [PlanoEntregaV2::class, 'homologacaoPendente']);
Route::get('plano-entrega/registro-execucao-atraso', [PlanoEntregaV2::class, 'registroExecucaoAtraso']);
Route::get('plano-entrega/vigentes', [PlanoEntregaV2::class, 'vigentes']);
Route::get('plano-entrega/{planoEntregaId}/entrega', [PlanoEntregaV2::class, 'buscarEntregasPorPlano'])->whereUuid('planoEntregaId');
