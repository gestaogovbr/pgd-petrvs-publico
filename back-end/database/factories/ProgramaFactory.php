<?php

namespace Database\Factories;

use App\Models\Programa;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class ProgramaFactory extends Factory
{
    protected $model = Programa::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'nome' => $this->faker->words(3, true),
            'periodicidade_consolidacao' => 'MENSAL',
            'periodicidade_valor' => 31,
            'data_inicio' => $this->faker->dateTimeBetween('now', '+1 month'),
            'data_fim' => $this->faker->dateTimeBetween('+6 months', '+1 year'),
            'prazo_max_plano_entrega' => 365,
            'termo_obrigatorio' => 1,
            'dias_tolerancia_consolidacao' => 10,
            'dias_tolerancia_avaliacao' => 20,
            'dias_tolerancia_recurso_avaliacao' => 20,
            'registra_comparecimento' => 1,
            'plano_trabalho_assinatura_participante' => 1,
            'plano_trabalho_assinatura_gestor_lotacao' => 0,
            'plano_trabalho_assinatura_gestor_unidade' => 0,
            'plano_trabalho_assinatura_gestor_entidade' => 0,
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (Programa $programa) {
            // Setup mínimo para satisfazer a constraint de FK
            // TODO: criar factories para essas entidades também
            $tipoAvaliacaoId = $this->faker->uuid();
            $unidadeId = $this->faker->uuid();
            
            DB::table('tipos_avaliacoes')->insertOrIgnore([
                'id' => $tipoAvaliacaoId,
                'nome' => 'Teste',
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            DB::table('entidades')->insertOrIgnore([
                'id' => $this->faker->uuid(),
                'sigla' => 'TEST',
                'nome' => 'Teste',
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            DB::table('unidades')->insertOrIgnore([
                'id' => $unidadeId,
                'sigla' => 'TEST',
                'nome' => 'Teste',
                'entidade_id' => DB::table('entidades')->first()->id,
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            $programa->tipo_avaliacao_plano_trabalho_id = $tipoAvaliacaoId;
            $programa->tipo_avaliacao_plano_entrega_id = $tipoAvaliacaoId;
            $programa->unidade_id = $unidadeId;
        });
    }
}
