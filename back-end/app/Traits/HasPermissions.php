<?php

namespace App\Traits;

trait HasPermissions
{
    /* 
    Checa se tem permissão
    @param string|(string|string[])[] $permission Permissão que se deseja testar, deve seguir o seguinte padrão:
      - string: será testado se o código existe nas capacidades do perfil do usuario
      - (string|string[])[]: o primeiro nível será considerado como OR, e o segundo nível como AND, exemplo:
        ["Codigo1", ["Codigo2", "codigo3"]] => Codigo1 ou [codigo2 e codigo3]
    @return boolean
    */    
    public function hasPermissionTo($permission) {
        $permissions = is_array($permission) ? $permission : [$permission];
        $userPermissions = $this->perfil()->with("capacidades.tipoCapacidade")->get();
        $capabilities = count($userPermissions) > 0 ? $userPermissions[0]->capacidades->map(function ($item, $key) {
            if($item->data_fim == null) return $item->tipoCapacidade->codigo;
        })->all() : [];
        foreach($permissions as $permition) {
            if(is_array($permition)) {
                $result = true;
                foreach($permition as $capabilitie) {
                    if(!in_array($capabilitie, $capabilities)) $result = false;
                }
                if($result) return true; 
            } else if(in_array($permission, $capabilities)) {
                return true;
            }
        }
        return false;
    }
}