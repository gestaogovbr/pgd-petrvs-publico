<?php

use App\V2\EnvioParticipante\EnvioParticipanteController as EnvioParticipanteQueryController;
use App\V2\EnvioPlanoEntrega\EnvioPlanoEntregaController as EnvioPlanoEntregaQueryController;
use App\V2\EnvioPlanoTrabalho\EnvioPlanoTrabalhoController as EnvioPlanoTrabalhoQueryController;
use Illuminate\Support\Facades\Route;

Route::get('envio-participante', [EnvioParticipanteQueryController::class, 'index']);
Route::get('envio-plano-trabalho', [EnvioPlanoTrabalhoQueryController::class, 'index']);
Route::post('envio-plano-trabalho/{id}/enviar', [EnvioPlanoTrabalhoQueryController::class, 'enviar']);
Route::get('envio-plano-entrega', [EnvioPlanoEntregaQueryController::class, 'index']);
