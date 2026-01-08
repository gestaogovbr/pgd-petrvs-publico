<?php

namespace App\Enums;

enum StatusEnum: string
{
    case INCLUIDO = 'INCLUIDO';
    case HOMOLOGANDO = 'HOMOLOGANDO';
    case AGUARDANDO_ASSINATURA = 'AGUARDANDO_ASSINATURA';
    case AGUARDANDO_REGISTRO = 'AGUARDANDO_REGISTRO';
    case ATIVO = 'ATIVO';
    case CONCLUIDO = 'CONCLUIDO';
    case AVALIADO = 'AVALIADO';
    case SUSPENSO = 'SUSPENSO';
    case CANCELADO = 'CANCELADO';

    public function label(): string
    {
        return match ($this) {
            self::INCLUIDO => 'Incluído',
            self::HOMOLOGANDO => 'Homologando',
            self::AGUARDANDO_ASSINATURA => 'Aguardando Assinatura',
            self::AGUARDANDO_REGISTRO => 'Aguardando Registro',
            self::ATIVO => 'Ativo',
            self::CONCLUIDO => 'Concluído',
            self::AVALIADO => 'Avaliado',
            self::SUSPENSO => 'Suspenso',
            self::CANCELADO => 'Cancelado',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::INCLUIDO => 'Plano foi incluído no sistema',
            self::HOMOLOGANDO => 'Plano está sendo homologado',
            self::AGUARDANDO_ASSINATURA => 'Plano está aguardando assinatura',
            self::AGUARDANDO_REGISTRO => 'Plano está aguardando registro',
            self::ATIVO => 'Plano está ativo',
            self::CONCLUIDO => 'Plano foi concluído',
            self::AVALIADO => 'Plano foi avaliado',
            self::SUSPENSO => 'Plano foi suspenso',
            self::CANCELADO => 'Plano foi cancelado',
        };
    }

    public static function asArray(): array
    {
        return array_map(
            fn(self $e) => [$e->value, $e->label(), $e->description()],
            self::cases()
        );
    }

    public static function statusEditaveisPlanoTrabalho(): array
    {
        return [self::AGUARDANDO_REGISTRO, self::INCLUIDO];
    }
}
