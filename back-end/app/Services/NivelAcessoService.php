<?php

namespace App\Services;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use App\Models\Perfil;

class NivelAcessoService extends ServiceBase{
  
  const PERFIL_DESENVOLVEDOR = 0;
  const PERFIL_ADMINISTRADOR = 1;

  const PERFIL_ADMINISTRADOR_NEGOCIAL = 2;
  const PERFIL_CHEFIA = 3;
  const PERFIL_PARTICIPANTE = 5;
  const PERFIL_COLABORADOR = 6;
  const PERFIL_CONSULTA = 7;


  static function getPerfilDesenvolvedor(): ?Perfil {
      return Perfil::where('nivel', self::PERFIL_DESENVOLVEDOR)->first();
  }

  static function getPerfilAdministradorGeral(): ?Perfil {
    return Perfil::where('nivel', self::PERFIL_ADMINISTRADOR)->first();
  }
  static function getPerfilChefia(): ?Perfil {
    return Perfil::where('nivel', self::PERFIL_CHEFIA)->first();
  }
  static function getPerfilAdministrador(): ?Perfil {
    return Perfil::where('nivel', self::PERFIL_ADMINISTRADOR_NEGOCIAL)->first();
  }
  static function getPerfilParticipante(): ?Perfil {
    return Perfil::where('nivel', self::PERFIL_PARTICIPANTE)->first();
  }

  static function getPerfilColaborador(): ?Perfil {
    return Perfil::where('nivel', self::PERFIL_COLABORADOR)->first();
  }

  static function getPerfilConsulta(): ?Perfil {
    return Perfil::where('nivel', self::PERFIL_CONSULTA)->first();
  }
}
