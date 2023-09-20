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
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->arquivar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function ativar(Request $request) {
        try {
            $this->checkPermissions("ATIVAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->ativar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelarAssinatura(Request $request) {
        try {
            $this->checkPermissions("CANCELAR_ASSINATURA", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarAssinatura($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelarPlano(Request $request) {
        try {
            $this->checkPermissions("CANCELAR_PLANO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarPlano($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        $can = false;
        $usuarioService = new UsuarioService();
        switch ($action) {
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PTR')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada");
                /*                 
                    (RN_PTR_S) CONSULTAR
                    Todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";
                */
                break;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_PTR')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada");
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
                        if (!$usuario->hasPermissionTo('MOD_PTR_EDT')) throw new ServerException("CapacidadeStore", "Alteração não realizada");
                        $condition1 = $condicoes['planoIncluido'] && ($usuarioService->isParticipante($planoTrabalho) || $condicoes['gestorUnidadeExecutora']);
                        $condition2 = $condicoes['planoAguardandoAssinatura'] && $condicoes['usuarioJaAssinouTCR'];
                        $condition3 = $condicoes['planoAtivo'] && $condicoes['gestorUnidadeExecutora'] && $usuario->hasPermissionTo('MOD_PTR_EDT_ATV');
                        if($condicoes['planoValido'] && ($condition1 || $condition2 || $condition3))  $can = true;
                        if(!$can) throw new ServerException("CapacidadeStore", "Alteração não realizada");
                        /*  
                            (RN_PTR_M) Condições para que um Plano de Trabalho possa ser alterado:
                            O usuário logado precisa possuir a capacidade "MOD_PTR_EDT", o Plano de Trabalho precisa ser válido (ou seja, nem deletado, nem arquivado, nem estar no status CANCELADO), e:
                                - estando com o status 'INCLUIDO', o usuário logado precisa ser o participante do plano ou o gestor da Unidade Executora;
                                - estando com o status 'AGUARDANDO_ASSINATURA', o usuário logado precisa ser um dos que já assinaram o TCR e todas as assinaturas tornam-se sem efeito;
                                - estando com o status 'ATIVO', o usuário precisa ser gestor da Unidade Executora e possuir a capacidade MOD_PTR_EDT_ATV. Após alterado, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
                        */
                        break;
                    case 'INSERT':  // inclusão de um novo Plano de Trabalho
                        if (!$usuario->hasPermissionTo('MOD_PTR_INCL')) throw new ServerException("CapacidadeStore", "Inclusão não realizada");
                        $condition1 = $condicoes['usuarioEhParticipantePgdHabilitado'] || $condicoes['gestorUnidadeExecutora'];
                        $condition2 = $condicoes['participanteLotadoAreaTrabalho'] || $usuario->hasPermissionTo('MOD_PTR_USERS_INCL');
                        $condition3 = $condicoes['participanteLotadoUnidadeExecutora'] || $usuario->hasPermissionTo('MOD_PTR_INCL_SEM_LOT');
                        $condition4 = !$condicoes['possuiPeriodoConflitanteOutroPlano'] || $usuario->hasPermissionTo('MOD_PTR_INTSC_DATA');
                        if($condition1 && $condition2 && $condition3 && $condition4) $can = true;
                        /*  (RN_PTR_V) INCLUIR/INSERIR
                            O usuário logado precisa possuir a capacidade "MOD_PTR_INCL", e:
                                - o usuário logado precisa ser um participante do PGD, habilitado, ou ser gestor da Unidade Executora do plano; (RN_PTR_B); e
                                - o participante do plano precisa estar lotado em uma das áreas de trabalho do usuário logado, ou este deve possuir a capacidade MOD_PTR_USERS_INCL; e
                                - o participante do plano precisa estar lotado na Unidade Executora, ou o usuário logado possuir a capacidade MOD_PTR_INCL_SEM_LOT; e
                                - o novo Plano de Trabalho não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA
                        */
                        if(!$can) throw new ServerException("CapacidadeStore", "Inserção não realizada"); 
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
            case 'ARQUIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);        
                $condition1 = $condicoes["planoConcluido"] && !$condicoes["planoArquivado"];
                $condition2 = $condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"];
                if ($condition1 && $condition2) $can = true;
                /*                 
                    (RN_PTR_N) ARQUIVAR
                    O plano precisa estar com o status CONCLUIDO, não ter sido arquivado, e:
                        - o usuário logado precisa ser o participante ou o gestor da Unidade Executora;
                */
                if(!$can) throw new ServerException("CapacidadeStore", "Arquivamento não realizado");
                break;
            case 'ATIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);        
                $condition1 = $condicoes["planoIncluido"];
                $condition2 = $condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"];
                $condition3 = count($condicoes["assinaturasExigidas"]) == 0;
                if ($condition1 && $condition2 && $condition3) $can = true;
                /*                 
                    (RN_PTR_P) ATIVAR
                    O plano precisa estar no status 'INCLUIDO', e
                        - o usuário logado precisa ser o participante do plano ou gestor da Unidade Executora, e
                        - nenhuma assinatura no TCR ser exigida pelo programa;
                */
                if(!$can) throw new ServerException("CapacidadeStore", "Ativação não realizada");
                break;
            case 'CANCELAR_ASSINATURA':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = $condicoes["planoAguardandoAssinatura"] && $condicoes["usuarioJaAssinouTCR"];
                if($condition1) $can = true;
                /*                 
                    (RN_PTR_Q) CANCELAR ASSINATURA
                    O plano precisa estar no status 'AGUARDANDO_ASSINATURA'; e
                      - o usuário logado precisa já ter assinado o TCR;
                */
                if(!$can) throw new ServerException("CapacidadeStore", "Cancelamento de assinatura não realizado");                
                break;
            case 'CANCELAR_PLANO':
                if (!$usuario->hasPermissionTo('MOD_PTR_CNC')) throw new ServerException("CapacidadeStore", "Cancelamento não realizado");
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = in_array(['INCLUIDO','AGUARDANDO_ASSINATURA','ATIVO','CONCLUIDO'],$condicoes['planoStatus']);
                $condition2 = $condicoes['gestorUnidadeExecutora'];
                if ($condition1 && $condition2) $can = true;
                /*
                    (RN_PTR_R) CANCELAR 
                    O usuário logado precisa possuir a capacidade "MOD_PTR_CNC", e
                      - o plano precisa estar em um dos seguintes status: INCLUIDO, AGUARDANDO_ASSINATURA, ATIVO ou CONCLUIDO; e
                      - o usuário logado precisa ser gestor da Unidade Executora;
                */
                if(!$can) throw new ServerException("CapacidadeStore", "Cancelamento não realizado");
                break; 
            case 'DESARQUIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = $condicoes["planoArquivado"];
                $condition2 = $condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"];
                if ($condition1 && $condition2) $can = true;
                /*
                    (RN_PTR_T) DESARQUIVAR
                    O plano precisa estar arquivado, e:
                        - o usuário logado precisa ser o participante ou gestor da Unidade Executora;
                */ 
                if(!$can) throw new ServerException("CapacidadeStore", "Desarquivamento não realizado");
                break;
            case 'REATIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = $condicoes["planoSuspenso"];
                $condition2 = $condicoes["gestorUnidadeExecutora"];
                if ($condition1 && $condition2) $can = true;                
                /*
                    (RN_PTR_W) REATIVAR
                    O plano precisa estar com o status SUSPENSO, e
                      - o usuário logado precisa ser gestor da Unidade Executora;
                */
                if(!$can) throw new ServerException("CapacidadeStore", "Reativação não realizada");
                break;   
            case 'ENVIAR_ASSINATURA':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = $condicoes["planoIncluido"];
                $condition2 = $condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"];
                $condition3 = count($condicoes["assinaturasExigidas"]) > 1 && in_array(parent::loggedUser()->id, $condicoes["assinaturasExigidas"]);
                if ($condition1 && $condition2 && $condition3) $can = true;                 
                /*  
                    (RN_PTR_U) ENVIAR PARA ASSINATURA
                    O plano precisa estar com o status INCLUIDO; e
                      - o usuário logado precisa ser o participante do plano ou gestor da sua Unidade Executora; e
                      - o programa de gestão precisa exigir não só a assinatura do usuário logado;
                */
                if(!$can) throw new ServerException("CapacidadeStore", "Envio para assinatura não realizado"); 
                break;
            case 'SUSPENDER':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = $condicoes["planoAtivo"];
                $condition2 = $condicoes["gestorUnidadeExecutora"];
                if ($condition1 && $condition2) $can = true;                  
                /*                 
                    (RN_PTR_X) SUSPENDER
                    O plano precisa estar com o status ATIVO, e
                      - o usuário logado precisa ser gestor da Unidade Executora;
                */ 
                if(!$can) throw new ServerException("CapacidadeStore", "Suspensão não realizada");               
                break; 
        }
    }

    public function desarquivar(Request $request) {
        try {
            $this->checkPermissions("DESARQUIVAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->desarquivar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function enviarParaAssinatura(Request $request) {
        try {
            $this->checkPermissions("ENVIAR_ASSINATURA", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->enviarParaAssinatura($data, $unidade)
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