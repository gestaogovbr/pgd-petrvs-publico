<?php

namespace App\Events;

class CodigoOrgaoAlterado
{
    public function __construct(
        public readonly string $tenantId,
        public readonly string $codigoAnterior,
        public readonly string $codigoNovo,
    ) {
    }
}
