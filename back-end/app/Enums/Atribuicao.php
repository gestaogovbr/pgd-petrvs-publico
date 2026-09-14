<?php

namespace App\Enums;

enum Atribuicao: string
{
    case COLABORADOR = 'COLABORADOR';
    case GESTOR = 'GESTOR';
    case LOTADO = 'LOTADO';
    case GESTOR_SUBSTITUTO = 'GESTOR_SUBSTITUTO';
    case DELEGADO = 'GESTOR_DELEGADO';

    /** @return string[] */
    public static function chefia(): array
    {
        return [
            self::GESTOR->value,
            self::GESTOR_SUBSTITUTO->value,
            self::DELEGADO->value,
        ];
    }

    /**
     * Chefia formal da unidade, sem incluir o gestor delegado.
     *
     * @return string[]
     */
    public static function chefiaTitularOuSubstituta(): array
    {
        return [
            self::GESTOR->value,
            self::GESTOR_SUBSTITUTO->value,
        ];
    }

    /** @return string[] */
    public static function participante(): array
    {
        return [
            self::LOTADO->value,
            self::COLABORADOR->value,
        ];
    }
}
