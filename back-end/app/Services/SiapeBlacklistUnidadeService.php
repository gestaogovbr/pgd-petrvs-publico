<?php

namespace App\Services;

use App\Models\SiapeBlacklistUnidade;
use App\Services\ServiceBase;
use Exception;

class SiapeBlacklistUnidadeService extends ServiceBase
{
    public function remover(string $codigo): array
    {
        try {
            $registros = SiapeBlacklistUnidade::where('codigo', $codigo)->get();

            if ($registros->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'Código de unidade não encontrado na blacklist',
                    'count' => 0
                ];
            }

            $count = $registros->count();

            foreach ($registros as $registro) {
                $registro->delete();
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