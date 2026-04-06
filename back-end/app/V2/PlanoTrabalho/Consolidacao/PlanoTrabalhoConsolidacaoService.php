<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Exceptions\NotFoundException;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use Illuminate\Database\Eloquent\Collection;
use App\Enums\StatusEnum;

class PlanoTrabalhoConsolidacaoService
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function index(string $planoTrabalhoId): Collection
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        return $this->consolidacaoRepository->findByPlanoTrabalhoId($planoTrabalhoId);
    }

    public function concluir(string $planoTrabalhoId, string $consolidacaoId, string $usuarioId): Collection
    {
        $consolidacao = $this->consolidacaoRepository->findConsolidacaoById($consolidacaoId);

        if ($consolidacao === null || $consolidacao->plano_trabalho_id !== $planoTrabalhoId) {
            throw new NotFoundException('Consolidação não encontrada para o Plano de Trabalho informado.');
        }

        if ($consolidacao->status === StatusEnum::CONCLUIDO->value) {
            return $consolidacao; // Já está concluída, retorna como está
        }

        // Lógica para concluir a consolidação (exemplo: atualizar status e data de conclusão)
        $consolidacao->status = StatusEnum::CONCLUIDO->value;
        $consolidacao->data_conclusao = now();
        $consolidacao->usuario_conclusao_id = $usuarioId;
        $this->consolidacaoRepository->update($consolidacao->id, [
            'status' => $consolidacao->status,
            'data_conclusao' => $consolidacao->data_conclusao,
            'usuario_conclusao_id' => $consolidacao->usuario_conclusao_id,
        ]);

        return $this->consolidacaoRepository->findConsolidacaoById($consolidacaoId); // Retorna a consolidação atualizada
    }
}
