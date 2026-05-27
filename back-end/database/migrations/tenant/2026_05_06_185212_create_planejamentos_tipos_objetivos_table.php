<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('planejamentos_tipos_objetivos', function (Blueprint $table) {
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();

            $table->string('nome', 255)->comment('Nome do tipo de objetivo');
            $table->text('descricao')->nullable()->comment('Descrição do tipo de objetivo');
        });

        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->uuid('tipo_objetivo_id')->nullable()->after('eixo_tematico_id')
                ->comment('Tipo do objetivo (opcional)');

            $table->foreign('tipo_objetivo_id', 'fk_planej_obj_tipo_objetivo_id')
                ->references('id')
                ->on('planejamentos_tipos_objetivos')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->dropForeign('fk_planej_obj_tipo_objetivo_id');
            $table->dropColumn('tipo_objetivo_id');
        });

        Schema::dropIfExists('planejamentos_tipos_objetivos');
    }
};
