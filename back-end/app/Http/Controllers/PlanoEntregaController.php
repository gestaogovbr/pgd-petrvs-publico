<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlanoEntrega;
use App\Services\UtilService;
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
                if (!$usuario->hasPermissionTo('MOD_PENT_CONS')) throw new ServerException("CapacidadeSearchText", "Consulta não executada");
                break;
                // no método proxyRows() do PlanoEntregaService serão selecionados os planos que poderão ser visualizados pelo usuário logado
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_PENT_CONS') || !$service->canView($request->validate(['id' => ['required']])['id'])) throw new ServerException("CapacidadeSearchText", "Consulta não executada");
                break;
                //(RN_PENT_4_10)
            /*case 'STORE':
                $condicoes = $service->buscaCondicoes($request->validate(['entity' => ['required']])['entity']);
                $canStore = false;
                $data = $request->validate(['entity' => ['required'],'with' => ['array']]);
                $acao = UtilService::emptyEntry($data['entity'], "id") ? 'INSERT' : 'UPDATE';
                switch ($acao) {
                    case 'UPDATE':
                        $condition1 = ($condicoes['planoIncluindo'] || $condicoes['planoHomologando']) && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo('MOD_PENT_EDT')));
                        $condition2 = $condicoes['planoHomologando'] && $condicoes['gestorUnidadePaiPlano'];
                        $condition3 = $condicoes['planoAtivo'] && $condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo(['MOD_PENT_EDT_ATV_HOMOL','MOD_PENT_EDT_ATV_ATV']);
                        if($condition1 || $condition2 || $condition3) $canStore = true;
                        if (!$canStore) throw new ServerException("CapacidadeStore", "Alteração não executada");
                        /*  (RN_PENT_4_2)
                            1. o plano precisa estar com o status INCLUINDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EDT"; ou
                            2. o plano precisa estar com o status HOMOLOGANDO e o usuário logado ser gestor da unidade-pai do plano; (RN_PENT_1_3) ou
                            3. o plano precisa estar com o status ATIVO, a unidade do plano ser a unidade de lotação principal do usuário logado, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" ou "MOD_PENT_EDT_ATV_ATV";
                        * / 
                    case 'INSERT': 
                        if($condicoes['planoProprio']){
                            if($condicoes['gestorUnidadePlano'] || $condicoes['gestorUnidadePaiPlano'] || ($condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo('MOD_PENT_INCL'))) $canStore = true;
                            /*  (RN_PENT_4_13)
                                1. o usuário logado precisa ser gestor da unidade do plano, ou gestor da sua unidade-pai; ou
                                2. a unidade do plano precisa ser a unidade de lotação principal do usuário logado e ele possuir a capacidade "MOD_PENT_INCL"; (RN_PENT_1_2)
                            * /
                        } else if($condicoes['planoVinculado']) {
                            $condition1 = $condicoes['gestorUnidadePlano'] || $condicoes['gestorUnidadePaiPlano'] || ($condicoes['unidadePaiPlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo('MOD_PENT_ADERIR'));
                            $condition2 = $condicoes['unidadePlanoPaiEhUnidadePaiDoPlano'] && $condicoes['planoPaiAtivo'];
                            $condition3 = !$condicoes['unidadePlanoPossuiPlanoAtivoMesmoPeriodoPlanoPai'];
                            if($condition1 && $condition2 && $condition3) $canStore = true;
                            /*  (RN_PENT_4_1)
                                1. o usuário logado precisa ser gestor da unidade ou da sua unidade-pai, ou uma destas ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_ADERIR"; (RN_PENT_2_4) e
                                2. a unidade do plano-pai precisa ser a unidade-pai da unidade do plano vinculado, e o plano-pai precisa estar com o status ATIVO; (RN_PENT_2_3) (RN_PENT_3_3) e
                                3. a unidade não possua plano de entrega com o status ATIVO no mesmo período do plano ao qual está sendo feita a adesão;
                            * /
                        }
                        if (!$canStore) throw new ServerException("CapacidadeStore", "Inclusão não executada");                   
                }
                break;*/
            case 'DESTROY':
                //$condicoes = $service->buscaCondicoes($request->validate(['id' => ['required']]));
                if (!$usuario->hasPermissionTo('MOD_PENT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'UPDATE':
                //$condicoes = $service->buscaCondicoes($request->validate(['id' => ['required']]));
                break;
            case 'ARQUIVAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Arquivamento não executado");
                break;
            case 'AVALIAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Avaliação não executada");
                break;
            case 'CANCELAR':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Cancelamento do Plano não executado");
                break;
            case 'CANCELARAVALIACAO':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Cancelamento de Avaliação não executado");
                break; 
            case 'CANCELARCONCLUSAO':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Cancelamento de Conclusão não executado");
                break;
            case 'CANCELARHOMOLOGACAO':
                if (!$usuario->hasPermissionTo('')) throw new ServerException("CapacidadeStore", "Cancelamento de Homologação não executado");
                break; 
            case 'CONCLUIR':
                //if (!$planoAtivo) throw new ServerException("CapacidadeStore", "Operação não executada");
                //if (!($gestorUnidadePlano || ($unidadePlanoEhLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_CONCLUIR')))) throw new ServerException("CapacidadeStore", "Operação não executada");
                /*  para poder concluir um plano de entregas, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status ATIVO; e
                    o usuário logado seja gestor da unidade do plano de entregas; ou
                    ela seja sua lotação principal e ele possua a capacidade "MOD_PENT_CONCLUIR"; 
                */
                break;
            case 'HOMOLOGAR':
                //if (!($planoProprio && $planoHomologando)) throw new ServerException("CapacidadeStore", "Operação não executada");
                //if (!($gestorUnidadePaiPlano || ($lotadoLinhaAscendenteUnidadePlano && $usuario->hasPermissionTo('MOD_PENT_HOMOL_SUBORD')))) throw new ServerException("CapacidadeStore", "Operação não executada");
                /*  para poder homologar um plano de entregas, é necessário que:
                    ele seja um plano de entregas válido e esteja com o status HOMOLOGANDO; e
                    o usuário logado seja gestor da unidade-pai do plano de entregas; ou
                    ela seja lotado em alguma unidade da sua linha hierárquica ascendente e ele possua a capacidade "MOD_PENT_HOMOL_SUBORD"; 
                */
                break;                
            case 'LIBERARHOMOLOGACAO':
                //if (!($planoProprio && $planoIncluindo)) throw new ServerException("CapacidadeStore", "Operação não executada");
                //if (!($gestorUnidadePlano || ($unidadePlanoEhLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_LIB_HOMOL')))) throw new ServerException("CapacidadeStore", "Operação não executada");
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
                //if (!($planoProprio && $planoHomologando)) throw new ServerException("CapacidadeStore", "Operação não executada");
                //if (!($gestorUnidadePlano || ($unidadePlanoEhLotacaoPrincipal && $usuario->hasPermissionTo('MOD_PENT_RET_HOMOL')))) throw new ServerException("CapacidadeStore", "Operação não executada");                
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
