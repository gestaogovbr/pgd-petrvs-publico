<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Models\Lotacao;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReinserirUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            //Reinserção do Usuário FARIAS
            DB::beginTransaction();

                //...recupera o usuário substituto
                $susana_id = Usuario::where('cpf', '49727028349')->first()->id;
                $farias = Usuario::where('cpf', '25941933304')->first();

                //... recria o Usuário
                $perfis = Perfil::all();
                if ($farias) {
                    $user = $farias;
                } else {
                    $user = new Usuario();
                    $user->fill([
                        'email' => 'ricardo.farias@prf.gov.br',
                        'nome' => 'Ricardo de Sousa Farias',
                        'cpf' => '25941933304',
                        'apelido' => 'RICARDO FARIAS',
                        'data_inicio' => Carbon::now()
                    ]);
                }
                $user->perfil_id = $perfis->where('nivel', '6')->first()->id;
                $user->save();
                $user->fresh();

                //... recria as lotações
                $uop_floriano = DB::table('unidades')->where('codigo', '2811')->first();
                $del_floriano = DB::table('unidades')->where('codigo', '3586')->first();

                $lotacoes = [
                    ['principal' => 0,'data_inicio' => Carbon::create(2020,7,1), 'usuario_id' => $user->id, 'unidade_id' => $uop_floriano->id, 'data_fim' => Carbon::create(2020,12,31)],
                    ['principal' => 0,'data_inicio' => Carbon::create(2020,1,1), 'usuario_id' => $user->id, 'unidade_id' => $del_floriano->id],
                ];

                foreach($lotacoes as $lot){
                    $lotacao = new Lotacao();
                    $lotacao->fill([
                        'principal' => $lot['principal'],
                        'data_inicio' => $lot['data_inicio'],
                        'usuario_id' => $lot['usuario_id'],
                        'unidade_id' => $lot['unidade_id'],
                        'data_fim' => !empty($lot['data_fim']) ? $lot['data_fim'] : null
                    ]);
                    $lotacao->save();
                };

                //... substitui o usuario_id da tabela DEMANDAS_ENTREGAS
                DB::table('demandas_entregas')->where('usuario_id', $susana_id)->update(['usuario_id' => $user->id]);

                //... substitui o usuario_id da tabela DEMANDAS_AVALIACOES
                DB::table('demandas_avaliacoes')->where('usuario_id', $susana_id)->update(['usuario_id' => $user->id]);

                //... substitui o demandante_id e o usuario_id da tabela DEMANDAS
                DB::table('demandas')->where('demandante_id', $susana_id)->update(['demandante_id' => $user->id]);
                DB::table('demandas')->where('usuario_id', $susana_id)->update(['usuario_id' => $user->id]);

                //... substitui o usuario_id da tabela PLANOS
                DB::table('planos')->where('usuario_id', $susana_id)->update(['usuario_id' => $user->id]);

            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }

    }
}
