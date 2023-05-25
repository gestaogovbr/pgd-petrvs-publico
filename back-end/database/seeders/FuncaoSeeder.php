<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Funcao;

class FuncaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_funcoes = [
            'Chefe de Delegacia', 
            'Chefe de Divisão',
            'Chefe de Núcleo',
            'NPF',
            'Chefe de Seção',
            'Chefe de Setor',
            'Superintendente',
            'Coordenador',
            'Coordenador Geral',
            'Diretor',
            'Diretor Geral'];
        
    
    foreach($array_funcoes as $funcao) {

        $funcaoI = new Funcao();
        $funcaoI->fill([
            //'id' => uuid(),
            'nome'=> $funcao
        ]);
        $funcaoI->save();
        
    }
        //
    }
}

