<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Panel
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
        /*$config = config("panel");
        $authorization = $request->header('Authorization');
        if(!isset($authorization) || $authorization != $config["token"]) {
            return Response::json(array('error' => 'Erro ao autenticar painel'));
        }*/
        return $next($request);          
    }
}