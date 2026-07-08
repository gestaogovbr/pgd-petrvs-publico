<?php

declare(strict_types=1);

namespace App\V2;

use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;

class StatusTemplates
{
    public static function concluirPTPorAvaliacoes(PlanoTrabalho $planoTrabalho)
    {
        self::statusService()->atualizaStatus(
            $planoTrabalho,
            StatusEnum::CONCLUIDO->value,
            'Plano de Trabalho concluído: todos os períodos avaliativos foram avaliados.',
        );
    }

    public static function reabrirPTPorAvaliacoes(PlanoTrabalho $planoTrabalho)
    {
        self::statusService()->atualizaStatus(
            $planoTrabalho,
            StatusEnum::ATIVO->value,
            'Plano de Trabalho reaberto: um período avaliativo deixou de estar avaliado.',
        );
    }

    public static function concluirPTPorDispensa(PlanoTrabalho $planoTrabalho, string $afastamentoId)
    {
        self::statusService()->atualizaStatus(
            $planoTrabalho,
            StatusEnum::CONCLUIDO->value,
            "Plano de Trabalho concluído: a ocorrência {$afastamentoId} dispensou os períodos avaliativos."
        );
    }

    public static function reabrirPTConcluidoPorDispensa(PlanoTrabalho $planoTrabalho, string $afastamentoId)
    {
        self::statusService()->atualizaStatus(
            $planoTrabalho,
            StatusEnum::ATIVO->value,
                "Plano de Trabalho reativado: os períodos dispensados pela ocorrência {$afastamentoId} deixaram de sê-lo, devido à sua edição ou remoção do sistema."
        );
    }

    private static function statusService(): StatusService
    {
        return app(StatusService::class);
    }
}
