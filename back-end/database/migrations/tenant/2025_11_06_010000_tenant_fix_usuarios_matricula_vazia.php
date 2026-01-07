<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Entidade;
use App\Services\IntegracaoService;

return new class extends Migration
{
    public function up(): void
    {
        DB::beginTransaction();
        try {
            // Buscar usuários com matricula vazia
            $usuariosSemMatricula = DB::table('usuarios')
                ->whereNull('deleted_at')
                ->where(function($q){
                    $q->whereNull('matricula')
                      ->orWhere('matricula', '');
                })
                ->select('id', 'cpf', 'nome', 'created_at')
                ->get();

            Log::info('Iniciando correção de usuários com matrícula vazia.', [
                'total_sem_matricula' => $usuariosSemMatricula->count(),
            ]);

            foreach ($usuariosSemMatricula as $usrVazio) {
                $cpf = $usrVazio->cpf;

                // Verificar se existe outro usuário com mesmo CPF e matrícula preenchida
                $usrComMatricula = DB::table('usuarios')
                    ->whereNull('deleted_at')
                    ->where('cpf', $cpf)
                    ->whereNotNull('matricula')
                    ->whereRaw("matricula <> ''")
                    ->select('id', 'cpf', 'matricula', 'created_at')
                    ->orderBy('created_at')
                    ->orderBy('id')
                    ->first();

                if ($usrComMatricula) {
                    // Transferir referências do usuário sem matrícula -> usuário com matrícula
                    $updates = $this->updateReferenciasUsuarioIdSemUnidadesIntegrantes($usrVazio->id, $usrComMatricula->id);
                    Log::info('Referências atualizadas para usuario_id (sem unidades_integrantes) de usuário sem matrícula.', [
                        'cpf' => $cpf,
                        'de_usuario_id' => $usrVazio->id,
                        'para_usuario_id' => $usrComMatricula->id,
                        'tabelas_afetadas' => $updates,
                    ]);

                    // Remover usuário sem matrícula e seus vínculos
                    $this->removeUsuarioDuplicadoComUnidades($usrVazio->id);
                    Log::alert('Usuário sem matrícula removido (incluindo unidades_integrantes + atribuicoes).', [
                        'cpf' => $cpf,
                        'usuario_removido_id' => $usrVazio->id,
                        'usuario_destino_id' => $usrComMatricula->id,
                    ]);
                    continue;
                }

                // Se não existe outro usuário com CPF e matrícula, buscar na integracao_servidores a matrícula
                $matriculaSiape = DB::table('integracao_servidores')
                    ->where('cpf', $cpf)
                    ->value('matriculasiape');

                if (!empty($matriculaSiape)) {
                    DB::table('usuarios')
                        ->where('id', $usrVazio->id)
                        ->update(['matricula' => $matriculaSiape]);
                    Log::info('Matrícula preenchida via integracao_servidores.', [
                        'cpf' => $cpf,
                        'usuario_id' => $usrVazio->id,
                        'matricula' => $matriculaSiape,
                    ]);
                } else {
                    Log::warning('Usuário sem matrícula e sem correspondência em integracao_servidores. Nenhuma ação realizada.', [
                        'cpf' => $cpf,
                        'usuario_id' => $usrVazio->id,
                    ]);
                }
            }

            // Após correção, executar sincronização do serviço de integração para todas as entidades
            $integracaoService = new IntegracaoService(); // Tenant já está inicializado
            $inputsBase = [
                'unidades' => true,
                'servidores' => true,
                'gestores' => true,
            ];
            $entidades = Entidade::all();
            foreach ($entidades as $entidade) {
                $inputs = $inputsBase;
                $inputs['entidade'] = $entidade->id;
                Log::alert('Sincronizando integração após correção de usuários com matrícula vazia.', [
                    'entidade_id' => $entidade->id,
                    'inputs' => $inputs,
                ]);
                $integracaoService->sincronizar($inputs);
            }

            DB::commit();
            Log::alert('Migration tenant_fix_usuarios_matricula_vazia concluída com sucesso.');
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Erro na migration tenant_fix_usuarios_matricula_vazia. Executado rollback.', [
                'mensagem' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    public function down(): void
    {
        // Sem operação de rollback definida
    }

    private function updateReferenciasUsuarioIdSemUnidadesIntegrantes(string $fromUsuarioId, string $toUsuarioId): array
    {
        $tabelasUsuarioId = [
            'atividades',
            'documentos',
            'planos_trabalhos',
            'projetos_recursos',
            'projetos_tarefas',
            'documentos_assinaturas',
            'questionarios_preenchimentos',
            'comentarios',
            'anexos',
            'ocorrencias',
            'planos_entregas_entregas_progressos',
            'projetos',
            'integracoes',
            'afastamentos',
            'projetos_historicos',
            'reacoes',
            'status_justificativas',
            'programas_participantes',
            'curriculuns',
            'notificacoes_whatsapp',
            'notificacoes_destinatarios',
            'atividades_tarefas',
            'favoritos',
        ];

        $updates = [];
        foreach ($tabelasUsuarioId as $tabela) {
            $afetados = DB::table($tabela)
                ->where('usuario_id', $fromUsuarioId)
                ->update(['usuario_id' => $toUsuarioId]);
            if ($afetados > 0) {
                $updates[$tabela] = $afetados;
            }
        }

        $extraFkColumns = [
            ['table' => 'planos_trabalhos', 'column' => 'criacao_usuario_id'],
            ['table' => 'planos_entregas', 'column' => 'criacao_usuario_id'],
            ['table' => 'atividades', 'column' => 'demandante_id'],
            ['table' => 'entidades', 'column' => 'gestor_id'],
            ['table' => 'entidades', 'column' => 'gestor_substituto_id'],
            ['table' => 'avaliacoes', 'column' => 'avaliador_id'],
        ];
        foreach ($extraFkColumns as $fk) {
            $afetados = DB::table($fk['table'])
                ->where($fk['column'], $fromUsuarioId)
                ->update([$fk['column'] => $toUsuarioId]);
            if ($afetados > 0) {
                $updates[$fk['table'] . '.' . $fk['column']] = $afetados;
            }
        }

        return $updates;
    }

    private function removeUsuarioDuplicadoComUnidades(string $usuarioId): void
    {
        // Remover atribuicoes vinculadas às unidades_integrantes do usuário
        $uiIds = DB::table('unidades_integrantes')
            ->where('usuario_id', $usuarioId)
            ->pluck('id');

        if ($uiIds->count() > 0) {
            DB::table('unidades_integrantes_atribuicoes')
                ->whereIn('unidade_integrante_id', $uiIds)
                ->delete();
        }

        // Remover unidades_integrantes do usuário
        DB::table('unidades_integrantes')
            ->where('usuario_id', $usuarioId)
            ->delete();

        // Remover o usuário
        DB::table('usuarios')
            ->where('id', $usuarioId)
            ->delete();
    }
};