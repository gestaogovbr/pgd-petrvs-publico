<?php
namespace App\Http\Controllers;


use App\Models\Solucao;
use App\Services\Validador\IValidador;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Throwable;
use Illuminate\Validation\ValidationException;

class SolucaoController extends ControllerBase {

    private array $validators;

    public function __construct(IValidador ...$validator)
    {
        parent::__construct();
        $this->validators = $validator;
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {

    }

    public function store(Request $request) {
        try {
           foreach ($this->validators as $validator) {
                $validator->validar($request, 'store');
            }
            return parent::store($request);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação.',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function atribuirTodos(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['required']
            ]);

            return response()->json([
                'success' => $this->service->atribuirTodos($data['unidade_id'])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }

        return true;
    }

    public function desatribuirTodos(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['required']
            ]);

            return response()->json([
                'success' => $this->service->desatribuirTodos($data['unidade_id'])
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
