<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CapacidadeTecnica;
use App\Models\AreaTematica;

class CapacidadeTecnicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_capacidades = [
            ['nome'=>'Análise Técnica', 'area'=>'Governança'],
            ['nome'=>'Inovação', 'area'=>'Governança'],
            ['nome'=>'Estratégia Institucional', 'area'=>'Governança'],
            ['nome'=>'Controle Interno', 'area'=>'Governança'],

            ['nome'=>'Edição de vídeos','area'=>'Comunicação'],
            ['nome'=>'Edição de sons e imagens','area'=>'Comunicação'],
            ['nome'=>'Fotografia','area'=>'Comunicação'],
            ['nome'=>'Oratória','area'=>'Comunicação'],
            ['nome'=>'Produção de texto','area'=>'Comunicação'],
            ['nome'=>'Redes sociais','area'=>'Comunicação'],
            ['nome'=>'Roteiro','area'=>'Comunicação'],
            ['nome'=>'Storytelling','area'=>'Comunicação'],

            ['nome'=>'Cerimonial e Organização de eventos','area'=>'Articulação'],
            ['nome'=>'Articulação Institucional','area'=>'Articulação'],
            ['nome'=>'Articulação Internacional','area'=>'Articulação'],
            ['nome'=>'Articulação Legislativa','area'=>'Articulação'],

            ['nome'=>'Gestão Operacional','area'=>'Operações'],
            ['nome'=>'Operações Especiais','area'=>'Operações'],
            ['nome'=>'Perícia','area'=>'Operações'],
            ['nome'=>'Educação para o Trânsito','area'=>'Operações'],
            ['nome'=>'Atendimento de Acidentes','area'=>'Operações'],
            ['nome'=>'Fiscalização de Trânsito','area'=>'Operações'],
            ['nome'=>'Fiscalização de Transporte de Passageiros','area'=>'Operações'],
            ['nome'=>'Fiscalização de Peso e Dimensões','area'=>'Operações'],
            ['nome'=>'Fiscalização de Produtos Perigosos','area'=>'Operações'],
            ['nome'=>'Fiscalização de Serviços de Escolta','area'=>'Operações'],
            ['nome'=>'Fiscalização Ambiental','area'=>'Operações'],
            ['nome'=>'Controle de Distúrbios','area'=>'Operações'],
            ['nome'=>'Motociclismo','area'=>'Operações'],
            ['nome'=>'Cinotecnia','area'=>'Operações'],
            ['nome'=>'Suporte Aerotático','area'=>'Operações'],
            ['nome'=>'Segurança de Autoridades','area'=>'Operações'],
            ['nome'=>'Combate à Fraude Veicular','area'=>'Operações'],
            ['nome'=>'Combate ao Narcotráfico','area'=>'Operações'],

            ['nome'=>'Infraestrutura e Aplicações','area'=>'Tecnologia'],
            ['nome'=>'Integração, Segurança e Ciência de Dados','area'=>'Tecnologia'],
            ['nome'=>'Governança de Tecnologia da Informação e Comunicação','area'=>'Tecnologia'],
            ['nome'=>'Desenvolvimento WEB','area'=>'Tecnologia'],
            ['nome'=>'Desenvolvimento de FrontEnd','area'=>'Tecnologia'],
            ['nome'=>'Desenvolvimento de BackEnd','area'=>'Tecnologia'],
            ['nome'=>'Desenvolvimento FullStack','area'=>'Tecnologia'],
            ['nome'=>'Desenvolvimento de APP Mobile','area'=>'Tecnologia'],
            ['nome'=>'Desenvolvimento em Google Script e Google WebApp','area'=>'Tecnologia'],
            ['nome'=>'Dashboards (PowerBI e/ou DataStudio)','area'=>'Tecnologia'],

            ['nome'=>'Instrução em CFP','area'=>'Ensino'],
            ['nome'=>'Instrução em Cursos de Capacitação','area'=>'Ensino'],
            ['nome'=>'Instrução em Cursos de Aperfeiçoamento','area'=>'Ensino'],
            ['nome'=>'Instrução em Cursos de Altos Estudos Policiais','area'=>'Ensino'],

            ['nome'=>'Análise de Processos de Pessoal','area'=>'Gestão de Pessoas'],
            ['nome'=>'Cadastro, Pagamento e Administração de Pessoal','area'=>'Gestão de Pessoas'],
            ['nome'=>'Saúde do Servidor','area'=>'Gestão de Pessoas'],

            ['nome'=>'Análise','area'=>'Inteligência'],
            ['nome'=>'Contrainteligência','area'=>'Inteligência'],
            ['nome'=>'Operações','area'=>'Inteligência'],

            ['nome'=>'Assuntos Internos','area'=>'Corregedoria'],
            ['nome'=>'Processos Administrativos Disciplinares','area'=>'Corregedoria'],

            ['nome'=>'Contratações Públicas','area'=>'Administração e Logística'],
            ['nome'=>'Gestão de Frota','area'=>'Administração e Logística'],
            ['nome'=>'Infraestrutura','area'=>'Administração e Logística'],
            ['nome'=>'Orçamento e Finanças','area'=>'Administração e Logística'],
            ['nome'=>'Patrimônio e Material','area'=>'Administração e Logística'],
            ['nome'=>'SCDP','area'=>'Administração e Logística'],

         ];

        foreach($array_capacidades as $capacidade) {

            $capacidadeI = new CapacidadeTecnica();
            $capacidadeI->fill([
                'nome'=> $capacidade['nome'],
                'area_tematica_id'=>AreaTematica::where('nome',$capacidade['area'])->first()?->id,
            ]);
            $capacidadeI->save();

        }
        //
    }
}

