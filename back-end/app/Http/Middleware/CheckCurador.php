<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckCurador
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->isCurador()) {
            return $next($request);
        }

        return response()->json(['message' => 'Acesso negado. Usuário não é um curador.'], 403);
    }
}
