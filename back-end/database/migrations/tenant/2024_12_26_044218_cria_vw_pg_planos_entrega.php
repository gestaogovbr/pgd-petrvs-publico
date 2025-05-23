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
ALGORITHM = UNDEFINED VIEW `vw_pgd_planos_entrega` AS
select
    distinct `planos_entregas`.`id` AS `id`,
    'entrega' collate utf8mb4_unicode_ci AS `tipo`,
    NULL AS `json_audit`,
    3 AS `fonte`
from
    `planos_entregas`
where
    `planos_entregas`.`deleted_at` is null
    and `planos_entregas`.`data_envio_api_pgd` is null
    and `planos_entregas`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO')
union all
select
    distinct `t7`.`id` AS `id`,
    `t7`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,
    `t7`.`json_audit` AS `json_audit`,
    10 AS `fonte`
from
    (
    select
        `d`.`id` AS `id`,
        'entrega' collate utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        ((`audits` `a`
    join `planos_entregas` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    join `programas` `p` on
        (`p`.`id` = `d`.`programa_id`))
    where
        `a`.`auditable_type` like '%PlanoEntrega'
        and (`a`.`tags` like '%ERRO%'
            or `a`.`tags` is null)
        and `d`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO')
        and `d`.`deleted_at` is null
        and `p`.`deleted_at` is null
        and d.data_envio_api_pgd is not null
        group by
            `d`.`id`) `t7`
union all
select
    distinct `t8`.`id` AS `id`,
    `t8`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,
    `t8`.`json_audit` AS `json_audit`,
    11 AS `fonte`
from
    (
    select
        `d`.`plano_entrega_id` AS `id`,
        'entrega' collate utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (((`audits` `a`
    join `planos_entregas_entregas` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    join `planos_entregas` `pe` on
        (`pe`.`id` = `d`.`plano_entrega_id`))
    join `programas` `p` on
        (`p`.`id` = `pe`.`programa_id`))
    where
        `a`.`auditable_type` like '%PlanoEntregaEntrega'
        and (`a`.`tags` like '%ERRO%'
            or `a`.`tags` is null)
        and `d`.`deleted_at` is null
        and `pe`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO')
        and pe.data_envio_api_pgd is not null
        and `p`.`deleted_at` is null
        group by
            `d`.`plano_entrega_id`) `t8`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
