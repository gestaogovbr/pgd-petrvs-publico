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
        Schema::create('planos_entregas_entregas_progressos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->tinyInteger('homologado')->default(0)->comment("Se a entrega foi ou não homologada");
            $table->decimal('progresso_esperado', 5, 2)->nullable()->default(0)->comment("Percentual esperado de progresso do Plano de Entregas");
            $table->decimal('progresso_realizado', 5, 2)->nullable()->default(0)->comment("Percentual realizado de progresso do Plano de Entregas");
            $table->dateTime('data_inicio')->nullable()->comment("Data inicial da entrega");
            $table->dateTime('data_fim')->nullable()->comment("Data final da entrega");
            $table->json("meta")->nullable()->comment("Meta para a entrega");
            $table->json("realizado")->nullable()->comment("Valor realizado da entrega");
            $table->date('data_progresso')->comment("Data do progresso");
            //Chaves estrangeiras  
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário responsável pelo progresso");            
        
            $table->uuid('plano_entrega_entrega_id')
                ->comment("Entrega do Plano de Entregas à qual está vinculado este progresso");

            $table->foreign('plano_entrega_entrega_id', 'fk_plan_ent_ent_id_plan_entr_entr_pro_id')
                ->references('id')
                ->on('planos_entregas_entregas')
                ->constrained('planos_entregas_entregas')
                ->onDelete('restrict')
                ->onUpdate('cascade')
                ->comment('Entrega do Plano de Entregas à qual está vinculado este progresso');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_entregas_entregas_progressos');
    }
};
