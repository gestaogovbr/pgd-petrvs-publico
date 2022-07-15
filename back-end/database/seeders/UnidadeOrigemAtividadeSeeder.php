<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UnidadeOrigemAtividade;
use Illuminate\Support\Facades\DB;

class UnidadeOrigemAtividadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $del_floriano = DB::table('unidades')->where('codigo', '3586')->first();
        $del_teresina = DB::table('unidades')->where('codigo', '3581')->first();
        $sprfpi = DB::table('unidades')->where('codigo', '971')->first();
        $coepi = DB::table('unidades')->where('codigo', '3577')->first();
        $npf_teresina = DB::table('unidades')->where('codigo', '3582')->first();
        $prf = DB::table('unidades')->where('codigo', '1')->first();

        $testes=[
            [   'unidade_id'=>$del_teresina->id,
                'unidade_origem_atividade_id'=>$del_floriano->id
            ],

            [   'unidade_id'=>$del_teresina->id,
                'unidade_origem_atividade_id'=>$coepi->id
            ],

            [   'unidade_id'=>$sprfpi->id,
                'unidade_origem_atividade_id'=>$coepi->id
            ],

            [   'unidade_id'=>$npf_teresina->id,
                'unidade_origem_atividade_id'=>$prf->id
            ]

        ];

        foreach($testes as $teste){

            $vinculo = new UnidadeOrigemAtividade();
            $vinculo->fill([
                'unidade_id'=>$teste['unidade_id'],
                'unidade_origem_atividade_id'=>$teste['unidade_origem_atividade_id'],
            ]);
            $vinculo->save();
        };
    }
}
