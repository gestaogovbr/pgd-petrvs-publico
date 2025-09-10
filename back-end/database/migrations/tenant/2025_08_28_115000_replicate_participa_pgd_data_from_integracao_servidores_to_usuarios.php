<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Replicar dados da coluna participa_pgd de integracao_servidores para usuarios
        DB::statement("
            UPDATE usuarios u 
            INNER JOIN integracao_servidores i ON u.cpf = i.cpf 
            SET u.participa_pgd = CASE 
                WHEN i.participa_pgd IS NULL THEN NULL
                WHEN i.participa_pgd = 'sim' THEN 'sim'
                WHEN i.participa_pgd = 'não' THEN 'não'
                ELSE NULL
            END
            WHERE i.participa_pgd IS NOT NULL
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Reverter alterações - limpar coluna participa_pgd na tabela usuarios
        DB::statement("UPDATE usuarios SET participa_pgd = NULL");
    }
};