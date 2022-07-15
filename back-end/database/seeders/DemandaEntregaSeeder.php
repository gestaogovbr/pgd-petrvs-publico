<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use App\Models\Demanda;
use App\Models\Plano;
use App\Models\Lotacao;
use App\Models\Atividade;
use App\Models\Tarefa;
use App\Models\Unidade;
use App\Models\DemandaEntrega;
use Carbon\Carbon;

class DemandaEntregaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usuario = Usuario::where('cpf', '25941933304')->first();
        $unidade_principal_id = Lotacao::where([['usuario_id', $usuario->id], ['principal', 1]])->whereNull('data_fim')->first()->unidade_id;
        $plano_principal_id = Plano::where('usuario_id', $usuario->id)->where('unidade_id', $unidade_principal_id)->first()->id;

        $tarefa1 = new Tarefa();
        $tarefa1->nome = 'corrigir bug no sistema';
        $tarefa1->tempo_estimado = 2;
        $tarefa1->documental = 0;
        $tarefa1->save();
        $tarefa1->fresh();

        $tarefa2 = new Tarefa();
        $tarefa2->nome = 'atualizar os requisitos do relatório';
        $tarefa2->tempo_estimado = 3;
        $tarefa2->documental = 0;
        $tarefa2->save();
        $tarefa2->fresh();

        $activities = Atividade::all();
        $tarefas = Tarefa::all();

        $minhasDemandas = [
            ['assunto' => 'corrigir as lotações', 'fator_complexidade' => 1, 'atividade' => $activities[0]],
            ['assunto' => 'corrigir o lex service', 'fator_complexidade' => 1.5, 'atividade' => $activities[1]],
            ['assunto' => 'corrigir a home', 'fator_complexidade' => 2, 'atividade' => $activities[2]]
        ];

        foreach($minhasDemandas as $x){
            $demanda = new Demanda();
            $demanda->fill([
                'assunto' => $x['assunto'],
                'atividade_id' => $x['atividade']->id,
                'data_distribuicao' => now(),
                'carga_horaria' => 8,
                'tempo_planejado' => $x['atividade']->dias_planejado * 8 * $x['atividade']->fator_complexidade,
                'prazo_entrega' => Carbon::create(2022,12,10),
                'tempo_pactuado' => $x['atividade']->tempo_pactuado * $x['fator_complexidade'],
                'fator_complexidade' => $x['fator_complexidade'],
                'recalcula_prazo' => 0,
                'demandante_id' => $usuario->id,
                'usuario_id' => $usuario->id,
                'unidade_id' => $unidade_principal_id,
                'plano_id' => $plano_principal_id
            ]);
            $demanda->save();
        };

        $usuario->fresh();
        $demanda_id = $usuario->demandas->first()->id;
        $minhasEntregas = [
            ['demanda_id' => $demanda_id, 'tarefa_id' => $tarefas[0]->id, 'descricao' => 'Fazer alterações no método ABC', 'tempo_estimado' => 2, 'concluido' => 0],
            ['demanda_id' => $demanda_id, 'tarefa_id' => $tarefas[1]->id, 'descricao' => 'atualizar os requisitos do relatório', 'tempo_estimado' => 2, 'concluido' => 0],
            ['demanda_id' => $demanda_id, 'tarefa_id' => $tarefas[1]->id, 'descricao' => 'elaborar testes da aplicação', 'tempo_estimado' => 3, 'concluido' => 1]
        ];
        foreach($minhasEntregas as $x){
            $demandaEntrega = new DemandaEntrega();
            $demandaEntrega->fill([
                'usuario_id' => $usuario->id,
                'demanda_id' => $x['demanda_id'],
                'tarefa_id' => $x['tarefa_id'],
                'descricao' => $x['descricao'],
                'data_hora' => now(),
                'tempo_estimado' => $x['tempo_estimado'],
                'concluido' => $x['concluido']
            ]);
            $demandaEntrega->save();
        };
    }
}
