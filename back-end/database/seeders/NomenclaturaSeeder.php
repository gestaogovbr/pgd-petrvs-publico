<?php

namespace Database\Seeders;

use App\Models\Entidade;
use Illuminate\Database\Seeder;

class NomenclaturaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $nomenclaturas = [
            ["adesao" => ['single' => "adesão", 'plural' => "adesões", 'female' => true]],
            ["afastamento" => ['single' => "afastamento", 'plural' => "afastamentos", 'female' => false]],
            ["atividade" => ['single' => "atividade", 'plural' => "atividades", 'female' => true]],
            ["avaliação" => ['single' => "avaliação", 'plural' => "avaliações", 'female' => true]],
            ["cadeia de valor" => ['single' => "cadeia de valor", 'plural' => "cadeias de valor", 'female' => true]],
            ["capacidade" => ['single' => "capacidade", 'plural' => "capacidades", 'female' => true]],
            ["cidade" => ['single' => "cidade", 'plural' => "cidades", 'female' => true]],
            ["data de distribuição" => ['single' => "data de distribuição", 'plural' => "datas de distribuição", 'female' => true]],
            ["demanda" => ['single' => "demanda", 'plural' => "demandas", 'female' => true]],
            ["documento" => ['single' => "documento", 'plural' => "documentos", 'female' => false]],
            ["entidade" => ['single' => "entidade", 'plural' => "entidades", 'female' => true]],
            ["entrega" => ['single' => "entrega", 'plural' => "entregas", 'female' => true]],
            ["eixo temático" => ['single' => "eixo temático", 'plural' => "eixos temáticos", 'female' => false]],
            ["feriado" => ['single' => "feriado", 'plural' => "feriados", 'female' => false]],
            ["justificativa" => ['single' => "justificativa", 'plural' => "justificativas", 'female' => true]],
            ["lotação" => ['single' => "lotação", 'plural' => "lotações", 'female' => true]],
            ["material e serviço" => ['single' => "material e serviço", 'plural' => "materiais e serviços", 'female' => false]],
            ["modalidade" => ['single' => "modalidade", 'plural' => "modalidades", 'female' => true]],
            ["motivo de afastamento" => ['single' => "motivo de afastamento", 'plural' => "motivos de afastamento", 'female' => false]],
            ["objetivo" => ['single' => "objetivo", 'plural' => "objetivos", 'female' => false]],
            ["perfil" => ['single' => "perfil", 'plural' => "perfis", 'female' => false]],
            ["planejamento institucional" => ['single' => "planejamento institucional", 'plural' => "planejamentos institucionais", 'female' => false]],
            ["plano de trabalho" => ['single' => "plano de trabalho", 'plural' => "planos de trabalho", 'female' => false]],
            ["plano de entrega" => ['single' => "plano de entrega", 'plural' => "planos de entrega", 'female' => false]],
            ["ponto de controle" => ['single' => "ponto de controle", 'plural' => "pontos de controle", 'female' => false]],
            ["prazo de entrega" => ['single' => "prazo de entrega", 'plural' => "prazos de entrega", 'female' => false]],
            ["processo" => ['single' => "processo", 'plural' => "processos", 'female' => false]],
            ["programa de gestão" => ['single' => "programa de gestão", 'plural' => "programas de gestão", 'female' => false]],
            ["projeto" => ['single' => "projeto", 'plural' => "projetos", 'female' => false]],
            ["requisição" => ['single' => "requisição", 'plural' => "requisições", 'female' => true]],
            ["rotina de integração" => ['single' => "rotina de integração", 'plural' => "rotinas de integração", 'female' => true]],
            ["tarefa" => ['single' => "tarefa", 'plural' => "tarefas", 'female' => true]],
            ["tcr" => ['single' => "tcr", 'plural' => "tcrs", 'female' => false]],
            ["tempo pactuado" => ['single' => "tempo pactuado", 'plural' => "tempos pactuados", 'female' => false]],
            ["tempo planejado" => ['single' => "tempo planejado", 'plural' => "tempos planejados", 'female' => false]],
            ["template" => ['single' => "template", 'plural' => "templates", 'female' => false]],
            ["termo" => ['single' => "termo", 'plural' => "termos", 'female' => false]],
            ["unidade" => ['single' => "unidade", 'plural' => "unidades", 'female' => true]],
            ["usuário" => ['single' => "usuário", 'plural' => "usuários", 'female' => false]]
        ];

        $entidade = Entidade::where('sigla', env("PETRVS_ENTIDADE"))->first() ?? new Entidade();
        $entidade->fill([
            'nomenclatura' => json_encode($nomenclaturas),
        ]);
        $entidade->save();
    }
}
