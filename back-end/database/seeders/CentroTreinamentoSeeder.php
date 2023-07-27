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
        $centros = ['ANP','CTCO','CTNE','CTRJ','CTSUL','UniPRF','Não se aplica'];
        foreach($centros as $c) {
            $centro = new CentroTreinamento();
            $centro->fill([
                'nome'=> $c
            ]);
            $centro->save();
        }
    }
}

