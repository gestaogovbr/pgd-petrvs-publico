<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterPlanosEntregasEntregasModifyPlanoEntregaId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE planos_entregas_entregas MODIFY COLUMN plano_entrega_id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL");
        // DB::statement(" ALTER TABLE planos_entregas_entregas MODIFY COLUMN entrega_id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE planos_entregas_entregas MODIFY COLUMN plano_entrega_id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL");
        // DB::statement("ALTER TABLE planos_entregas_entregas MODIFY COLUMN entrega_id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL");
    }
}
