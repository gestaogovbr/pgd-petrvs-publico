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
        DB::statement("UPDATE usuarios u INNER JOIN perfis p ON p.id = u.perfil_id SET u.usuario_externo = 0 WHERE u.usuario_externo = 1 AND p.nivel != 7");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Não é possível desfazer com total precisão sem snapshot.
        // Para segurança, não faz nada no down.
    }
};
