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
                $this->limparLotadosEmUnidadesDiferentes();             
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

            DB::table('unidades_integrantes_atribuicoes')
                ->where('unidade_integrante_id', '=', $duplicada->unidade_integrante_id)
                ->where('atribuicao', '=', $tipoAtribuicao)
                ->where('id', '!=', $duplicada->id)
                ->delete();  
        }
    }

    protected function limparLotadosEmUnidadesDiferentes()
    {
        // Passo 1: Identificar usuários com múltiplas atribuições LOTADO em unidades diferentes.
        $usuariosMultiplosLotados = DB::table('unidades_integrantes_atribuicoes as uia')
            ->select('ui.usuario_id')
            ->join('unidades_integrantes as ui', 'ui.id', '=', 'uia.unidade_integrante_id')
            ->where('uia.atribuicao', '=', 'LOTADO')
            ->groupBy('ui.usuario_id')
            ->havingRaw('COUNT(DISTINCT ui.unidade_id) > 1')
            ->get()
            ->pluck('usuario_id');

            // Passo 2: Para cada usuário identificado, escolher uma atribuição LOTADO para manter e remover as demais.
            foreach ($usuariosMultiplosLotados as $usuarioId) {
                // Encontrar todas as atribuições LOTADO para o usuário, ordenadas pela data de criação (a mais antiga primeiro).
                $atribuicoesLotado = DB::table('unidades_integrantes_atribuicoes as uia')
                    ->select('uia.id', 'uia.unidade_integrante_id', 'uia.created_at')
                    ->join('unidades_integrantes as ui', 'ui.id', '=', 'uia.unidade_integrante_id')
                    ->where('ui.usuario_id', '=', $usuarioId)
                    ->where('uia.atribuicao', '=', 'LOTADO')
                    ->orderBy('uia.created_at')
                    ->get();

                if ($atribuicoesLotado->count() > 1) {
                    // Mantém a atribuição LOTADO mais antiga e remove as demais.
                    $atribuicaoParaManter = $atribuicoesLotado->first();
                    $atribuicoesLotado->shift(); // Remove a primeira atribuição (a mais antiga) para não ser deletada.

                    // Remove as demais atribuições LOTADO.
                    foreach ($atribuicoesLotado as $atribuicao) {
                        DB::table('unidades_integrantes_atribuicoes')
                            ->where('id', '=', $atribuicao->id)
                            ->delete();                     

                             // Verifica se existem outras atribuições vinculadas ao usuário na unidade antes de remover o registro em unidades_integrantes.
                            $atribuicoesRestantes = DB::table('unidades_integrantes_atribuicoes')
                            ->where('unidade_integrante_id', '=', $atribuicao->unidade_integrante_id)
                            ->where('usuario_id', '=', $usuarioId) 
                            ->count();

                            // Se não existirem mais atribuições, remove o registro correspondente em unidades_integrantes.
                            if ($atribuicoesRestantes == 0) {
                                DB::table('unidades_integrantes')
                                    ->where('id', '=', $atribuicao->unidade_integrante_id)
                                    ->where('usuario_id',
                                    ,'=', $usuarioId) // Certifique-se de que este é o nome correto do campo para o ID do usuário.
                                    ->delete();
                            }
  
                    }
                }
            }

    }

}
