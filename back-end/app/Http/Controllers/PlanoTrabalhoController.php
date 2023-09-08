<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use App\Models\Unidade;
use App\Services\UtilService;
use App\Services\UsuarioService;
use Throwable;

class PlanoTrabalhoController extends ControllerBase {

    public function getByUsuario(Request $request) {
        try {
            $data = $request->validate([
                'usuario_id' => ['required'],
                'arquivados' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'dados' => $this->service->getByUsuario($data["usuario_id"], $data["arquivados"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function metadadosPlano(Request $request) {
        try {
            $this->checkPermissions('QUERY', $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'plano_trabalho_id' => ['required'],
                'inicioPeriodo' => ['Present'],
                'fimPeriodo' => ['Present'],
            ]);
            return response()->json([
                'success' => true,
                'metadadosPlano' => $this->service->metadadosPlano($data["plano_trabalho_id"],$data["inicioPeriodo"],$data["fimPeriodo"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function avaliar(Request $request) { // NÃO SERIA O CASO DE ESSE MÉTODO IR PARA O CONTROLLER/SERVICE DE CONSOLIDAÇÃO ?
        try {
            $this->checkPermissions("AVALIAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'plano_trabalho_id' => ['required'],
                'tipo_avaliacao_id' => ['required'],
                'nota_atribuida' => ['required'],
                'arquivar' => ['required'],                 // Oferecer a possibilidade de arquivar o plano, quando for a sua ultima avaliação
                'comentario_avaliacao' => ['min:0'],
                'justificativas' => ['array']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->avaliar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelarAvaliacao(Request $request) {   // NÃO SERIA O CASO DE ESSE MÉTODO IR PARA O CONTROLLER/SERVICE DE CONSOLIDAÇÃO ?
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

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PTR')) throw new ServerException("CapacidadeSearchText", "Consulta não executada");
                /*                 
                    (RN_PTR_S) CONSULTAR
                    Todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";
                */
                break;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_PTR')) throw new ServerException("CapacidadeSearchText", "Consulta não executada");
                /*                 
                    (RN_PTR_S) CONSULTAR
                    Todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";
                */               
                break;
            case 'STORE':           //incluir ou alterar um Plano de Trabalho
                $data = $request->validate(['entity' => ['required'],'with' => ['array']]);
                $planoTrabalho = $data['entity'];
                $planoTrabalho['unidade'] = Unidade::find($planoTrabalho['unidade_id'])->toArray();
                $condicoes = $service->buscaCondicoes($planoTrabalho);
                $acao = UtilService::emptyEntry($planoTrabalho, "id") ? 'INSERT' : 'EDIT';
                switch ($acao) {
                    case 'EDIT':    // alteração de um Plano de Trabalho
                        if (!$usuario->hasPermissionTo('MOD_PTR_EDT')) throw new ServerException("CapacidadeStore", "Alteração não executada");
                        $canStore = false;
                        $condition1 = $condicoes['planoIncluido'] && ($usuario->isParticipante($planoTrabalho) || $condicoes['gestorUnidadeExecutora']);
                        //($condicoes['planoAguardandoAssinatura'] && ) || ($condicoes['planoAtivo'] &&)))
                        $condition2 = $condicoes['planoAguardandoAssinatura'];// && o usuario logado precisa ser um dos que ja assinaram o tcr
                        //$usuario->hasPermissionTo("MOD_PTR_EDT_FLH") && $condicoes['gestorUnidadePaiUnidadePlano'];
                        $condition3 = !empty($data['entity']['unidade']['unidade_id']); //&& UsuarioService::isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id']);
                        $condition4 = $condicoes['planoAtivo'] && $condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo(['MOD_PTR_EDT_ATV_HOMOL','MOD_PTR_EDT_ATV_ATV']);
                        $condition5 = $usuario->hasPermissionTo('MOD_PTR_QQR_UND');
                        if($condicoes['planoValido'] && ($condition1 || $condition2 || $condition3))  $canStore = true;
                         
                        if(!$canStore) throw new ServerException("CapacidadeStore", "Alteração não executada");
                        /*  
                            (RN_PTR_M) Condições para que um Plano de Trabalho possa ser alterado:
                              - o usuário logado precisa possuir a capacidade "MOD_PTR_EDT", o Plano de Trabalho precisa ser válido (ou seja, nem deletado, nem arquivado, nem estar no status CANCELADO), e:
                                - estando com o status 'INCLUIDO', o usuário logado precisa ser o participante do plano ou o gestor da Unidade Executora;
                                - estando com o status 'AGUARDANDO_ASSINATURA', o usuário logado precisa ser um dos que já assinaram o TCR e todas as assinaturas tornam-se sem efeito;
                                - estando com o status 'ATIVO', o usuário precisa ser gestor da Unidade Executora e possuir a capacidade MOD_PTR_EDT_ATV. Após alterado, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
                        */
                        break;
                    case 'INSERT':  // inclusão de um novo Plano de Trabalho
                        if (!$usuario->hasPermissionTo('MOD_PTR_INCL')) throw new ServerException("CapacidadeStore", "Inclusão não executada");
                        $canStore = false;
                        if($condicoes['planoProprio']){
                            $condition1 = $condicoes['gestorUnidadePlano'] || $condicoes['gestorUnidadePaiUnidadePlano'];
                            $condition2 = !empty($data['entity']['unidade']['unidade_id']) && UsuarioService::isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id']) && $usuario->hasPermissionTo('MOD_PTR_EDT_FLH');
                            $condition3 = $usuario->hasPermissionTo('MOD_PTR_QQR_UND');
                            if($condition1 || $condition2 || $condition3) $canStore = true;
                            /*  (RN_PENT_Z) INCLUIR/INSERIR
                                - o usuário logado precisa possuir a capacidade "MOD_PTR_INCL", e:
                                    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou gestor da sua Unidade-pai (Unidade A)(RN_PENT_C); ou
                                    - o usuário precisa possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B) e possuir a capacidade "MOD_PTR_EDT_FLH"; ou
                                    - o usuário precisa possuir também a capacidade "MOD_PTR_QQR_UND";
                            */
                        } else if($condicoes['planoVinculado']) {
                            $condition1 = $usuario->hasPermissionTo('MOD_PTR_QQR_UND');
                            $condition2 = $condicoes['gestorUnidadePlano'] || $condicoes['gestorUnidadePaiUnidadePlano'] || (($condicoes['unidadePlanoEhLotacao'] || $condicoes['unidadePaiUnidadePlanoEhLotacao']) && $usuario->hasPermissionTo('MOD_PTR_ADR'));
                            $condition3 = $condicoes['unidadePlanoPaiEhUnidadePaiUnidadePlano'] && $condicoes['planoPaiAtivo'];
                            $condition4 = !$condicoes['unidadePlanoPossuiPlanoAtivoMesmoPeriodoPlanoPai'];
                            if($condition1 || ($condition2 && $condition3 && $condition4)) $canStore = true;
                            /*  (RN_PENT_4_1)
                                1. o usuário precisa possuir também a capacidade "MOD_PTR_QQR_UND"; ou
                                2. o usuário logado precisa ser gestor da unidade do plano ou da sua unidade-pai, ou uma destas ser sua unidade de lotação e ele possuir a capacidade "MOD_PTR_ADR"; (RN_PENT_2_4) e
                                3. a unidade do plano-pai precisa ser a unidade-pai da unidade do plano vinculado, e o plano-pai precisa estar com o status ATIVO; (RN_PENT_2_3) (RN_PENT_3_3) e
                                4. a unidade não possua plano de entrega com o status ATIVO no mesmo período do plano ao qual está sendo feita a adesão;
                            */
                        }
                        if(!$canStore) throw new ServerException("CapacidadeStore", "Inserção não realizada"); 
                        break;              
                }
                break;
            case 'DESTROY':
                throw new ServerException("CapacidadeStore", "Um Plano de Trabalho não pode ser excluído!");
                /*                 
                    (RN_PTR_AB) EXCLUIR
                    Um Plano de Trabalho não pode ser excluído;
                */                              
                break;
            case 'ARQUIVAR':        // ou DESARQUIVAR
                $data = $request->validate(['id' => ['required'], 'arquivar' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if($data['arquivar']) {
                    if (!(($condicoes['planoConcluido'] || $condicoes['planoAvaliado']) && !$condicoes['planoArquivado'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo("MOD_PTR_ARQ"))))) throw new ServerException("CapacidadeStore", "Arquivamento não executado");
                    /*                 
                        (RN_PENT_N) ARQUIVAR
                        - o plano precisa estar com o status CONCLUIDO ou AVALIADO, não ter sido arquivado, e:
                            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
                            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PTR_ARQ";
                    */
                } else {
                    if (!($condicoes['planoArquivado'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo("MOD_PTR_ARQ"))))) throw new ServerException("CapacidadeStore", "Desarquivamento não executado");
                    /*
                        (RN_PENT_W) DESARQUIVAR
                        - o plano precisa estar arquivado, e:
                            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou 
                            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PTR_ARQ";
                    */ 
                }
                break;
            case 'AVALIAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = $condicoes['gestorUnidadePaiUnidadePlano'];
                $condition2 = !empty($data['entity']['unidade']['id']) && UsuarioService::isIntegrante('AVALIADOR_PLANO_ENTREGA', $data['entity']['unidade']['id']);
                $condition3 = $condicoes["unidadePaiUnidadePlanoEhLotacao"] && $usuario->hasPermissionTo("MOD_PTR_AVAL");
                $condition4 = $condicoes['gestorLinhaAscendenteUnidadePlano'] && $usuario->hasPermissionTo("MOD_PTR_AVAL_SUBORD");
                if (!($condicoes['planoConcluido'] && ($condition1 || $condition2 || $condition3 || $condition4))) throw new ServerException("CapacidadeStore", "Avaliação não executada");
                /*                 
                    (RN_PENT_O) AVALIAR
                    - o plano precisa estar com o status CONCLUIDO, e:
                        - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
                        - o usuário logado precisa possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B); ou
                        - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PTR_AVAL"; ou
                        - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente da Unidade do plano (Unidade A e superiores), e possuir a capacidade "MOD_PTR_AVAL_SUBORD";
                        - sugerir arquivamento automático (vide RI_PENT_A);              
                */                
                break;
            case 'CANCELAR_PLANO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = in_array(['INCLUIDO','HOMOLOGANDO','ATIVO','CONCLUIDO'],$condicoes['planoStatus']);
                $condition2 = $condicoes['gestorUnidadePlano'];
                $condition3 = $condicoes['unidadePlanoEhLotacao'];
                if (!($usuario->hasPermissionTo("MOD_PTR_CNC") && $condition1 && ($condition2 || $condition3))) throw new ServerException("CapacidadeStore", "Cancelamento não realizado");
                /*
                    (RN_PENT_P) CANCELAR O Plano de Trabalho
                        - o usuário logado precisa possuir a capacidade "MOD_PTR_CNC", o plano precisa estar em um dos seguintes status: INCLUIDO, HOMOLOGANDO, ATIVO ou CONCLUIDO; e
                        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
                        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;
                */
                break;
            case 'CANCELAR_AVALIACAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAvaliado'] && ($condicoes['gestorUnidadePaiUnidadePlano'] || (!empty($data['entity']['unidade']['id']) && UsuarioService::isIntegrante('AVALIADOR_PLANO_ENTREGA', $data['entity']['unidade']['id']))))) throw new ServerException("CapacidadeStore", "Cancelamento de Avaliação não executado");
                /*                 
                    (RN_PENT_R) CANCELAR AVALIAÇÃO
                    - o plano precisa estar com o status AVALIADO, e
                    - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
                    - possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B);
                */                
                break; 
            case 'CANCELAR_CONCLUSAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoConcluido'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo("MOD_PTR_CANC_CONCL"))))) throw new ServerException("CapacidadeStore", "Cancelamento de Conclusão não executado");
                /*                 
                    (RN_PENT_S) CANCELAR CONCLUSÃO
                    - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
                    - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PTR_CANC_CONCL";
                */                
                break;
            case 'CANCELAR_HOMOLOGACAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAtivo'] && ($condicoes['gestorUnidadePaiUnidadePlano'] || ($condicoes["unidadePaiUnidadePlanoEhLotacao"] && $usuario->hasPermissionTo("MOD_PTR_CANC_HOMOL")) || (!empty($data['entity']['unidade']['unidade_id']) && UsuarioService::isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id']))))) throw new ServerException("CapacidadeStore", "Cancelamento de Homologação não executado");
                /*                 
                    (RN_PENT_T) CANCELAR HOMOLOGAÇÃO
                    - o plano precisa estar com o status ATIVO, e
                    - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
                    - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PTR_CANC_HOMOL"; ou
                    - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B);
                */                
                break; 
            case 'CONCLUIR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAtivo'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo("MOD_PTR_CONC"))))) throw new ServerException("CapacidadeStore", "Conclusão não executada");
                /*  
                    (RN_PENT_U) CONCLUIR
                    - o plano precisa estar com o status ATIVO, e:
                    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
                    - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PTR_CONC";
                */
                break;
            case 'HOMOLOGAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoHomologando'] && ($condicoes['gestorUnidadePaiUnidadePlano'] || ($condicoes["unidadePaiUnidadePlanoEhLotacao"] && $usuario->hasPermissionTo("MOD_PTR_HOMOL")) || (!empty($data['entity']['unidade']['unidade_id']) && UsuarioService::isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', $data['entity']['unidade']['unidade_id']))))) throw new ServerException("CapacidadeStore", "Homologação não executada");
                /*  
                    (RN_PENT_Y) HOMOLOGAR
                    - o plano precisa estar com o status HOMOLOGANDO, e:
                        - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B); (RN_PENT_C), ou
                        - a Unidade-pai (Unidade A) for a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PTR_HOMOL", ou
                        - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A); (RN_PENT_E)
                    - A homologação do Plano de Trabalho não se aplica à Unidade instituidora.
                */
                break;                
            case 'LIBERAR_HOMOLOGACAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoIncluido'] && $condicoes['nrEntregas'] > 0 && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo("MOD_PTR_LIB_HOMOL"))))) throw new ServerException("CapacidadeStore", "Liberação para Homologação não executada");
                /*  
                    (RN_PENT_AA) LIBERAR PARA HOMOLOGAÇÃO
                    - o plano precisa estar com o status INCLUIDO, conter ao menos uma entrega, e
                        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
                        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PTR_LIB_HOMOL"
                */
                break;
            case 'REATIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoSuspenso'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo("MOD_PTR_RTV")) || $condicoes['gestorLinhaAscendenteUnidadePlano']))) throw new ServerException("CapacidadeStore", "Reativação não executada");
                /*
                    (RN_PENT_AC) REATIVAR
                    - o plano precisa estar com o status SUSPENSO, e
                        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
                        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PTR_RTV"; ou
                        - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);
                */
                break;   
            case 'RETIRAR_HOMOLOGACAO':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoHomologando'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo("MOD_PTR_RET_HOMOL"))))) throw new ServerException("CapacidadeStore", "Retirada de Homologação não executada");                
                /*  
                    (RN_PENT_AB) RETIRAR DE HOMOLOGAÇÃO
                    - o plano precisa estar com o status HOMOLOGANDO, e:
                        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
                        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PTR_RET_HOMOL"
                */
                break;
            case 'SUSPENDER':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if (!($condicoes['planoAtivo'] && ($condicoes['gestorUnidadePlano'] || ($condicoes['unidadePlanoEhLotacao'] && $usuario->hasPermissionTo("MOD_PTR_SUSP")) || $condicoes['gestorLinhaAscendenteUnidadePlano']))) throw new ServerException("CapacidadeStore", "Suspensão não executada");
                /*                 
                    (RN_PENT_AD) SUSPENDER
                    - o plano precisa estar com o status ATIVO, e
                        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
                        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PTR_SUSP"; ou
                        - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);
                */                
                break; 
        }
    }
}
