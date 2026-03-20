<?php

namespace Database\Factories;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalho;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanoTrabalhoConsolidacaoFactory extends Factory
{
    protected $model = PlanoTrabalhoConsolidacao::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'data_inicio' => $this->faker->date(),
            'data_fim' => $this->faker->date(),
            'plano_trabalho_id' => PlanoTrabalho::factory(),
        ];
    }
}
