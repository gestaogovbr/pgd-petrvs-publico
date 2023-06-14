<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Materia;
use App\Models\Curso;
use App\Models\TipoCurso;
use App\Models\AreaConhecimento;

class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $array_materias =  [  
        /* Ciências exatas e da terra */
    ['area'=>'Institucional','nome'=>'AAP - ASPECTOS DA ADMINISTRAÇÃO PÚBLICA','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'ACD - ACIDENTE E LEVANTAMENTO DO LOCAL','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'ALP - ASPECTOS LEGAIS DOS PROCEDIMENTOS POLICIAIS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'AMT - ARMAMENTO MUNIÇÃO E TIRO','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'APS - ATENDIMENTO EM PRIMEIROS SOCORROS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'CDD - CORREGEDORIA E DIREITO DISCIPLINAR','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'CIP - CONTROLE INTERNO DA PRF','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'CMA - CUMPRIMENTO DE MANDADO DE ALTO RISCO','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'CVP - CONDUÇÃO VEICULAR POLICIAL','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'DHI - DIREITOS HUMANOS, INTEGRIDADE E RELAÇÕES HUMANAS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'DOC - DOCÊNCIA','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'EDA - ENFRENTAMENTO AO TRÁFICO DE DROGAS, ARMAS E MUNIÇÕES','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'EDT - EDUCAÇÃO E SEGURANÇA PARA O TRANSITO','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'EFV - ENFRENTAMENTO ÀS FRAUDES VEICULARES','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'EIG - ESTRATÉGIA INSTITUCIONAL E GOVERNANÇA','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'FAM - FISCALIZAÇÃO AMBIENTAL','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'FD - TÉCNICAS PARA FISCALIZAÇÃO DO USO DO ÁLCOOL E OUTRAS DROGAS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'FPD - FISCALIZAÇÃO DE PESOS E DIMENSÕES','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'FPP - FISCALIZAÇÃO DE PRODUTOS PERIGOSOS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'FST - FISCALIZAÇÃO DO SERVIÇO DE TRANSPORTE','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'FTR - FISCALIZAÇÃO DE TRÂNSITO','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'GEP - GESTÃO ESTRATÉGICA DA PRF','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'GER - NOÇÕES DE GERENCIAMENTO DE CRISE','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'GPJ - ELABORAÇÃO E GESTÃO DE PROJETOS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'INT - INTELIGÊNCIA POLICIAL E SEGURANÇA ORGÂNICA','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'LGP - LEGISLAÇÃO DE PESSOAL','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'MOT - MOTOCICLISMO','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'MZC - MANEJO DE ZOONOSES CANINAS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'NOC - NOÇÕES DE ORGANIZAÇÃO E CONTROLE','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'NTS - NOÇÕES E TÉCNICAS DE SOBREVIVÊNCIA','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'OAE - OPERAÇÕES AÉREAS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'OCD - OPERAÇÕES DE CONTROLE DE DISTÚRBIOS','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'PBS - PRINCÍPIOS BÁSICOS PARA A SAÚDE','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'PLF - POLICIAMENTO E FISCALIZAÇÃO','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'POP - PLANEJAMENTO OPERACIONAL','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'PRC - PROCEDIMENTOS CINOTÉCNICOS DO DPRF','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'PRU - PATRULHA RURAL E URBANA','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'RTP - REDAÇÃO TÉCNICA PARA A ATIVIDADE POLICIAL','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'SAT - SEGURANÇA DE AUTORIDADES','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'SEP - SOCIEDADE, ESTADO, POLÍCIA E HISTÓRIA DA PRF','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'TAB - TÉCNICAS DE ABORDAGEM','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'TDP - TÉCNICAS DE DEFESA POLICIAL','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'TIC - TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO POLICIAL','curso'=>'Curso Institucional'],
    ['area'=>'Institucional','nome'=>'UDF - USO DIFERENCIADO DA FORÇA','curso'=>'Curso Institucional'],
   
    ];
    
        foreach($array_materias as $materia){
            $materiaI = new Materia();
            $areaMateriaId = AreaConhecimento::where('nome', $materia['area'])->first()?->id;
            $cursoMateriaId = Curso::where('nome',$materia['curso'])->first()?->id;
            $materiaI->fill([
                'nome'=> $materia['nome'],
                'area_materia_id'=> $areaMateriaId,
                'curso_materia_id'=> $cursoMateriaId
            ]);
            $materiaI->save();
            
        }
    }
}
