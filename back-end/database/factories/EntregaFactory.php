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
            'nome' => $this->faker->sentence(3),
            'descricao' => $this->faker->paragraph(),
            'tipo_indicador' => 'QUANTIDADE',
            'lista_qualitativos' => null,
            'unidade_id' => null,
            'etiquetas' => null,
            'checklist' => null,
        ];
    }

    public function qualitativo(array $opcoes = ['Baixo', 'Médio', 'Alto']): static
    {
        return $this->state([
            'tipo_indicador' => 'QUALITATIVO',
            'lista_qualitativos' => $opcoes,
        ]);
    }

    public function forUnidade(Unidade $unidade): static
    {
        return $this->state(['unidade_id' => $unidade->id]);
    }
}
