<?php

namespace App\Http\Middleware;

use App\Models\Traffic;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

class LogCommunication {

	public function handle($request, \Closure $next)
	{
		return $next($request);
	}

	public function terminate($request, $response)
	{
        $config = config('log');
        if($config['log_traffic'] && $request->method() != "OPTIONS") {
            $usuario = Auth::user();
            $communication = new Traffic();
            $communication->fill([
                'user_id' => empty($usuario) ? null : $usuario->id,
                'url' => $request->fullUrl(),
                'request' => json_encode([
                  'method' => $request->method(),
                  'ip' => $request->ip(),
                  'headers' => $request->headers->all(),
                  'content' => array_map(function ($v) { return $v instanceof UploadedFile ? $v->path() : $v; }, $request->all() ?? [])
                ]),
                'response' => json_encode([
                    'content' => method_exists($response, 'content') ? $response->content() : null
                ]) 
            ]);
            $communication->save();
        }
	}
}