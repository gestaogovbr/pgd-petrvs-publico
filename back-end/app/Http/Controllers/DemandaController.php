<?php

namespace App\Http\Controllers;

use App\Models\Demanda;
use App\Services\DemandaService;
use App\Services\CalendarioService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class DemandaController extends ControllerBase
{
    public $updatable = ["etiquetas", "checklist", "comentarios"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_DMD_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_DMD_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_DMD_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function __construct() {
        parent::__construct();
        $this->service = new DemandaService();
    }

    public function prazo(Request $request) {
        $calendario = new CalendarioService();
        try {
            $data = $request->validate([
                'inicio_data' => ['required'],
                'horas' => ['required'],
                'carga_horaria' => ['required'],
                'unidade_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'date' => $calendario->prazo($data["inicio_data"], $data["horas"], $data["carga_horaria"], $data["unidade_id"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function iniciadas(Request $request) {
        try {
            $data = $request->validate([
                'usuario_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'iniciadas' => $this->service->iniciadas($data["usuario_id"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function avaliadas(Request $request) {
        try {
            $data = $request->validate([
                'usuario_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'avaliadas' => $this->service->avaliadas($data["usuario_id"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function iniciar(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required'],
                'usuario_id' => ['required'],
                'plano_id' => ['required'],
                'carga_horaria' => ['required'],
                'tempo_planejado' => ['required'],
                //'fator_complexidade' => ['required'],
                //'tempo_pactuado' => ['required'],
                'data_inicio' => ['required'],
                'suspender' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->iniciar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelarInicio(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->cancelarInicio($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function concluir(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required'],
                'atividade_id' => ['required'],
                'fator_complexidade' => ['required'],
                'tempo_pactuado' => ['required'],
                'tempo_despendido' => ['required'],
                'data_entrega' => ['required'],
                'data_arquivamento' => ['nullable'],
                'produtividade' => ['nullable'],
                'descricao_tecnica' => ['min:0'],
                'id_processo_entrega' => ['nullable', 'numeric'],
                'numero_processo_entrega' => ['nullable', 'min:0'],
                'id_documento_entrega' => ['nullable', 'numeric'],
                'numero_documento_entrega' => ['nullable', 'min:0'],
                'titulo_documento_entrega' => ['nullable', 'min:0'],
                'tipo_documento_entrega_id' => ['nullable', 'min:0']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->concluir($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cancelarConclusao(Request $request) {
        try {
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

    public function avaliar(Request $request) {
        try {
            $data = $request->validate([
                'demanda_id' => ['required'],
                'atividade_id' => ['required'],
                'tipo_avaliacao_id' => ['required'],
                'fator_complexidade' => ['required'],
                'tempo_pactuado' => ['required'],
                'produtividade' => ['nullable'],
                'nota_atribuida' => ['required'],
                'arquivar' => ['required'],
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

    public function cancelarAvaliacao(Request $request) {
        try {
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

    public function pausar(Request $request) {
        try {
            $data = $request->validate([
                'demanda_id' => ['required'],
                'data' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->pausar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function reiniciar(Request $request) {
        try {
            $data = $request->validate([
                'demanda_id' => ['required'],
                'data' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->reiniciar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function prorrogar(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['required'],
                'prazo_entrega' => ['required']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->prorrogar($data, $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function arquivar(Request $request) {
        try {
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

}
