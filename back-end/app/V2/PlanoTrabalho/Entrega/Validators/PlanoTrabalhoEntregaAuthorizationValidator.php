<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\Validators;

use App\Exceptions\NotFoundException;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\Traits\ValidaAutorizacaoTrait;

class PlanoTrabalhoEntregaAuthorizationValidator
{
    use ValidaAutorizacaoTrait;

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validar(string $planoTrabalhoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $this->autorizarDonoOuChefia(
            $plano,
            $usuarioLogadoId,
            $plano->unidade_id,
            'Usuário não tem permissão para gerenciar entregas deste Plano de Trabalho.',
            ['criacao_usuario_id', 'usuario_id'],
        );

        return $plano;
    }
}
