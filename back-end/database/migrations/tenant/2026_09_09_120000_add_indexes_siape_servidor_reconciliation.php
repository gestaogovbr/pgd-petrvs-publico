<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('integracao_servidores', function (Blueprint $table): void {
            $table->index(['cpf', 'deleted_at', 'data_modificacao'], 'idx_integracao_servidor_cpf_data');
        });
        Schema::table('usuarios', function (Blueprint $table): void {
            $table->index(['cpf', 'deleted_at', 'situacao_siape', 'matricula'], 'idx_usuario_siape_reconciliacao');
        });
        Schema::table('siape_blacklist_servidores', function (Blueprint $table): void {
            $table->index(['cpf', 'matricula', 'inativado', 'deleted_at'], 'idx_siape_blacklist_cpf_matricula');
        });
    }

    public function down(): void
    {
        Schema::table('siape_blacklist_servidores', function (Blueprint $table): void {
            $table->dropIndex('idx_siape_blacklist_cpf_matricula');
        });
        Schema::table('usuarios', function (Blueprint $table): void {
            $table->dropIndex('idx_usuario_siape_reconciliacao');
        });
        Schema::table('integracao_servidores', function (Blueprint $table): void {
            $table->dropIndex('idx_integracao_servidor_cpf_data');
        });
    }
};
