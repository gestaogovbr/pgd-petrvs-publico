<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cargo;

class CargoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_cargos = [
            ['nome'=> 'PRF','nivel'=> '','descricao'=>'','codigo'=>''],
            ['nome'=> 'Agente Administrativo','nivel'=> '','descricao'=>'','codigo'=>''],
           ];
        
    
    foreach($array_cargos as $cargo) {

        $cargoI = new Cargo();
        $cargoI->fill([
            //'id' => uuid(),
            'nome'=> $cargo['nome'],
            'nivel'=>  $cargo['nivel'],
            'descricao'=> $cargo['descricao'],
            'codigo'=>  $cargo['codigo'],
        ]);
        $cargoI->save();
        
    }
        //
    }
}
