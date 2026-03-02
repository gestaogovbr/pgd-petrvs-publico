<?php

namespace Database\Factories;

use App\Models\Atividade;
use App\Models\Usuario;
use App\Models\Unidade;
use Illuminate\Database\Eloquent\Factories\Factory;

class AtividadeFactory extends Factory
{
    protected $model = Atividade::class;

    public function definition(): array
    {
        $usuario = Usuario::factory()->create();
        $unidade = Unidade::factory()->create();

        return [
            'id' => $this->faker->uuid(),
            'numero' => $this->faker->unique()->numberBetween(1, 9999),
            'descricao' => $this->faker->sentence(),
            'data_distribuicao' => now(),
            'tempo_planejado' => 8.0,
            'data_estipulada_entrega' => now()->addDays(7),
            'esforco' => 8.0,
            'demandante_id' => $usuario->id,
            'unidade_id' => $unidade->id,
        ];
    }
}
