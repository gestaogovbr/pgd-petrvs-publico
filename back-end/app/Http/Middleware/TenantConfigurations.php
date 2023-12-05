<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Tenant;
use Stancl\Tenancy\Database\Models\Domain;


class TenantConfigurations
{
    public function handle($request, Closure $next)
    {
        if ($request->headers->get('X-ENTIDADE')){
            $tenant = Domain::where('tenant_id', $request->headers->get('X-ENTIDADE'))->with('tenant')->first();
        } else {
            if($request->route('tenant')){
                $tenant = Domain::where('tenant_id', $request->route('tenant'))->with('tenant')->first();
                $request->headers->set('X-ENTIDADE',$tenant['tenant_id']);
            }else{
                // Obter o host do domínio
                $domain = $request->getHost();
                // Encontrar o tenant correspondente
                $tenant = Domain::where('domain', $domain)->with('tenant')->first();
                if($tenant)
                    $request->headers->set('X-ENTIDADE',$tenant['tenant_id']);
                else
                    $request->headers->set('X-ENTIDADE', env('PETRVS_ENTIDADE'));
            }
        }

        if($tenant){
            // Pega os dados salvos no Panel
            $settings=json_decode($tenant['tenant'],true);

            ### Setagem das informações nos configs ###

            /* LOGIN UNICO - GOVBR */
            config(['services.govbr.client_secret'          => $settings['login_login_unico_secret']                ??env('LOGIN_UNICO_CLIENT_SECRET')]);
            config(['services.govbr.client_id'              => $settings['login_login_unico_client_id']             ??env('LOGIN_UNICO_CLIENT_ID')]);
            config(['services.govbr.redirect'               => $settings['login_login_unico_redirect']              ??env('LOGIN_UNICO_REDIRECT_URI')]);
            config(['services.govbr.code_verifier'          => $settings['login_login_unico_code_verifier']         ??env('LOGIN_UNICO_CODE_CHALLENGE')]);
            config(['services.govbr.code_challenge'         => $settings['login_login_unico_code_challenge']        ??env('LOGIN_UNICO_CODE_CHALLENGE_HASH')]);
            config(['services.govbr.code_challenge_method'  => $settings['login_login_unico_code_challenge_method'] ??env('LOGIN_UNICO_CODE_CHALLENGE_METHOD')]);
            config(['services.govbr.environment'            => $settings['login_login_unico_environment']           ??env('LOGIN_UNICO_ENV','staging')]);
        }
        return $next($request);
    }

}
