<?php

namespace App\Services;

class IntegracaoServiceFactory
{
    public function make(array $config = []): IntegracaoService
    {
        return new IntegracaoService($config);
    }
}
