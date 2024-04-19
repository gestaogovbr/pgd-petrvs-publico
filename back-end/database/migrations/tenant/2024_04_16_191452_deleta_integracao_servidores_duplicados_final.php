<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $resultado = DB::table('integracao_servidores')
        ->selectRaw('COUNT(1) AS qtd_cpf, cpf')
        ->groupBy('cpf')
        ->havingRaw('COUNT(1) > 1')
        ->get();

        $resultado->each(function($item){
            $servidoresDuplicados = DB::table('integracao_servidores')->where('cpf', $item->cpf)->orderBy('created_at','asc')->get();
            $servidoresDuplicados->pop();
            foreach($servidoresDuplicados as $servidor){
                DB::table('integracao_servidores')->where('id', $servidor->id)->delete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
