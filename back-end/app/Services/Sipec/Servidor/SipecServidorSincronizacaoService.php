<?php

namespace App\Services\Sipec\Servidor;

use App\Repository\SipecServidorRepository;
use App\Repository\SipecSyncCheckpointRepository;
use App\Services\Sipec\SipecService;

class SipecServidorSincronizacaoService
{
    private SipecService $sipecService;
    private SipecServidorRepository $sipecServidorRepository;
    private SipecSyncCheckpointRepository $checkpointRepository;

    public function __construct(SipecService $sipecService)
    {
        $this->sipecService = $sipecService;
        $this->sipecServidorRepository = app(SipecServidorRepository::class);
        $this->checkpointRepository = app(SipecSyncCheckpointRepository::class);
    }

    /**
     * Consulta servidores por código UORG.
     */
    public function buscarServidores(?string $codUorg = null, bool $participaPgd = true): array
    {
        $codUorg = $codUorg ?? $this->sipecService->getCodUorg();
        $token = $this->sipecService->getToken();

        $params = ['codUorg' => $codUorg];
        $params = ['codSitFuncional' => '1'];
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
     */
    public function coletarServidoresPaginado(?string $tenantId, int $startPage): int
    {
        $page = $startPage;
        $size = 100;
        $total = 0;

        do {
            $params = http_build_query([
                'codUorg' => $this->sipecService->getCodUorg(),
                'codSitFuncional' => '1',
                'codOrgao' => $this->sipecService->getCodOrgao(),
                'page' => $page,
                'size' => $size,
            ]);
            $path = '/api-sipec/v1/servidores?' . $params;

            $data = $this->sipecService->executarGetComRetry($path);
            $itens = $data['content'] ?? [];
            $totalPages = $data['totalPages'] ?? 1;

            foreach ($itens as $item) {
                $primeiroVinculo = $item['vinculos'][0] ?? $item['vinculos']['0'] ?? [];
                $cpf = $item['cpf'] ?? null;
                $matricula = isset($primeiroVinculo['matriculaSiape']) ? (string) $primeiroVinculo['matriculaSiape'] : null;

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
}
