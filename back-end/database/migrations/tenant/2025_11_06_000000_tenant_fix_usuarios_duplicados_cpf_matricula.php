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
            $duplicados = DB::table('usuarios as u')
                ->whereNull('u.deleted_at')
                ->whereNotNull('u.matricula')
                ->whereRaw("u.matricula <> ''")
                ->select('u.cpf', 'u.matricula', DB::raw('COUNT(*) as total'))
                ->groupBy('u.cpf', 'u.matricula')
                ->havingRaw('COUNT(*) >= 2')
                ->get();

            Log::info('Iniciando correção de usuários duplicados por cpf+matricula.', [
                'total_grupos_duplicados' => $duplicados->count(),
            ]);

            foreach ($duplicados as $dup) {
                $cpf = $dup->cpf;
                $matricula = $dup->matricula;

                $usuarios = DB::table('usuarios')
                    ->whereNull('deleted_at')
                    ->where('cpf', $cpf)
                    ->where('matricula', $matricula)
                    ->select('id', 'nome', 'created_at')
                    ->get()
                    ->all();

                usort($usuarios, function ($a, $b) {
                    return $this->compareByCreatedAtThenId($a, $b);
                });

                $maisAntigo = $usuarios[0];
                $maisNovos = array_slice($usuarios, 1);

                Log::info('Grupo duplicado identificado.', [
                    'cpf' => $cpf,
                    'matricula' => $matricula,
                    'usuario_antigo_id' => $maisAntigo->id,
                    'usuarios_novos_ids' => array_map(fn($u) => $u->id, $maisNovos),
                ]);

                foreach ($maisNovos as $novo) {
                    $updates = $this->updateReferenciasUsuarioIdSemUnidadesIntegrantes($novo->id, $maisAntigo->id);
                    Log::info('Referências atualizadas para usuario_id (sem unidades_integrantes).', [
                        'cpf' => $cpf,
                        'matricula' => $matricula,
                        'de_usuario_id' => $novo->id,
                        'para_usuario_id' => $maisAntigo->id,
                        'tabelas_afetadas' => $updates,
                    ]);

                    $this->removeUsuarioDuplicadoComUnidades($novo->id);
                    Log::alert('Usuário duplicado removido (incluindo unidades_integrantes + atribuicoes).', [
                        'cpf' => $cpf,
                        'matricula' => $matricula,
                        'usuario_removido_id' => $novo->id,
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
                Log::alert('Sincronizando integração após correção de duplicados.', [
                    'entidade_id' => $entidade->id,
                    'inputs' => $inputs,
                ]);
                $integracaoService->sincronizar($inputs);
            }

            DB::commit();
            Log::alert('Migration tenant_fix_usuarios_duplicados_cpf_matricula concluída com sucesso.');
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Erro na migration tenant_fix_usuarios_duplicados_cpf_matricula. Executado rollback.', [
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

    private function compareByCreatedAtThenId($a, $b): int
    {
        $ta = isset($a->created_at) ? strtotime((string)$a->created_at) : null;
        $tb = isset($b->created_at) ? strtotime((string)$b->created_at) : null;
        if ($ta === $tb) {
            return $a->id <=> $b->id;
        }
        if ($ta === null) {
            return 1;
        }
        if ($tb === null) {
            return -1;
        }
        return $ta <=> $tb;
    }
};