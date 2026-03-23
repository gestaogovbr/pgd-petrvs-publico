<?php

namespace Database\Factories;

use App\Models\SiapeDadosUORG;
use Illuminate\Database\Eloquent\Factories\Factory;

class SiapeDadosUORGFactory extends Factory
{
    protected $model = SiapeDadosUORG::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'codigo' => (string) $this->faker->numberBetween(1, 999999),
            'response' => '<xml/>',
            'processado' => 0,
            'data_modificacao' => $this->faker->date(),
        ];
    }

    public function processado(): static
    {
        return $this->state(['processado' => 1]);
    }

    public function semCodigo(): static
    {
        return $this->state(['codigo' => null]);
    }
}
