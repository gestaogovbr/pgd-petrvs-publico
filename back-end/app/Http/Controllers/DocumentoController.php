<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Exceptions\ServerException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Services\PlanoTrabalhoService;
use Throwable;

class DocumentoController extends ControllerBase 
{
    public $updatable = ["status", "numero_documento"];
    public $planoTrabalhoService = null;

    public function __construct() {
        parent::__construct();
        $this->planoTrabalhoService = new PlanoTrabalhoService();
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'ASSINAR':
                $can = false;
                $data = $request->validate(['documentos_ids' => ['required']]);
                foreach ($data["documentos_ids"] as $doc_id) {
                    $condicoes = $this->planoTrabalhoService->buscaCondicoes(['id' => Documento::find($doc_id)->plano_trabalho_id]);
                    $condition1 = $condicoes["planoIncluido"];
                    $condition2 = $condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"];
                    $condition3 = $condicoes["assinaturaUsuarioExigida"] && !$condicoes["usuarioJaAssinouTCR"];
                    $condition4 = $condicoes["planoAguardandoAssinatura"];
                    if (($condition1 && $condition2 && $condition3) || ($condition4 && $condition3)) $can = true; else throw new ServerException("CapacidadeStore", "Assinatura não realizada");
                    /*                 
                        (RN_PTR_O) ASSINAR
                        O plano precisa estar com o status INCLUIDO, e:
                            - o usuário logado precisa ser o participante do plano ou o gestor da sua Unidade Executora, e
                            - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, e ele não ter ainda assinado;
                        Ou o plano precisa estar com o status AGUARDANDO_ASSINATURA, e:
                            - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, e ele não ter ainda assinado;
                    */
                }
            if(!$can) throw new ServerException("CapacidadeStore", "Assinatura não realizada");
            break;
        }
    }

    public function pendenteSei(Request $request) {
        try {
            $data = $request->validate([
                'id_documento' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->pendenteSei($data["id_documento"])
            ]); 
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function assinar(Request $request) {
        $this->checkPermissions("ASSINAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
        try {
            $data = $request->validate([
                'documentos_ids' => ['array']
            ]);
            return response()->json([
                'success' => true,
                'rows' => $this->service->assinar($data)
            ]); 
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
