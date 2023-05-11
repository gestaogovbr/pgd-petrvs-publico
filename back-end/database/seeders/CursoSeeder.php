<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Curso;

class CursoSeeder extends Seeder
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
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'Matemática','titulo'=>'GRAD_BAC'],
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'Estatística','titulo'=>'GRAD_BAC'],
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'Ciência Da Computação','titulo'=>'GRAD_BAC'],
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'Astronomia','titulo'=>'GRAD_BAC'],
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'Física','titulo'=>'GRAD_BAC'],
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'Química','titulo'=>'GRAD_BAC'],
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'Geociências','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Tecnologia da Informação e Comunicação','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'Full Stack Developer','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'ef07571b-d987-46f9-9f64-e438a107875d','nome'=>'MBA em Engenharia de Software','titulo'=>'ESPECIAL'],//MBA
     /* Ciências Biologicas */
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Biologia','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Bioquímica','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Biofísica','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Genética','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Farmacologia','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Botânica','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Zoologia','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Ecologia','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Fisiologia','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Imunologia','titulo'=>'GRAD_BAC'],
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Anatomia Humana','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'e202e1e0-aec3-4f98-adae-a1d829e02328','nome'=>'Citologia','titulo'=>'ESPECIAL'],//Especialização
     /* Engenharias */
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Civil','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Elétrica','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Mecânica','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Química','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Sanitária','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'de produção','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Metalúrgica','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Nuclear','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'de transportes','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Naval','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Aeroespacial','titulo'=>'GRAD_BAC'],
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Perícias de Engenharia','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'Segurança do Trabalho','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'ae78a2a4-65a6-431d-ad98-60d37a491e43','nome'=>'MBA em Gestão para Engenharias','titulo'=>'ESPECIAL'],//MBA
   
     /* Ciências da Saúde */
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Medicina','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Enfermagem','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Farmácia','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Odontologia','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Nutrição','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Fonoaudiologia','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Fisioterapia','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Terapia Ocupacional','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Educação Física','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Biomedicina','titulo'=>'GRAD_BAC'],
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Bio Medicina Estética','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'Nutrição Clinica e Hospitalar','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'MBA em Gestão de Saúde','titulo'=>'ESPECIAL'],//MBA
    ['area'=>'aad04dcb-4dbe-419d-87a3-eb4e661eae70','nome'=>'MBA em Serviços de Saúde','titulo'=>'ESPECIAL'],//MBA
     /* Ciências Humanas */
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Filosofia','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Sociologia','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Antropologia','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Arqueologia','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'História','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Geografia','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Psicologia','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Educação','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Ciência Política','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Teologia','titulo'=>'GRAD_BAC'],
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Gestão de Pessoas','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'MBA em Gestão Empresarial','titulo'=>'ESPECIAL'],//MBA
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'MBA em Gestão de Projetos','titulo'=>'ESPECIAL'],//MBA
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'MBA Gestão Estratégica de Pessoas','titulo'=>'ESPECIAL'],//MBA
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Gestão Operacional','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Inteligência','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Corregedoria','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Gestão Executiva','titulo'=>'ESPECIAL'],//Especialização PRF
     /* Ciências Agrárias */
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Agronomia','titulo'=>'GRAD_BAC'],
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Recursos Florestais (Incluindo Engenharia Florestal)','titulo'=>'GRAD_BAC'],
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Engenharia Agrícola','titulo'=>'GRAD_BAC'],
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Zootecnia','titulo'=>'GRAD_BAC'],
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Medicina Veterinária','titulo'=>'GRAD_BAC'],
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Recursos Pesqueiros','titulo'=>'GRAD_BAC'],
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Engenharia De Pesca E De Alimentos','titulo'=>'GRAD_BAC'],
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Citicultura','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'Fitotecnia','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'4f4b185e-c257-44ab-a84d-5d3aed870e29','nome'=>'MBA em Agronegócio','titulo'=>'ESPECIAL'],//MBA
   
     /* Ciências Sociais Aplicadas */
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Direito','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Administração','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Economia','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Arquitetura E Urbanismo','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Ciência Da Informação','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Ciências Contábeis','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Biblioteconomia','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Comunicação','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Serviço Social','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Turismo','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Hotelaria','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Relações Internacionais','titulo'=>'GRAD_BAC'],
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Direito Digital','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Finanças','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'Administração Pública','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Gestão Pública','titulo'=>'ESPECIAL'],//Especialização
    ['area'=>'81531e04-8a54-488c-9dd9-109242c96709','nome'=>'Administração e Logística','titulo'=>'ESPECIAL'],//Especialização PRF
    ['area'=>'085122b6-56a6-4eea-953a-0a4c215a72af','nome'=>'MBA em Administração Estratégica','titulo'=>'ESPECIAL'],//MBA
   
     /* Linguistica Letras e Artes */
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Linguística','titulo'=>'GRAD_BAC'],
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Letras','titulo'=>'GRAD_BAC'],
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Artes','titulo'=>'GRAD_BAC'],
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Música','titulo'=>'GRAD_BAC'],
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Dança','titulo'=>'GRAD_BAC'],
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Teatro','titulo'=>'GRAD_BAC'],
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Cinema','titulo'=>'GRAD_BAC'],
    ['area'=>'3ca47239-2376-4492-b9b3-ede6e3521a2e','nome'=>'Fotografia','titulo'=>'GRAD_BAC'],
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

