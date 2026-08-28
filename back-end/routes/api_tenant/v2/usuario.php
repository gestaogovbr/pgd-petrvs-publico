<?php

use App\V2\Usuario\DispensaPlanoTrabalho\DispensaPlanoTrabalhoController as DispensaPlanoTrabalhoV2;
use App\V2\Usuario\UsuarioController as UsuarioV2;
use Illuminate\Support\Facades\Route;

Route::get('usuario', [UsuarioV2::class, 'searchByNomeMatricula']);
Route::get('usuario/cpf/{cpf}/unidades', [UsuarioV2::class, 'unidadesVinculadasPorCpf']);
Route::get('usuario/{usuarioId}', [UsuarioV2::class, 'show'])->whereUuid('usuarioId');
Route::post('usuario', [UsuarioV2::class, 'store']);
Route::patch('usuario/nome-social', [UsuarioV2::class, 'updateNomeSocial']);
Route::patch('usuario/{usuarioId}/dados-pessoais', [UsuarioV2::class, 'updateDadosPessoais'])->whereUuid('usuarioId');
Route::patch('usuario/{usuarioId}/texto-complementar', [UsuarioV2::class, 'updateTextoComplementar'])->whereUuid('usuarioId');
Route::patch('usuario/{usuarioId}/perfil', [UsuarioV2::class, 'updatePerfil'])->whereUuid('usuarioId');
Route::put('usuario/{usuarioId}/atribuicoes', [UsuarioV2::class, 'updateAtribuicoes'])->whereUuid('usuarioId');

Route::get('usuario/{id}/dispensa-plano-trabalho', [DispensaPlanoTrabalhoV2::class, 'show'])->whereUuid('id');
Route::post('usuario/{id}/dispensa-plano-trabalho', [DispensaPlanoTrabalhoV2::class, 'store'])->whereUuid('id');
Route::post('usuario/{id}/dispensa-plano-trabalho/encerrar', [DispensaPlanoTrabalhoV2::class, 'encerrar'])->whereUuid('id');
