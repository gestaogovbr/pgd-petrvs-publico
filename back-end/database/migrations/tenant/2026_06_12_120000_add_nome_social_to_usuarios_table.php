<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::connection('tenant')->statement(
            "ALTER TABLE `usuarios` ADD COLUMN `nome_social` VARCHAR(100) NULL COMMENT 'Nome social do usuário' AFTER `apelido`"
        );
    }

    public function down(): void
    {
        DB::connection('tenant')->statement(
            "ALTER TABLE `usuarios` DROP COLUMN `nome_social`"
        );
    }
};
