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
        Schema::create('planos_entregas_entregas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->tinyInteger('homologado')->comment("Se a entrega foi ou não homologada");
            $table->decimal('progresso_esperado', 5, 2)->nullable()->default(0)->comment("Percentual esperado de progresso do Plano de Entregas");
            $table->decimal('progresso_realizado', 5, 2)->nullable()->default(0)->comment("Percentual realizado de progresso do Plano de Entregas");
            $table->dateTime('data_inicio')->comment("Data inicial da entrega");
            $table->dateTime('data_fim')->nullable()->comment("Data final da entrega");
            $table->string("descricao", 256)->comment("Descrição da entrega");
            $table->string('destinatario')->nullable()->comment("Destinatário da entrega");
            $table->json("meta")->comment("Meta para a entrega");
            $table->json("realizado")->nullable()->comment("Valor realizado da entrega");
            // Chaves estrangeiras:
            $table->foreignUuid('plano_entrega_id')->constrained("planos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de Entrega da entrega");
            $table->foreignUuid('entrega_id')->default()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Entrega do Catálogo ao qual está associada esta entrega (opcional)");
            $table->foreignUuid('entrega_pai_id')->nullable()->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Entrega do Plano de Entregas à qual está associada esta entrega (opcional)");
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Unidade demandante da entrega');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_entregas_entregas');
    }
};
