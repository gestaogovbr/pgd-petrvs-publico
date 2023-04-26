<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Notification
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $config = config("notificacoes")["whatsapp"];
        $authorization = $request->header('Authorization');
        if(!isset($authorization) || $authorization != $config["authorization"]) {
            return Response::json(array('error' => 'Erro ao autenticar endpoint de notificações'));
        }
        return $next($request);          
    }
}
