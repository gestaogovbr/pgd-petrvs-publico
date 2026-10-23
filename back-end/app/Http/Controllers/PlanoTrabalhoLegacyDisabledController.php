<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class PlanoTrabalhoLegacyDisabledController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'error' => 'As ações da API legada de Planos de Trabalho foram desativadas. Use a versão atual.',
        ], Response::HTTP_GONE);
    }
}
