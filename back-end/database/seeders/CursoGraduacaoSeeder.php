<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaGraduacao;

class CursoGraduacaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_areas = AreaGraduacao::all()->toArray();
        $array_cursos =[{'area:'}]
        
        foreach($array_areas as $area) {
            $areaI = new AreaGraduacao();
            $areaI->fill([
                //'id' => uuid(),
                'nome_area'=> $area
            ]);
            $areaI->save();
            
        }
        //
    }
}

