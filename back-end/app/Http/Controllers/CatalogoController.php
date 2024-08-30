<?php
namespace App\Http\Controllers;


use App\Models\Catalogo;

use Illuminate\Http\Request;
use App\Services\Validador\IValidador;
use Throwable;

class CatalogoController extends ControllerBase {

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
                $validator->validar($request);
            }
            return parent::store($request);
        } catch (Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

}
