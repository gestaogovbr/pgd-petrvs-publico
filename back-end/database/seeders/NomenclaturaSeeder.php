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
            "adesao" => ['single' => "adesão", 'plural' => "adesões", 'female' => true],
            "afastamento" => ['single' => "afastamento", 'plural' => "afastamentos", 'female' => false],
            "atividade" => ['single' => "detalhamento da execução", 'plural' => "detalhamentos da execução", 'female' => false],
            "avaliação" => ['single' => "avaliação", 'plural' => "avaliações", 'female' => true],
            "cadeia de valor" => ['single' => "cadeia de valor", 'plural' => "cadeias de valor", 'female' => true],
            "capacidade" => ['single' => "capacidade", 'plural' => "capacidades", 'female' => true],
            "cidade" => ['single' => "cidade", 'plural' => "cidades", 'female' => true],
            "data de distribuição" => ['single' => "data do registro", 'plural' => "datas do registro", 'female' => true],
            "demanda" => ['single' => "demanda", 'plural' => "demandas", 'female' => true],
            "documento" => ['single' => "documento", 'plural' => "documentos", 'female' => false],
            "entidade" => ['single' => "instituição", 'plural' => "instituições", 'female' => true],
            "entrega" => ['single' => "entrega", 'plural' => "entregas", 'female' => true],
            "entrega da demanda" => ['single' => "tarefa", 'plural' => "tarefas", 'female' => true],
            "eixo temático" => ['single' => "eixo temático", 'plural' => "eixos temáticos", 'female' => false],
            "feriado" => ['single' => "feriado", 'plural' => "feriados", 'female' => false],
            "justificativa" => ['single' => "justificativa", 'plural' => "justificativas", 'female' => true],
            "lotação" => ['single' => "lotação", 'plural' => "lotações", 'female' => true],
            "material e serviço" => ['single' => "material e serviço", 'plural' => "materiais e serviços", 'female' => false],
            "modalidade" => ['single' => "modalidade", 'plural' => "modalidades", 'female' => true],
            "motivo de afastamento" => ['single' => "motivo de afastamento", 'plural' => "motivos de afastamento", 'female' => false],
            "objetivo" => ['single' => "objetivo", 'plural' => "objetivos", 'female' => false],
            "perfil" => ['single' => "nível de acesso", 'plural' => "níveis de acesso", 'female' => false],
            "planejamento institucional" => ['single' => "planejamento institucional", 'plural' => "planejamentos institucionais", 'female' => false],
            "plano de trabalho" => ['single' => "plano de trabalho", 'plural' => "planos de trabalho", 'female' => false],
            "plano de entrega" => ['single' => "plano de entrega", 'plural' => "planos de entrega", 'female' => false],
            "ponto de controle" => ['single' => "ponto de controle", 'plural' => "pontos de controle", 'female' => false],
            "prazo de entrega" => ['single' => "prazo para conclusão", 'plural' => "prazos para conclusão", 'female' => false],
            "processo" => ['single' => "processo", 'plural' => "processos", 'female' => false],
            "programa de gestão" => ['single' => "regramento de instituição do pgd", 'plural' => "regramentos de instituição do pgd", 'female' => false],
            "projeto" => ['single' => "projeto", 'plural' => "projetos", 'female' => false],
            "requisição" => ['single' => "requisição", 'plural' => "requisições", 'female' => true],
            "rotina de integração" => ['single' => "rotina de integração", 'plural' => "rotinas de integração", 'female' => true],
            "tarefa" => ['single' => "tarefa", 'plural' => "tarefas", 'female' => true],
            "tcr" => ['single' => "tcr", 'plural' => "tcrs", 'female' => false],
            "tempo pactuado" => ['single' => "esforço", 'plural' => "esforços", 'female' => false],
            "tempo planejado" => ['single' => "tempo planejado", 'plural' => "tempos planejados", 'female' => false],
            "template" => ['single' => "template", 'plural' => "templates", 'female' => false],
            "termo" => ['single' => "tcr compilado", 'plural' => "tcr compilados", 'female' => false],
            "tipo de atividade" => ['single' => "tipo de registro de execução", 'plural' => "tipos de registro de execução", 'female' => false],
            "unidade" => ['single' => "unidade executora", 'plural' => "unidades executoras", 'female' => true],
            "usuario" => ['single' => "agente público", 'plural' => "agentes públicos", 'female' => false],
        ];

        $entidade = Entidade::where('sigla', env("PETRVS_ENTIDADE"))->first() ?? new Entidade();

        foreach ($nomenclaturas as $id => $nomenclatura) {
            if (!in_array($id, array_column($entidade->nomenclatura ?? [], 'id'))) {
                $entidade->nomenclatura = array_merge($entidade->nomenclatura ?? [], [
                    [
                        "id" => $id,
                        "nome" => $id,
                        "plural" => $nomenclatura["plural"],
                        "feminino" => $nomenclatura["female"],
                        "singular" => $nomenclatura["single"]
                    ]
                ]);
            }
        }

        $entidade->save();
    }
}
