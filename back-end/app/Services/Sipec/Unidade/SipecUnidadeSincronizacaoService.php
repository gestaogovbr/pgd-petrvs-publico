<?php

namespace App\Services\Sipec\Unidade;

use Illuminate\Support\Facades\Log;
use App\Repository\Sipec\SipecUnidadeRepository;
use App\Repository\Sipec\SipecSyncCheckpointRepository;
use App\Services\Sipec\SipecService;

class SipecUnidadeSincronizacaoService
{
    private SipecService $sipecService;
    private SipecUnidadeRepository $sipecUnidadeRepository;
    private SipecSyncCheckpointRepository $checkpointRepository;

    public function __construct(SipecService $sipecService)
    {
        $this->sipecService = $sipecService;
        $this->sipecUnidadeRepository = app(SipecUnidadeRepository::class);
        $this->checkpointRepository = app(SipecSyncCheckpointRepository::class);
    }

    /**
     * Busca os dados de uma unidade pelo código UORG.
     * Endpoint: GET /unidades (UnidadeDetalhadaDTO — OpenAPI SIGEPE-Integra)
     */
    public function buscarUnidade(?string $codUorg = null): ?array
    {
        $codUorg = $codUorg ?? $this->sipecService->getCodUorg();
        $params = ['codUorg' => $codUorg];
        if ($this->sipecService->getCodOrgao() !== '') {
            $params['codOrgao'] = $this->sipecService->getCodOrgao();
        }
        $path = '/api-sipec/v1/unidades?' . http_build_query($params);

        try {
            $data  = $this->sipecService->executarGetComRetry($path, 2);
            $itens = $data['content'] ?? $data;

            if (!is_array($itens) || empty($itens)) {
                return null;
            }

            foreach ($itens as $item) {
                if ((string) ($item['codUorg'] ?? '') === $codUorg) {
                    return $item;
                }
            }

            return $itens[0] ?? null;
        } catch (\Exception $e) {
            Log::warning('SIPEC: unidade não encontrada', ['codUorg' => $codUorg, 'error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Coleta unidades paginadas e persiste na tabela sipec_unidades.
     * Quando $codUorg é informado, coleta a própria unidade + toda hierarquia descendente via BFS com codUorgPai.
     * Quando $codUorg é null, coleta todas as unidades do órgão.
     */
    public function coletarUnidadesPaginado(?string $tenantId, int $startPage, ?string $dataUltimaTransacao = null, ?string $codUorg = null): int
    {
        if ($codUorg) {
            return $this->coletarHierarquiaUnidades($tenantId, $codUorg, $dataUltimaTransacao);
        }

        return $this->coletarTodasUnidadesPaginado($tenantId, $startPage, $dataUltimaTransacao);
    }

    /**
     * Coleta todas as unidades do órgão paginadas (sem filtro de hierarquia).
     */
    private function coletarTodasUnidadesPaginado(?string $tenantId, int $startPage, ?string $dataUltimaTransacao): int
    {
        $page = $startPage;
        $total = 0;

        do {
            $queryParams = [
                'codOrgao' => $this->sipecService->getCodOrgao(),
                'page' => $page,
                'size' => SipecService::SIPEC_PAGE_SIZE,
            ];
            if ($dataUltimaTransacao) {
                $queryParams['dataUltimaTransacao'] = $dataUltimaTransacao;
            }
            $path = '/api-sipec/v1/unidades?' . http_build_query($queryParams);

            $data = $this->sipecService->executarGetComRetry($path, 2);
            $itens = $data['content'] ?? [];
            $totalPages = $data['totalPages'] ?? 1;

            foreach ($itens as $item) {
                $this->sipecUnidadeRepository->updateOrCreateByCodigo(
                    (string) ($item['codUorg'] ?? ''),
                    json_encode($item, JSON_UNESCAPED_UNICODE),
                    false,
                    $item['dataUltimaTransacao'] ?? null
                );
                $total++;
            }

            $this->checkpointRepository->updateByTenantId($tenantId, 'unidades', $page + 1, $totalPages);
            $page++;
        } while ($page < $totalPages);

        return $total;
    }

    /**
     * Coleta a unidade raiz + toda hierarquia descendente via BFS usando codUorgPai.
     */
    private function coletarHierarquiaUnidades(?string $tenantId, string $codUorg, ?string $dataUltimaTransacao): int
    {
        $total = 0;

        // Coleta a própria unidade raiz
        $total += $this->coletarUnidadesPorFiltro($tenantId, ['codUorg' => $codUorg], $dataUltimaTransacao);

        // BFS: buscar filhos de cada nível até esgotar
        $fila = [$codUorg];

        while (!empty($fila)) {
            $codUorgPai = array_shift($fila);
            $filhos = $this->coletarFilhosERetornarCodigos($tenantId, $codUorgPai, $dataUltimaTransacao);
            $total += count($filhos);

            foreach ($filhos as $codFilho) {
                $fila[] = $codFilho;
            }
        }

        return $total;
    }

    /**
     * Coleta unidades por filtro genérico (paginado) e persiste.
     */
    private function coletarUnidadesPorFiltro(?string $tenantId, array $filtro, ?string $dataUltimaTransacao): int
    {
        $page = 0;
        $total = 0;

        do {
            $queryParams = array_merge($filtro, [
                'codOrgao' => $this->sipecService->getCodOrgao(),
                'page' => $page,
                'size' => SipecService::SIPEC_PAGE_SIZE,
            ]);
            if ($dataUltimaTransacao) {
                $queryParams['dataUltimaTransacao'] = $dataUltimaTransacao;
            }
            $path = '/api-sipec/v1/unidades?' . http_build_query($queryParams);

            $data = $this->sipecService->executarGetComRetry($path, 2);
            $itens = $data['content'] ?? [];
            $totalPages = $data['totalPages'] ?? 1;

            foreach ($itens as $item) {
                $this->sipecUnidadeRepository->updateOrCreateByCodigo(
                    (string) ($item['codUorg'] ?? ''),
                    json_encode($item, JSON_UNESCAPED_UNICODE),
                    false,
                    $item['dataUltimaTransacao'] ?? null
                );
                $total++;
            }

            $page++;
        } while ($page < $totalPages);

        return $total;
    }

    /**
     * Busca filhos imediatos de uma UORG via codUorgPai, persiste e retorna os códigos dos filhos.
     *
     * @return string[] Códigos das unidades filhas encontradas
     */
    private function coletarFilhosERetornarCodigos(?string $tenantId, string $codUorgPai, ?string $dataUltimaTransacao): array
    {
        $page = 0;
        $codigos = [];

        do {
            $queryParams = [
                'codUorgPai' => $codUorgPai,
                'codOrgao' => $this->sipecService->getCodOrgao(),
                'page' => $page,
                'size' => SipecService::SIPEC_PAGE_SIZE,
            ];
            if ($dataUltimaTransacao) {
                $queryParams['dataUltimaTransacao'] = $dataUltimaTransacao;
            }
            $path = '/api-sipec/v1/unidades?' . http_build_query($queryParams);

            $data = $this->sipecService->executarGetComRetry($path, 2);
            $itens = $data['content'] ?? [];
            $totalPages = $data['totalPages'] ?? 1;

            foreach ($itens as $item) {
                $codigo = (string) ($item['codUorg'] ?? '');
                $this->sipecUnidadeRepository->updateOrCreateByCodigo(
                    $codigo,
                    json_encode($item, JSON_UNESCAPED_UNICODE),
                    false,
                    $item['dataUltimaTransacao'] ?? null
                );
                if ($codigo !== '') {
                    $codigos[] = $codigo;
                }
            }

            $page++;
        } while ($page < $totalPages);

        return $codigos;
    }
}
