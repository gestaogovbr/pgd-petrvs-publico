<?php

use App\V2\MuralAviso\MuralAvisoController as MuralAvisoV2;
use Illuminate\Support\Facades\Route;

Route::get('mural-aviso/pendentes', [MuralAvisoV2::class, 'pendentes']);
Route::post('mural-aviso/confirmar', [MuralAvisoV2::class, 'confirmar']);
