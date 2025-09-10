<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $usuariosComMatriculaVazia = DB::table('usuarios')
            ->whereNull('matricula')
            ->orWhere('matricula', '')
            ->select('id', 'cpf', 'nome')
            ->get();

        $usuariosAtualizados = 0;
        $usuariosComErro = [];

        foreach ($usuariosComMatriculaVazia as $usuario) {
            $integracaoServidor = DB::table('integracao_servidores')
                ->where('cpf', $usuario->cpf)
                ->select('matriculasiape')
                ->first();

            if ($integracaoServidor && !empty($integracaoServidor->matriculasiape)) {
                DB::table('usuarios')
                    ->where('id', $usuario->id)
                    ->update(['matricula' => $integracaoServidor->matriculasiape]);
                
                $usuariosAtualizados++;
            } else {
                $usuariosComErro[] = [
                    'id' => $usuario->id,
                    'cpf' => $usuario->cpf,
                    'nome' => $usuario->nome
                ];
                
                Log::error('Usuário com matrícula vazia não encontrado na tabela integracao_servidores', [
                    'usuario_id' => $usuario->id,
                    'cpf' => $usuario->cpf,
                    'nome' => $usuario->nome
                ]);
            }
        }

        Log::info('Migration de atualização de matrículas concluída', [
            'total_usuarios_com_matricula_vazia' => $usuariosComMatriculaVazia->count(),
            'usuarios_atualizados' => $usuariosAtualizados,
            'usuarios_com_erro' => count($usuariosComErro)
        ]);

        if (!empty($usuariosComErro)) {
            Log::error('Usuários com matrícula vazia que não foram encontrados na tabela integracao_servidores', [
                'usuarios' => $usuariosComErro
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Log::warning('Migration de atualização de matrículas não pode ser revertida automaticamente');
    }
};