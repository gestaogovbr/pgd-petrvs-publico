<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoCurso;

class TipoCursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $array_cursos =  [  
       
            ['nome'=>'Acadêmico'],
            ['nome'=>'Institucional'],
            ['nome'=>'Operacional'],
            ['nome'=>'Gestão de Pessoas'],
            ['nome'=>'TI e Comunicação'],
            ['nome'=>'Inteligência'],
            ['nome'=>'Corregedoria'],
            ['nome'=>'Administração e Logística'],
            ['nome'=>'Executiva'],
        ];
    
        foreach($array_cursos as $curso){
            $cursoI = new TipoCurso();
            $cursoI->fill([
                'nome'=> $curso['nome'],
              
            ]);
            $cursoI->save();
            
        }
    }
}

