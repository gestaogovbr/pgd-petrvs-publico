<?php

use App\V2\Home\HomeController as HomeV2;
use Illuminate\Support\Facades\Route;

Route::get('home/pendencias', [HomeV2::class, 'pendencias']);
Route::get('home/pendencias-global', [HomeV2::class, 'pendenciasGlobal']);
Route::get('home/planos-vigentes', [HomeV2::class, 'planosVigentes']);
Route::get('home/resumo-equipe', [HomeV2::class, 'resumoEquipe']);
Route::get('home/contribuicoes', [HomeV2::class, 'contribuicoes']);
Route::get('home/aniversariantes', [HomeV2::class, 'aniversariantes']);
Route::get('home/em-ferias', [HomeV2::class, 'emFerias']);
