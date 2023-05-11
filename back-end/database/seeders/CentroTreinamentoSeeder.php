<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CentroTreinamento;

class CentroTreinamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_centros = [
            'ANP', 
            'CTCO',
            'CTNE',
            'CTRJ',
            'CTSUL',
            'UniPRF',
            'Não se aplica' ];
        
    
    foreach($array_centros as $centros) {

        $centrosI = new CentroTreinamento();
        $centrosI->fill([
            //'id' => uuid(),
            'nome'=> $centros
        ]);
        $centrosI->save();
        
    }
        //
    }
}

