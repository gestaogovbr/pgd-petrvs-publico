<?php

namespace App\Services\Sipec\Servidor;

use App\Repository\Sipec\SipecServidorRepository;
use App\Repository\Sipec\SipecSyncCheckpointRepository;
use App\Repository\Sipec\SipecUnidadeRepository;
use App\Services\Sipec\SipecService;

class SipecServidorSincronizacaoService
{
    private SipecService $sipecService;
    private SipecServidorRepository $sipecServidorRepository;
    private SipecSyncCheckpointRepository $checkpointRepository;
    private SipecUnidadeRepository $sipecUnidadeRepository;

    public function __construct(SipecService $sipecService)
    {
        $this->sipecService = $sipecService;
        $this->sipecServidorRepository = app(SipecServidorRepository::class);
        $this->checkpointRepository = app(SipecSyncCheckpointRepository::class);
        $this->sipecUnidadeRepository = app(SipecUnidadeRepository::class);
    }

    /**
     * Consulta servidores por código UORG.
     */
    public function buscarServidores(?string $codUorg = null, bool $participaPgd = true): array
    {
        $codUorg = $codUorg ?? $this->sipecService->getCodUorg();
        $token = $this->sipecService->getToken();

        $params = ['codUorg' => $codUorg];
        if ($this->sipecService->getCodOrgao() !== '') {
            $params['codOrgao'] = $this->sipecService->getCodOrgao();
        }
        $path = '/api-sipec/v1/servidores?' . http_build_query($params);

        return $this->sipecService->executarGetComRetry($path, 2);
    }

    /**
     * Busca um servidor específico por CPF.
     */
    public function buscarServidorPorCpf(string $cpf, ?string $codUorg = null): ?array
    {
        $codUorg = $codUorg ?? $this->sipecService->getCodUorg();

        $params = ['codUorg' => $codUorg, 'cpf' => $cpf];
        if ($this->sipecService->getCodOrgao() !== '') {
            // $params['codOrgao'] = $this->sipecService->getCodOrgao();
        }
        $path = '/api-sipec/v1/servidores?' . http_build_query($params);

        $data = $this->sipecService->executarGetComRetry($path, 2);

        $servidores = $data['content'] ?? $data;

        if (!is_array($servidores)) {
            return null;
        }

        foreach ($servidores as $servidor) {
            $cpfServidor = preg_replace('/[^0-9]/', '', $servidor['cpf'] ?? '');
            if ($cpfServidor === $cpf) {
                return $servidor;
            }
        }

        return null;
    }

    /**
     * Consulta todos os servidores de uma UORG (usado na sincronização de unidade).
     */
    public function buscarServidoresDaUnidade(string $codUorg, bool $participaPgd = true): array
    {
        return $this->buscarServidores($codUorg, $participaPgd);
    }

    /**
     * Coleta servidores paginados e persiste na tabela sipec_servidores.
     * Quando $codUorg é null, busca todos os servidores do órgão sem filtro de unidade,
     * registrando checkpoint por página global.
     */
    public function coletarServidoresPaginado(?string $tenantId, int $startPage, ?string $dataUltimaTransacao = null, ?string $codUorg = null): int
    {
        if ($codUorg !== null) {
            return $this->coletarServidoresDaUorgPaginado($tenantId, $codUorg, $startPage, $dataUltimaTransacao);
        }

        return $this->coletarTodosServidoresPaginado($tenantId, $startPage, $dataUltimaTransacao);
    }

    /**
     * Coleta todos os servidores do órgão sem filtro de UORG, com checkpoint por página.
     */
    private function coletarTodosServidoresPaginado(?string $tenantId, int $startPage, ?string $dataUltimaTransacao): int
    {
        $codOrgao = $this->sipecService->getCodOrgao();
        $baseParams = ['codOrgao' => $codOrgao, 'size' => SipecService::SIPEC_PAGE_SIZE];
        if ($dataUltimaTransacao) {
            $baseParams['dataUltimaTransacao'] = $dataUltimaTransacao;
        }

        return $this->executarLoopPaginado($tenantId, $baseParams, $startPage, $codOrgao);
    }

    /**
     * Coleta servidores paginados de uma UORG específica.
     */
    private function coletarServidoresDaUorgPaginado(?string $tenantId, string $codUorg, int $startPage, ?string $dataUltimaTransacao): int
    {
        $codOrgao = $this->sipecService->getCodOrgao();
        $baseParams = ['codUorg' => $codUorg, 'codOrgao' => $codOrgao, 'size' => SipecService::SIPEC_PAGE_SIZE];
        if ($dataUltimaTransacao) {
            $baseParams['dataUltimaTransacao'] = $dataUltimaTransacao;
        }

        return $this->executarLoopPaginado($tenantId, $baseParams, $startPage, $codOrgao);
    }

    private function executarLoopPaginado(?string $tenantId, array $baseParams, int $startPage, string $codOrgao): int
    {
        $page = $startPage;
        $total = 0;

        do {
            $path = '/api-sipec/v1/servidores?' . http_build_query(array_merge($baseParams, ['page' => $page]));
            $data = $this->sipecService->executarGetComRetry($path);
            $itens = $data['content'] ?? [];
            $totalPages = $data['totalPages'] ?? 1;

            foreach ($itens as $item) {
                $primeiroVinculo = $item['vinculos'][0] ?? $item['vinculos']['0'] ?? [];
                $cpf = $item['cpf'] ?? null;
                $matriculaSiape = isset($primeiroVinculo['matriculaSiape']) ? (string) $primeiroVinculo['matriculaSiape'] : null;
                $matricula = $matriculaSiape !== null ? $this->resolverMatricula($matriculaSiape, $codOrgao) : null;

                if ($cpf) {
                    $this->sipecServidorRepository->updateOrCreateByCpfAndMatricula(
                        $cpf,
                        $matricula,
                        json_encode($item, JSON_UNESCAPED_UNICODE),
                        false,
                        $primeiroVinculo['dataUltimaTransacao'] ?? null
                    );
                    $total++;
                }
            }

            $this->checkpointRepository->updateByTenantId($tenantId, 'servidores', $page + 1, $totalPages);
            $page++;
        } while ($page < $totalPages);

        return $total;
    }

    private function resolverMatricula(string $matriculaSiape, string $codOrgao): string
    {
        return str_starts_with($matriculaSiape, $codOrgao)
            ? substr($matriculaSiape, strlen($codOrgao))
            : $matriculaSiape;
    }
}
