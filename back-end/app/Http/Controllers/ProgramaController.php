<?php

namespace App\Http\Controllers;
use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class ProgramaController extends ControllerBase {

    public $updatable = ["participantes"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PRGT_INCL')) throw new ServerException("ProgramaStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PRGT_EDT')) throw new ServerException("ProgramaStore", "Edição não realizada");
                break;
            case 'CONCLUIR':
                if (!$usuario->hasPermissionTo('MOD_PRGT_CONCL')) throw new ServerException("ProgramaConcluir", "Conclusão não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PRGT_EXCL')) throw new ServerException("ProgramaDestroy", "Exclusão não realizada");

                $data = $request->validate([
                    'id' => ['required'],
                    'with' => ['planosTrabalho', 'planosEntrega']
                ]);
                $programa = $this->service->getById($data);

                if (count($programa->planosTrabalho) > 0) {
                    throw new ServerException("ValidateProgramaDestroy");
                }

                if (count($programa->planosEntrega) > 0) {
                    throw new ServerException("ValidateProgramaDestroy");
                }

                break;
        }
    }

    protected function validateStore(Request $request) {
        return $request->validate([
                'entity' => ['required'],
                'entity.prazo_max_plano_entrega' => ['required', 'integer', 'between:0,365'],
                'with' => ['array']
            ], [
                'entity.prazo_max_plano_entrega.required' => 'Informe a duração Máxima P.E.',
                'entity.prazo_max_plano_entrega.integer' => 'A duração Máxima P.E. deve ser um número inteiro.',
                'entity.prazo_max_plano_entrega.between' => 'A duração Máxima P.E. deve ser entre 0 e 365 dias.'
            ]);
    }

    public function concluir(Request $request)
    {
        try {
            $this->checkPermissions("CONCLUIR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'programa_id' => ['required']
            ]);
            return response()->json([
                'success' => $this->service->concluir($data)
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
