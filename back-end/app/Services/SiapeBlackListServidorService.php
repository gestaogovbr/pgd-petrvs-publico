<?php

namespace App\Services;

use App\Models\SiapeBlackListServidor;
use App\Models\Usuario;
use App\Services\ServiceBase;
use Exception;

class SiapeBlackListServidorService extends ServiceBase
{
    
    public function remover(string $cpf): array
    {
        try {
            $registros = SiapeBlackListServidor::where('cpf', $cpf)->get();
            
            if ($registros->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'CPF não encontrado na blacklist',
                    'count' => 0
                ];
            }
            
            $count = $registros->count();
            
            foreach ($registros as $registro) {
                $registro->forceDelete();
            }

            $usuario = Usuario::where('cpf', $cpf)->first();
            if ($usuario) {
                $usuario->update(['situacao_siape' => 'ATIVO', 'data_ativacao_temporaria' => null]);
            }
            
            return [
                'success' => true,
                'message' => "CPF removido da blacklist com sucesso. {$count} registro(s) removido(s).",
                'count' => $count
            ];
        } catch (Exception $e) {
            report($e);
            throw new Exception('Erro ao remover CPF da blacklist: ' . $e->getMessage());
        }
    }
}