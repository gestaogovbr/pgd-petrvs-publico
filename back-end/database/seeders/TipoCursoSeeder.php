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
       $tipos_cursos =  [  
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
        foreach($tipos_cursos as $tc){
            $tipo_curso = new TipoCurso();
            $tipo_curso->fill([
                'nome'=> $tc['nome'],
            ]);
            $tipo_curso->save();
        }
    }
}
