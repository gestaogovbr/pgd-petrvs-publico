<?php

namespace Database\Factories;

use App\Models\Afastamento;
use App\Models\Usuario;
use App\Models\TipoMotivoAfastamento;
use Illuminate\Database\Eloquent\Factories\Factory;

class AfastamentoFactory extends Factory
{
    protected $model = Afastamento::class;

    public function definition(): array
    {
        return [
            'observacoes' => $this->faker->text(200),
            'data_inicio' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'data_fim' => $this->faker->dateTimeBetween('now', '+1 month'),
            'horas' => $this->faker->numberBetween(1, 8),
            'usuario_id' => Usuario::factory(),
            'tipo_motivo_afastamento_id' => function () {
                return TipoMotivoAfastamento::firstOrCreate(
                    ['nome' => 'Licença Médica'],
                    [
                        'codigo' => 'LM', 
                        'sigla' => 'LM',
                        'calculo' => 'DECRESCIMO',
                        'data_inicio' => now(),
                        'situacao' => 'ATIVO',
                        'icone' => 'bi bi-heart-pulse',
                        'cor' => '#FF0000',
                        'horas' => 0,
                        'integracao' => 0
                    ]
                )->id;
            }
        ];
    }
}