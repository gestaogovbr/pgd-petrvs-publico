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
        $grupos = [
            'COE','GECAM','GECGH','GECDH','GEFRAV','GETRAN','GFIS','GFT','GIAT','GMD','GMR','GNARC',
            'GOC', 'GPAT','GPT','GTARM','NOE'
        ];
        foreach($grupos as $g) {
            $grupo = new GrupoEspecializado();
            $grupo->fill([
                'nome'=> $g
            ]);
            $grupo->save();
        }
    }
}

