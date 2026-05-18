<?php

namespace Database\Factories;

use App\Models\Entidade;
use App\Models\PlanoEntrega;
use App\Models\Programa;
use App\Models\TipoAvaliacao;
use App\Models\TipoJustificativa;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class PlanoEntregaFactory extends Factory
{
    protected $model = PlanoEntrega::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'numero' => $this->faker->randomNumber(4),
            'nome' => $this->faker->sentence(),
            'data_inicio' => '2024-01-01',
            'data_fim' => '2025-12-31',
            'status' => 'ATIVO',
            'unidade_id' => null,
            'programa_id' => null,
            'criacao_usuario_id' => null,
        ];
    }
}
