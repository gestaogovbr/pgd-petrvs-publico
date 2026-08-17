<?php

use App\V2\Usuario\UsuarioController as UsuarioV2;
use Illuminate\Support\Facades\Route;

Route::get('usuario', [UsuarioV2::class, 'buscarPorNomeMatricula']);
Route::get('usuario/cpf/{cpf}/unidades', [UsuarioV2::class, 'buscarUnidadesVinculadasPorCpf']);
Route::get('usuario/{usuarioId}', [UsuarioV2::class, 'buscarPorId'])->whereUuid('usuarioId');
Route::patch('usuario/nome-social', [UsuarioV2::class, 'atualizarNomeSocial']);
