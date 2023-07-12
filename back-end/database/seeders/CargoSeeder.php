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
        $cargos = [
            ['nome'=> 'PRF','nivel'=> '','descricao'=>'','codigo'=>''],
            ['nome'=> 'Agente Administrativo','nivel'=> '','descricao'=>'','codigo'=>''],
        ];
        foreach($cargos as $c) {
            $cargo = new Cargo();
            $cargo->fill([
                'nome'=> $c['nome'],
                'nivel'=>  $c['nivel'],
                'descricao'=> $c['descricao'],
                'codigo'=>  $c['codigo'],
            ]);
            $cargo->save();
        }
    }
}
