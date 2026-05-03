<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->dropRelatorioPlanoTrabalhoViews();

        $this->addModalidadeColumns();
        $this->backfillUsuariosModalidade();
        $this->backfillPlanosTrabalhosModalidade();
        $this->backfillEntidadesModalidadePadrao();

        $this->dropOldForeignKeys();
        $this->dropOldColumns();

        Schema::dropIfExists('tipos_modalidades_siape');
        Schema::dropIfExists('tipos_modalidades');

        $this->createRelatorioPlanoTrabalhoViews();
    }

    public function down(): void
    {
        $this->dropRelatorioPlanoTrabalhoViews();

        if (!Schema::hasTable('tipos_modalidades')) {
            Schema::create('tipos_modalidades', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('nome', 255);
                $table->boolean('exige_assinatura')->default(false);
                $table->boolean('exige_assinatura_gestor_unidade')->default(false);
                $table->boolean('exige_assinatura_gestor_entidade')->default(false);
                $table->boolean('exige_pedagio')->default(false);
                $table->boolean('atividade_esforco')->default(false);
                $table->boolean('atividade_tempo_despendido')->default(false);
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('tipos_modalidades_siape')) {
            Schema::create('tipos_modalidades_siape', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->uuid('tipo_modalidade_id')->nullable();
                $table->string('nome', 255);
                $table->timestamps();
                $table->softDeletes();
                $table->index(['nome']);
            });
        }

        $this->addOldColumn('usuarios', 'tipo_modalidade_id');
        $this->addOldColumn('planos_trabalhos', 'tipo_modalidade_id');
        $this->addOldColumn('entidades', 'tipo_modalidade_id');

        $this->dropColumnIfExists('usuarios', 'modalidade_pgd');
        $this->dropColumnIfExists('planos_trabalhos', 'modalidade_pgd');
        $this->dropColumnIfExists('entidades', 'modalidade_pgd_padrao');
    }

    private function addModalidadeColumns(): void
    {
        if (Schema::hasTable('usuarios') && !Schema::hasColumn('usuarios', 'modalidade_pgd')) {
            $afterColumn = Schema::hasColumn('usuarios', 'tipo_modalidade_id') ? 'tipo_modalidade_id' : 'cod_jornada';
            Schema::table('usuarios', function (Blueprint $table) use ($afterColumn) {
                $column = $table->string('modalidade_pgd', 50)->nullable()->comment('Modalidade do Usuário no PGD');
                $column->after($afterColumn);
            });
        }

        if (Schema::hasTable('planos_trabalhos') && !Schema::hasColumn('planos_trabalhos', 'modalidade_pgd')) {
            $afterColumn = Schema::hasColumn('planos_trabalhos', 'tipo_modalidade_id') ? 'tipo_modalidade_id' : 'unidade_id';
            Schema::table('planos_trabalhos', function (Blueprint $table) use ($afterColumn) {
                $column = $table->string('modalidade_pgd', 50)->nullable();
                $column->after($afterColumn);
            });
        }

        if (Schema::hasTable('entidades') && !Schema::hasColumn('entidades', 'modalidade_pgd_padrao')) {
            $afterColumn = Schema::hasColumn('entidades', 'tipo_modalidade_id') ? 'tipo_modalidade_id' : 'forma_contagem_carga_horaria';
            Schema::table('entidades', function (Blueprint $table) use ($afterColumn) {
                $column = $table->string('modalidade_pgd_padrao', 50)->nullable();
                $column->after($afterColumn);
            });
        }
    }

    private function backfillUsuariosModalidade(): void
    {
        if (!Schema::hasColumn('usuarios', 'modalidade_pgd')) {
            return;
        }

        if (Schema::hasTable('integracao_servidores') && Schema::hasColumn('integracao_servidores', 'modalidade_pgd')) {
            $this->backfillUsuariosFromIntegracao('matricula', 'matriculasiape');
            $this->backfillUsuariosFromIntegracao('cpf', 'cpf');
        }

        if (Schema::hasColumn('usuarios', 'tipo_modalidade_id') && Schema::hasTable('tipos_modalidades')) {
            $this->backfillColumnFromTipoModalidade(
                'usuarios',
                'modalidade_pgd',
                'tipo_modalidade_id',
                'modalidade_pgd IS NULL'
            );
        }
    }

    private function backfillUsuariosFromIntegracao(string $usuarioColumn, string $integracaoColumn): void
    {
        $isrExpression = $this->normalizaSql('isr.modalidade_pgd');
        $tmExpression = $this->normalizaSql('tm.nome');

        $joinSiape = Schema::hasTable('tipos_modalidades_siape')
            ? 'LEFT JOIN tipos_modalidades_siape tms ON (tms.id = isr.modalidade_pgd OR tms.nome = isr.modalidade_pgd)'
            : '';
        $joinTipo = Schema::hasTable('tipos_modalidades_siape') && Schema::hasTable('tipos_modalidades')
            ? 'LEFT JOIN tipos_modalidades tm ON (tm.id = tms.tipo_modalidade_id)'
            : '';
        $source = match (true) {
            Schema::hasTable('tipos_modalidades_siape') && Schema::hasTable('tipos_modalidades') => "COALESCE(tms.nome, {$tmExpression}, {$isrExpression})",
            Schema::hasTable('tipos_modalidades_siape') => "COALESCE(tms.nome, {$isrExpression})",
            default => $isrExpression,
        };

        DB::statement(<<<SQL
            UPDATE usuarios u
            INNER JOIN integracao_servidores isr ON isr.{$integracaoColumn} = u.{$usuarioColumn}
            {$joinSiape}
            {$joinTipo}
            SET u.modalidade_pgd = {$source}
            WHERE u.modalidade_pgd IS NULL
              AND isr.modalidade_pgd IS NOT NULL
              AND TRIM(isr.modalidade_pgd) != ''
        SQL);
    }

    private function backfillPlanosTrabalhosModalidade(): void
    {
        if (!Schema::hasColumn('planos_trabalhos', 'modalidade_pgd')) {
            return;
        }

        if (Schema::hasColumn('planos_trabalhos', 'tipo_modalidade_id') && Schema::hasTable('tipos_modalidades')) {
            $this->backfillColumnFromTipoModalidade(
                'planos_trabalhos',
                'modalidade_pgd',
                'tipo_modalidade_id',
                'modalidade_pgd IS NULL'
            );
        }
    }

    private function backfillEntidadesModalidadePadrao(): void
    {
        if (!Schema::hasColumn('entidades', 'modalidade_pgd_padrao')) {
            return;
        }

        if (Schema::hasColumn('entidades', 'tipo_modalidade_id') && Schema::hasTable('tipos_modalidades')) {
            $this->backfillColumnFromTipoModalidade(
                'entidades',
                'modalidade_pgd_padrao',
                'tipo_modalidade_id',
                'modalidade_pgd_padrao IS NULL'
            );
        }
    }

    private function backfillColumnFromTipoModalidade(string $table, string $targetColumn, string $sourceColumn, string $where): void
    {
        $tmsValue = Schema::hasTable('tipos_modalidades_siape')
            ? "(SELECT tms.nome FROM tipos_modalidades_siape tms WHERE tms.tipo_modalidade_id = tm.id ORDER BY tms.nome LIMIT 1),"
            : '';
        $tmExpression = $this->normalizaSql('tm.nome');

        DB::statement(<<<SQL
            UPDATE {$table} dest
            INNER JOIN tipos_modalidades tm ON tm.id = dest.{$sourceColumn}
            SET dest.{$targetColumn} = COALESCE({$tmsValue} {$tmExpression})
            WHERE {$where}
        SQL);
    }

    private function dropOldForeignKeys(): void
    {
        $this->dropForeignIfExists('usuarios', 'usuarios_tipo_modalidade_id_foreign', ['tipo_modalidade_id']);
        $this->dropForeignIfExists('planos_trabalhos', 'planos_trabalhos_tipo_modalidade_id_foreign', ['tipo_modalidade_id']);
        $this->dropForeignIfExists('entidades', 'entidades_tipo_modalidade_id_foreign', ['tipo_modalidade_id']);
        $this->dropForeignIfExists('tipos_modalidades_siape', 'tipos_modalidades_siape_tipo_modalidade_id_foreign', ['tipo_modalidade_id']);
    }

    private function dropOldColumns(): void
    {
        $this->dropColumnIfExists('usuarios', 'tipo_modalidade_id');
        $this->dropColumnIfExists('planos_trabalhos', 'tipo_modalidade_id');
        $this->dropColumnIfExists('entidades', 'tipo_modalidade_id');
    }

    /** @param array<int, string> $columns */
    private function dropForeignIfExists(string $tableName, string $constraintName, array $columns): void
    {
        if (!Schema::hasTable($tableName)) {
            return;
        }

        try {
            Schema::table($tableName, fn (Blueprint $table) => $table->dropForeign($constraintName));
        } catch (Throwable) {
            try {
                Schema::table($tableName, fn (Blueprint $table) => $table->dropForeign($columns));
            } catch (Throwable) {
            }
        }
    }

    private function dropColumnIfExists(string $tableName, string $column): void
    {
        if (!Schema::hasTable($tableName) || !Schema::hasColumn($tableName, $column)) {
            return;
        }

        Schema::table($tableName, fn (Blueprint $table) => $table->dropColumn($column));
    }

    private function addOldColumn(string $tableName, string $column): void
    {
        if (!Schema::hasTable($tableName) || Schema::hasColumn($tableName, $column)) {
            return;
        }

        Schema::table($tableName, fn (Blueprint $table) => $table->uuid($column)->nullable());
    }

    private function normalizaSql(string $column): string
    {
        return "CASE " .
            "WHEN {$column} IS NULL OR TRIM({$column}) = '' THEN NULL " .
            "WHEN LOWER({$column}) LIKE '%presencial%' THEN 'presencial' " .
            "WHEN LOWER({$column}) LIKE '%parcial%' THEN 'parcial' " .
            "WHEN LOWER({$column}) LIKE '%integral%' THEN 'integral' " .
            "WHEN LOWER({$column}) LIKE '%substitu%' OR LOWER({$column}) LIKE '%viii%' THEN 'no exterior substituicao' " .
            "WHEN LOWER({$column}) LIKE '%exterior%' THEN 'no exterior' " .
            "ELSE LOWER(TRIM({$column})) END";
    }

    private function labelSql(string $column): string
    {
        return "CASE " .
            "WHEN {$column} IS NULL OR {$column} = '' THEN 'Não definida' " .
            "WHEN LOWER({$column}) = 'presencial' THEN 'Presencial' " .
            "WHEN LOWER({$column}) = 'parcial' THEN 'Teletrabalho (Parcial)' " .
            "WHEN LOWER({$column}) = 'integral' THEN 'Teletrabalho (Integral)' " .
            "WHEN LOWER({$column}) = 'no exterior substituicao' THEN 'Teletrabalho no exterior (substituição)' " .
            "WHEN LOWER({$column}) = 'no exterior' THEN 'Teletrabalho no exterior' " .
            "ELSE {$column} END";
    }

    private function dropRelatorioPlanoTrabalhoViews(): void
    {
        DB::statement('DROP VIEW IF EXISTS view_relatorio_plano_trabalho_detalhado');
        DB::statement('DROP VIEW IF EXISTS view_relatorio_plano_trabalho');
    }

    private function createRelatorioPlanoTrabalhoViews(): void
    {
        $label = $this->labelSql('`pt`.`modalidade_pgd`');

        DB::statement(<<<SQL
            CREATE ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_trabalho` AS
            select
                `pt`.`id` COLLATE utf8mb4_unicode_ci AS `id`,
                `pt`.`id` COLLATE utf8mb4_unicode_ci AS `plano_trabalho_id`,
                `pt`.`numero` COLLATE utf8mb4_unicode_ci AS `numero`,
                `pt`.`status` COLLATE utf8mb4_unicode_ci AS `status`,
                CAST(`pt`.`data_inicio` AS DATE) AS `dataInicio`,
                CAST(`pt`.`data_fim` AS DATE) AS `dataFim`,
                `pt`.`unidade_id` COLLATE utf8mb4_unicode_ci AS `unidade_id`,
                `usu`.`nome` COLLATE utf8mb4_unicode_ci AS `participanteNome`,
                `fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) COLLATE utf8mb4_unicode_ci AS `unidadeHierarquia`,
                `uni`.`sigla` COLLATE utf8mb4_unicode_ci AS `unidadeSigla`,
                `pt`.`modalidade_pgd` COLLATE utf8mb4_unicode_ci AS `modalidade_pgd`,
                `pt`.`modalidade_pgd` COLLATE utf8mb4_unicode_ci AS `tipo_modalidade_id`,
                {$label} COLLATE utf8mb4_unicode_ci AS `tipoModalidadeNome`,
                DATEDIFF(`pt`.`data_fim`, `pt`.`data_inicio`) + 1 AS `duracao`,
                coalesce((
                    SELECT sum(coalesce(pte.forca_trabalho, 0) * 1)
                    FROM planos_trabalhos_entregas pte
                    WHERE pte.plano_trabalho_id = pt.id
                    and pte.deleted_at is null
                ), 0) as chd,
                (SELECT count(*) from planos_trabalhos_consolidacoes ptc
                WHERE ptc.plano_trabalho_id = pt.id and ptc.deleted_at is null) as qtdePeriodosAvaliativos
            from
                ((`planos_trabalhos` `pt`
            join `usuarios` `usu` on
                (`usu`.`id` = `pt`.`usuario_id`))
            join `unidades` `uni` on
                (`uni`.`id` = `pt`.`unidade_id`))
            where
                `pt`.`deleted_at` is null
        SQL);

        DB::statement(<<<SQL
            CREATE ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_trabalho_detalhado` AS
            select
                `ptc`.`id` COLLATE utf8mb4_unicode_ci AS `id`,
                `pt`.`id` COLLATE utf8mb4_unicode_ci AS `plano_trabalho_id`,
                `pt`.`numero` COLLATE utf8mb4_unicode_ci AS `numero`,
                `pt`.`status` COLLATE utf8mb4_unicode_ci AS `status`,
                cast(`pt`.`data_inicio` as date) AS `dataInicio`,
                cast(`pt`.`data_fim` as date) AS `dataFim`,
                `pt`.`unidade_id` COLLATE utf8mb4_unicode_ci AS `unidade_id`,
                `usu`.`nome` COLLATE utf8mb4_unicode_ci AS `participanteNome`,
                `fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) COLLATE utf8mb4_unicode_ci AS `unidadeHierarquia`,
                `uni`.`sigla` COLLATE utf8mb4_unicode_ci AS `unidadeSigla`,
                `pt`.`modalidade_pgd` COLLATE utf8mb4_unicode_ci AS `modalidade_pgd`,
                `pt`.`modalidade_pgd` COLLATE utf8mb4_unicode_ci AS `tipo_modalidade_id`,
                {$label} COLLATE utf8mb4_unicode_ci AS `tipoModalidadeNome`,
                to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,
                ifnull((select sum(ifnull(`pte`.`forca_trabalho`, 0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null), 0) AS `chd`,
                cast(`ptc`.`data_inicio` as date) AS `data_inicio_avaliativo`,
                cast(`ptc`.`data_fim` as date) AS `data_fim_avaliativo`,
                cast(`ptc`.`data_conclusao` as date) AS `data_conclusao`,
                cast(`aval_antiga`.`data_avaliacao` as date) AS `data_avaliacao`,
                json_unquote(`aval_antiga`.`nota`) `nota`,
                `aval_antiga`.`data_recurso` AS `data_recurso`,
                case
                    when `a`.`id` = `aval_antiga`.`id` then NULL
                    else cast(`a`.`data_avaliacao` as date)
                end AS `data_reavaliacao`,
                case
                    when `a`.`id` = `aval_antiga`.`id` then NULL
                    else json_unquote(`a`.`nota`)
                end AS `nota_reavaliacao`,
                case when pt.status = 'CANCELADO'
                    then NULL
                    else
                        case when `ptc`.`data_conclusao` is null
                        then case when curdate() <= cast(`ptc`.`data_fim` as date) + interval 10 day
                            then 'Aguardando'
                            else 'Atrasado'
                            end
                        else case
                                when cast(`ptc`.`data_conclusao` as date) <= cast(`ptc`.`data_fim` as date) + interval 10 day
                                then 'Registrado no período'
                                else 'Registrado com atraso'
                            end
                        end
                    end
                collate utf8mb4_unicode_ci AS `situacao_execucao`,
                case when pt.status = 'CANCELADO'
                    then NULL
                    else
                        case when `a`.`data_avaliacao` is null
                            then
                                case when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day
                                    then 'Aguardando'
                                    else 'Atrasado'
                                end
                            else
                                case when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day
                                    then 'Registrado no período'
                                    else 'Registrado com atraso'
                                end
                            end
                    end
                collate utf8mb4_unicode_ci AS `situacao_avaliacao`
            from
                (((((`planos_trabalhos` `pt`
            join `usuarios` `usu` on
                (`usu`.`id` = `pt`.`usuario_id`))
            join `unidades` `uni` on
                (`uni`.`id` = `pt`.`unidade_id`))
            left join `planos_trabalhos_consolidacoes` `ptc` on
                (`ptc`.`plano_trabalho_id` = `pt`.`id`
                    and `ptc`.`deleted_at` is null))
            left join `avaliacoes` `a` on
                (`a`.`id` = `ptc`.`avaliacao_id`
                    and `a`.`deleted_at` is null))
            left join (
                select
                    `a1`.`id` AS `id`,
                    `a1`.`data_avaliacao` AS `data_avaliacao`,
                    `a1`.`nota` AS `nota`,
                    `a1`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,
                    `a1`.`data_recurso` AS `data_recurso`,
                    `a1`.`rn` AS `rn`
                from
                    (
                    select
                        `avaliacoes`.`id` AS `id`,
                        `avaliacoes`.`data_avaliacao` AS `data_avaliacao`,
                        `avaliacoes`.`nota` AS `nota`,
                        `avaliacoes`.`data_recurso` AS `data_recurso`,
                        `avaliacoes`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,
                        row_number() over ( partition by `avaliacoes`.`plano_trabalho_consolidacao_id`
                    order by
                        `avaliacoes`.`data_avaliacao`) AS `rn`
                    from
                        `avaliacoes`
                    where
                        `avaliacoes`.`deleted_at` is null
                    group by `avaliacoes`.`id`,
                        `avaliacoes`.`data_avaliacao`,
                        `avaliacoes`.`nota`,
                        `avaliacoes`.`data_recurso`,
                        `avaliacoes`.`plano_trabalho_consolidacao_id`
                ) `a1`
                where
                    `a1`.`rn` = 1) `aval_antiga` on
                (`aval_antiga`.`plano_trabalho_consolidacao_id` = `ptc`.`id`))
            where
                `pt`.`deleted_at` is null
        SQL);
    }
};
