<?php

namespace Database\Factories;

use App\Models\Feriado;
use Illuminate\Database\Eloquent\Factories\Factory;

class FeriadoFactory extends Factory
{
    protected $model = Feriado::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'nome' => $this->faker->words(3, true),
            'dia' => $this->faker->numberBetween(1, 28),
            'mes' => $this->faker->numberBetween(1, 12),
            'ano' => $this->faker->year(),
            'tipoDia' => 'MES',
            'recorrente' => 1,
            'abrangencia' => 'NACIONAL',
            'codigo_ibge' => $this->faker->numerify('#######'),
            'uf' => $this->faker->stateAbbr(),
        ];
    }
}
