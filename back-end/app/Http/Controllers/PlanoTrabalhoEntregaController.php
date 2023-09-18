<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;
use Illuminate\Support\Facades\Validator;

class PlanoTrabalhoEntregaController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PTR_ENTR_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
/*                 $data = Validator::make($request->all(), [
                    'entrega.descricao' => 'required|max:255',
                    'entrega.forca_trabalho' => 'required|between:1,100',
                    'entrega.entrega_id' => 'required_if:plano_entrega_entrega_id,null',
                    'entrega.plano_entrega_entrega_id' => 'required_if:entrega_id,null',
                ]);
                if($data->fails()) throw new ServerException("ValidatePlanoTrabalhoEntrega",$data->errors());  */               
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PTR_ENTR_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
/*                 $data = Validator::make($request->all(), [
                    'entrega.descricao' => 'required|max:255',
                    'entrega.forca_trabalho' => 'required|between:1,100',
                    'entrega.entrega_id' => 'required_if:plano_entrega_entrega_id,null',
                    'entrega.plano_entrega_entrega_id' => 'required_if:entrega_id,null',
                ]);
                if($data->fails()) throw new ServerException("ValidatePlanoTrabalhoEntrega",$data->errors());  */               
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PTR_ENTR_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PTR_ENTR')) throw new ServerException("CapacidadeStore", "Consulta não realizada");
                break;
        }
    }

}
