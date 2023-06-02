<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Unidade;
use App\Services\UtilService;
use App\Services\UsuarioService;
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

    public function cancelarAvaliacao(Request $request) {
        try {
            $this->checkPermissions("CANCELAR_AVALIACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            $this->checkPermissions("CANCELAR_CONCLUSAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
            $this->checkPermissions("CANCELAR_HOMOLOGACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
                /*                 
                    (RN_PENT_4_9) CONSULTAR
                    - todos os participantes podem visualizar todos os planos de entrega; 
                */
                break;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_PENT_CONS')) throw new ServerException("CapacidadeSearchText", "Consulta não executada");
                /*                 
                    (RN_PENT_4_9) CONSULTAR
                    - todos os participantes podem visualizar todos os planos de entrega; 
                */                
                break;
            case 'STORE':
                $data = $request->validate(['entity' => ['required'],'with' => ['array']]);
                $condicoes = $service->buscaCondicoes($data['entity']);
                $acao = UtilService::emptyEntry($data['entity'], "id") ? 'INSERT' : 'UPDATE';
                switch ($acao) {
                    case 'UPDATE':
                        $canStore = false;
                        $data['entity']['unidade'] = Unidade::find($data['entity']['unidade_id'])->toArray();
                        $condition1 = ($condicoes['planoIncluindo'] || $condicoes['planoHomologando']) && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo('MOD_PENT_EDT')));
                        $condition2 = $condicoes['planoValido'] && $usuario->hasPermissionTo("MOD_PENT_EDT_FLH") && ($condicoes['gestorUnidadePaiUnidadePlano'] || UsuarioService::isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id']));
                        $condition3 = $condicoes['planoAtivo'] && $condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo(['MOD_PENT_EDT_ATV_HOMOL','MOD_PENT_EDT_ATV_ATV']);
                        if($condition1 || $condition2 || $condition3) $canStore = true;
                        if (!$canStore) throw new ServerException("CapacidadeStore", "Alteração não executada");
                        /*  (RN_PENT_4_2)
                            1. o plano precisa estar com o status INCLUINDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EDT"; ou
                            2. o plano precisa ser válido, o usuário logado precisa possuir a capacidade "MOD_PENT_EDT_FLH", e ser gestor da unidade-pai da unidade do plano ou possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a unidade-pai da unidade do plano; (RN_PENT_1_3) ou
                            3. o plano precisa estar com o status ATIVO, a unidade do plano ser a unidade de lotação principal do usuário logado, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" ou "MOD_PENT_EDT_ATV_ATV";
                        */
                        break;
                    case 'INSERT':
                        $canStore = false;
                        if($condicoes['planoProprio']){
                            if($condicoes['gestorUnidadePlano'] || $condicoes['gestorUnidadePaiUnidadePlano'] || (UsuarioService::isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id']) && $usuario->hasPermissionTo('MOD_PENT_EDT_FLH'))) $canStore = true;
                            /*  (RN_PENT_4_12) INSERIR (exclusivamente para planos próprios)
                                - o usuário logado precisa ser gestor da unidade do plano, ou gestor da unidade-pai da unidade do plano; ou
                                - o usuário precisa possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a unidade-pai da unidade do plano e possuir a capacidade "MOD_PENT_EDT_FLH";
                            */
                        } else if($condicoes['planoVinculado']) {
                            $condition1 = $condicoes['gestorUnidadePlano'] || $condicoes['gestorUnidadePaiUnidadePlano'] || (($condicoes['unidadePlanoEhLotacaoPrincipal'] || $condicoes['unidadePaiUnidadePlanoEhLotacaoPrincipal']) && $usuario->hasPermissionTo('MOD_PENT_ADERIR'));
                            $condition2 = $condicoes['unidadePlanoPaiEhUnidadePaiUnidadePlano'] && $condicoes['planoPaiAtivo'];
                            $condition3 = !$condicoes['unidadePlanoPossuiPlanoAtivoMesmoPeriodoPlanoPai'];
                            if($condition1 && $condition2 && $condition3) $canStore = true;
                          
                        }
                            /*  (RN_PENT_4_1)
                                1. o usuário logado precisa ser gestor da unidade do plano ou da sua unidade-pai, ou uma destas ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_ADERIR"; (RN_PENT_2_4) e
                                2. a unidade do plano-pai precisa ser a unidade-pai da unidade do plano vinculado, e o plano-pai precisa estar com o status ATIVO; (RN_PENT_2_3) (RN_PENT_3_3) e
                                3. a unidade não possua plano de entrega com o status ATIVO no mesmo período do plano ao qual está sendo feita a adesão;
                            * /
                        /*if (!$canStore) throw new ServerException("CapacidadeStore", "Inserção não realizada"); 
                        break;  */                
                }
                break;
            case 'DESTROY':
                $canDestroy = false;
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);                
                if (!$usuario->hasPermissionTo('MOD_PENT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                $condition1 = $condicoes['planoIncluindo'] || $condicoes['planoHomologando'];
                $condition2 = $condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo("MOD_PENT_EXCL"));
                if($condition1 && $condition2) $canDestroy = true;
                if (!$canDestroy) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                /*                 
                    (RN_PENT_4_10) EXCLUIR
                    - o plano precisa estar com o status INCLUINDO ou HOMOLOGANDO; e
                    - o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EXCL";
                    - se o plano não atender às condições acima, o usuário deve ser informado das razões pelas quais o plano não foi excluído;
                */                              
                break;
            case 'UPDATE':
                /*                 
 
                */
                break;
            case 'ARQUIVAR':
                $data = $request->validate(['id' => ['required'], 'arquivar' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAvaliado'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo("MOD_PENT_ARQ"))))) throw new ServerException("CapacidadeStore", "Arquivamento não executado");
                /*                 
                    (RN_PENT_4_3) ARQUIVAR
                    - o plano precisa estar com o status AVALIADO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_ARQ";
                */                
                break;
            case 'AVALIAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = $condicoes['planoConcluido'] && ($condicoes['gestorUnidadePaiUnidadePlano'] || UsuarioService::isIntegrante('AVALIADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id']));
                $condition2 = $condicoes['planoConcluido'] && $condicoes['gestorLinhaAscendenteUnidadePlano'] && $usuario->hasPermissionTo("MOD_PENT_AVAL_SUBORD");
                if (!($condition1 || $condition2)) throw new ServerException("CapacidadeStore", "Avaliação não executada");
                /*                 
                    (RN_PENT_4_4) AVALIAR
                    - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da unidade-pai da unidade do plano, ou possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para esta unidade; ou
                    - o plano precisa estar com o status CONCLUIDO, o usuário logado precisa ser gestor de alguma unidade da linha hierárquica ascendente da unidade do plano, e possuir a capacidade "MOD_PENT_AVAL_SUBORD";
                */                
                break;
            case 'CANCELAR_AVALIACAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAvaliado'] && ($condicoes['gestorUnidadePaiUnidadePlano'] || UsuarioService::isIntegrante('AVALIADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id'])))) throw new ServerException("CapacidadeStore", "Cancelamento de Avaliação não executado");
                /*                 
                    (RN_PENT_4_5) CANCELAR AVALIAÇÃO
                    - o plano precisa estar com o status AVALIADO e o usuário logado precisa ser gestor da unidade-pai da unidade do plano, ou possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para esta unidade;
                */                
                break; 
            case 'CANCELAR_CONCLUSAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoConcluido'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo("MOD_PENT_CANC_CONCL"))))) throw new ServerException("CapacidadeStore", "Cancelamento de Conclusão não executado");
                /*                 
                    (RN_PENT_4_6) CANCELAR CONCLUSÃO
                    - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CANC_CONCL";
                */                
                break;
            case 'CANCELAR_HOMOLOGACAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAtivo'] && ($condicoes['gestorUnidadePaiUnidadePlano'] || UsuarioService::isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id'])))) throw new ServerException("CapacidadeStore", "Cancelamento de Homologação não executado");
                /*                 
                    (RN_PENT_4_7) CANCELAR HOMOLOGAÇÃO
                    - o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade-pai da unidade do plano, ou possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a unidade-pai da unidade do plano;
                */                
                break; 
            case 'CONCLUIR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAtivo'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacaoPrincipal'] && $usuario->hasPermissionTo("MOD_PENT_CONCLUIR"))))) throw new ServerException("CapacidadeStore", "Conclusão não executada");
                /*  
                    (RN_PENT_4_8) CONCLUIR
                    - o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CONCLUIR";
                */
                break;
            case 'HOMOLOGAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoHomologando'] && ($condicoes['gestorUnidadePaiUnidadePlano'] || UsuarioService::isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id'])))) throw new ServerException("CapacidadeStore", "Homologação não executada");
                /*  
                    (RN_PENT_4_11) HOMOLOGAR
                    - o plano precisa estar com o status HOMOLOGANDO e o usuário logado ser gestor da unidade-pai da unidade do plano, ou possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a unidade-pai; (RN_PENT_1_3)(RN_PENT_3_2)
                */
                break;                
            case 'LIBERAR_HOMOLOGACAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoIncluindo'] && $condicoes['gestorUnidadePlano'])) throw new ServerException("CapacidadeStore", "Liberação para Homologação não executada");
                /*  
                    (RN_PENT_4_13) LIBERAR PARA HOMOLOGAÇÃO
                    - o plano precisa estar com o status INCLUINDO e o usuário logado precisa ser gestor da unidade do plano;
                */
                break;
            case 'REATIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoSuspenso'] && ($condicoes['gestorUnidadePlano'] || $condicoes['gestorLinhaAscendenteUnidadePlano']))) throw new ServerException("CapacidadeStore", "Reativação não executada");
                /*
                    (RN_PENT_4_15) REATIVAR
                    - o plano precisa estar com o status SUSPENSO e o usuário logado precisa ser gestor da unidade do plano, ou ser gestor de alguma unidade da linha hierarquica ascendente da unidade do plano;                
                */
                break;   
            case 'RETIRAR_HOMOLOGACAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoHomologando'] && $condicoes['gestorUnidadePlano'])) throw new ServerException("CapacidadeStore", "Retirada de Homologação não executada");                
                /*  
                    (RN_PENT_4_14) RETIRAR DE HOMOLOGAÇÃO
                    - o plano precisa estar com o status HOMOLOGANDO, e o usuário logado precisa ser gestor da unidade do plano;
                */
                break;
            case 'SUSPENDER':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAtivo'] && ($condicoes['gestorUnidadePlano'] || $condicoes['gestorLinhaAscendenteUnidadePlano']))) throw new ServerException("CapacidadeStore", "Suspensão não executada");
                /*                 
                    (RN_PENT_4_16) SUSPENDER
                    - o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade do plano, ou ser gestor de alguma unidade da linha hierarquica ascendente da unidade do plano;
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
            $this->checkPermissions("LIBERAR_HOMOLOGACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
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
            $this->checkPermissions("RETIRAR_HOMOLOGACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
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
