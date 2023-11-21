<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasEntregasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_entregas_entregas', function (Blueprint $table) {

            $table->dropForeign(['planos_entregas_entregas_plano_entrega_id_foreign']);
            $table->uuid('entrega_id');
            $table->foreign('entrega_id', 'planos_entregas_entregas_plano_entrega_id_foreign')->references('id')->on('entregas')->onDelete('restrict')->onUpdate('cascade')->comment("FK_planos_entregas_entregas_plano_entrega_id_foreign");
            //$table->foreignUuid('entrega_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Entrega do Catálogo ao qual está associada esta entrega (opcional)");
        });
        
        DB::table('entregas')->insert(
            array(
                   'id'     =>   '7735c029-d1de-4147-9538-9f5f9f28d4be', 
                   'nome'   =>   'Entrega Padrão'
                   'descrição'     =>   'Descrição Padrão', 
                   'tipo_indicador'   =>   'QUANTIDADE'
            )
        );

        PlanoEntregaEntrega::where(['entrega_id',''])->update(['entrega_id','7735c029-d1de-4147-9538-9f5f9f28d4be'])
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('planos_entregas_entregas', function (Blueprint $table) {
            $table->dropForeign(['planos_entregas_entregas_plano_entrega_id_foreign']);
            $table->foreignUuid('entrega_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Entrega do Catálogo ao qual está associada esta entrega (opcional)");
        })

        DB::table('entregas')->where('id', '7735c029-d1de-4147-9538-9f5f9f28d4be')->delete();

        PlanoEntregaEntrega::where(['entrega_id','7735c029-d1de-4147-9538-9f5f9f28d4be'])->update(['entrega_id',null])
        
    }
}