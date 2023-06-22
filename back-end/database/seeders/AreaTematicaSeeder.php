<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaTematica;

class AreaTematicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_areas = [
            ['nome'=>'Governança'],
            ['nome'=>'Comunicação'],
            ['nome'=>'Articulação'],
            ['nome'=>'Operações'],
            ['nome'=>'Tecnologia'],
            ['nome'=>'Ensino'],
            ['nome'=>'Gestão de Pessoas'],
            ['nome'=>'Inteligência'],
            ['nome'=>'Corregedoria'],
            ['nome'=>'Administração e Logística'],
              
         ];
              
        foreach($array_areas as $area) {

            $areaI = new AreaTematica();
            $areaI->fill([
                'nome'=> $area['nome']
            ]);
            $areaI->save();
            
        }
        //
    }
}

