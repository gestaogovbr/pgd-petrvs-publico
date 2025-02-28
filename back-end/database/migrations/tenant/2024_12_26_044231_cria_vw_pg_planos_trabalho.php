<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `vw_pgd_planos_trabalho` AS
select
    distinct `planos_trabalhos`.`id` AS `id`,
    'trabalho' collate utf8mb4_unicode_ci AS `tipo`,
    NULL AS `json_audit`,
    2 AS `fonte`
from
    `planos_trabalhos`
where
    `planos_trabalhos`.`deleted_at` is null
    and `planos_trabalhos`.`data_envio_api_pgd` is null
    and `planos_trabalhos`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO')
union all
select
    distinct `t4`.`id` AS `id`,
    `t4`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,
    `t4`.`json_audit` AS `json_audit`,
    7 AS `fonte`
from
    (
    select
        `d`.`id` AS `id`,
        'trabalho' collate utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`audits` `a`
    join `planos_trabalhos` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%PlanoTrabalho'
        and (`a`.`tags` like '%ERRO%'
            or `a`.`tags` is null)
        and `d`.`deleted_at` is null
        and `d`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO')
            and `d`.`data_envio_api_pgd` is not null
        group by
            `d`.`id`) `t4`
union all
select
    distinct `t5`.`id` AS `id`,
    `t5`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,
    `t5`.`json_audit` AS `json_audit`,
    8 AS `fonte`
from
    (
    select
        `d`.`plano_trabalho_id` AS `id`,
        'trabalho' collate utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        ((`audits` `a`
    join `planos_trabalhos_consolidacoes` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    join `planos_trabalhos` `pt` on
        (`pt`.`id` = `d`.`plano_trabalho_id`))
    where
        `a`.`auditable_type` like '%PlanoTrabalhoConsolidacao'
        and (`a`.`tags` like '%ERRO%'
            or `a`.`tags` is null)
        and `d`.`deleted_at` is null
        and `pt`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO')
            and `pt`.`deleted_at` is null
            and `pt`.`data_envio_api_pgd` is not null
        group by
            `d`.`plano_trabalho_id`) `t5`
union all
select
    distinct `t6`.`id` AS `id`,
    `t6`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,
    `t6`.`json_audit` AS `json_audit`,
    9 AS `fonte`
from
    (
    select
        `d`.`plano_trabalho_id` AS `id`,
        'trabalho' collate utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        ((`audits` `a`
    join `planos_trabalhos_entregas` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    join `planos_trabalhos` `pt` on
        (`pt`.`id` = `d`.`plano_trabalho_id`))
    where
        `a`.`auditable_type` like '%PlanoTrabalhoEntrega'
        and (`a`.`tags` like '%ERRO%'
            or `a`.`tags` is null)
        and `d`.`deleted_at` is null
        and `pt`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO')
            and `pt`.`deleted_at` is null
            and `pt`.`data_envio_api_pgd` is not null
        group by
            `d`.`plano_trabalho_id`) `t6`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
