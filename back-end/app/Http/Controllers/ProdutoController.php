<?php
namespace App\Http\Controllers;


use App\Models\Produto;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use App\Services\Validador\IValidador;
use Throwable;

class ProdutoController extends ControllerBase {

    public function __construct(private IValidador $validator) {
        parent::__construct();
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        // switch ($action) {
        //     case 'STORE':
        //         if (!$usuario->hasPermissionTo('MOD_CADV_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
        //         break;
        //     case 'EDIT':
        //         if (!$usuario->hasPermissionTo('MOD_CADV_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
        //         break;
        //     case 'DESTROY':
        //         if (!$usuario->hasPermissionTo('MOD_CADV_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
        //         break;
        // }
    }

    public function store(Request $request) {
        try {

            // dd($request);
            $this->validator->validar($request);

            return parent::store($request);
        } catch (Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);

            // return $this->error($e);
        }
    }
   
}