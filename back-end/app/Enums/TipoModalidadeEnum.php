<?php

namespace App\Enums;

enum TipoModalidadeEnum: string
{
    case SEM_DADOS_SIAPE = '0b5c6b9f-6f7a-4d3b-8c2a-2a0c2b3b9a1f';

    public function id(): string
    {
        return $this->value;
    }

    public function nome(): string
    {
        return match ($this) {
            self::SEM_DADOS_SIAPE => 'Sem dados do SIAPE',
        };
    }
}
