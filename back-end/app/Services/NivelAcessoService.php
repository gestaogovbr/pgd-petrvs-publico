<?php

namespace App\Services;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use App\Models\Perfil;

class NivelAcessoService extends ServiceBase {

  static function getPerfilDesenvolvedor(): Perfil {
    return Perfil::where('nivel', 0)->first();
  }
  static function getPerfilChefia(): Perfil {
    return Perfil::where('nivel', 3)->first();
  }
  static function getPerfilAdministrador(): Perfil {
    return Perfil::where('nivel', 1)->first();
  }
  static function getPerfilParticipante(): Perfil {
    return Perfil::where('nivel', 5)->first();
  }
}
