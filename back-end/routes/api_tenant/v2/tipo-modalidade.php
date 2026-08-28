<?php

use App\V2\TipoModalidade\TipoModalidadeController as TipoModalidadeV2;
use Illuminate\Support\Facades\Route;

Route::get('tipo-modalidade', [TipoModalidadeV2::class, 'index']);
