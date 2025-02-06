<?php

namespace App\Http\Controllers;


use App\Models\Produto;

use Illuminate\Http\Request;
use App\Exceptions\Contracts\IBaseException;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use App\Services\Validador\IValidador;
use Illuminate\Validation\ValidationException;
use Throwable;
use App\Models\Usuario;

class ProdutoController extends ControllerBase
{
    private array $validators;

    public $updatable = ['nome', 'nome_fantasia', 'tipo', 'descricao', 'url','data_desativado', 'data_ativado'];

    public function __construct(IValidador ...$validator)
    {
        parent::__construct();
        $this->validators = $validator;

        $this->middleware('chefia')->only(['store', 'destroy']);
        $this->middleware('curador')->only(['update', 'atribuirTodos', 'desatribuirTodos']);
    }

    /**
     * Undocumented function
     *
     * @param [type] $action
     * @param [type] $request
     * @param [type] $service
     * @param [type] $unidade
     * @param Usuario $usuario
     * @return void
     */
    public function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
        if ($service->isLoggedUserADeveloper())  return true;
        
        switch($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PROD_INCL')) throw new ServerException("ProdutoStore", "Inserção não realizada");
                break;

            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_PROD_CAT_EDT')) throw new ServerException("ProdutoUpdate", "Inserção não realizada");
                break;

            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_PROD_CAT_EDT')) throw new ServerException("ProdutoUpdate", "Inserção não realizada");
                break;

            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PROD_CAT_EXCL')) throw new ServerException("ProdutoDestroy", "Exclusão não realizada");
                break;
        }

        return true;
    }

    public function store(Request $request)
    {
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
            $this->service->atribuirTodos();

            return response()->json([
                'success' => true
            ]);

        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            throw new ServerException("ProdutoEnableAll");  
        }
    }

    public function desatribuirTodos(Request $request) {
        try {
            $this->service->desatribuirTodos();

            return response()->json([
                'success' => true
            ]);

        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            throw new ServerException("ProdutoDisableAll");  
        }
    }
}
