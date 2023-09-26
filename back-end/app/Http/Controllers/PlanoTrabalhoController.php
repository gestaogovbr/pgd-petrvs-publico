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
                'arquivados' => ['required'],
                'plano_trabalho_id' => ['nullable']
            ]);
            return response()->json([
                'success' => true,
                'dados' => $this->service->getByUsuario($data["usuario_id"], $data["arquivados"], $data["plano_trabalho_id"])
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
                'id' => ['required'],
                'justificativa' => ['required']
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
                if (!$usuario->hasPermissionTo('MOD_PTR')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada. [RN_PTR_S]");
                /*                 
                    (RN_PTR_S) CONSULTAR
                    Todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";
                */
                break;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_PTR')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada. [RN_PTR_S]");
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
                    case 'INSERT':  // inclusão de um novo Plano de Trabalho
                        if(!$usuario->hasPermissionTo('MOD_PTR_INCL')) throw new ServerException("ValidatePlanoTrabalho", "Usuário não possui a capacidade de inserir planos de trabalho (MOD_PTR_INCL). [RN_PTR_V]");
                        if(!($condicoes['usuarioEhParticipantePgdHabilitado'] || $condicoes['gestorUnidadeExecutora'])) throw new ServerException("ValidatePlanoTrabalho", "O usuário não é um participante habilitado no programa do plano de trabalho nem é gestor da sua unidade executora. [RN_PTR_V]");
                        if(!($condicoes['participanteLotadoAreaTrabalho'] || $usuario->hasPermissionTo('MOD_PTR_USERS_INCL'))) throw new ServerException("ValidatePlanoTrabalho", "O participante do plano de trabalho não é lotado em nenhuma das áreas de trabalho do usuário logado, e este não possui a capacidade para ser dispensado dessa regra (MOD_PTR_USERS_INCL). [RN_PTR_V]");
                        if(!($condicoes['participanteLotadoUnidadeExecutora'] || $usuario->hasPermissionTo('MOD_PTR_INCL_SEM_LOT'))) throw new ServerException("ValidatePlanoTrabalho", "O participante do plano de trabalho não é lotado na unidade executora do plano, e o usuário logado não possui a capacidade para ser dispensado dessa regra (MOD_PTR_INCL_SEM_LOT). [RN_PTR_V]");
                        if(!($condicoes['naoPossuiPeriodoConflitanteOutroPlano'] || $usuario->hasPermissionTo('MOD_PTR_INTSC_DATA'))) throw new ServerException("ValidatePlanoTrabalho", "O período de duração do plano de trabalho apresenta conflito com a duração de outro plano da mesma unidade executora e mesmo participante, e o usuário logado não possui a capacidade para ser dispensado dessa regra (MOD_PTR_INTSC_DATA). [RN_PTR_V]");
                        /*  (RN_PTR_V) INCLUIR/INSERIR
                            O usuário logado precisa possuir a capacidade "MOD_PTR_INCL", e:
                                - o usuário logado precisa ser um participante do PGD, habilitado, ou ser gestor da Unidade Executora do plano; (RN_PTR_B); e
                                - o participante do plano precisa estar lotado em uma das áreas de trabalho do usuário logado, ou este deve possuir a capacidade MOD_PTR_USERS_INCL; e
                                - o participante do plano precisa estar lotado na Unidade Executora, ou o usuário logado possuir a capacidade MOD_PTR_INCL_SEM_LOT; e
                                - o novo Plano de Trabalho não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA
                        */
                        break; 
                    case 'EDIT':    // alteração de um Plano de Trabalho
                        if(!$usuario->hasPermissionTo('MOD_PTR_EDT')) throw new ServerException("ValidatePlanoTrabalho", "Usuário não possui a capacidade de alterar/editar planos de trabalho (MOD_PTR_EDT). [RN_PTR_M]");
                        if(!$condicoes['planoValido']) throw new ServerException("ValidatePlanoTrabalho", "O plano de trabalho não é válido, ou seja, foi apagado, cancelado ou arquivado. [RN_PTR_M]");
                        if($condicoes['planoIncluido'] && (!($usuarioService->isParticipante($planoTrabalho) || $condicoes['gestorUnidadeExecutora']))) throw new ServerException("ValidatePlanoTrabalho", "Para alterar um plano de trabalho no status INCLUIDO, o usuário logado precisa ser o participante do plano ou o gestor da sua unidade executora. [RN_PTR_M]");
                        if($condicoes['planoAguardandoAssinatura'] && !$condicoes['usuarioJaAssinouTCR']) throw new ServerException("ValidatePlanoTrabalho", "Para alterar um plano de trabalho no status AGUARDANDO ASSINATURA, o usuário logado precisa já ter assinado o TCR. [RN_PTR_M]");
                        if($condicoes['planoAtivo'] && !($condicoes['gestorUnidadeExecutora'] && $usuario->hasPermissionTo('MOD_PTR_EDT_ATV'))) throw new ServerException("ValidatePlanoTrabalho", "Para alterar um plano de trabalho no status ATIVO, o usuário logado precisa ser gestor da sua unidade executora e possuir a capacidade específica (MOD_PTR_EDT_ATV). [RN_PTR_M]");
                        if(!($condicoes['participanteLotadoAreaTrabalho'] || $usuario->hasPermissionTo('MOD_PTR_USERS_INCL'))) throw new ServerException("ValidatePlanoTrabalho", "O participante do plano de trabalho não é lotado em nenhuma das áreas de trabalho do usuário logado, e este não possui a capacidade para ser dispensado dessa regra (MOD_PTR_USERS_INCL). [RN_PTR_M]");
                        if(!($condicoes['participanteLotadoUnidadeExecutora'] || $usuario->hasPermissionTo('MOD_PTR_INCL_SEM_LOT'))) throw new ServerException("ValidatePlanoTrabalho", "O participante do plano de trabalho não é lotado na unidade executora do plano, e o usuário logado não possui a capacidade para ser dispensado dessa regra (MOD_PTR_INCL_SEM_LOT). [RN_PTR_M]");
                        if(!($condicoes['naoPossuiPeriodoConflitanteOutroPlano'] || $usuario->hasPermissionTo('MOD_PTR_INTSC_DATA'))) throw new ServerException("ValidatePlanoTrabalho", "O período de duração do plano de trabalho apresenta conflito com a duração de outro plano da mesma unidade executora e mesmo participante, e o usuário logado não possui a capacidade para ser dispensado dessa regra (MOD_PTR_INTSC_DATA). [RN_PTR_M]");
                        /*  
                            (RN_PTR_M) Condições para que um Plano de Trabalho possa ser alterado:
                            O usuário logado precisa possuir a capacidade "MOD_PTR_EDT", o Plano de Trabalho precisa ser válido (ou seja, nem deletado, nem arquivado, nem estar no status CANCELADO), e:
                                - estando com o status 'INCLUIDO', o usuário logado precisa ser o participante do plano ou o gestor da Unidade Executora;
                                - estando com o status 'AGUARDANDO_ASSINATURA', o usuário logado precisa ser um dos que já assinaram o TCR e todas as assinaturas tornam-se sem efeito;
                                - estando com o status 'ATIVO', o usuário precisa ser gestor da Unidade Executora e possuir a capacidade MOD_PTR_EDT_ATV. Após alterado, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
                            Como a alteração pode ser no participante, e nas datas de início e fim do plano, faz-se necessário revalidar as respectivas regras da inserção do plano.
                        */
                        break;             
                }
                break;
            case 'DESTROY':
                throw new ServerException("CapacidadeStore", "Um Plano de Trabalho não pode ser excluído! [RN_PTR_AB]");
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
                if(!$can) throw new ServerException("CapacidadeStore", "Arquivamento não realizado. [RN_PTR_N]");
                break;
            case 'ATIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);        
                if(! $condicoes["planoIncluido"]) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, ele precisa estar no status INCLUIDO.");
                if(!($condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"])) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, o usuário logado precisa ser o participante deste plano ou um dos gestores da unidade executora.");
                if(!(count($condicoes["assinaturasExigidas"]) == 0)) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, o seu programa não deve exijir nenhuma assinatura no TCR.");
                if($condicoes["nrEntregas"] == 0) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, ele precisa possuir ao menos uma entrega.");
                /*                 
                    (RN_PTR_P) ATIVAR
                    O plano precisa estar no status 'INCLUIDO', e
                        - o usuário logado precisa ser o participante do plano ou gestor da Unidade Executora, e
                        - nenhuma assinatura no TCR ser exigida pelo programa, e
                        - o plano de trabalho precisa ter ao menos uma entrega;
                */
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
                if(!$can) throw new ServerException("CapacidadeStore", "Cancelamento de assinatura não realizado. [RN_PTR_Q]");
                break;
            case 'CANCELAR_PLANO':
                if (!$usuario->hasPermissionTo('MOD_PTR_CNC')) throw new ServerException("CapacidadeStore", "Cancelamento não realizado");
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = in_array($condicoes['planoStatus'], ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO', 'CONCLUIDO']);
                $condition2 = $condicoes['gestorUnidadeExecutora'];
                if ($condition1 && $condition2) $can = true;
                /*
                    (RN_PTR_R) CANCELAR 
                    O usuário logado precisa possuir a capacidade "MOD_PTR_CNC", e
                      - o plano precisa estar em um dos seguintes status: INCLUIDO, AGUARDANDO_ASSINATURA, ATIVO ou CONCLUIDO; e
                      - o usuário logado precisa ser gestor da Unidade Executora;
                */
                if(!$can) throw new ServerException("CapacidadeStore", "Cancelamento não realizado. [RN_PTR_R]");
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
                if(!$can) throw new ServerException("CapacidadeStore", "Desarquivamento não realizado. [RN_PTR_T]");
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
                if(!$can) throw new ServerException("CapacidadeStore", "Reativação não realizada. [RN_PTR_W]");
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
                if(!$can) throw new ServerException("CapacidadeStore", "Envio para assinatura não realizado. [RN_PTR_U]"); 
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
                if(!$can) throw new ServerException("CapacidadeStore", "Suspensão não realizada. [RN_PTR_X]");               
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