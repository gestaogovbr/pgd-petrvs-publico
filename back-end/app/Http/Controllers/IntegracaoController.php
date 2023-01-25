<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\DB;
use App\Services\IntegracaoService;
use Throwable;

class IntegracaoController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_ROT_INT_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_ROT_INT_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_ROT_INT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_ROT_INT_CONS')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                break;   
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_ROT_INT_INCL')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                break;  
        }
    }

    public function sincronizar(Request $request) {
        $this->service = new IntegracaoService();
        try {
            $data = $request->validate([
                'servidores' => ['required'],
                'unidades' => ['required'],
                'entidade' => ['required']
            ]);
            return response()->json([$this->service->sincronizar($data)]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function sincronizarPetrvs(Request $request) {
        try {
            $this->checkPermissions("STORE", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'entity.atualizar_unidades' => ['required'],
                'entity.atualizar_servidores' => ['required'],
                'entity.atualizar_gestores' => ['required'],
                'entity.usar_arquivos_locais' => ['required'],
                'entity.gravar_arquivos_locais' => ['required'],
                'entity.entidade_id' => ['required'],
                'with' => ['array']
            ]);
            $result = $this->service->sincronizarPetrvs($data,self::loggedUser()->id);
            return response()->json([$result]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function showResponsaveis(Request $request) {
        try {
            $this->checkPermissions("QUERY", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            return response()->json(['success' => true, 'responsaveis' => $this->service->showResponsaveis()]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
