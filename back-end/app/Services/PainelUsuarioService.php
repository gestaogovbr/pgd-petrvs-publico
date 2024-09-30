<?php
namespace App\Services;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;
use App\Models\PainelUsuario;

class PainelUsuarioService extends ServiceBase {

  public function getAllAdmins(){
    return PainelUsuario::where('nivel', 1)->get();
  }

  public function updatePassword($password){
    $user = Auth::guard('painel')->user();
    $u = PainelUsuario::find($user->id);
    $u->password = md5($password);
    $u->update();
  }
}