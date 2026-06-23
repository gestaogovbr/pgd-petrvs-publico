<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs;

interface IAtividadeWriteDTO
{
    public function planoTrabalhoId(): string;

    public function consolidacaoId(): string;

    public function usuarioId(): string;

    public function atividadeId(): ?string;

    public function planoTrabalhoEntregaId(): ?string;

    public function toArray(): array;
}
