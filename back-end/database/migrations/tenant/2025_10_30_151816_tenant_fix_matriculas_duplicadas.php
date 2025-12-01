<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    public function up(): void
    {
        DB::beginTransaction();
        try {
            $cpfsDuplicados = DB::table('usuarios as u')
                ->whereNull('u.deleted_at')
                ->select('u.cpf')
                ->groupBy('u.cpf')
                ->havingRaw('COUNT(u.cpf) >= 2')
                ->pluck('cpf');

            Log::info('Iniciando coleta de CPFs duplicados (LOTADO).', [
                'total_cpfs_duplicados' => $cpfsDuplicados->count(),
            ]);

            foreach ($cpfsDuplicados as $cpf) {
                $rows = DB::table('usuarios as u')
                    ->join('unidades_integrantes as ui', 'u.id', '=', 'ui.usuario_id')
                    ->join('unidades_integrantes_atribuicoes as uia', 'ui.id', '=', 'uia.unidade_integrante_id')
                    ->where('u.cpf', $cpf)
                    ->where('uia.atribuicao', 'LOTADO')
                    ->whereNull('uia.deleted_at')
                    ->select('u.id as usuario_id', 'u.nome', 'u.cpf', 'u.created_at as created_at', 'ui.unidade_id', 'uia.atribuicao')
                    ->distinct()
                    ->get();

                $count = $rows->count();

                if ($count === 0) {
                    Log::info('CPF duplicado sem registro LOTADO. Ignorando.', [
                        'cpf' => $cpf,
                    ]);
                    continue;
                }

                if ($count === 1) {
                    $this->processCpfComLotadoUnico($cpf, $rows);
                    continue;
                }

                $this->processCpfComMultiplosLotado($cpf, $rows);
            }

            DB::commit();
            Log::alert('Migration tenant_fix_matriculas_duplicadas concluída com sucesso.');
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Erro na migration tenant_fix_matriculas_duplicadas. Executado rollback.', [
                'mensagem' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e; // Propaga o erro para falhar a migration
        }
    }

    public function down(): void
    {
    }

    private function updateReferenciasUsuarioId(string $fromUsuarioId, string $toUsuarioId): array
    {
        $mergeUi = $this->mergeUnidadesIntegrantes($fromUsuarioId, $toUsuarioId);

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

        $updates = ['unidades_integrantes' => $mergeUi];
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
                $updates[$fk['table'].'.'.$fk['column']] = $afetados;
            }
        }
        return $updates;
    }

    private function removeUsuarioDuplicado(string $usuarioId): void
    {
        DB::table('usuarios')->where('id', $usuarioId)->delete();
    }

    private function processCpfComLotadoUnico(string $cpf, $rows): void
    {
        $row = $rows->first();
        $lotadoUsuarioId = $row->usuario_id;

        Log::info('Usuario LOTADO único identificado para CPF duplicado.', [
            'cpf' => $cpf,
            'usuario_id' => $lotadoUsuarioId,
            'unidade_id' => $row->unidade_id,
        ]);

        $semLotacao = $this->getUsuarioSemLotacao($cpf, $lotadoUsuarioId);
        if (!$semLotacao) {
            Log::info('Nenhum usuario SEM lotação encontrado para CPF duplicado. Ignorando.', [
                'cpf' => $cpf,
                'lotado_usuario_id' => $lotadoUsuarioId,
            ]);
            return;
        }

        $semLotacaoId = $semLotacao->id;

        Log::info('Usuario SEM lotação encontrado. Transferindo referências usuario_id.', [
            'cpf' => $cpf,
            'de_usuario_id' => $semLotacaoId,
            'para_usuario_id' => $lotadoUsuarioId,
        ]);

        $updates = $this->updateReferenciasUsuarioId($semLotacaoId, $lotadoUsuarioId);
        Log::info('Referencias atualizadas para usuario_id.', [
            'cpf' => $cpf,
            'de_usuario_id' => $semLotacaoId,
            'para_usuario_id' => $lotadoUsuarioId,
            'tabelas_afetadas' => $updates,
        ]);

        $this->removeUsuarioDuplicado($semLotacaoId);
        Log::alert('Usuario duplicado SEM lotação removido.', [
            'cpf' => $cpf,
            'usuario_removido_id' => $semLotacaoId,
        ]);
    }

    private function processCpfComMultiplosLotado(string $cpf, $rows): void
    {
        $gruposPorUnidade = $this->groupByUnidade($rows);

        $todasUnidadesDistintas = true;
        foreach ($gruposPorUnidade as $grupo) {
            if (count($grupo) > 1) {
                $todasUnidadesDistintas = false;
                break;
            }
        }

        if ($todasUnidadesDistintas) {
            Log::info('CPF duplicado com LOTADO em unidades distintas. Nenhuma ação necessária.', [
                'cpf' => $cpf,
                'detalhes' => array_map(function($grupo){
                    return [
                        'usuario_id' => $grupo[0]->usuario_id,
                        'unidade_id' => $grupo[0]->unidade_id,
                    ];
                }, $gruposPorUnidade),
            ]);
            return;
        }

        foreach ($gruposPorUnidade as $unidadeId => $grupo) {
            if (count($grupo) <= 1) {
                continue;
            }

            usort($grupo, function($a, $b){
                return $this->compareByCreatedAtThenId($a, $b);
            });

            $usuarioMaisAntigo = $grupo[0];
            $usuariosMaisNovos = array_slice($grupo, 1);

            Log::info('Unificação de usuários na mesma unidade.', [
                'cpf' => $cpf,
                'unidade_id' => $unidadeId,
                'usuario_antigo_id' => $usuarioMaisAntigo->usuario_id,
                'usuarios_novos_ids' => array_map(fn($x) => $x->usuario_id, $usuariosMaisNovos),
            ]);

            foreach ($usuariosMaisNovos as $usrNovo) {
                $updates = $this->updateReferenciasUsuarioId($usrNovo->usuario_id, $usuarioMaisAntigo->usuario_id);
                Log::info('Referencias atualizadas para usuario_id em unificação.', [
                    'cpf' => $cpf,
                    'de_usuario_id' => $usrNovo->usuario_id,
                    'para_usuario_id' => $usuarioMaisAntigo->usuario_id,
                    'tabelas_afetadas' => $updates,
                ]);

                $this->removeUsuarioDuplicado($usrNovo->usuario_id);
                Log::alert('Usuario duplicado removido na unificação (mesma unidade).', [
                    'cpf' => $cpf,
                    'usuario_removido_id' => $usrNovo->usuario_id,
                    'unidade_id' => $unidadeId,
                ]);
            }
        }
    }

    private function getUsuarioSemLotacao(string $cpf, string $excludeUsuarioId)
    {
        return DB::table('usuarios as u2')
            ->where('u2.cpf', $cpf)
            ->where('u2.id', '!=', $excludeUsuarioId)
            ->whereNotExists(function ($q) {
                $q->select(DB::raw(1))
                    ->from('unidades_integrantes as ui2')
                    ->join('unidades_integrantes_atribuicoes as uia2', 'ui2.id', '=', 'uia2.unidade_integrante_id')
                    ->whereColumn('ui2.usuario_id', 'u2.id')
                    ->where('uia2.atribuicao', 'LOTADO')
                    ->whereNull('uia2.deleted_at');
            })
            ->select('u2.id', 'u2.nome')
            ->first();
    }

    private function mergeUnidadesIntegrantes(string $fromUsuarioId, string $toUsuarioId): array
    {
        $result = [
            'atribuicoes_updated' => 0,
            'integrantes_deleted' => 0,
            'integrantes_updated' => 0,
        ];

        $fromRows = DB::table('unidades_integrantes')
            ->whereNull('deleted_at')
            ->where('usuario_id', $fromUsuarioId)
            ->get();

        foreach ($fromRows as $row) {
            $target = DB::table('unidades_integrantes')
                ->whereNull('deleted_at')
                ->where('usuario_id', $toUsuarioId)
                ->where('unidade_id', $row->unidade_id)
                ->first();

            if ($target) {
                $upd = DB::table('unidades_integrantes_atribuicoes')
                    ->where('unidade_integrante_id', $row->id)
                    ->update(['unidade_integrante_id' => $target->id]);
                $result['atribuicoes_updated'] += $upd;

                DB::table('unidades_integrantes')->where('id', $row->id)->delete();
                $result['integrantes_deleted'] += 1;
            } else {
                DB::table('unidades_integrantes')
                    ->where('id', $row->id)
                    ->update(['usuario_id' => $toUsuarioId]);
                $result['integrantes_updated'] += 1;
            }
        }

        return $result;
    }

    private function groupByUnidade($rows): array
    {
        $grupos = [];
        foreach ($rows as $r) {
            $grupos[$r->unidade_id] = $grupos[$r->unidade_id] ?? [];
            $grupos[$r->unidade_id][] = $r;
        }
        return $grupos;
    }

    private function compareByCreatedAtThenId($a, $b): int
    {
        $ta = isset($a->created_at) ? strtotime((string)$a->created_at) : null;
        $tb = isset($b->created_at) ? strtotime((string)$b->created_at) : null;
        if ($ta === $tb) {
            return $a->usuario_id <=> $b->usuario_id;
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
