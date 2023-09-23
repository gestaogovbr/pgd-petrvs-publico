<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Tenant;
use App\Exceptions\ServerException;

class VerifyAppVersion 
{
    /**
     * Handle an incoming request.
     * Pega a versão que se encontra no app.json e compara com a que se encontra no campo versin da tabela tenants.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
         $appVersion = config('app.version');

         $tenant = Tenant::where('id', env("PETRVS_ENTIDADE"))->first(); 
 
         if ($tenant && version_compare($appVersion, $tenant->version, '<')) {
            throw new ServerException("ValidateVersion", "Versão errada");
         }
 
         return $next($request);
    }
}
 