<?php

namespace App\Events;

class UnidadeAutorizadoraAlteradaEvent
{
    public function __construct(
        public readonly string $tenantId,
        public readonly string $codUnidadeAutorizadora,
        public readonly bool $somenteSemCodigo = false,
    ) {
    }
}
