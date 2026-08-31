<?php

use App\V2\PlanoEntrega\PlanoEntregaController as PlanoEntregaV2;
use Illuminate\Support\Facades\Route;

Route::get('plano-entrega', [PlanoEntregaV2::class, 'buscarPorUnidade']);
Route::get('plano-entrega/{planoEntregaId}/entrega', [PlanoEntregaV2::class, 'buscarEntregasPorPlano'])->whereUuid('planoEntregaId');
