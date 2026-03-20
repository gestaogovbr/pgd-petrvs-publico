<?php

namespace Database\Factories;

use App\Models\PlanoTrabalhoEntrega;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanoTrabalhoEntregaFactory extends Factory
{
    protected $model = PlanoTrabalhoEntrega::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'descricao' => $this->faker->sentence(),
            'plano_trabalho_id' => null,
        ];
    }
}
