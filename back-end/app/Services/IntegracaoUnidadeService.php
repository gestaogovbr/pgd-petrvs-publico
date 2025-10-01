<?php

namespace App\Services;

use App\Models\SiapeBlacklistUnidade;
use App\Models\Unidade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class IntegracaoUnidadeService extends ServiceBase
{
    public function __construct()
    {
        //
    }

    
    public function processaUnidadesRemovidasNoSiape()
    {
        try {
            $idsUnidadesRemovidas = $this->listIdsUnidadesRemovidasNaoInativadas();
            
            if (count($idsUnidadesRemovidas) === 0) {
                Log::info('Nenhuma unidade encontrada para inativação');
                return;
            }
            
            Unidade::whereIn('id', $idsUnidadesRemovidas)
                ->update([
                    'data_inicio_inativacao' => Carbon::now()
                ]);
            
            SiapeBlacklistUnidade::join('unidades', 'unidades.codigo', '=', 'siape_blacklist_unidades.codigo')
                ->whereIn('unidades.id', $idsUnidadesRemovidas)
                ->where('siape_blacklist_unidades.inativado', 0)
                ->update([
                    'siape_blacklist_unidades.inativado' => 1,
                    'siape_blacklist_unidades.updated_at' => Carbon::now()
                ]);
            
            Log::info('Unidades com processo de inativação iniciado com sucesso', [
                'quantidade' => count($idsUnidadesRemovidas),
                'ids' => $idsUnidadesRemovidas
            ]);
            
        } catch (\Exception $e) {
            Log::error('Erro ao processar unidades removidas no SIAPE: ' . $e->getMessage());
            throw $e;
        }
    }

    
    private function listIdsUnidadesRemovidasNaoInativadas()
    {
        return Unidade::join('siape_blacklist_unidades', 'unidades.codigo', '=', 'siape_blacklist_unidades.codigo')
            ->where('siape_blacklist_unidades.inativado', 0)
            ->where('siape_blacklist_unidades.created_at', '<=', Carbon::now()->subDays(30))
            ->whereNull('unidades.data_inicio_inativacao')
            ->pluck('unidades.id')
            ->toArray();
    }
}
