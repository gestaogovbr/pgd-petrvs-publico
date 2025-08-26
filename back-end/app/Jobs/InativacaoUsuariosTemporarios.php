<?php

namespace App\Jobs;

use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class InativacaoUsuariosTemporarios implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'default';
        if (!$this->tenantId) {
            return;
        }
        $tenant = tenancy()->find($this->tenantId);
        tenancy()->initialize($tenant);
    }

    public function handle(): void
    {
        if (!$this->tenantId) {
            return;
        }

        // Data limite: 30 dias atrás
        $dataLimite = Carbon::now()->subDays(30);

        // Buscar usuários com situacao_siape = 'ATIVO_TEMPORARIO' 
        // que foram ativados temporariamente há mais de 30 dias
        $usuariosParaInativar = Usuario::where('situacao_siape', 'ATIVO_TEMPORARIO')
            ->where('data_ativacao_temporaria', '<=', $dataLimite)
            ->get();

        if ($usuariosParaInativar->isEmpty()) {
            Log::info("Nenhum usuário temporário encontrado para inativação após 30 dias");
            return;
        }

        $idsInativados = [];
        
        foreach ($usuariosParaInativar as $usuario) {
            // Inativar o usuário
            $usuario->situacao_siape = 'INATIVO';
            $usuario->save();
            
            $idsInativados[] = $usuario->id;
            
            Log::info("Usuário inativado após 30 dias de ativação temporária", [
                'usuario_id' => $usuario->id,
                'nome' => $usuario->nome,
                'cpf' => $usuario->cpf,
                'data_ativacao_temporaria' => $usuario->data_ativacao_temporaria,
                'justificativa_original' => $usuario->justicativa_ativacao_temporaria
            ]);
        }

        Log::info("Inativação de usuários temporários concluída", [
            'total_inativados' => count($idsInativados),
            'ids' => $idsInativados
        ]);
    }
}