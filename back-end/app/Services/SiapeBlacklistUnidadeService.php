<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Services\Siape\Unidade\SiapeUnidadeLifecycleService;
use Exception;

class SiapeBlacklistUnidadeService extends ServiceBase
{
    public function remover(string $codigo): array
    {
        try {
            /** @var SiapeUnidadeLifecycleService $lifecycleService */
            $lifecycleService = app(SiapeUnidadeLifecycleService::class);
            $resultado = $lifecycleService->cancelarPendenciaPorCodigo($codigo);
            $count = $resultado['blacklists_removidas'];

            if ($count === 0) {
                return [
                    'success' => false,
                    'message' => 'Código de unidade não encontrado na blacklist',
                    'count' => 0
                ];
            }

            return [
                'success' => true,
                'message' => "Código de unidade removido da blacklist com sucesso. {$count} registro(s) removido(s).",
                'count' => $count
            ];
        } catch (Exception $e) {
            report($e);
            throw new Exception('Erro ao remover código de unidade da blacklist: ' . $e->getMessage());
        }
    }
}
