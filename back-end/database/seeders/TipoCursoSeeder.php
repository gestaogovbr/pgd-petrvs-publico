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
       
            ['nome'=>'Acadêmico','id'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
            ['nome'=>'Institucional','id'=>'fd84c908-f55f-4611-81b2-64844b3590ff'],
            ['nome'=>'Operacional','id'=>'8b20225c-6333-442c-a175-32806000c89e'],
            ['nome'=>'Gestão de Pessoas','id'=>'56acc8a1-4c43-4616-bc79-25a381998f3f'],
            ['nome'=>'TI e Comunicação','id'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
            ['nome'=>'Inteligência','id'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
            ['nome'=>'Corregedoria','id'=>'4505cc21-0060-4b91-93c3-6a28be71d41d'],
            ['nome'=>'Administração e Logística','id'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
            ['nome'=>'Executiva','id'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
            

    ];
    
        foreach($array_cursos as $curso){
            $cursoI = new TipoCurso();
            $cursoI->fill([
                'id' => $curso['id'],
                'nome'=> $curso['nome'],
              
            ]);
            $cursoI->save();
            
        }
    }
}

