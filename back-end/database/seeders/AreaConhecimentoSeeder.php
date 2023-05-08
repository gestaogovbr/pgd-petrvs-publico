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

        $array_areas = [
                'Ciências Exatas e da Terra', 
                'Ciências Biológicas',
                'Engenharias',
                'Ciências da Saúde',
                'Ciências Agrárias',
                'Linguística, Letras e Artes',
                'Ciências Sociais Aplicadas',
                'Ciências Humanas' ];
            
        
        foreach($array_areas as $area) {

            $areaI = new AreaConhecimento();
            $areaI->fill([
                //'id' => uuid(),
                'nome_area'=> $area
            ]);
            $areaI->save();
            
        }
        //
    }
}

