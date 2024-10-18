<?php
namespace App\Services;
use App\Services\ServiceBase;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Support\Facades\Auth;
use App\Models\PainelUsuario;
use App\Exceptions\ServerException;
use App\Exceptions\UnauthorizedUserPanelException;

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

  public function store($data, $unidade, $transaction = true){
    $user = Auth::guard('painel')->user();
    $tenantIds = array_column($data['tenants'], 'id');
    $user = parent::store($data, $transaction);
    $user->assignTenants($tenantIds);
    return $user;
  }

  public function validateStore(&$data, $unidade, $action){
    $user = Auth::guard('painel')->user();
   // validar para não inserir email duplicado
    if ($action == ServiceBase::ACTION_INSERT) {
      $email = PainelUsuario::where('email', $data['email'])->first();
      if($email){
        throw new ServerException('ValidateUsuario', 'Email já cadastrado');
      }
    }
    
    // validar para usuários configuradores terem pelo menos um tenant
    if($data['nivel'] == 2 && count($data['tenants']) == 0){
      throw new ServerException('ValidateUsuario', 'Usuário configurador deve ter pelo menos um tenant');
    }

    if($user->nivel != 1){
      throw new UnauthorizedUserPanelException('Você não tem permissão para criar um usuário', 403);
      
    }
  }

  public function destroy($id, $transaction = true){
    $user = Auth::guard('painel')->user();
    if($user->nivel == 2){
      throw new UnauthorizedUserPanelException('Você não tem permissão para excluir usuários', 403);
    }
    //validar se o usuário é o mesmo que está tentando excluir
    if($user->id == $id){
      throw new ServerException('ValidateUsuario', 'Você não pode excluir seu próprio usuário');
    }
    return parent::destroy($id, $transaction);
  }

  public function assignTenants($id, $tenantIds){
    $entity = PainelUsuario::find($id);
    $entity->assignTenants($tenantIds);
  }
}