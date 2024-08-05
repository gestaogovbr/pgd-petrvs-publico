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
        DB::statement("-- petrvs_mgi.view_api_pgd source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `petrvs_mgi`.`view_api_pgd` AS
select
    `petrvs_mgi`.`usuarios`.`id` AS `id`,
    'participante' AS `tipo`,
    NULL AS `json_audit`
from
    (`petrvs_mgi`.`usuarios`
join `petrvs_mgi`.`programas_participantes` on
    (`petrvs_mgi`.`usuarios`.`id` = `petrvs_mgi`.`programas_participantes`.`usuario_id`))
where
    `petrvs_mgi`.`usuarios`.`data_envio_api_pgd` is null
union all
select
    `petrvs_mgi`.`planos_trabalhos`.`id` AS `id`,
    'trabalho' COLLATE utf8mb4_unicode_ci AS `tipo`,
    NULL AS `json_audit`
from
    `petrvs_mgi`.`planos_trabalhos`
where `petrvs_mgi`.`planos_trabalhos`.`deleted_at` IS NULL
    and `petrvs_mgi`.`planos_trabalhos`.`data_envio_api_pgd` is null
union all
select
    `petrvs_mgi`.`planos_entregas`.`id` AS `id`,
    'entrega' COLLATE utf8mb4_unicode_ci AS `tipo`,
    NULL AS `json_audit`
from
    `petrvs_mgi`.`planos_entregas`
where
	`petrvs_mgi`.`planos_entregas`.deleted_at IS NULL
    and `petrvs_mgi`.`planos_entregas`.`data_envio_api_pgd` is null
union all
select
    `t1`.`id` AS `id`,
    `t1`.`tipo` COLLATE utf8mb4_unicode_ci AS `tipo`,
    `t1`.`json_audit` AS `json_audit`
from
    (
    select
        `d`.`usuario_id` AS `id`,
        'participante' COLLATE utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`petrvs_mgi`.`audits` `a`
    join `petrvs_mgi`.`programas_participantes` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%ProgramaParticipante'
        and (`a`.`tags` = 'ERRO'
            or `a`.`tags` is null)
        and d.deleted_at IS NULL
    group by
        `d`.`usuario_id`) `t1`
union all
select
    `t2`.`id` AS `id`,
    `t2`.`tipo` COLLATE utf8mb4_unicode_ci AS `tipo`,
    `t2`.`json_audit` AS `json_audit`
from
    (
    select
        `d`.`usuario_id` AS `id`,
        'participante' COLLATE utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`petrvs_mgi`.`audits` `a`
    join `petrvs_mgi`.`documentos_assinaturas` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%DocumentoAssinatura'
        and (`a`.`tags` = 'ERRO'
            or `a`.`tags` is null)
        and d.deleted_at IS NULL
    group by
        `d`.`usuario_id`) `t2`
union all
select
    `t3`.`id` AS `id`,
    `t3`.`tipo` COLLATE utf8mb4_unicode_ci AS `tipo`,
    `t3`.`json_audit` AS `json_audit`
from
    (
    select
        `d`.`id` AS `id`,
        'participante' AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`petrvs_mgi`.`audits` `a`
    join `petrvs_mgi`.`usuarios` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%Usuario'
        and (`a`.`tags` = 'ERRO'
            or `a`.`tags` is null)
        and d.deleted_at IS NULL
    group by
        `d`.`id`) `t3`
union all
select
    `t4`.`id` AS `id`,
    `t4`.`tipo` COLLATE utf8mb4_unicode_ci AS `tipo`,
    `t4`.`json_audit` AS `json_audit`
from
    (
    select
        `d`.`id` AS `id`,
        'trabalho' AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`petrvs_mgi`.`audits` `a`
    join `petrvs_mgi`.`planos_trabalhos` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%PlanoTrabalho'
        and (`a`.`tags` = 'ERRO'
            or `a`.`tags` is null)
        and d.deleted_at IS NULL
    group by
        `d`.`id`) `t4`
union all
select
    `t5`.`id` AS `id`,
    `t5`.`tipo` COLLATE utf8mb4_unicode_ci AS `tipo`,
    `t5`.`json_audit` AS `json_audit`
from
    (
    select
        `d`.`plano_trabalho_id` AS `id`,
        'trabalho' COLLATE utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`petrvs_mgi`.`audits` `a`
    join `petrvs_mgi`.`planos_trabalhos_consolidacoes` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%PlanoTrabalhoConsolidacao'
        and (`a`.`tags` = 'ERRO'
            or `a`.`tags` is null)
        and d.deleted_at IS NULL
    group by
        `d`.`plano_trabalho_id`) `t5`
union all
select
    `t6`.`id` AS `id`,
    `t6`.`tipo` COLLATE utf8mb4_unicode_ci AS `tipo`,
    `t6`.`json_audit` AS `json_audit`
from
    (
    select
        `d`.`plano_trabalho_id` AS `id`,
        'trabalho' COLLATE utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`petrvs_mgi`.`audits` `a`
    join `petrvs_mgi`.`planos_trabalhos_entregas` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%PlanoTrabalhoEntrega'
        and (`a`.`tags` = 'ERRO'
            or `a`.`tags` is null)
        and d.deleted_at IS NULL
    group by
        `d`.`plano_trabalho_id`) `t6`
union all
select
    `t7`.`id` AS `id`,
    `t7`.`tipo` COLLATE utf8mb4_unicode_ci AS `tipo`,
    `t7`.`json_audit` AS `json_audit`
from
    (
    select
        `d`.`id` AS `id`,
        'entrega' COLLATE utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`petrvs_mgi`.`audits` `a`
    join `petrvs_mgi`.`planos_entregas` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%PlanoEntrega'
        and (`a`.`tags` = 'ERRO'
            or `a`.`tags` is null)
        and d.deleted_at IS NULL
    group by
        `d`.`id`) `t7`
union all
select
    `t8`.`id` AS `id`,
    `t8`.`tipo` COLLATE utf8mb4_unicode_ci AS `tipo`,
    `t8`.`json_audit` AS `json_audit`
from
    (
    select
        `d`.`plano_entrega_id` AS `id`,
        'entrega' COLLATE utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`petrvs_mgi`.`audits` `a`
    join `petrvs_mgi`.`planos_entregas_entregas` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%PlanoEntregaEntrega'
        and (`a`.`tags` = 'ERRO'
            or `a`.`tags` is null)
        and d.deleted_at IS NULL
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
