<?php

namespace App\Listeners;

use Stancl\Tenancy\Resolvers\RequestDataTenantResolver;

class InvalidateTenantCache
{
    public function __construct(
        private readonly RequestDataTenantResolver $resolver,
    ) {}

    public function handle(object $event): void
    {
        if (isset($event->tenant)) {
            $this->resolver->invalidateCache($event->tenant);
        }
    }
}
