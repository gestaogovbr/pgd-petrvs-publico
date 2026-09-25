<?php

declare(strict_types=1);

namespace App\Services\Siape;

enum TipoDadoServidorSiape: string
{
    case FUNCIONAL = 'Dados Funcionais';
    case PESSOAL = 'Dados Pessoais';

    public static function descricao(string $tipoDado): string
    {
        return match (strtoupper($tipoDado)) {
            self::FUNCIONAL->name => self::FUNCIONAL->value,
            self::PESSOAL->name => self::PESSOAL->value,
            default => 'Dados',
        };
    }
}
