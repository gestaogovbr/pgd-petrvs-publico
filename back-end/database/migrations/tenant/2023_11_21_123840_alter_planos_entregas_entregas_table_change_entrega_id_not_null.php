<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\ModelBase;
use App\Models\PlanoEntregaEntrega;
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
        DB::table('entregas')->insert(
            array([
                   'id' =>  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
                   'nome'   =>  'Entrega Padrão',
                   'descricao'  =>  'Descrição Padrão', 
                   'tipo_indicador' =>  'QUANTIDADE'
            ])
        );
        //PlanoEntregaEntrega::where('entrega_id', null)->update(['entrega_id'=>'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa']);
        DB::table('planos_entregas_entregas')->whereNull('entrega_id')->update(['entrega_id' => 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa']);
        Schema::table('planos_entregas_entregas', function (Blueprint $table) {
            $table->foreignUuid('entrega_id')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_entregas_entregas', function (Blueprint $table) {
            $table->foreignUuid('entrega_id')->nullable(true)->change();
        });
        
        DB::table('planos_entregas_entregas')->where('entrega_id', '=', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')->update(['entrega_id' => null]);
        DB::table('entregas')->where('id', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')->delete();
        
    }
};