<?php

namespace App\Enums;

/**
 * Periodicidades de consolidação (períodos avaliativos) de um regramento.
 *
 * BIMESTRAL, TRIMESTRAL e SEMESTRAL foram descontinuadas: não podem ser
 * selecionadas em novos regramentos nem definidas como novo valor na edição,
 * mas permanecem válidas nos regramentos que já as utilizam (RN02, RN03).
 */
enum PeriodicidadeConsolidacao: string
{
    case DIAS = 'DIAS';
    case SEMANAL = 'SEMANAL';
    case QUINZENAL = 'QUINZENAL';
    case MENSAL = 'MENSAL';
    case BIMESTRAL = 'BIMESTRAL';
    case TRIMESTRAL = 'TRIMESTRAL';
    case SEMESTRAL = 'SEMESTRAL';

    /**
     * Periodicidades descontinuadas (somente-leitura para regramentos existentes).
     *
     * @return self[]
     */
    public static function descontinuadas(): array
    {
        return [self::BIMESTRAL, self::TRIMESTRAL, self::SEMESTRAL];
    }

    /**
     * Indica se a periodicidade foi descontinuada.
     */
    public function isDescontinuada(): bool
    {
        return in_array($this, self::descontinuadas(), true);
    }
}
