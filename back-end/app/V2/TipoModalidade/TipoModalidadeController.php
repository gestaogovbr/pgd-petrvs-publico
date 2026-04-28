<?php

namespace App\V2\TipoModalidade;

use App\Http\Controllers\Controller;
use App\Support\ModalidadePgd;
use Illuminate\Http\JsonResponse;

class TipoModalidadeController extends Controller
{
    /**
     * Lista as modalidades PGD disponíveis.
     *
     * @return JsonResponse
     * ```json
     * {
     *   "success": true,
     *   "data": [
     *     {"key": "presencial", "value": "Presencial"},
     *     {"key": "parcial", "value": "Teletrabalho (Parcial)"},
     *     {"key": "integral", "value": "Teletrabalho (Integral)"},
     *     {"key": "no exterior substituicao", "value": "Teletrabalho no exterior (substituição)"},
     *     {"key": "no exterior", "value": "Teletrabalho no exterior"}
     *   ]
     * }
     * ```
     */
    public function index(): JsonResponse
    {
        return response()->json(['success' => true, 'data' => ModalidadePgd::options()]);
    }
}
