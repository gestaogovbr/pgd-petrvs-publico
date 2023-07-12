<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Materia;
use App\Models\Curso;

class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $materias =  [  
            /* Ciências exatas e da terra */
            ['nome'=>'AAP - ASPECTOS DA ADMINISTRAÇÃO PÚBLICA','curso'=>'Curso Institucional'],
            ['nome'=>'ACD - ACIDENTE E LEVANTAMENTO DO LOCAL','curso'=>'Curso Institucional'],
            ['nome'=>'ALP - ASPECTOS LEGAIS DOS PROCEDIMENTOS POLICIAIS','curso'=>'Curso Institucional'],
            ['nome'=>'AMT - ARMAMENTO MUNIÇÃO E TIRO','curso'=>'Curso Institucional'],
            ['nome'=>'APS - ATENDIMENTO EM PRIMEIROS SOCORROS','curso'=>'Curso Institucional'],
            ['nome'=>'CDD - CORREGEDORIA E DIREITO DISCIPLINAR','curso'=>'Curso Institucional'],
            ['nome'=>'CIP - CONTROLE INTERNO DA PRF','curso'=>'Curso Institucional'],
            ['nome'=>'CMA - CUMPRIMENTO DE MANDADO DE ALTO RISCO','curso'=>'Curso Institucional'],
            ['nome'=>'CVP - CONDUÇÃO VEICULAR POLICIAL','curso'=>'Curso Institucional'],
            ['nome'=>'DHI - DIREITOS HUMANOS, INTEGRIDADE E RELAÇÕES HUMANAS','curso'=>'Curso Institucional'],
            ['nome'=>'DOC - DOCÊNCIA','curso'=>'Curso Institucional'],
            ['nome'=>'EDA - ENFRENTAMENTO AO TRÁFICO DE DROGAS, ARMAS E MUNIÇÕES','curso'=>'Curso Institucional'],
            ['nome'=>'EDT - EDUCAÇÃO E SEGURANÇA PARA O TRANSITO','curso'=>'Curso Institucional'],
            ['nome'=>'EFV - ENFRENTAMENTO ÀS FRAUDES VEICULARES','curso'=>'Curso Institucional'],
            ['nome'=>'EIG - ESTRATÉGIA INSTITUCIONAL E GOVERNANÇA','curso'=>'Curso Institucional'],
            ['nome'=>'FAM - FISCALIZAÇÃO AMBIENTAL','curso'=>'Curso Institucional'],
            ['nome'=> 'FD - TÉCNICAS PARA FISCALIZAÇÃO DO USO DO ÁLCOOL E OUTRAS DROGAS','curso'=>'Curso Institucional'],
            ['nome'=>'FPD - FISCALIZAÇÃO DE PESOS E DIMENSÕES','curso'=>'Curso Institucional'],
            ['nome'=>'FPP - FISCALIZAÇÃO DE PRODUTOS PERIGOSOS','curso'=>'Curso Institucional'],
            ['nome'=>'FST - FISCALIZAÇÃO DO SERVIÇO DE TRANSPORTE','curso'=>'Curso Institucional'],
            ['nome'=>'FTR - FISCALIZAÇÃO DE TRÂNSITO','curso'=>'Curso Institucional'],
            ['nome'=>'GEP - GESTÃO ESTRATÉGICA DA PRF','curso'=>'Curso Institucional'],
            ['nome'=>'GER - NOÇÕES DE GERENCIAMENTO DE CRISE','curso'=>'Curso Institucional'],
            ['nome'=>'GPJ - ELABORAÇÃO E GESTÃO DE PROJETOS','curso'=>'Curso Institucional'],
            ['nome'=>'INT - INTELIGÊNCIA POLICIAL E SEGURANÇA ORGÂNICA','curso'=>'Curso Institucional'],
            ['nome'=>'LGP - LEGISLAÇÃO DE PESSOAL','curso'=>'Curso Institucional'],
            ['nome'=>'MOT - MOTOCICLISMO','curso'=>'Curso Institucional'],
            ['nome'=>'MZC - MANEJO DE ZOONOSES CANINAS','curso'=>'Curso Institucional'],
            ['nome'=>'NOC - NOÇÕES DE ORGANIZAÇÃO E CONTROLE','curso'=>'Curso Institucional'],
            ['nome'=>'NTS - NOÇÕES E TÉCNICAS DE SOBREVIVÊNCIA','curso'=>'Curso Institucional'],
            ['nome'=>'OAE - OPERAÇÕES AÉREAS','curso'=>'Curso Institucional'],
            ['nome'=>'OCD - OPERAÇÕES DE CONTROLE DE DISTÚRBIOS','curso'=>'Curso Institucional'],
            ['nome'=>'PBS - PRINCÍPIOS BÁSICOS PARA A SAÚDE','curso'=>'Curso Institucional'],
            ['nome'=>'PLF - POLICIAMENTO E FISCALIZAÇÃO','curso'=>'Curso Institucional'],
            ['nome'=>'POP - PLANEJAMENTO OPERACIONAL','curso'=>'Curso Institucional'],
            ['nome'=>'PRC - PROCEDIMENTOS CINOTÉCNICOS DO DPRF','curso'=>'Curso Institucional'],
            ['nome'=>'PRU - PATRULHA RURAL E URBANA','curso'=>'Curso Institucional'],
            ['nome'=>'RTP - REDAÇÃO TÉCNICA PARA A ATIVIDADE POLICIAL','curso'=>'Curso Institucional'],
            ['nome'=>'SAT - SEGURANÇA DE AUTORIDADES','curso'=>'Curso Institucional'],
            ['nome'=>'SEP - SOCIEDADE, ESTADO, POLÍCIA E HISTÓRIA DA PRF','curso'=>'Curso Institucional'],
            ['nome'=>'TAB - TÉCNICAS DE ABORDAGEM','curso'=>'Curso Institucional'],
            ['nome'=>'TDP - TÉCNICAS DE DEFESA POLICIAL','curso'=>'Curso Institucional'],
            ['nome'=>'TIC - TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO POLICIAL','curso'=>'Curso Institucional'],
            ['nome'=>'UDF - USO DIFERENCIADO DA FORÇA','curso'=>'Curso Institucional'],
        ];
        foreach($materias as $m){
            $materia = new Materia();
            $curso_materia_id = Curso::where('nome',$m['curso'])->first()?->id;
            $materia->fill([
                'nome'=> $m['nome'],
                'curso_materia_id'=> $curso_materia_id
            ]);
            $materia->save();
        }
    }
}
