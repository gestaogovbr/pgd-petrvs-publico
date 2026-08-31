<?php

use App\V2\Unidade\UnidadeController as UnidadeV2;
use Illuminate\Support\Facades\Route;

Route::get('unidade', [UnidadeV2::class, 'buscarPorNomeOuCodigo']);
Route::get('unidade/minhas', [UnidadeV2::class, 'minhasUnidades']);
Route::get('unidade/{unidadeId}/is-gestor-hierarquia', [UnidadeV2::class, 'isGestorHierarquia']);
