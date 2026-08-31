<?php

use App\V2\Indicadores\IndicadoresHorasController as IndicadoresHorasV2;
use Illuminate\Support\Facades\Route;

Route::post('indicadores/horas', [IndicadoresHorasV2::class, 'horas']);
