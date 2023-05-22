<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlanoEntrega;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class PlanoEntregaController extends ControllerBase {

    public function arquivar(Request $request) {
        try {
            $this->checkPermissions("ARQUIVAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            $this->checkPermissions("AVALIAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            $this->checkPermissions("CANCELAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            $this->checkPermissions("CANCELARAVALIACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            $this->checkPermissions("CANCELARCONCLUSAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            $this->checkPermissions("CANCELARHOMOLOGACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PENT_CONS')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                return;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_PENT_CONS')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                return;
        }
        $plano_id = $request->input('id') ?? $request->input('entity')['id'];
        $planoEntrega = PlanoEntrega::find($plano_id);
        $planoValido = $this->service->isPlanoEntregaValido($planoEntrega);
        $planoAtivo = $planoValido && $planoEntrega->status == "ATIVO";
        $planoHomologando = $planoValido && $planoEntrega->status == "HOMOLOGANDO";
        $planoIncluindo = $planoValido && $planoEntrega->status == "INCLUINDO";
        $planoProprio = $planoEntrega->plano_entrega_id == null;
        $planoVinculado = !$planoProprio;
        $gestorUnidadePlano = $this->service->usuario->isGestorUnidade($planoEntrega->unidade_id);
        $gestorUnidadePaiPlano = $this->service->usuario->isGestorUnidade($planoEntrega->unidade->unidade_id);
        $unidadePlanoLotacaoPrincipal = $this->service->usuario->isLotacaoPrincipal($planoEntrega->unidade_id);
        $lotadoLinhaAscendenteUnidadePlano = $this->service->usuario->isLotadoNaLinhaAscendente($planoEntrega->unidade_id);
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PENT_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PENT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'UPDATE':
                $canUpdate = false;
                $condition1 = ($planoIncluindo || $planoHomologando) && ($gestorUnidadePlano || ($unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_EDT')));
                $condition2 = $planoAtivo && $unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo(['MOD_PENT_EDT_ATV_HOMOL','MOD_PENT_EDT_ATV_ATV']);
                if($condition1 || $condition2) $canUpdate = true;
                if (!$canUpdate) throw new ServerException("CapacidadeStore", "Edição não executada");
                /*  para poder editar um plano de entregas próprio, é necessário que seja atendida ao menos uma das seguintes condições:
                    condição1: o plano de entregas seja válido e esteja com o status INCLUINDO ou HOMOLOGANDO, o usuário logado seja gestor da unidade do plano OU ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_EDT";
                    condição2: o plano de entregas seja válido e esteja com o status ATIVO, a unidade do plano seja a lotação principal do usuário logado e ele tenha a capacidade "MOD_PENT_EDT_ATV_HOMOL" ou "MOD_PENT_EDT_ATV_ATV";
                */
                break;
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
                if (!$planoAtivo) throw new ServerException("CapacidadeStore", "Operação não executada");
                if (!($gestorUnidadePlano || ($unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_CONCLUIR')))) throw new ServerException("CapacidadeStore", "Operação não executada");
                /*  para poder concluir um plano de entregas, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status ATIVO; e
                    o usuário logado seja gestor da unidade do plano de entregas; ou
                    ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_CONCLUIR"; 
                */
                break;
            case 'HOMOLOGAR':
                if (!($planoProprio && $planoHomologando)) throw new ServerException("CapacidadeStore", "Operação não executada");
                if (!($gestorUnidadePaiPlano || ($lotadoLinhaAscendenteUnidadePlano && $usuario->hasPermissionTo('MOD_PENT_HOMOL_SUBORD')))) throw new ServerException("CapacidadeStore", "Operação não executada");
                /*  para poder homologar um plano de entregas, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status HOMOLOGANDO; e
                    o usuário logado seja gestor da unidade-pai do plano de entregas; ou
                    ela seja lotado em alguma unidade da sua linha hierárquica ascendente e ele possua a capacidade "MOD_PENT_HOMOL_SUBORD"; 
                */
                break;                
            case 'LIBERARHOMOLOGACAO':
                if (!($planoProprio && $planoIncluindo)) throw new ServerException("CapacidadeStore", "Operação não executada");
                if (!($gestorUnidadePlano || ($unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_LIB_HOMOL')))) throw new ServerException("CapacidadeStore", "Operação não executada");
                /*  para poder liberar um plano de entregas para homologação, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status INCLUINDO; e
                    o usuário logado seja gestor da unidade do plano de entregas; ou
                    ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_LIB_HOMOL"; 
                */
                break;
            case 'REATIVAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;   
            case 'RETIRARHOMOLOGACAO':
                if (!($planoProprio && $planoHomologando)) throw new ServerException("CapacidadeStore", "Operação não executada");
                if (!($gestorUnidadePlano || ($unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_RET_HOMOL')))) throw new ServerException("CapacidadeStore", "Operação não executada");                
                /*  para poder retirar de homologação um plano de entregas, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status HOMOLOGANDO; e
                    o usuário logado seja gestor da unidade do plano de entregas; ou
                    ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_RET_HOMOL"; 
                */
                break;
            case 'SUSPENDER':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
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
        try {
            $this->checkPermissions("LIBERARHOMOLOGACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate(['id' => ['required']]);
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
            $this->checkPermissions("REATIVAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
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
            $this->checkPermissions("RETIRARHOMOLOGACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            $this->checkPermissions("SUSPENDER", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
