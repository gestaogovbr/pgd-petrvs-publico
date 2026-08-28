<?php

use App\V2\TipoMotivoAfastamento\TipoMotivoAfastamentoController as TipoMotivoAfastamentoV2;
use Illuminate\Support\Facades\Route;

Route::get('tipos-motivos-afastamentos', [TipoMotivoAfastamentoV2::class, 'index']);
