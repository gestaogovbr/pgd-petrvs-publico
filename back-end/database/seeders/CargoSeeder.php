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
            ['nome'=> 'PRF','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','efetivo'=>1,'ativo'=>1],
            ['nome'=> 'Agente Administrativo','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','efetivo'=>1,'ativo'=>1],
        ];
        foreach($cargos as $c) {
            $cargo = new Cargo();
            $cargo->fill([
                'nome'=> $c['nome'],
                'nivel'=>  $c['nivel'],
                'descricao'=> $c['descricao'],
                'siape'=>  $c['siape'],
                'cbo'=>  $c['cbo'],
                'efetivo'=>  $c['efetivo'],
                'ativo'=>  $c['ativo'],
            ]);
            $cargo->save();
        }
    }
}
