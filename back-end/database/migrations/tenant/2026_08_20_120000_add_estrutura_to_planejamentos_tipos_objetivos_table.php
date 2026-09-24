<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('planejamentos_tipos_objetivos', function (Blueprint $table) {
            $table->string('estrutura', 50)->nullable()->after('descricao')
                ->comment('Estrutura à qual pertence: planejamento_institucional ou cadeia_de_valor');
        });

        DB::table('planejamentos_tipos_objetivos')
            ->update(['estrutura' => 'planejamento_institucional']);

        Schema::table('planejamentos_tipos_objetivos', function (Blueprint $table) {
            $table->string('estrutura', 50)->nullable(false)->change();
        });

        Schema::table('cadeias_valores_processos', function (Blueprint $table) {
            $table->uuid('tipo_elemento_id')->nullable()->after('processo_pai_id')
                ->comment('Tipo de elemento da cadeia de valor (opcional)');

            $table->foreign('tipo_elemento_id', 'fk_cv_proc_tipo_elemento_id')
                ->references('id')
                ->on('planejamentos_tipos_objetivos')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('cadeias_valores_processos', function (Blueprint $table) {
            $table->dropForeign('fk_cv_proc_tipo_elemento_id');
            $table->dropColumn('tipo_elemento_id');
        });

        Schema::table('planejamentos_tipos_objetivos', function (Blueprint $table) {
            $table->dropColumn('estrutura');
        });
    }
};
