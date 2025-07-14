<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         DB::statement(<<<EOD
        CREATE OR REPLACE
        ALGORITHM = UNDEFINED VIEW `view_relatorio_agentes` AS
        select distinct u.id, u.nome, u.matricula, '' as jornada,
            p.nome as perfil,
            u.situacao_funcional,
            programa_ultimo.programaNome,
            uni.sigla as unidadeNome,
            tm.nome as tipoModalidadeNome
        from usuarios u
        left join (
            select * from (
                select pp.usuario_id, p.nome as programanome,
                    row_number() over (
                        partition by pp.usuario_id
                        order by pp.created_at desc
                    ) as rn
                from programas_participantes pp
                inner join programas p on p.id = pp.programa_id and p.deleted_at is null
                where pp.deleted_at is null
            ) pp1
            where pp1.rn = 1
        ) programa_ultimo on programa_ultimo.usuario_id = u.id
        left join (
            SELECT
            pt.usuario_id,
            pt.id AS id,
            pt.tipo_modalidade_id
            FROM planos_trabalhos pt
            WHERE pt.deleted_at IS NULL
            AND pt.status IN ('ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO')
            AND (pt.data_inicio, pt.id) = (
                SELECT pt2.data_inicio, MAX(pt2.id)
                FROM planos_trabalhos pt2
                WHERE pt2.usuario_id = pt.usuario_id
                AND pt2.deleted_at IS NULL
                AND pt2.status IN ('ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO')
                GROUP BY pt2.data_inicio
                ORDER BY pt2.data_inicio DESC
                LIMIT 1
            )
        ) pt_ultimo_pactuado on pt_ultimo_pactuado.usuario_id = u.id
        left join unidades_integrantes ui on ui.usuario_id = u.id and ui.deleted_at is null
        left join unidades_integrantes_atribuicoes uia
            on uia.unidade_integrante_id = ui.id
            and uia.deleted_at is null
            and uia.atribuicao = 'LOTADO'
        left join unidades uni
            on uni.codigo = ui.unidade_id
            and uni.deleted_at is null
            and uia.atribuicao = 'LOTADO'
        inner join perfis p on p.id = u.perfil_id
        inner join tipos_modalidades tm on tm.id = pt_ultimo_pactuado.tipo_modalidade_id
        where u.deleted_at is null
        order by u.nome
        EOD);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS view_relatorio_agentes');
    }
};
