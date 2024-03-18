<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CleanUpAtribuicoesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dbName = 'petrvs_mgi';

        config(['database.connections.mysql.database' => $dbName]); 
        DB::reconnect('mysql');
        DB::purge('mysql');

        $databaseExists = DB::connection('mysql')->select("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [$dbName]);

        if (!empty($databaseExists)) {
            DB::statement("SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));");

            DB::transaction(function () {
                 

                $atribuicoesParaVerificar = ['LOTADO', 'COLABORADOR'];

                foreach ($atribuicoesParaVerificar as $atribuicaoTipo) {
                    $this->limparDuplicatasPorAtribuicao($atribuicaoTipo);
                }
                
                $processados = [];
                $atribuicoes = DB::table('unidades_integrantes_atribuicoes as uia')
                    ->select('uia.id', 'ui.usuario_id', 'uia.unidade_integrante_id')
                    ->join('unidades_integrantes as ui', 'ui.id', '=', 'uia.unidade_integrante_id')
                    ->where('uia.atribuicao', '=', 'LOTADO')
                    ->orderBy('uia.created_at')
                    ->get();
    
                foreach ($atribuicoes as $atribuicao) {
                    if (!in_array($atribuicao->usuario_id, $processados)) {
                        $processados[] = $atribuicao->usuario_id;
                    } else {
                        // Antes de excluir a unidade_integrante, precisa excluir todas as atribuições relacionadas a ela
                        DB::table('unidades_integrantes_atribuicoes')
                            ->where('unidade_integrante_id', '=', $atribuicao->unidade_integrante_id)
                            ->delete();
            
                        // Após remover todas as atribuições relacionadas, pode-se excluir a unidade_integrante
                        DB::table('unidades_integrantes')
                            ->where('id', '=', $atribuicao->unidade_integrante_id)
                            ->delete();
                    }
                }

                
            });
        } 

    }

    
    protected function limparDuplicatasPorAtribuicao($tipoAtribuicao)
    {
        // Identifica duplicatas para o tipo de atribuição especificado
        $duplicatas = DB::table('unidades_integrantes_atribuicoes as uia')
            ->select('uia.id', 'ui.usuario_id', 'uia.unidade_integrante_id')
            ->join('unidades_integrantes as ui', 'ui.id', '=', 'uia.unidade_integrante_id')
            ->where('uia.atribuicao', '=', $tipoAtribuicao)
            ->whereNull('uia.deleted_at')
            ->groupBy('ui.usuario_id', 'ui.unidade_id')
            ->havingRaw('COUNT(uia.id) > 1')
            ->get();

        // Deleta as duplicatas, mantendo apenas a primeira ocorrência
        foreach ($duplicatas as $duplicada) {
            DB::table('unidades_integrantes_atribuicoes as uia')
                ->join('unidades_integrantes as ui', 'ui.id', '=', 'uia.unidade_integrante_id')
                ->where('ui.usuario_id', '=', $duplicada->usuario_id)
                ->where('ui.unidade_id', '=', $duplicada->unidade_integrante_id)
                ->where('uia.atribuicao', '=', $tipoAtribuicao)
                ->where('uia.id', '!=', $duplicada->id)
                ->delete();
        }
    }




}
