<?php
namespace App\Http\Controllers;


use App\Models\Catalogo;

use Illuminate\Http\Request;
use App\Services\Validador\IValidador;
use Throwable;

class CatalogoController extends ControllerBase {

    public function __construct(private IValidador $validator) {
        parent::__construct();
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {

    }

    public function store(Request $request) {
        try {
            $this->validator->validar($request);
            return parent::store($request);
        } catch (Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

}
