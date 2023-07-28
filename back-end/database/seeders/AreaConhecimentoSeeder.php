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
            ['nome'=>'Ciências Humanas'],
            ['nome'=>'Ciências Biológicas'],
            ['nome'=>'Ciências Exatas e da Terra'],
            ['nome'=>'Linguística, Letras e Artes'],
            ['nome'=>'Ciências Agrárias'],
            ['nome'=>'Ciências da Saúde'],
            ['nome'=>'Engenharias'],
            ['nome'=>'Ciências Sociais Aplicadas'],
            ['nome'=>'Institucional'],
            ['nome'=>'Ciências Humanas'],   
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

