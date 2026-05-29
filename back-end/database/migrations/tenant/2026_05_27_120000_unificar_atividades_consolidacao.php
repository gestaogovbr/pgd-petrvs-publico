<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

/**
 * Unifica atividades duplicadas no mesmo período avaliativo (e mesma entrega),
 * concatenando as descrições em um único registro.
 *
 * Implementação set-based (sem loop PHP) para escalar em produção com dezenas de tenants.
 */
return new class extends Migration
{
    private const BACKUP_TABLE = 'atividades_unificacao_merge_backup';

    private const TEMP_GRUPOS = 'tmp_atividades_merge_grupos';

    private const TEMP_MAP = 'tmp_atividades_merge_map';

    private const TEMP_DESCRICOES = 'tmp_atividades_merge_descricoes';

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
        $this->prepararTabelasTemporarias();

        try {
            $this->popularGruposEMapeamento();

            $grupos = (int) DB::table(self::TEMP_GRUPOS)->count();
            if ($grupos === 0) {
                Log::info('Migration unificar_atividades_consolidacao: nenhum grupo duplicado encontrado.');

                return;
            }

            DB::statement('SET SESSION group_concat_max_len = 1048576');

            DB::beginTransaction();

            $this->popularBackup();
            $this->atualizarDescricoesUnificadas();
            $this->redirecionarReferenciasEmLote();
            $this->softDeleteDuplicatas();

            DB::commit();

            $removidas = (int) DB::table(self::TEMP_MAP)->count();

            Log::info('Migration unificar_atividades_consolidacao concluída.', [
                'grupos_unificados' => $grupos,
                'atividades_removidas' => $removidas,
            ]);
        } catch (\Throwable $e) {
            if (DB::transactionLevel() > 0) {
                DB::rollBack();
            }

            Log::error('Erro na migration unificar_atividades_consolidacao.', [
                'mensagem' => $e->getMessage(),
            ]);

            throw $e;
        } finally {
            $this->limparTabelasTemporarias();
        }
    }

    public function down(): void
    {
        if (!Schema::hasTable(self::BACKUP_TABLE)) {
            return;
        }

        DB::transaction(function () {
            $backup = self::BACKUP_TABLE;

            DB::statement(<<<SQL
                UPDATE atividades AS a
                INNER JOIN `{$backup}` AS b ON b.atividade_id = a.id AND b.merged_into_id IS NULL
                SET a.descricao = b.descricao, a.updated_at = NOW()
            SQL);

            DB::statement(<<<SQL
                UPDATE atividades AS a
                INNER JOIN `{$backup}` AS b ON b.atividade_id = a.id AND b.merged_into_id IS NOT NULL
                SET a.descricao = b.descricao, a.deleted_at = NULL, a.updated_at = NOW()
            SQL);

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

    private function prepararTabelasTemporarias(): void
    {
        $grupos = self::TEMP_GRUPOS;
        $map = self::TEMP_MAP;

        DB::statement('DROP TEMPORARY TABLE IF EXISTS `' . $grupos . '`');
        DB::statement('DROP TEMPORARY TABLE IF EXISTS `' . $map . '`');
        DB::statement('DROP TEMPORARY TABLE IF EXISTS `' . self::TEMP_DESCRICOES . '`');

        DB::statement(<<<SQL
            CREATE TEMPORARY TABLE `{$grupos}` (
                `plano_trabalho_consolidacao_id` CHAR(36) NOT NULL,
                `plano_trabalho_entrega_id` CHAR(36) NULL,
                `keeper_id` CHAR(36) NOT NULL,
                PRIMARY KEY (`plano_trabalho_consolidacao_id`, `plano_trabalho_entrega_id`),
                KEY `idx_keeper` (`keeper_id`)
            ) ENGINE=InnoDB
        SQL);

        DB::statement(<<<SQL
            CREATE TEMPORARY TABLE `{$map}` (
                `duplicate_id` CHAR(36) NOT NULL PRIMARY KEY,
                `keeper_id` CHAR(36) NOT NULL,
                KEY `idx_keeper` (`keeper_id`)
            ) ENGINE=InnoDB
        SQL);
    }

    private function popularGruposEMapeamento(): void
    {
        $grupos = self::TEMP_GRUPOS;
        $map = self::TEMP_MAP;

        DB::statement(<<<SQL
            INSERT INTO `{$grupos}` (`plano_trabalho_consolidacao_id`, `plano_trabalho_entrega_id`, `keeper_id`)
            SELECT
                `plano_trabalho_consolidacao_id`,
                `plano_trabalho_entrega_id`,
                SUBSTRING_INDEX(GROUP_CONCAT(`id` ORDER BY `created_at` ASC, `id` ASC), ',', 1) AS `keeper_id`
            FROM `atividades`
            WHERE `deleted_at` IS NULL
              AND `plano_trabalho_consolidacao_id` IS NOT NULL
            GROUP BY `plano_trabalho_consolidacao_id`, `plano_trabalho_entrega_id`
            HAVING COUNT(*) > 1
        SQL);

        DB::statement(<<<SQL
            INSERT INTO `{$map}` (`duplicate_id`, `keeper_id`)
            SELECT
                `a`.`id`,
                `g`.`keeper_id`
            FROM `atividades` AS `a`
            INNER JOIN `{$grupos}` AS `g`
                ON `g`.`plano_trabalho_consolidacao_id` = `a`.`plano_trabalho_consolidacao_id`
                AND `g`.`plano_trabalho_entrega_id` <=> `a`.`plano_trabalho_entrega_id`
            WHERE `a`.`deleted_at` IS NULL
              AND `a`.`id` <> `g`.`keeper_id`
        SQL);
    }

    private function popularBackup(): void
    {
        $backup = self::BACKUP_TABLE;
        $grupos = self::TEMP_GRUPOS;
        $map = self::TEMP_MAP;

        DB::statement(<<<SQL
            INSERT INTO `{$backup}` (
                `atividade_id`,
                `plano_trabalho_consolidacao_id`,
                `plano_trabalho_entrega_id`,
                `descricao`,
                `deleted_at`,
                `merged_into_id`,
                `created_at`
            )
            SELECT
                `a`.`id`,
                `a`.`plano_trabalho_consolidacao_id`,
                `a`.`plano_trabalho_entrega_id`,
                `a`.`descricao`,
                NULL,
                `m`.`keeper_id`,
                NOW()
            FROM `atividades` AS `a`
            INNER JOIN `{$map}` AS `m` ON `m`.`duplicate_id` = `a`.`id`
            UNION ALL
            SELECT
                `a`.`id`,
                `a`.`plano_trabalho_consolidacao_id`,
                `a`.`plano_trabalho_entrega_id`,
                `a`.`descricao`,
                NULL,
                NULL,
                NOW()
            FROM `atividades` AS `a`
            INNER JOIN `{$grupos}` AS `g` ON `g`.`keeper_id` = `a`.`id`
        SQL);
    }

    private function atualizarDescricoesUnificadas(): void
    {
        $grupos = self::TEMP_GRUPOS;
        $descricoes = self::TEMP_DESCRICOES;

        DB::statement(<<<SQL
            CREATE TEMPORARY TABLE `{$descricoes}` (
                `keeper_id` CHAR(36) NOT NULL PRIMARY KEY,
                `descricao_unificada` TEXT NOT NULL
            ) ENGINE=InnoDB
        SQL);

        DB::statement(<<<SQL
            INSERT INTO `{$descricoes}` (`keeper_id`, `descricao_unificada`)
            SELECT
                `g`.`keeper_id`,
                COALESCE(
                    GROUP_CONCAT(
                        NULLIF(TRIM(`a2`.`descricao`), '')
                        ORDER BY `a2`.`created_at` ASC, `a2`.`id` ASC
                        SEPARATOR '\n\n'
                    ),
                    ''
                ) AS `descricao_unificada`
            FROM `{$grupos}` AS `g`
            INNER JOIN `atividades` AS `a2`
                ON `a2`.`plano_trabalho_consolidacao_id` = `g`.`plano_trabalho_consolidacao_id`
                AND `a2`.`plano_trabalho_entrega_id` <=> `g`.`plano_trabalho_entrega_id`
                AND `a2`.`deleted_at` IS NULL
            GROUP BY `g`.`keeper_id`
        SQL);

        DB::statement(<<<SQL
            UPDATE `atividades` AS `a`
            INNER JOIN `{$descricoes}` AS `d` ON `d`.`keeper_id` = `a`.`id`
            SET
                `a`.`descricao` = `d`.`descricao_unificada`,
                `a`.`updated_at` = NOW()
        SQL);
    }

    private function redirecionarReferenciasEmLote(): void
    {
        $map = self::TEMP_MAP;

        foreach ($this->tabelasComAtividadeIdDisponiveis() as $tabela) {
            DB::statement(<<<SQL
                UPDATE `{$tabela}` AS `t`
                INNER JOIN `{$map}` AS `m` ON `m`.`duplicate_id` = `t`.`atividade_id`
                SET `t`.`atividade_id` = `m`.`keeper_id`
            SQL);
        }
    }

    private function softDeleteDuplicatas(): void
    {
        $map = self::TEMP_MAP;

        DB::statement(<<<SQL
            UPDATE `atividades` AS `a`
            INNER JOIN `{$map}` AS `m` ON `m`.`duplicate_id` = `a`.`id`
            SET
                `a`.`deleted_at` = NOW(),
                `a`.`updated_at` = NOW()
        SQL);
    }

    private function limparTabelasTemporarias(): void
    {
        DB::statement('DROP TEMPORARY TABLE IF EXISTS `' . self::TEMP_GRUPOS . '`');
        DB::statement('DROP TEMPORARY TABLE IF EXISTS `' . self::TEMP_MAP . '`');
        DB::statement('DROP TEMPORARY TABLE IF EXISTS `' . self::TEMP_DESCRICOES . '`');
    }

    /**
     * @return list<string>
     */
    private function tabelasComAtividadeIdDisponiveis(): array
    {
        $tabelas = [];

        foreach (self::TABELAS_COM_ATIVIDADE_ID as $tabela) {
            if (Schema::hasTable($tabela) && Schema::hasColumn($tabela, 'atividade_id')) {
                $tabelas[] = $tabela;
            }
        }

        return $tabelas;
    }
};
