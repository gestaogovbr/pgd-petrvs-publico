<?php

namespace App\Traits;

trait HasPermissions
{
 
    /**
     * Checa se o usuário possui a(s) permissão(ões) passada(s) como parâmetro. 
     * Quando o parâmetro é um array, os seus elementos do tipo string serão tratados como OR e os seus elementos do tipo string[] serão tratados como AND. 
     * Exemplo: ["Codigo1", ["Codigo2", "codigo3"], "Codigo4"] => Codigo1 ou [codigo2 e codigo3] ou Codigo4
     * 
     * @param (string|string[])[] $permission 
     */
    public function hasPermissionTo($permission) {
        $permissions = is_array($permission) ? $permission : [$permission];
        $userPermissions = $this->perfil()->with("capacidades.tipoCapacidade")->get();
        $capabilities = count($userPermissions) > 0 ? $userPermissions[0]->capacidades->map(function ($item, $key) {
            return $item->tipoCapacidade->codigo;
        })->all() : [];
        foreach($permissions as $item) {
            if(is_array($item)) {
                $result = true;
                foreach($item as $capabilitie) {
                    if(!in_array($capabilitie, $capabilities)) $result = false;
                }
                if($result) return true; 
            } else if(in_array($item, $capabilities)) {
                return true;
            }
        }
        return false;
    }
}