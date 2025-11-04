<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use App\Models\PlanoTrabalho;
use App\Services\UtilService;
use Illuminate\Support\Facades\Log;
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
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
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
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
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
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function cancelarAvaliacao(Request $request) {   // NÃO SERIA O CASO DE ESSE MÉTODO IR PARA O CONTROLLER/SERVICE DE CONSOLIDAÇÃO ?
        try {
            $this->checkPermissions("CANCELAR_AVALIACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required'],
                'justificativa' => ['present']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarAvaliacao($data, $unidade)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
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
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function ativar(Request $request) {
        try {
            $this->checkPermissions("ATIVAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required'],
                'justificativa' => ['present']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->ativar($data, $unidade)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function cancelarAssinatura(Request $request) {
        try {
            $this->checkPermissions("CANCELAR_ASSINATURA", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required'],
                'justificativa' => ['present']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarAssinatura($data, $unidade)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function cancelarPlano(Request $request) {
        try {
            $this->checkPermissions("CANCELAR_PLANO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required'],
                'justificativa' => ['present'],
                'arquivar' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarPlano($data, $unidade)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PTR')) throw new ServerException("CapacidadeSearchText", "O usuário logado não tem permissão para consultar planos de trabalho (MOD_PTR).\n[ver RN_PTR_S]");
                /*                 
                (RN_PTR_S) CONSULTAR
                Todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";
                */
                break;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_PTR')) throw new ServerException("CapacidadeSearchText", "O usuário logado não tem permissão para consultar planos de trabalho (MOD_PTR).\n[ver RN_PTR_S]");
                /*                 
                (RN_PTR_S) CONSULTAR
                Todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";
                */               
                break;
            case 'STORE':           //incluir ou alterar um Plano de Trabalho
                $data = $request->validate(['entity' => ['required'], 'with' => ['array']]);
                $planoTrabalho = $data['entity'];
                $acao = UtilService::emptyEntry($planoTrabalho, "id") ? "INSERT" : "EDIT";
                switch ($acao) {
                    case 'INSERT':  // inclusão de um novo Plano de Trabalho
                        if(!$usuario->hasPermissionTo('MOD_PTR_INCL')) throw new ServerException("CapacidadeStore", "Usuário não possui a capacidade de inserir planos de trabalho (MOD_PTR_INCL).\n[ver RN_PTR_V]");
                        break; 
                    case 'EDIT':    // alteração de um Plano de Trabalho
                        if(!$usuario->hasPermissionTo('MOD_PTR_EDT')) throw new ServerException("CapacidadeStore", "Usuário não possui a capacidade de alterar/editar planos de trabalho (MOD_PTR_EDT).\n[ver RN_PTR_M]");
                        break;             
                }
                break;
            case 'DESTROY':
                throw new ServerException("CapacidadeDestroy", "Um Plano de Trabalho não pode ser excluído.\n[ver RN_PTR_AB]");
                /*                 
                (RN_PTR_AB) EXCLUIR
                Um Plano de Trabalho não pode ser excluído;
                */                              
                break;
            case 'ARQUIVAR':
                $data = $request->validate(['id' => ['required'], 'arquivar' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if ($data['arquivar']) {
                    /*                 
                    (RN_PTR_N) ARQUIVAR
                    O plano precisa estar com o status CONCLUIDO ou CANCELADO, não ter sido arquivado, e:
                        - o usuário logado precisa ser o participante ou o gestor da Unidade Executora;
                    */
                    if(!(($condicoes["planoConcluido"] || $condicoes["planoCancelado"]) && !$condicoes["planoArquivado"])) throw new ServerException("ValidatePlanoTrabalho", "Arquivamento não realizado, porque o plano não está no status CONCLUIDO nem CANCELADO, ou já está arquivado.\n[ver RN_PTR_N]");
                    if(!($condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"])) throw new ServerException("ValidateUsuario", "Arquivamento não realizado, porque o usuário logado não é participante do plano nem um dos gestores da sua unidade executora.\n[ver RN_PTR_N]");
                } else {
                    /*
                    (RN_PTR_T) DESARQUIVAR
                    O plano precisa estar arquivado, e:
                        - o usuário logado precisa ser o participante ou gestor da Unidade Executora;
                    */ 
                    $condition1 = $condicoes["planoArquivado"];
                    $condition2 = $condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"];
                    if(!$condition1) throw new ServerException("ValidatePlanoTrabalho", "O plano de trabalho não pode ser desarquivado porque não se encontra arquivado.\n[ver RN_PTR_T]");
                    if(!$condition2) throw new ServerException("ValidateUsuario", "O plano de trabalho não pode ser desarquivado porque o usuário logado não é o participante do plano nem um dos gestores da sua unidade executora.\n[ver RN_PTR_T]");
                }     
                break;
            case 'ATIVAR':
                /*                 
                (RN_PTR_P) Condições para que um Plano de Trabalho possa ser ativado:
                - o plano precisa estar no status 'INCLUIDO', e
                    - o usuário logado precisa respeitar a ação Ativar da TABELA_1, e
                    - nenhuma assinatura no TCR ser exigida pelo programa, e
                    - o plano de trabalho precisa ter ao menos uma entrega;
                */
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);        
                if(! $condicoes["planoIncluido"]) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, ele precisa estar no status INCLUIDO.\n[ver RN_PTR_P]");
                /* Resumo da PTR:TABELA_1 para Ativação
                Usuario do Plano          Usuario Logado
                PT do Chefe.............: CF?,CF+,CS+
                PT do Chefe Sub.........: CF,CS-,CS?
                PT do Delegado..........: CF,CS,DL?
                PT do Lotado/Colaborador: CF,CS,LC? */
                $validoTabela1 = false;
                if ($condicoes["atribuicoesGestorUsuario"]["gestor"]) { /* Plano para o gestor da unidade */
                  $validoTabela1 = $condicoes["gestorUnidadeSuperior"] || $condicoes['usuarioEhParticipanteHabilitado'];
                } else if ($condicoes["atribuicoesGestorUsuario"]["gestorSubstituto"]) { /* Plano para o gestor substituto da unidade */
                  $validoTabela1 = $condicoes["atribuicoesGestorUsuarioLogado"]["gestor"] || ($condicoes['usuarioEhParticipantePlano'] && $condicoes['usuarioEhParticipanteHabilitado']) || (!$condicoes['usuarioEhParticipantePlano'] && $condicoes["atribuicoesGestorUsuarioLogado"]["gestorSubstituto"]);
                } else if ($condicoes["atribuicoesGestorUsuario"]["gestorDelegado"]) { /* Plano para o gestor delegado da unidade */
                  $validoTabela1 = $condicoes["atribuicoesGestorUsuarioLogado"]["gestor"] || $condicoes["atribuicoesGestorUsuarioLogado"]["gestorSubstituto"] || ($condicoes['usuarioEhParticipantePlano'] && $condicoes['usuarioEhParticipanteHabilitado']);
                } else if ($condicoes['usuarioEhParticipantePlano']) { /* Plano do próprio usuário logado */
                  $validoTabela1 = $condicoes["atribuicoesGestorUsuarioLogado"]["gestor"] || $condicoes["atribuicoesGestorUsuarioLogado"]["gestorSubstituto"] || $condicoes['usuarioEhParticipanteHabilitado'];
                }
                if(!$validoTabela1) throw new ServerException("ValidateUsuario", "Para ativar um plano de trabalho o usuário logado precisa respeitar a ação Ativar da [PTR:TABELA_1].\n[ver RN_PTR_P]");
                if($condicoes["haAssinaturasExigidas"]) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, o seu programa não deve exigir nenhuma assinatura no TCR.\n[ver RN_PTR_P]");
                if($condicoes["nrEntregas"] == 0) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, ele precisa possuir ao menos uma entrega.\n[ver RN_PTR_P]");
                break;
            case 'CANCELAR_ASSINATURA':
                /*                 
                    (RN_PTR_Q) CANCELAR ASSINATURA
                    O plano precisa estar no status 'AGUARDANDO_ASSINATURA'; e
                      - o usuário logado precisa já ter assinado o TCR;
                */
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if(!$condicoes["planoAguardandoAssinatura"]) throw new ServerException("ValidatePlanoTrabalho", "Cancelamento de assinatura não realizado, porque o plano não está no status AGUARDANDO ASSINATURA.\n[ver RN_PTR_Q]");
                if(!$condicoes["usuarioJaAssinouTCR"]) throw new ServerException("ValidateUsuario", "Cancelamento de assinatura não realizado, porque o usuário logado ainda não assinou o TCR.\n[ver RN_PTR_Q]");
                break;
            case 'CANCELAR_PLANO':
                $data = $request->validate(['id' => ['required']]);
                $error = $service->validateCancelamento($data['id']);
                if(!empty($error)) throw new ServerException("ValidatePlanoTrabalho", $error);
                break; 
            case 'REATIVAR':
                /*
                (RN_PTR_W) REATIVAR
                O plano precisa estar com o status SUSPENSO, e
                    - o usuário logado precisa ser gestor da Unidade Executora;
                */
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if(!$condicoes["planoSuspenso"]) throw new ServerException("ValidatePlanoTrabalho", "O Plano de trabalho não pode ser suspenso porque não se encontra no status SUSPENSO.\n[ver RN_PTR_W]");
                if(!$condicoes["gestorUnidadeExecutora"]) throw new ServerException("ValidateUsuario", "O Plano de trabalho não pode ser suspenso porque O usuário logado não é um dos gestores da Unidade Executora.\n[ver RN_PTR_W]");
                break;   
            case 'ENVIAR_ASSINATURA':
                /*  
                (RN_PTR_U) Condições para que um Plano de Trabalho possa ser enviado para assinatura:
                - o plano precisa estar com o status INCLUIDO; e
                    - o usuário logado precisa atender os critérios da ação Assinar da TABELA_1, e
                    - a assinatura do usuário logado não ser exigida, e caso seja, então ele já deve ter assinado o TCR (salvaguarda); e
                    - devem existir assinaturas exigíveis ainda pendentes; e
                    - o plano precisa possuir ao menos uma entrega.
                */
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if(!$condicoes["planoIncluido"]) throw new ServerException("ValidatePlanoTrabalho", "O Plano de trabalho não pode ser enviado para assinatura porque não se encontra no status INCLUIDO.\n[ver RN_PTR_U]");
                if($condicoes["assinaturaUsuarioExigida"] && $condicoes["usuarioFaltaAssinar"]) throw new ServerException("ValidateUsuario", "O Plano de trabalho não pode ser enviado para assinatura porque o usuário logado ainda não assinou o TCR.\n[ver RN_PTR_U]");
                if(!$condicoes["haAssinaturasFaltantes"]) throw new ServerException("ValidatePlanoTrabalho", "O Plano de trabalho não pode ser enviado para assinatura porque não há assinaturas pendentes.\n[ver RN_PTR_U]");
                if($condicoes["nrEntregas"] == 0) throw new ServerException("ValidatePlanoTrabalho", "O Plano de trabalho não pode ser enviado para assinatura porque ainda não possui nenhuma entrega.\n[ver RN_PTR_U]");
                break;
            case 'SUSPENDER':
                /*                 
                (RN_PTR_X) SUSPENDER
                O plano precisa estar com o status ATIVO, e
                    - o usuário logado precisa ser gestor da Unidade Executora;
                */ 
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if(!$condicoes["planoAtivo"]) throw new ServerException("ValidatePlanoTrabalho", "O plano de trabalho não pode ser suspenso porque não se encontra no status ATIVO.\n[ver RN_PTR_X]");          
                if(!$condicoes["gestorUnidadeExecutora"]) throw new ServerException("ValidateUsuario", "O plano de trabalho não pode ser suspenso porque o usuário logado não é um dos gestores da sua unidade executora.\n[ver RN_PTR_X]");          
                break; 
        }
    }

    public function enviarParaAssinatura(Request $request) {
        try {
            $this->checkPermissions("ENVIAR_ASSINATURA", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required'],
                'justificativa' => ['present']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->enviarParaAssinatura($data, $unidade)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function reativar(Request $request) {
        try {
            $this->checkPermissions("REATIVAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required'],
                'justificativa' => ['present']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->reativar($data, $unidade)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function suspender(Request $request) {
        try {
            $this->checkPermissions("SUSPENDER", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
            $data = $request->validate([
                'id' => ['required'],
                'justificativa' => ['present']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->suspender($data, $unidade)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function planosUsuarioComPendencias(Request $request) {
        try {
            $data = $request->validate([
                'usuario_id' => ['required']
            ]);
            return response()->json([
                'dados' => $this->service->planosUsuarioComPendencias($data['usuario_id'])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }
}