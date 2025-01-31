<?php
namespace App\Http\Controllers;


use App\Models\Solucao;
use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
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
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_SOLUCOES_INCL')) throw new ServerException("SolucaoStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_SOLUCOES_EDT')) throw new ServerException("SolucaoStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_SOLUCOES_EXCL')) throw new ServerException("SolucaoDestroy", "Exclusão não realizada");

                $data = $request->validate([
                    'id' => ['required']
                ]);
                $solucao = $this->service->getById($data);

                if (count($solucao->produtosSolucoes) > 0) {
                    throw new ServerException("SolucaoComProdutosDestroy");
                }

                break;
        }
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
