<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Throwable;

class RemodelagemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
                Schema::disableForeignKeyConstraints();
                $tabelas_apagar = ['entregas', 'eixos_tematicos', 'planejamentos', 'planejamentos_objetivos',
                                    'planejamentos_entregas', 'planejamentos_entregas_objetivos', 'planejamentos_pontos_controles',
                                    'planejamentos_pontos_controles_entregas', 'planos_pontos_controles',
                                    'planos_pontos_controles_entregas'];
                foreach ($tabelas_apagar as $tabela) {
                    Schema::dropIfExists($tabela);
                }
    
                // rollback de migrações 
                $rollback = ['2022_11_28_175737_create_entregas_table',
                '2022_11_28_181024_create_eixos_tematicos_table','2022_11_28_181435_create_planejamentos_table',
                '2022_11_28_181819_create_planejamentos_objetivos_table','2022_11_28_182434_create_planejamentos_entregas_table',
                '2022_11_28_183243_create_planejamentos_entregas_objetivos_table','2022_11_28_183615_create_planejamentos_pontos_controles_table',
                '2022_11_28_185224_create_planejamentos_pontos_controles_entregas_table','2022_11_28_190709_alter_planos_table_add_planejamento_id',
                '2022_11_28_190943_create_planos_pontos_controles_table','2022_11_28_191053_create_planos_pontos_controles_entregas_table',
                '2022_12_01_091215_alter_entregas_table_rename_qualitativo'];
                DB::table('migrations')->whereIn('migration', $rollback)->delete();
    
                // exclusão da chave estrangeira 'planejamento_id' na tabela planos
                if(Schema::hasColumn('planos', 'planejamento_id')){
                    Schema::table('planos', function (Blueprint $table) {
                        $table->dropConstrainedForeignId('planejamento_id');
                    });
                }
                Schema::enableForeignKeyConstraints();
        } catch (Throwable $e) {
            echo ($e);
        }
    }
}
