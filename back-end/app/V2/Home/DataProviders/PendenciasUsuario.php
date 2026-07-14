<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;
use Carbon\Carbon;

class PendenciasUsuario
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly PlanoEntregaRepository $planoEntregaRepository,
    ) {}

    /**
     * @return array{
     *   assinaturas_pe_pendentes: int,
     *   assinaturas_pt_pendentes: int,
     *   registros_execucao_pe_atraso: int,
     *   registros_execucao_pt_atraso: int,
     *   avaliacoes_pt_pendentes: int,
     *   avaliacoes_pe_pendentes: int,
     * }
     */
    public function getData(HomeRequestDTO $dto): array
    {
        $unidadeId = $dto->unidadeId;
        $unidadesSubordinadasIds = $dto->subordinadas
            ? $this->unidadeRepository->getSubordinadasRecursivas([$unidadeId])->pluck('id')->toArray()
            : [];

        return [
            'assinaturas_pe_pendentes' => $this->planoEntregaRepository->countPlanosEntregaHomologacao($unidadesSubordinadasIds),
            'assinaturas_pt_pendentes' => $this->planoTrabalhoRepository->countPlanosTrabalhoAssinatura([$unidadeId], $unidadesSubordinadasIds, $dto->usuarioId),
            'registros_execucao_pe_atraso' => $this->planoEntregaRepository->countEntregasSemProgresso($unidadesSubordinadasIds, PlanoEntrega::DATA_MUDANCA_REGRA_PE),
            'registros_execucao_pt_atraso' => $this->consolidacaoRepository->countConsolidacoesAtrasadas($dto->usuarioId, [$unidadeId]),
            'avaliacoes_pt_pendentes' => $this->countAvaliacoesPT([$unidadeId], $unidadesSubordinadasIds, $dto->usuarioId),
            'avaliacoes_pe_pendentes' => $this->planoEntregaRepository->countPlanosEntregaAvaliacao($unidadesSubordinadasIds, PlanoEntrega::DATA_MUDANCA_REGRA_PE),
        ];
    }

    private function countAvaliacoesPT(array $unidadesGerenciadasIds, array $unidadesSubordinadasIds, string $usuarioId): int
    {
        $diasAvaliacao = (int) config('petrvs.dias-avaliacao-registro-execucao', 21);
        $dataCorte = Carbon::now()->subDays($diasAvaliacao);

        return $this->consolidacaoRepository->countPendentesAvaliacao(
            $unidadesGerenciadasIds,
            $unidadesSubordinadasIds,
            $usuarioId,
            $dataCorte
        );
    }
}
