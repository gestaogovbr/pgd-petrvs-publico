<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\TenantConfigurationsService;


class TenantConfigurations
{
    public function __construct(private TenantConfigurationsService $tenantConfigurationsService)
    {
    }

    public function handle($request, Closure $next)
    {

        $tenantId = $request->headers->get('X-ENTIDADE')
            ?? $request->route('tenant');

        $domain = $tenantId ? null : $request->getHost();


        $tenant = $this->tenantConfigurationsService->handle($tenantId, $domain);
        if (!$request->headers->get('X-ENTIDADE') && $tenant) {
            $request->headers->set('X-ENTIDADE', $tenant['tenant_id']);
        }


        return $next($request);
    }
}
