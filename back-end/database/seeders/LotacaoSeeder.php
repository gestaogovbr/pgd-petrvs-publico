<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lotacao;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use DateTime;

class LotacaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

       $carol_id = DB::table('usuarios')->where('cpf', '01492368164')->first()->id;
       $farias_id = DB::table('usuarios')->where('cpf', '25941933304')->first()->id;
       $marian_id = DB::table('usuarios')->where('cpf', '67703011053')->first()->id;
       $genisson_id = DB::table('usuarios')->where('cpf', '07408707425')->first()->id;

        $lot_prf = DB::table('unidades')->where('codigo', '1')->first();
        $lot_inova = DB::table('unidades')->where('codigo', '1111')->first();
        $del_floriano = DB::table('unidades')->where('codigo', '3586')->first();
        $npf_floriano = DB::table('unidades')->where('codigo', '3587')->first();
        $uop_floriano = DB::table('unidades')->where('codigo', '2811')->first();
        $del_teresina = DB::table('unidades')->where('codigo', '3581')->first();
        $npf_teresina = DB::table('unidades')->where('codigo', '3582')->first();
        $npf_del02BA  = DB::table('unidades')->where('codigo', '3843')->first();
        $npf_del01PI  = DB::table('unidades')->where('codigo', '3582')->first();
        $sprfpi = DB::table('unidades')->where('codigo', '971')->first();

        $lotacoes = [
            ['principal' => 1,'data_inicio' => Carbon::create(2021,1,1), 'usuario_id' => $carol_id, 'unidade_id' => $del_teresina->id, 'data_fim' => Carbon::create(2020,12,31)],
            ['principal' => 0,'data_inicio' => Carbon::create(2020,7,1), 'usuario_id' => $carol_id, 'unidade_id' => $uop_floriano->id, 'data_fim' => Carbon::create(2020,12,31)],
            ['principal' => 0,'data_inicio' => Carbon::create(2020,1,1), 'usuario_id' => $carol_id, 'unidade_id' => $del_floriano->id],

            ['principal' => 0,'data_inicio' => Carbon::create(2020,7,1), 'usuario_id' => $farias_id, 'unidade_id' => $uop_floriano->id, 'data_fim' => Carbon::create(2020,12,31)],
            ['principal' => 0,'data_inicio' => Carbon::create(2020,1,1), 'usuario_id' => $farias_id, 'unidade_id' => $del_floriano->id],

            ['principal' => 1,'data_inicio' => Carbon::create(2021,1,1), 'usuario_id' => $marian_id, 'unidade_id' => $uop_floriano->id, 'data_fim' => Carbon::create(2020,12,31)],
            ['principal' => 0,'data_inicio' => Carbon::create(2021,1,1), 'usuario_id' => $marian_id, 'unidade_id' => $sprfpi->id],

            ['principal' => 1,'data_inicio' => Carbon::create(2020,1,1), 'usuario_id' => $genisson_id, 'unidade_id' => $del_teresina->id, 'data_fim' => Carbon::create(2020,6,30)],
            ['principal' => 0,'data_inicio' => Carbon::create(2020,1,1), 'usuario_id' => $genisson_id, 'unidade_id' => $npf_del01PI->id]
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
    }
}
