<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Curso;

class CursoPosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $array_cursos =  [  
        /* Ciências exatas e da terra */
    
    
     /* Ciências Biologicas */
    
    
     /* Engenharias */
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Perícias de Engenharia','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Segurança do Trabalho','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'MBA em Gestão para Engenharias','titulo'=>'ESPECIAL'],//MBA
   
     /* Ciências da Saúde */
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Bio Medicina Estética','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Nutrição Clinica e Hospitalar','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'MBA em Gestão de Saúde','titulo'=>'ESPECIAL'],//MBA
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'MBA em Serviços de Saúde','titulo'=>'ESPECIAL'],//MBA
    
     /* Ciências Humanas */
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Gestão de Pessoas','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Gestão Operacional','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Inteligência','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Corregedoria','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Gestão Executiva','titulo'=>'ESPECIAL'],//Especialização PRF
   
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'MBA em Gestão Empresarial','titulo'=>'ESPECIAL'],//MBA
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'MBA em Gestão de Projetos','titulo'=>'ESPECIAL'],//MBA
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'MBA Gestão Estratégica de Pessoas','titulo'=>'ESPECIAL'],//MBA
   
    
     /* Ciências Agrárias */
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Citicultura','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Fitotecnia','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'MBA em Agronegócio','titulo'=>'ESPECIAL'],//MBA
   
     /* Ciências Sociais Aplicadas */
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Direito Digital','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Finanças','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Administração Pública','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Gestão Pública','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Administração e Logística','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'MBA em Administração Estratégica','titulo'=>'ESPECIAL'],//MBA
   
     /* Linguistica Letras e Artes */
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Linguagem','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Liguistica','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'MBA em Lingua Portuguesa e Linguistica','titulo'=>'ESPECIAL'],//MBA
 
    ];
      
        foreach($array_cursos as $curso){
            $cursoI = new Curso();
            $cursoI->fill([
                //'id' => uuid(),
                'nome'=> $curso['nome'],
                'titulo'=> $curso['titulo'],
                'area_curso_id'=> $curso['area']
    
            ]);
            $cursoI->save();
            
        }
    }
}

