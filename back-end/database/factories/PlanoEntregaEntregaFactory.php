<?php

namespace Database\Factories;

use App\Models\PlanoEntregaEntrega;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanoEntregaEntregaFactory extends Factory
{
    protected $model = PlanoEntregaEntrega::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'homologado' => 1,
            'data_inicio' => '2024-01-01',
            'descricao' => $this->faker->sentence(),
            'meta' => '{}',
            'descricao_meta' => $this->faker->sentence(),
            'descricao_entrega' => $this->faker->sentence(),
            'plano_entrega_id' => null,
            'entrega_id' => null,
            'unidade_id' => null,
        ];
    }
}
