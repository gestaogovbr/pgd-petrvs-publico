<?php

namespace Database\Factories;

use App\Models\Entrega;
use App\Models\Unidade;
use Illuminate\Database\Eloquent\Factories\Factory;

class EntregaFactory extends Factory
{
    protected $model = Entrega::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'nome' => $this->faker->sentence(),
            'descricao' => $this->faker->paragraph(),
            'tipo_indicador' => 'QUANTIDADE',
        ];
    }
}
