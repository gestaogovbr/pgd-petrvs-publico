<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GrupoEspecializado;

class GrupoEspecializadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_grupos = [
            'COE', 
            'GECAM',
            'GECGH',
            'GECDH',
            'GEFRAV',
            'GETRAN',
            'GFIS', 
            'GFT',
            'GIAT',
            'GMD',
            'GMR',
            'GNARC',
            'GOC', 
            'GPAT',
            'GPT',
            'GTARM',
            'NOE'];
        
    
    foreach($array_grupos as $grupo) {

        $grupoI = new GrupoEspecializado();
        $grupoI->fill([
            //'id' => uuid(),
            'nome'=> $grupo
        ]);
        $grupoI->save();
        
    }
        //
    }
}

