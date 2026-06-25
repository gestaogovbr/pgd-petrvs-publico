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
     *     {"key": "parcial", "value": "Teletrabalho Parcial"},
     *     {"key": "integral", "value": "Teletrabalho Integral"},
     *     {"key": "no exterior substituicao", "value": "Teletrabalho no Exterior (Substituição- VIII, art. 12, D. 11.072/22)"},
     *     {"key": "no exterior", "value": "Teletrabalho no Exterior (Discricionária- §7º, art. 12, D. 11.072/22)"}
     *   ]
     * }
     * ```
     */
    public function index(): JsonResponse
    {
        return response()->json(['success' => true, 'data' => ModalidadePgd::options()]);
    }
}
