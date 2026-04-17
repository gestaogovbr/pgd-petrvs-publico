<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::connection('tenant')->statement(
            "ALTER TABLE `usuarios` MODIFY `email` VARCHAR(100) NULL COMMENT 'E-mail do usuário'"
        );
    }

    public function down(): void
    {
        DB::connection('tenant')->table('usuarios')
            ->whereNull('email')
            ->update(['email' => DB::raw("CONCAT(id, '@rollback.invalid')")]);

        DB::connection('tenant')->statement(
            "ALTER TABLE `usuarios` MODIFY `email` VARCHAR(100) NOT NULL COMMENT 'E-mail do usuário'"
        );
    }
};
