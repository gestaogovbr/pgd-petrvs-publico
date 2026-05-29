<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

/**
 * Unifica atividades duplicadas no mesmo período avaliativo (e mesma entrega),
 * concatenando as descrições em um único registro.
 */
return new class extends Migration
{
    private const BACKUP_TABLE = 'atividades_unificacao_merge_backup';

    /** @var list<string> */
    private const TABELAS_COM_ATIVIDADE_ID = [
        'atividades_pausas',
        'atividades_tarefas',
        'comentarios',
        'documentos',
        'planos_trabalhos_consolidacoes_atividades',
        'projetos_tarefas',
        'reacoes',
        'status_justificativas',
    ];

    public function up(): void
    {
        if (!Schema::hasTable('atividades')) {
            return;
        }

        $this->criarBackup();

        DB::beginTransaction();

        try {
            $grupos = $this->buscarGruposDuplicados();
            $mantidas = 0;
            $removidas = 0;

            foreach ($grupos as $grupo) {
                $atividades = $this->buscarAtividadesDoGrupo($grupo);
                if ($atividades->count() < 2) {
                    continue;
                }

                $keeper = $atividades->sortBy('created_at')->first();
                $duplicatas = $atividades->where('id', '!=', $keeper->id);

                $descricaoUnificada = $this->unificarDescricoes($atividades->pluck('descricao'));

                DB::table('atividades')
                    ->where('id', $keeper->id)
                    ->update([
                        'descricao' => $descricaoUnificada,
                        'updated_at' => now(),
                    ]);

                $this->registrarBackupKeeper($keeper->id, $keeper->descricao);

                foreach ($duplicatas as $duplicata) {
                    $this->redirecionarReferencias($duplicata->id, $keeper->id);
                    $this->registrarBackupDuplicata($duplicata, $keeper->id);

                    DB::table('atividades')
                        ->where('id', $duplicata->id)
                        ->update([
                            'deleted_at' => now(),
                            'updated_at' => now(),
                        ]);

                    $removidas++;
                }

                $mantidas++;
            }

            DB::commit();

            Log::info('Migration unificar_atividades_consolidacao concluída.', [
                'grupos_unificados' => $mantidas,
                'atividades_removidas' => $removidas,
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Erro na migration unificar_atividades_consolidacao.', [
                'mensagem' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }

    public function down(): void
    {
        if (!Schema::hasTable(self::BACKUP_TABLE)) {
            return;
        }

        DB::transaction(function () {
            foreach (DB::table(self::BACKUP_TABLE)->whereNull('merged_into_id')->get() as $keeper) {
                DB::table('atividades')
                    ->where('id', $keeper->atividade_id)
                    ->update([
                        'descricao' => $keeper->descricao,
                        'updated_at' => now(),
                    ]);
            }

            foreach (DB::table(self::BACKUP_TABLE)->whereNotNull('merged_into_id')->get() as $duplicata) {
                DB::table('atividades')
                    ->where('id', $duplicata->atividade_id)
                    ->update([
                        'descricao' => $duplicata->descricao,
                        'deleted_at' => null,
                        'updated_at' => now(),
                    ]);
            }

            Schema::dropIfExists(self::BACKUP_TABLE);
        });
    }

    private function criarBackup(): void
    {
        if (Schema::hasTable(self::BACKUP_TABLE)) {
            return;
        }

        Schema::create(self::BACKUP_TABLE, function (Blueprint $table) {
            $table->uuid('atividade_id')->primary();
            $table->uuid('plano_trabalho_consolidacao_id');
            $table->uuid('plano_trabalho_entrega_id')->nullable();
            $table->text('descricao')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->uuid('merged_into_id')->nullable()->comment('Preenchido quando o registro foi unificado em outro');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * @return Collection<int, object{plano_trabalho_consolidacao_id: string, plano_trabalho_entrega_id: ?string, total: int}>
     */
    private function buscarGruposDuplicados(): Collection
    {
        return DB::table('atividades')
            ->select([
                'plano_trabalho_consolidacao_id',
                'plano_trabalho_entrega_id',
                DB::raw('COUNT(*) AS total'),
            ])
            ->whereNull('deleted_at')
            ->whereNotNull('plano_trabalho_consolidacao_id')
            ->groupBy('plano_trabalho_consolidacao_id', 'plano_trabalho_entrega_id')
            ->having('total', '>', 1)
            ->orderBy('plano_trabalho_consolidacao_id')
            ->get();
    }

    /**
     * @param object{plano_trabalho_consolidacao_id: string, plano_trabalho_entrega_id: ?string} $grupo
     * @return Collection<int, object>
     */
    private function buscarAtividadesDoGrupo(object $grupo): Collection
    {
        $query = DB::table('atividades')
            ->select(['id', 'descricao', 'created_at'])
            ->whereNull('deleted_at')
            ->where('plano_trabalho_consolidacao_id', $grupo->plano_trabalho_consolidacao_id);

        if ($grupo->plano_trabalho_entrega_id === null) {
            $query->whereNull('plano_trabalho_entrega_id');
        } else {
            $query->where('plano_trabalho_entrega_id', $grupo->plano_trabalho_entrega_id);
        }

        return $query->orderBy('created_at')->get();
    }

    /**
     * @param Collection<int, mixed> $descricoes
     */
    private function unificarDescricoes(Collection $descricoes): string
    {
        return $descricoes
            ->map(static fn ($descricao) => trim((string) $descricao))
            ->filter(static fn (string $descricao) => $descricao !== '')
            ->unique()
            ->implode("\n\n");
    }

    private function redirecionarReferencias(string $deId, string $paraId): void
    {
        foreach (self::TABELAS_COM_ATIVIDADE_ID as $tabela) {
            if (!Schema::hasTable($tabela) || !Schema::hasColumn($tabela, 'atividade_id')) {
                continue;
            }

            DB::table($tabela)
                ->where('atividade_id', $deId)
                ->update(['atividade_id' => $paraId]);
        }
    }

    private function registrarBackupKeeper(string $atividadeId, ?string $descricaoOriginal): void
    {
        $atividade = DB::table('atividades')->where('id', $atividadeId)->first();
        if ($atividade === null) {
            return;
        }

        DB::table(self::BACKUP_TABLE)->updateOrInsert(
            ['atividade_id' => $atividadeId],
            [
                'plano_trabalho_consolidacao_id' => $atividade->plano_trabalho_consolidacao_id,
                'plano_trabalho_entrega_id' => $atividade->plano_trabalho_entrega_id,
                'descricao' => $descricaoOriginal,
                'deleted_at' => null,
                'merged_into_id' => null,
                'created_at' => Carbon::now(),
            ],
        );
    }

    /**
     * @param object{id: string, descricao: ?string} $duplicata
     */
    private function registrarBackupDuplicata(object $duplicata, string $keeperId): void
    {
        $atividade = DB::table('atividades')->where('id', $duplicata->id)->first();
        if ($atividade === null) {
            return;
        }

        DB::table(self::BACKUP_TABLE)->updateOrInsert(
            ['atividade_id' => $duplicata->id],
            [
                'plano_trabalho_consolidacao_id' => $atividade->plano_trabalho_consolidacao_id,
                'plano_trabalho_entrega_id' => $atividade->plano_trabalho_entrega_id,
                'descricao' => $duplicata->descricao,
                'deleted_at' => null,
                'merged_into_id' => $keeperId,
                'created_at' => Carbon::now(),
            ],
        );
    }
};
