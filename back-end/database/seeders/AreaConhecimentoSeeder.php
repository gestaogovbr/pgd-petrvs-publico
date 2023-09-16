<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaConhecimento;

class AreaConhecimentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = [
            ['nome'=>'Ciências Agrárias'],
            ['nome'=>'Ciências Biológicas'],
            ['nome'=>'Ciências Exatas e da Terra'],
            ['nome'=>'Ciências Humanas'],
            ['nome'=>'Ciências da Saúde'],
            ['nome'=>'Ciências Sociais Aplicadas'],
            ['nome'=>'Engenharias'],
            ['nome'=>'Linguística, Letras e Artes'],
            ['nome'=>'Institucional'],
         ];
        foreach($areas as $a) {
            $area = new AreaConhecimento();
            $area->fill([
                'nome'=> $a['nome']
            ]);
            $area->save();
        }
    }
}

