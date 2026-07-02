<?php

namespace App\Services\Sipec;

use Illuminate\Support\Facades\Log;
use App\Repository\SipecUnidadeRepository;
use App\Repository\SipecSyncCheckpointRepository;

class SipecUnidadesSincronizacaoService
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
     * Coleta unidades paginadas do órgão e persiste na tabela sipec_unidades.
     */
    public function coletarUnidadesPaginado(?string $tenantId, int $startPage): int
    {
        $page = $startPage;
        $size = 100;
        $total = 0;

        do {
            $params = http_build_query([
                'codOrgao' => $this->sipecService->getCodOrgao(),
                'page' => $page,
                'size' => $size,
            ]);
            $path = '/api-sipec/v1/unidades?' . $params;

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
}
