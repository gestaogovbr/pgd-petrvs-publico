<?php

namespace Database\Factories;

use App\Models\Ocorrencia;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use Illuminate\Database\Eloquent\Factories\Factory;

class OcorrenciaFactory extends Factory
{
    protected $model = Ocorrencia::class;

    public function definition(): array
    {
        return [
            'data_inicio' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'data_fim' => $this->faker->dateTimeBetween('now', '+1 month'),
            'descricao' => $this->faker->text(300),
            'usuario_id' => Usuario::factory(),
            'plano_trabalho_id' => PlanoTrabalho::factory()
        ];
    }
}