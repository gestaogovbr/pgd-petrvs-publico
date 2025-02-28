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
ALGORITHM = UNDEFINED VIEW `vw_pgd_usuarios` AS
select
    distinct `usuarios`.`id` AS `id`,
    'participante' collate utf8mb4_unicode_ci AS `tipo`,
    NULL AS `json_audit`,
    1 AS `fonte`
from
    (`usuarios`
join `programas_participantes` on
    (`usuarios`.`id` = `programas_participantes`.`usuario_id`))
where
    `usuarios`.`data_envio_api_pgd` is null
    and `usuarios`.`deleted_at` is null
    and `programas_participantes`.`deleted_at` is null
    and exists(
    select
        `pt`.`id`
    from
        `planos_trabalhos` `pt`
    where
        `pt`.`usuario_id` = `usuarios`.`id`
        and `pt`.`deleted_at` is null
    limit 1)
    and exists(
    select
        1
    from
        `documentos_assinaturas` `da`
    where
        `da`.`usuario_id` = `usuarios`.`id`
        and `da`.`deleted_at` is null
    limit 1)
union all
select
    distinct `t1`.`id` AS `id`,
    `t1`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,
    `t1`.`json_audit` AS `json_audit`,
    4 AS `fonte`
from
    (
    select
        `d`.`usuario_id` AS `id`,
        'participante' collate utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        ((`audits` `a`
    join `programas_participantes` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    join `usuarios` `usu` on
        (`usu`.`id` = `d`.`usuario_id`))
    where
        `a`.`auditable_type` like '%ProgramaParticipante'
        and (`a`.`tags` like '%ERRO%'
            or `a`.`tags` is null)
        and `d`.`deleted_at` is null
        and `usu`.`deleted_at` is null
        and `usu`.`data_envio_api_pgd` is not null
        and exists(
        select
            `pt`.`id`
        from
            `planos_trabalhos` `pt`
        where
            `pt`.`usuario_id` = `d`.`usuario_id`
            and `pt`.`deleted_at` is null
        limit 1)
        and exists(
        select
            1
        from
            `documentos_assinaturas` `da`
        where
            `da`.`usuario_id` = `d`.`usuario_id`
            and `da`.`deleted_at` is null
        limit 1)
    group by
        `d`.`usuario_id`) `t1`
union all
select
    distinct `t2`.`id` AS `id`,
    `t2`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,
    `t2`.`json_audit` AS `json_audit`,
    5 AS `fonte`
from
    (
    select
        `d`.`usuario_id` AS `id`,
        'participante' collate utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        ((`audits` `a`
    join `documentos_assinaturas` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    join `usuarios` `usu` on
        (`usu`.`id` = `d`.`usuario_id`))
    where
        `a`.`auditable_type` like '%DocumentoAssinatura'
        and (`a`.`tags` like '%ERRO%'
            or `a`.`tags` is null)
        and `d`.`deleted_at` is null
        and `usu`.`deleted_at` is null
        and `usu`.`data_envio_api_pgd` is not null
        and exists(
        select
            `pt`.`id`
        from
            `planos_trabalhos` `pt`
        where
            `pt`.`usuario_id` = `d`.`usuario_id`
            and `pt`.`deleted_at` is null
        limit 1)
        and exists(
        select
            1
        from
            `documentos_assinaturas` `da`
        where
            `da`.`usuario_id` = `d`.`usuario_id`
            and `da`.`deleted_at` is null
        limit 1)
    group by
        `d`.`usuario_id`) `t2`
union all
select
    distinct `t3`.`id` AS `id`,
    `t3`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,
    `t3`.`json_audit` AS `json_audit`,
    6 AS `fonte`
from
    (
    select
        `d`.`id` AS `id`,
        'participante' collate utf8mb4_unicode_ci AS `tipo`,
        json_arrayagg(`a`.`id`) AS `json_audit`
    from
        (`audits` `a`
    join `usuarios` `d` on
        (`a`.`auditable_id` = `d`.`id`))
    where
        `a`.`auditable_type` like '%Usuario'
        and (`a`.`tags` like '%ERRO%'
            or `a`.`tags` is null)
        and `d`.`deleted_at` is null
        and `d`.`deleted_at` is null
        and `d`.`data_envio_api_pgd` is not null
        and exists(
        select
            `pt`.`id`
        from
            `planos_trabalhos` `pt`
        where
            `pt`.`usuario_id` = `d`.`id`
            and `pt`.`deleted_at` is null
        limit 1)
        and exists(
        select
            1
        from
            `documentos_assinaturas` `da`
        where
            `da`.`usuario_id` = `d`.`id`
            and `da`.`deleted_at` is null
        limit 1)
        and exists(
        select
            1
        from
            `programas_participantes` `part`
        where
            `part`.`usuario_id` = `d`.`id`
            and `part`.`deleted_at` is null
        limit 1)
    group by
        `d`.`id`) `t3`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
