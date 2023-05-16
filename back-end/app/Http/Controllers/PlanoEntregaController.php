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

    public function checkPermissions($action, &$request, $service, $unidade, $usuario) {
        $planoEntrega = PlanoEntrega::find($request['id']);
        $planoEmCurso = $this->service->emCurso($planoEntrega);
        $planoEntregaValido = $this->service->isPlanoEntregaValido($planoEntrega);
        $planoEntregaAtivo = $planoEntrega->status == "ATIVO";
        $planoEntregaHomologando = $planoEntrega->status == "HOMOLOGANDO";
        $planoEntregaIncluindo = $planoEntrega->status == "INCLUINDO";
        $planoProprio = $planoEntrega->plano_entrega_id == null;
        $planoVinculado = $planoEntrega->plano_entrega_id != null;
        $gestorUnidadePlano = $this->service->usuario->isGestorUnidade($planoEntrega->unidade_id);
        $gestorUnidadePaiPlano = $this->service->usuario->isGestorUnidade($planoEntrega->unidade->unidade_id);
        $unidadePlanoLotacaoPrincipal = $this->service->usuario->isLotacaoPrincipal($planoEntrega->unidade_id);
        $lotadoLinhaAscendenteUnidadePlano = $this->service->usuario->isLotadoNaLinhaAscendente($planoEntrega->id);
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
                if (!($planoEntregaValido && $planoEntregaAtivo)) throw new ServerException("CapacidadeStore", "Operação não executada");
                if (!($gestorUnidadePlano || ($unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_CONCLUIR')))) throw new ServerException("CapacidadeStore", "Operação não executada");
                /*  para poder concluir um plano de entregas, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status ATIVO; e
                    o usuário logado seja gestor da unidade do plano de entregas; ou
                    ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_CONCLUIR"; 
                */
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PENT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'HOMOLOGAR':
                if (!($planoProprio && $planoEntregaValido && $planoEntregaHomologando)) throw new ServerException("CapacidadeStore", "Operação não executada");
                if (!($planoProprio && $gestorUnidadePaiPlano || ($lotadoLinhaAscendenteUnidadePlano && $usuario->hasPermissionTo('MOD_PENT_HOMOL_SUBORD')))) throw new ServerException("CapacidadeStore", "Operação não executada");
                /*  para poder homologar um plano de entregas, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status HOMOLOGANDO; e
                    o usuário logado seja gestor da unidade-pai do plano de entregas; ou
                    ela seja lotado em alguma unidade da sua linha hierárquica ascendente e ele possua a capacidade "MOD_PENT_HOMOL_SUBORD"; 
                */
                break;                
            case 'LIBERARHOMOLOGACAO':
                if (!($planoProprio && $planoEntregaValido && $planoEntregaIncluindo)) throw new ServerException("CapacidadeStore", "Operação não executada");
                if (!($planoProprio && $gestorUnidadePlano || ($unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_LIB_HOMOL')))) throw new ServerException("CapacidadeStore", "Operação não executada");
                /*  para poder liberar um plano de entregas para homologação, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status INCLUINDO; e
                    o usuário logado seja gestor da unidade do plano de entregas; ou
                    ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_LIB_HOMOL"; 
                */
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PENT_CONS')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                break;                
            case 'REATIVAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break;   
            case 'RETIRARHOMOLOGACAO':
                if (!($planoProprio && $planoEntregaValido && $planoEntregaHomologando)) throw new ServerException("CapacidadeStore", "Operação não executada");
                if (!($planoProprio && ($gestorUnidadePlano || ($unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_RET_HOMOL'))))) throw new ServerException("CapacidadeStore", "Operação não executada");                
                /*  para poder retirar de homologação um plano de entregas, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status HOMOLOGANDO; e
                    o usuário logado seja gestor da unidade do plano de entregas; ou
                    ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_RET_HOMOL"; 
                */
                break;
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PENT_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'SUSPENDER':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Operação não executada");
                break; 
            case 'UPDATE':
                $canUpdate = false;
                $condition1 = $planoEntregaValido;
                $condition2 = ($planoEntregaIncluindo || $planoEntregaHomologando) && ($gestorUnidadePlano || ($unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_EDT')));
                $condition3 = $planoEmCurso && $unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_EDT_ATV_HOMOL');
                $condition4 = $planoEmCurso && $unidadePlanoLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_EDT_ATV_ATV');
                if($condition1 && $condition2) {
                    $canUpdate = true; 
                } else if($condition3) {
                    $canUpdate = true;
                    $request["status"] = "HOMOLOGANDO"; 
                } else if($condition4) {
                    $canUpdate = true;
                    $request["status"] = "ATIVO"; 
                }
                if (!$canUpdate) throw new ServerException("CapacidadeStore", "Edição não executada");
                /*  para poder editar um plano de entregas, é necessário que sejam atendidas as condições 1 e 2, ou a condição 3, ou a condição 4.
                    condição1: o plano de entregas seja próprio e válido;
                    condição2: o plano de entregas esteja com o status INCLUINDO ou HOMOLOGANDO, o usuário logado seja gestor da unidade do plano OU ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_EDT";
                    condição3: o plano de entregas esteja EM CURSO, a unidade do plano seja a lotação principal do usuário logado e ele tenha a capacidade "MOD_PENT_EDT_ATV_HOMOL";
                    condição4: o plano de entregas esteja EM CURSO, a unidade do plano seja a lotação principal do usuário logado e ele tenha a capacidade "MOD_PENT_EDT_ATV_ATV"; 
                */
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
            $data = $request->validate(['id' => ['required']]);
            $this->checkPermissions("LIBERARHOMOLOGACAO", $data, $this->service, $this->getUnidade($request), $this->getUsuario($request));
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

    public function update(Request $request)
    {
        try {
            $data = $request->validate([
                'id' => ['required'],
                'data' => ['required'],
                'with' => ['array']
            ]);
            $this->checkPermissions("UPDATE", $data, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            foreach (array_keys($data["data"]) as $key) {
                if($key != "id" && !in_array($key, $this->updatable)) {
                    return response()->json(['error' => "Não é possível atualizar"]);
                }
            }
            $unidade = $this->getUnidade($request);
            $data['data']['id'] = $data['id'];
            $entity = $this->service->update($data['data'], $unidade);
            $result = $this->service->getById([
                'id' => $entity->id,
                'with' => $data['with']
            ]);
            return response()->json([
                'success' => true,
                'rows' => [$result]
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
