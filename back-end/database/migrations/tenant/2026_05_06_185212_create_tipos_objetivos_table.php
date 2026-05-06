<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tipos_objetivos', function (Blueprint $table) {
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();

            $table->string('nome', 255)->comment('Nome do tipo de objetivo');
            $table->text('descricao')->nullable()->comment('Descrição do tipo de objetivo');
        });

        Schema::table('planos_entregas_entregas_objetivos', function (Blueprint $table) {
            $table->uuid('tipo_objetivo_id')->nullable()->after('entrega_id')
                ->comment('Tipo do objetivo (opcional)');

            $table->foreign('tipo_objetivo_id', 'fk_plan_entr_entr_obj_tipo_obj_id')
                ->references('id')
                ->on('tipos_objetivos')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('planos_entregas_entregas_objetivos', function (Blueprint $table) {
            $table->dropForeign('fk_plan_entr_entr_obj_tipo_obj_id');
            $table->dropColumn('tipo_objetivo_id');
        });

        Schema::dropIfExists('tipos_objetivos');
    }
};
