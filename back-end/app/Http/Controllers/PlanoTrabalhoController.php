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
        $idUsuarioLogado = parent::loggedUser()->id;
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
                $acao = UtilService::emptyEntry($planoTrabalho, "id") ? 'INSERT' : 'EDIT';
                switch ($acao) {
                    case 'INSERT':  // inclusão de um novo Plano de Trabalho
                        if(!$usuario->hasPermissionTo('MOD_PTR_INCL')) throw new ServerException("CapacidadeStore", "Usuário não possui a capacidade de inserir planos de trabalho (MOD_PTR_INCL). [RN_PTR_V]");
                        break; 
                    case 'EDIT':    // alteração de um Plano de Trabalho
                        if(!$usuario->hasPermissionTo('MOD_PTR_EDT')) throw new ServerException("CapacidadeStore", "Usuário não possui a capacidade de alterar/editar planos de trabalho (MOD_PTR_EDT). [RN_PTR_M]");
                        break;             
                }
                break;
            case 'DESTROY':
                throw new ServerException("CapacidadeDestroy", "Um Plano de Trabalho não pode ser excluído! [RN_PTR_AB]");
                /*                 
                    (RN_PTR_AB) EXCLUIR
                    Um Plano de Trabalho não pode ser excluído;
                */                              
                break;
            case 'ARQUIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);        
                if(!($condicoes["planoConcluido"] && !$condicoes["planoArquivado"])) throw new ServerException("ValidatePlanoTrabalho", "Arquivamento não realizado, porque o plano não está no status CONCLUIDO ou já está arquivado. [RN_PTR_N]");
                if(!($condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"])) throw new ServerException("ValidateUsuario", "Arquivamento não realizado, porque o usuário logado não é participante do plano nem um dos gestores da sua unidade executora. [RN_PTR_N]");
                /*                 
                    (RN_PTR_N) ARQUIVAR
                    O plano precisa estar com o status CONCLUIDO, não ter sido arquivado, e:
                        - o usuário logado precisa ser o participante ou o gestor da Unidade Executora;
                */
                break;
            case 'ATIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);        
                if(! $condicoes["planoIncluido"]) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, ele precisa estar no status INCLUIDO. [RN_PTR_P]");
                if(!($condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"])) throw new ServerException("ValidateUsuario", "Para ativar um plano de trabalho, o usuário logado precisa ser o participante deste plano ou um dos gestores da unidade executora. [RN_PTR_P]");
                if(!(count($condicoes["assinaturasExigidas"]) == 0)) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, o seu programa não deve exigir nenhuma assinatura no TCR. [RN_PTR_P]");
                if($condicoes["nrEntregas"] == 0) throw new ServerException("ValidatePlanoTrabalho", "Para ativar um plano de trabalho, ele precisa possuir ao menos uma entrega. [RN_PTR_P]");
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
                if(!$condicoes["planoAguardandoAssinatura"]) throw new ServerException("ValidatePlanoTrabalho", "Cancelamento de assinatura não realizado, porque o plano não está no status AGUARDANDO ASSINATURA. [RN_PTR_Q]");
                if(!$condicoes["usuarioJaAssinouTCR"]) throw new ServerException("ValidateUsuario", "Cancelamento de assinatura não realizado, porque o usuário logado ainda não assinou o TCR. [RN_PTR_Q]");
                /*                 
                    (RN_PTR_Q) CANCELAR ASSINATURA
                    O plano precisa estar no status 'AGUARDANDO_ASSINATURA'; e
                      - o usuário logado precisa já ter assinado o TCR;
                */
                break;
            case 'CANCELAR_PLANO':
                if (!$usuario->hasPermissionTo('MOD_PTR_CNC')) throw new ServerException("CapacidadeStore", "O usuário logado não tem permissão para cancelar planos de trabalho (MOD_PTR_CNC). [RN_PTR_R]");
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = in_array($condicoes['planoStatus'], ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO', 'CONCLUIDO']);
                $condition2 = $condicoes['gestorUnidadeExecutora'];
                if(!$condition1) new ServerException("ValidatePlanoTrabalho", "O plano de trabalho não pode ser cancelado porque não está em nenhum dos seguintes status: INCLUIDO, AGUARDANDO ASSINATURA, ATIVO ou CONCLUIDO. [RN_PTR_R]");
                if(!$condition2) new ServerException("ValidateUsuario", "O plano de trabalho não pode ser cancelado porque o usuário logado não é um dos gestores da sua unidade executora. [RN_PTR_R]");
                /*
                    (RN_PTR_R) CANCELAR 
                    O usuário logado precisa possuir a capacidade "MOD_PTR_CNC", e
                      - o plano precisa estar em um dos seguintes status: INCLUIDO, AGUARDANDO_ASSINATURA, ATIVO ou CONCLUIDO; e
                      - o usuário logado precisa ser gestor da Unidade Executora;
                */
                break; 
            case 'DESARQUIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                $condition1 = $condicoes["planoArquivado"];
                $condition2 = $condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"];
                if(!$condition1) new ServerException("ValidatePlanoTrabalho", "O plano de trabalho não pode ser desarquivado porque não se encontra arquivado. [RN_PTR_T]");
                if(!$condition2) new ServerException("ValidateUsuario", "O plano de trabalho não pode ser desarquivado porque o usuário logado não é o participante do plano nem um dos gestores da sua unidade executora. [RN_PTR_T]");
                /*
                    (RN_PTR_T) DESARQUIVAR
                    O plano precisa estar arquivado, e:
                        - o usuário logado precisa ser o participante ou gestor da Unidade Executora;
                */ 
                break;
            case 'REATIVAR':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if(!$condicoes["planoSuspenso"]) throw new ServerException("ValidatePlanoTrabalho", "O Plano de trabalho não pode ser suspenso porque não se encontra no status SUSPENSO. [RN_PTR_W]");
                if(!$condicoes["gestorUnidadeExecutora"]) throw new ServerException("ValidateUsuario", "O Plano de trabalho não pode ser suspenso porque O usuário logado não é um dos gestores da Unidade Executora. [RN_PTR_W]");
                /*
                    (RN_PTR_W) REATIVAR
                    O plano precisa estar com o status SUSPENSO, e
                      - o usuário logado precisa ser gestor da Unidade Executora;
                */
                break;   
            case 'ENVIAR_ASSINATURA':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if(!$condicoes["planoIncluido"]) throw new ServerException("ValidatePlanoTrabalho", "O Plano de trabalho não pode ser enviado para assinatura porque não se encontra no status INCLUIDO. [RN_PTR_U]");
                if(!($condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"])) throw new ServerException("ValidateUsuario", "O Plano de trabalho não pode ser enviado para assinatura porque o usuário logado não é o participante do plano nem é um dos gestores da sua unidade executora. [RN_PTR_U]");
                if(in_array($idUsuarioLogado,$condicoes["assinaturasExigidas"]) && !$condicoes["usuarioJaAssinouTCR"]) throw new ServerException("ValidateUsuario", "O Plano de trabalho não pode ser enviado para assinatura porque o usuário logado ainda não assinou seu TCR. [RN_PTR_U]");
                if(count($condicoes["assinaturasFaltantes"]) == 0) throw new ServerException("ValidatePlanoTrabalho", "O Plano de trabalho não pode ser enviado para assinatura porque não há assinaturas pendentes. [RN_PTR_U]");
                if($condicoes["nrEntregas"] == 0) throw new ServerException("ValidatePlanoTrabalho", "O Plano de trabalho não pode ser enviado para assinatura porque ainda não possui nenhuma entrega. [RN_PTR_U]");
                /*  
                    (RN_PTR_U) ENVIAR PARA ASSINATURA
                    O plano precisa estar com o status INCLUIDO; e
                      - o usuário logado precisa ser o participante do plano ou gestor da sua Unidade Executora; e
                      - se a assinatura do usuário logado por exigida, ele já deve ter assinado o TCR; e
                      - devem existir assinaturas exigíveis ainda pendentes; e
                      - o plano precisa possuir ao menos uma entrega.
                */
                break;
            case 'SUSPENDER':
                $data = $request->validate(['id' => ['required']]);
                $condicoes = $service->buscaCondicoes(['id' => $data['id']]);
                if(!$condicoes["planoAtivo"]) throw new ServerException("ValidatePlanoTrabalho", "O plano de trabalho não pode ser suspenso porque não se encontra no status ATIVO. [RN_PTR_X]");          
                if(!$condicoes["gestorUnidadeExecutora"]) throw new ServerException("ValidateUsuario", "O plano de trabalho não pode ser suspenso porque o usuário logado não é um dos gestores da sua unidade executora. [RN_PTR_X]");          
                /*                 
                    (RN_PTR_X) SUSPENDER
                    O plano precisa estar com o status ATIVO, e
                      - o usuário logado precisa ser gestor da Unidade Executora;
                */ 
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