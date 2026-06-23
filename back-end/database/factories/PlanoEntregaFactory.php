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
        $tipoAvaliacao = TipoAvaliacao::factory()->create();
        $tipoJustificativa = TipoJustificativa::factory()->create();
        $entidade = Entidade::factory()->create();

        $unidade = Unidade::factory()->create([
            'entidade_id' => $entidade->id,
            'instituidora' => 1
        ]);

        $programa = Programa::factory()->create([
            'unidade_id' => $unidade->id,
            'data_inicio' => now(),
            'data_fim' => now()->addYear(),
            'tipo_avaliacao_plano_entrega_id' => $tipoAvaliacao->id,
            'tipo_avaliacao_plano_trabalho_id' => $tipoAvaliacao->id,
            'tipo_justificativa_id' => $tipoJustificativa->id
        ]);

        $usuario = Usuario::factory()->create();

        return [
            'id' => $this->faker->uuid(),
            'numero' => $this->faker->randomNumber(4),
            'nome' => $this->faker->sentence(10),
            'data_inicio' => now(),
            'data_fim' => now()->addMonth(),
            'status' => 'INCLUIDO',
            'unidade_id' => $unidade->id,
            'programa_id' => $programa->id,
            'criacao_usuario_id' => $usuario->id,
        ];
    }
}
