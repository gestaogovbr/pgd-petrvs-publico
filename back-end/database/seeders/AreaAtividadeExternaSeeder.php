<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaAtividadeExterna;

class AreaAtividadeExternaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_areas = [
            ['nome'=>'Administração'],
            ['nome'=>'Direito'],
            ['nome'=>'Docência'],
            ['nome'=>'Forças Armadas'],
            ['nome'=>'Polícia Civil'],
            ['nome'=>'Polícia Militar'],
            ['nome'=>'Guarda Municipal'],
            ['nome'=>'Esporte de Alto Nível'],
            ['nome'=>'Saúde'],
            ['nome'=>'Tecnologia'],
            ['nome'=>'Gestão'],
              
         ];
              
        foreach($array_areas as $area) {

            $areaI = new AreaAtividadeExterna();
            $areaI->fill([
                'nome'=> $area['nome']
            ]);
            $areaI->save();
            
        }
        //
    }
}

