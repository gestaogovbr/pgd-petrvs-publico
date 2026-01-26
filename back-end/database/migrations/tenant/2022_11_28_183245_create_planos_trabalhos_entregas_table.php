<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_trabalhos_entregas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->decimal('forca_trabalho', 5, 2)->default(0)->comment("Percentual da força de trabalho associado a esta entrega");
            $table->json("meta")->nullable()->comment("Meta para a entrega");
            $table->string('orgao', 256)->nullable()->comment("Órgão externo");
            $table->string('descricao', 256)->comment("Detalhamento da entrega");
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_id')->constrained("planos_trabalhos")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de trabalho ao qual está relacionada esta entrega");
            $table->foreignUuid('plano_entrega_entrega_id')->nullable()->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade')->comment('Entrega do Plano de Entregas vinculada a esta entrega do Plano de Trabalho.');
            //$table->foreignUuid('entrega_id')->nullable()->constrained("entregas")->onDelete('restrict')->onUpdate('cascade')->comment('Entrega do Cadastro de Entregas vinculada a esta entrega do Plano de Trabalho.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_trabalhos_entregas');
    }
};
