<?php

namespace Database\Factories;

use App\Models\TipoMotivoAfastamento;
use Illuminate\Database\Eloquent\Factories\Factory;

class TipoMotivoAfastamentoFactory extends Factory
{
    protected $model = TipoMotivoAfastamento::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->unique()->word(),
            'codigo' => $this->faker->unique()->lexify('??'),
            'sigla' => $this->faker->unique()->lexify('??'),
            'calculo' => 'DECRESCIMO',
            'data_inicio' => now(),
            'situacao' => 'ATIVO',
            'icone' => 'bi bi-calendar-x',
            'cor' => $this->faker->hexColor(),
            'horas' => 0,
            'integracao' => 0,
        ];
    }

    public function ferias(): static
    {
        return $this->state([
            'nome' => 'Férias',
            'codigo' => 'FE',
            'sigla' => 'FE',
            'icone' => 'bi bi-sun',
            'cor' => '#00AA00',
        ]);
    }

    public function licencaMedica(): static
    {
        return $this->state([
            'nome' => 'Licença Médica',
            'codigo' => 'LM',
            'sigla' => 'LM',
            'icone' => 'bi bi-heart-pulse',
            'cor' => '#FF0000',
        ]);
    }
}
