<?php
namespace App\Services;
use App\Services\ServiceBase;

use App\Models\PainelUsuario;

class PainelUsuarioService extends ServiceBase {

  public function getAllAdmins(){
    return PainelUsuario::where('nivel', 1)->get();
  }
}