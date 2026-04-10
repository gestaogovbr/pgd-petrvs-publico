<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;

class PlanoTrabalhoEntregaStoreValidator
{
    private const STATUSES_PERMITIDOS = [
        StatusEnum::INCLUIDO,
        StatusEnum::AGUARDANDO_ASSINATURA,
    ];

    private const ORIGENS_VINCULADAS = ['PROPRIA_UNIDADE', 'OUTRA_UNIDADE'];

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoEntregaRepository $planoEntregaRepository,
        private readonly PlanoTrabalhoEntregaRepository $planoTrabalhoEntregaRepository,
    ) {}

    public function validar(PlanoTrabalhoEntregaStoreDTO $dto): void
    {
        $plano = $this->findPlanoOrFail($dto->planoTrabalhoId);
        $this->validarStatus($plano);

        if (!in_array($dto->origem, self::ORIGENS_VINCULADAS, true)) {
            return;
        }

        $entrega = $this->findEntregaOrFail($dto->planoEntregaEntregaId);
        $this->validarUnicidade($dto->planoTrabalhoId, $entrega->id);
        $this->validarIntersecaoPeriodo($plano, $entrega);
    }

    public function validarDestroy(string $planoTrabalhoId): void
    {
        $plano = $this->findPlanoOrFail($planoTrabalhoId);
        $this->validarStatus($plano);
    }

    private function findPlanoOrFail(string $planoTrabalhoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        return $plano;
    }

    private function findEntregaOrFail(string $planoEntregaEntregaId): PlanoEntregaEntrega
    {
        $entrega = $this->planoEntregaRepository->findEntregaById($planoEntregaEntregaId);

        if ($entrega === null) {
            throw new NotFoundException('A entrega do plano de entregas não foi encontrada.');
        }

        return $entrega;
    }

    private function validarStatus(PlanoTrabalho $plano): void
    {
        $statusPermitidos = array_map(fn (StatusEnum $s) => $s->value, self::STATUSES_PERMITIDOS);

        if (!in_array($plano->status, $statusPermitidos, true)) {
            throw new ValidateException(
                'Entregas só podem ser adicionadas quando o Plano de Trabalho é um rascunho ou está aguardando assinatura.'
            );
        }
    }

    private function validarUnicidade(string $planoTrabalhoId, string $planoEntregaEntregaId): void
    {
        if ($this->planoTrabalhoEntregaRepository->existeVinculo($planoTrabalhoId, $planoEntregaEntregaId)) {
            throw new ValidateException('Esta entrega já está vinculada a este Plano de Trabalho.');
        }
    }

    private function validarIntersecaoPeriodo(PlanoTrabalho $plano, PlanoEntregaEntrega $entrega): void
    {
        $semIntersecao = $entrega->data_inicio > $plano->data_fim
            || ($entrega->data_fim !== null && $entrega->data_fim < $plano->data_inicio);

        if ($semIntersecao) {
            throw new ValidateException('O período da entrega do plano de entregas não possui interseção com o período do plano de trabalho.');
        }
    }
}
