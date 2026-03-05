<?php

namespace App\Enums;

enum UsuarioSituacaoSiape: string
{
    case ATIVO = 'ATIVO';
    case INATIVO = 'INATIVO';
    case ATIVO_TEMPORARIO = 'ATIVO_TEMPORARIO';

    public static function ativos(): array
    {
        return [
            self::ATIVO->value,
            self::ATIVO_TEMPORARIO->value
        ];
    }
}