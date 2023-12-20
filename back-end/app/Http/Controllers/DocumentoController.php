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
    public $updatable = ["status", "numero_documento", "usuario_id"];
    public $planoTrabalhoService = null;

    public function __construct() {
        parent::__construct();
        $this->planoTrabalhoService = new PlanoTrabalhoService();
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'ASSINAR':
                $data = $request->validate(['documentos_ids' => ['array']]);
                $especie = Documento::find($data['documentos_ids'][0])->especie;
                switch ($especie) {
                    case 'TCR':
                        foreach ($data["documentos_ids"] as $doc_id) {
                            $condicoes = $this->planoTrabalhoService->buscaCondicoes(['id' => Documento::find($doc_id)->plano_trabalho_id]);
                            $condition1 = $condicoes["planoIncluido"]; 
                            $condition2 = $condicoes["usuarioEhParticipantePlano"] || $condicoes["gestorUnidadeExecutora"];
                            $condition3 = $condicoes["assinaturaUsuarioExigida"] && !$condicoes["usuarioJaAssinouTCR"];
                            $condition4 = $condicoes["planoAguardandoAssinatura"];
                            if(!$condition1 && !$condition4) throw new ServerException("ValidadePlanoTrabalho", "O TCR não pode ser assinado porque o plano de trabalho não está no status INCLUIDO nem AGUARDANDO ASSINATURA.");
                            if($condition1 && !$condition2) throw new ServerException("ValidadePlanoTrabalho", "O TCR não pode ser assinado porque o plano de trabalho está no status INCLUIDO, mas o usuário logado não é o participante do plano nem um dos gestores da unidade executora.");
                            if(!$condition3) throw new ServerException("ValidadePlanoTrabalho", "O TCR não pode ser assinado porque a assinatura do usuário logado não é exigida pelo programa ou ele já assinou o Termo.");
                            /*                 
                                (RN_PTR_O) ASSINAR
                                O plano precisa estar com o status INCLUIDO, e:
                                    - o usuário logado precisa ser o participante do plano ou o gestor da sua Unidade Executora, e
                                    - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, e ele não ter ainda assinado;
                                Ou o plano precisa estar com o status AGUARDANDO_ASSINATURA, e:
                                    - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, e ele não ter ainda assinado;
                            */
                        }
                        break;
                }
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
                'rows' => $this->service->assinar($data,$request)
            ]); 
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function gerarPDF(Request $request) {
        try {
            $data = $request->validate([
                'documento_id' => ['required']
            ]);
            
            $pdfContent = $this->service->gerarPDF($data);
    
            return response($pdfContent)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'inline; filename="document.pdf"');
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
