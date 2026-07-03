<?php

namespace Database\Factories;

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnidadeIntegranteFactory extends Factory
{
    protected $model = UnidadeIntegrante::class;

    public function definition(): array
    {
        return [
            'unidade_id' => Unidade::factory(),
            'usuario_id' => Usuario::factory(),
        ];
    }
}
