<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Traits\ResolveUnidades;

class PendenciasUsuario
{
    use ResolveUnidades;

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly PlanoEntregaRepository $planoEntregaRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

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
        $escopo = $this->resolverUnidades($dto);
        $subordinadasIds = array_slice($escopo, 1); // escopo sem a unidade raiz

        return [
            'assinaturas_pe_pendentes' => $this->planoEntregaRepository->countPlanosEntregaHomologacao($subordinadasIds),
            'assinaturas_pt_pendentes' => $this->planoTrabalhoRepository->countPlanosTrabalhoAssinatura($escopo, $dto->usuarioId),
            'registros_execucao_pe_atraso' => $this->planoEntregaRepository->countEntregasSemProgresso([$dto->unidadeId], PlanoEntrega::DATA_MUDANCA_REGRA_PE),
            'registros_execucao_pt_atraso' => $this->consolidacaoRepository->countConsolidacoesAtrasadas($dto->usuarioId, [$dto->unidadeId]),
            'avaliacoes_pt_pendentes' => $this->planoTrabalhoRepository->countAguardandoMinhaAvaliacao($escopo, $dto->usuarioId),
            'avaliacoes_pe_pendentes' => $this->planoEntregaRepository->countPlanosEntregaAvaliacao($subordinadasIds, PlanoEntrega::DATA_MUDANCA_REGRA_PE),
        ];
    }

    /**
     * Calcula pendências somando todas as unidades onde o usuário é diretamente chefia (titular ou substituto).
     *
     * @return array{
     *   assinaturas_pe_pendentes: int,
     *   assinaturas_pt_pendentes: int,
     *   registros_execucao_pe_atraso: int,
     *   registros_execucao_pt_atraso: int,
     *   avaliacoes_pt_pendentes: int,
     *   avaliacoes_pe_pendentes: int,
     * }
     */
    public function getDataGlobal(string $usuarioId): array
    {
        $unidadesGerenciadas = $this->unidadeRepository->getUnidadesGerenciadas($usuarioId);
        $unidadeIds = $unidadesGerenciadas->pluck('id')->toArray();

        if (empty($unidadeIds)) {
            return [
                'assinaturas_pe_pendentes' => 0,
                'assinaturas_pt_pendentes' => 0,
                'registros_execucao_pe_atraso' => 0,
                'registros_execucao_pt_atraso' => 0,
                'avaliacoes_pt_pendentes' => 0,
                'avaliacoes_pe_pendentes' => 0,
            ];
        }

        return [
            'assinaturas_pe_pendentes' => $this->planoEntregaRepository->countPlanosEntregaHomologacao($unidadeIds),
            'assinaturas_pt_pendentes' => $this->planoTrabalhoRepository->countPlanosTrabalhoAssinatura($unidadeIds, $usuarioId),
            'registros_execucao_pe_atraso' => $this->planoEntregaRepository->countEntregasSemProgresso($unidadeIds, PlanoEntrega::DATA_MUDANCA_REGRA_PE),
            'registros_execucao_pt_atraso' => $this->consolidacaoRepository->countConsolidacoesAtrasadas($usuarioId, $unidadeIds),
            'avaliacoes_pt_pendentes' => $this->planoTrabalhoRepository->countAguardandoMinhaAvaliacao($unidadeIds, $usuarioId),
            'avaliacoes_pe_pendentes' => $this->planoEntregaRepository->countPlanosEntregaAvaliacao($unidadeIds, PlanoEntrega::DATA_MUDANCA_REGRA_PE),
        ];
    }
}
