<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::statement("
            CREATE OR REPLACE
            ALGORITHM = UNDEFINED VIEW `view_api_pgd` AS
            SELECT
    t1.id AS id,
    t1.tipo AS tipo,
    t1.json_audit AS json_audit
FROM
    (
        SELECT d.usuario_id AS id,
        'participante' AS tipo,
        JSON_ARRAYAGG(a.id) AS json_audit
        FROM audits a
        JOIN documentos d ON a.auditable_id = d.id
        WHERE a.auditable_type LIKE '%Documento'
        AND DATE(a.created_at) = CURDATE() - INTERVAL 1 DAY
        AND (a.tags = 'ERRO' OR a.tags IS NULL)
        GROUP BY d.usuario_id
    ) t1
UNION ALL
SELECT
    t2.id AS id,
    t2.tipo AS tipo,
    t2.json_audit AS json_audit
FROM
    (
        SELECT d.usuario_id AS id,
        'participante' AS tipo,
        JSON_ARRAYAGG(a.id) AS json_audit
        FROM audits a
        JOIN documentos_assinaturas d ON a.auditable_id = d.id
        WHERE a.auditable_type LIKE '%DocumentoAssinatura'
        AND DATE(a.created_at) = CURDATE() - INTERVAL 1 DAY
        AND (a.tags = 'ERRO' OR a.tags IS NULL)
        GROUP BY d.usuario_id
    ) t2
UNION ALL
SELECT
    t3.id AS id,
    t3.tipo AS tipo,
    t3.json_audit AS json_audit
FROM
    (
        SELECT d.id AS id,
        'participante' AS tipo,
        JSON_ARRAYAGG(a.id) AS json_audit
        FROM audits a
        JOIN usuarios d ON a.auditable_id = d.id
        WHERE a.auditable_type LIKE '%Usuario'
        AND DATE(a.created_at) = CURDATE() - INTERVAL 1 DAY
        AND (a.tags = 'ERRO' OR a.tags IS NULL)
        GROUP BY d.id
    ) t3
UNION ALL
SELECT
    t4.id AS id,
    t4.tipo AS tipo,
    t4.json_audit AS json_audit
FROM
    (
        SELECT d.id AS id,
        'trabalho' AS tipo,
        JSON_ARRAYAGG(a.id) AS json_audit
        FROM audits a
        JOIN planos_trabalhos d ON a.auditable_id = d.id
        WHERE a.auditable_type LIKE '%PlanoTrabalho'
        AND DATE(a.created_at) = CURDATE() - INTERVAL 1 DAY
        AND (a.tags = 'ERRO' OR a.tags IS NULL)
        GROUP BY d.id
    ) t4
    UNION ALL
SELECT
    t5.id AS id,
    t5.tipo AS tipo,
    t5.json_audit AS json_audit
FROM
    (
        SELECT d.plano_trabalho_id AS id,
        'trabalho' AS tipo,
        JSON_ARRAYAGG(a.id) AS json_audit
        FROM audits a
        JOIN planos_trabalhos_consolidacoes d ON a.auditable_id = d.id
        WHERE a.auditable_type LIKE '%PlanoTrabalhoConsolidacao'
        AND DATE(a.created_at) = CURDATE() - INTERVAL 1 DAY
        AND (a.tags = 'ERRO' OR a.tags IS NULL)
        GROUP BY d.plano_trabalho_id
    ) t5
        UNION ALL
SELECT
    t6.id AS id,
    t6.tipo AS tipo,
    t6.json_audit AS json_audit
FROM
    (
        SELECT d.plano_trabalho_id AS id,
        'trabalho' AS tipo,
        JSON_ARRAYAGG(a.id) AS json_audit
        FROM audits a
        JOIN planos_trabalhos_entregas d ON a.auditable_id = d.id
        WHERE a.auditable_type LIKE '%PlanoTrabalhoEntrega'
        AND DATE(a.created_at) = CURDATE() - INTERVAL 1 DAY
        AND (a.tags = 'ERRO' OR a.tags IS NULL)
        GROUP BY d.plano_trabalho_id
    ) t6

UNION ALL
SELECT
    t7.id AS id,
    t7.tipo AS tipo,
    t7.json_audit AS json_audit
FROM
    (
        SELECT d.id AS id,
        'entrega' AS tipo,
        JSON_ARRAYAGG(a.id) AS json_audit
        FROM audits a
        JOIN planos_entregas d ON a.auditable_id = d.id
        WHERE a.auditable_type LIKE '%PlanoEntrega'
        AND DATE(a.created_at) = CURDATE() - INTERVAL 1 DAY
        AND (a.tags = 'ERRO' OR a.tags IS NULL)
        GROUP BY d.id
    ) t7
    UNION ALL
SELECT
    t8.id AS id,
    t8.tipo AS tipo,
    t8.json_audit AS json_audit
FROM
    (
        SELECT d.plano_entrega_id AS id,
        'entrega' AS tipo,
        JSON_ARRAYAGG(a.id) AS json_audit
        FROM audits a
        JOIN planos_entregas_entregas d ON a.auditable_id = d.id
        WHERE a.auditable_type LIKE '%PlanoEntregaEntrega'
        AND DATE(a.created_at) = CURDATE() - INTERVAL 1 DAY
        AND (a.tags = 'ERRO' OR a.tags IS NULL)
        GROUP BY d.plano_entrega_id
    ) t8
            ;
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS `view_api_pgd`');
    }
};
