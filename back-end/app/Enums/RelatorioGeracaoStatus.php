<?php

namespace App\Enums;

enum RelatorioGeracaoStatus: string
{
    case PROCESSANDO = 'PROCESSANDO';
    case CONCLUIDA = 'CONCLUIDA';
    case ERRO = 'ERRO';

    /**
     * @return string[]
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match ($this) {
            self::PROCESSANDO => 'Em processamento',
            self::CONCLUIDA => 'Concluída',
            self::ERRO => 'Erro',
        };
    }
}
