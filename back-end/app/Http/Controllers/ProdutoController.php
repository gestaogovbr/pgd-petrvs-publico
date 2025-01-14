<?php

namespace App\Http\Controllers;


use App\Models\Produto;

use Illuminate\Http\Request;
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
        
         match($action){
            'STORE'=> $this->permissionPostUpdate($unidade, $request),
            'UPDATE'=> $this->permissionPostUpdate($unidade, $request),
            'QUERY'=>true,
            'GETBYID'=>true,
            'UPDATEJSON'=>$this->permissionPostUpdate($unidade, $request),
            'UPLOADBASE64'=>$this->permissionPostUpdate($unidade, $request),
            'DESTROY'=>$this->permissionPostUpdate($unidade, $request),
            default=>true
        };
    }

    private function permissionPostUpdate($unidade,Request $request)
    {
        if (!isset($request->input('entity')['responsavel_id'])) return true;

        $responsavelId = $request->input('entity')['responsavel_id'];
        $usuario = Usuario::find($responsavelId);
        $curadores = $usuario->curadores()->where('unidade_id', $unidade->id)->get();

        if ($curadores->isEmpty()) {
            throw new ServerException("CapacidadeStore", "Não tem permissão de criação/edição de produtos.");
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

    public function update(Request $request)
    {
        try {

            foreach ($this->validators as $validator) {
                $validator->setTipo('update');
                $validator->validar($request);
            }

            return parent::update($request);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação.',
                'errors' => $e->errors(),
            ], 422);
        }
    }
}
