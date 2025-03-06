<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckChefia
{
    private function getUsuario(): Usuario {
        return Auth::user();
    }
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {

            $logado = $this->getUsuario();

            if ($logado && (
                $logado->isDeveloper() ||
                $logado->gerenciaTitular()->exists() || 
                $logado->gerenciasSubstitutas()->exists() || 
                $logado->gerenciasDelegadas()->exists()
            )) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Acesso negado. Usuário não é Chefe.'], 403);
    }
}
