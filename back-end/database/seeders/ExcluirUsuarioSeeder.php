<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;

class ExcluirUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            //Exclusão do Usuário FARIAS
            DB::beginTransaction();

                //...escolhe um usuário substituto
                $susana_id = Usuario::where('cpf', '49727028349')->first()->id;
                $farias_id = Usuario::where('cpf', '25941933304')->first()->id;

                //... substitui o demandante_id e o usuario_id da tabela DEMANDAS
                DB::table('demandas')->where('demandante_id', $farias_id)->update(['demandante_id' => $susana_id]);
                DB::table('demandas')->where('usuario_id', $farias_id)->update(['usuario_id' => $susana_id]);

                //... substitui o usuario_id da tabela DEMANDAS_ENTREGAS
                DB::table('demandas_entregas')->where('usuario_id', $farias_id)->update(['usuario_id' => $susana_id]);

                //... substitui o usuario_id da tabela DEMANDAS_AVALIACOES
                DB::table('demandas_avaliacoes')->where('usuario_id', $farias_id)->update(['usuario_id' => $susana_id]);

                //... substitui o usuario_id da tabela PLANOS
                DB::table('planos')->where('usuario_id', $farias_id)->update(['usuario_id' => $susana_id]);

                //... exclui as lotações
                DB::table('lotacoes')->where('usuario_id', $farias_id)->delete();

                //... finalmente exclui o Usuário
                DB::table('usuarios')->where('id', $farias_id)->delete();
                
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }
}
