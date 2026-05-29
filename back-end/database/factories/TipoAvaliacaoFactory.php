<?php

namespace Database\Factories;

use App\Models\TipoAvaliacao;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TipoAvaliacaoFactory extends Factory
{
    protected $model = TipoAvaliacao::class;

    public function definition()
    {
        $tipo = $this->faker->randomElement([
            'QUALITATIVO',
            'QUANTITATIVO'
        ]);

        return [
            'id'   =>  Str::uuid(),
            'nome' => $this->faker->sentence(3),
            'tipo' => $tipo,
        ];
    }

    public function qualitativo()
    {
        return $this->state(fn () => [
            'tipo' => 'QUALITATIVO'
        ]);
    }

    public function quantitativo()
    {
        return $this->state(fn () => [
            'tipo' => 'QUANTITATIVO'
        ]);
    }
}
