<?php

use App\Traits\Version;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use Version;

    public function up(): void
    {
        Schema::create('dispensas_plano_trabalho', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('usuario_id')->unique()->constrained('usuarios')->onDelete('restrict')->onUpdate('cascade')
                ->comment('Agente público beneficiário da dispensa');
            $table->date('data_inicio')->comment('Início da dispensa de Plano de Trabalho');
            $table->date('data_fim')->nullable()->comment('Fim da dispensa; null = vigente até encerramento');
            $table->dateTime('ciencia_em')->comment('Momento em que a ciência foi fornecida');
            $table->foreignUuid('responsavel_id')->constrained('usuarios')->onDelete('restrict')->onUpdate('cascade')
                ->comment('Usuário que formalizou/alterou a dispensa');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('dispensas_plano_trabalho_historico', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('dispensa_id')->constrained('dispensas_plano_trabalho')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->constrained('usuarios')->onDelete('restrict')->onUpdate('cascade');
            $table->date('data_inicio');
            $table->date('data_fim')->nullable();
            $table->enum('operacao', ['FORMALIZAR', 'ALTERAR', 'ENCERRAR']);
            $table->dateTime('ciencia_em');
            $table->foreignUuid('responsavel_id')->constrained('usuarios')->onDelete('restrict')->onUpdate('cascade');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dispensas_plano_trabalho_historico');
        Schema::dropIfExists('dispensas_plano_trabalho');
    }
};
