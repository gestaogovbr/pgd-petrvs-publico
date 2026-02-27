<?php

namespace Database\Factories;

use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\TipoModalidade;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanoTrabalhoFactory extends Factory
{
    protected $model = PlanoTrabalho::class;

    public function definition(): array
    {
        $usuario = Usuario::factory()->create();
        $unidade = Unidade::factory()->create();
        $tipoModalidade = TipoModalidade::firstOrCreate(
            ['nome' => 'Test Modalidade PT'],
            ['id' => $this->faker->uuid()]
        ); // TODO: criar factory

        return [
            'id' => $this->faker->uuid(),
            'carga_horaria' => 8.00,
            'tempo_total' => 160.00,
            'tempo_proporcional' => 160.00,
            'numero' => $this->faker->unique()->numberBetween(1, 9999),
            'data_inicio' => $this->faker->dateTimeBetween('now', '+1 month'),
            'data_fim' => $this->faker->dateTimeBetween('+1 month', '+6 months'),
            'forma_contagem_carga_horaria' => 'DIA',
            'status' => 'INCLUIDO',
            'programa_id' => Programa::factory(),
            'usuario_id' => $usuario->id,
            'unidade_id' => $unidade->id,
            'tipo_modalidade_id' => $tipoModalidade->id,
            'criacao_usuario_id' => $usuario->id,
            'criterios_avaliacao' => [],
        ];
    }

    public function ativo(): static
    {
        return $this->state(['status' => 'ATIVO']);
    }

    public function concluido(): static
    {
        return $this->state(['status' => 'CONCLUIDO']);
    }
}
