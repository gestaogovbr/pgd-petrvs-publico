<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class PlanoEntregaController extends ControllerBase {

    public function arquivar(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required'],
                'arquivar' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->arquivar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
    
    public function avaliar(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->avaliar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelar(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelarAvaliacao(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarAvaliacao($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelarConclusao(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarConclusao($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelarHomologacao(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarHomologacao($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'ARQUIVAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;
            case 'AVALIAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;
            case 'CANCELAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;
            case 'CANCELARAVALIACAO':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break; 
            case 'CANCELARCONCLUSAO':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;
            case 'CANCELARHOMOLOGACAO':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break; 
            case 'CONCLUIR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PENT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'HOMOLOGAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;                
            case 'LIBERARHOMOLOGACAO':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PENT_CONS')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                break;                
            case 'REATIVAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;   
            case 'RETIRARHOMOLOGACAO':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PENT_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'SUSPENDER':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break; 
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_PENT_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;                             
        }
    }

    public function concluir(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->concluir($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function homologar(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->homologar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function liberarHomologacao(Request $request) {
        /*         - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_LIB_HOMOL", exibir o botão Liberar para homologação 
                (vai para HOMOLOGANDO) */
        try {
            $this->checkPermissions("SEARCHTEXT", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->liberarHomologacao($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function reativar(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->reativar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function retirarHomologacao(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->retirarHomologacao($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function suspender(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->suspender($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
