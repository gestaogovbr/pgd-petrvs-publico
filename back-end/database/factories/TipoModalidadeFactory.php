<?php

namespace Database\Factories;

use App\Models\TipoModalidade;
use Illuminate\Database\Eloquent\Factories\Factory;

class TipoModalidadeFactory extends Factory
{
    protected $model = TipoModalidade::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->word,
            'exige_pedagio' => false,
            'plano_trabalho_calcula_horas' => true,
            'atividade_tempo_despendido' => true,
            'atividade_esforco' => true,
        ];
    }
}
