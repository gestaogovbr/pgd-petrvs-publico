<?php

namespace Database\Factories;

use App\Models\Entrega;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanoEntregaEntregaFactory extends Factory
{
    protected $model = PlanoEntregaEntrega::class;

    public function definition(): array
    {
        return [
            'plano_entrega_id' => PlanoEntrega::factory(),
            'unidade_id' => fn (array $attributes) => PlanoEntrega::query()->findOrFail($attributes['plano_entrega_id'])->unidade_id,
            'entrega_id' => Entrega::factory(),
            'homologado' => false,
            'data_inicio' => now(),
            'data_fim' => null,
            'descricao' => $this->faker->sentence(),
            'meta' => [],
            'realizado' => null,
            'destinatario' => null,
            'progresso_esperado' => 0,
            'progresso_realizado' => 0,
            'entrega_pai_id' => null,
            'etiquetas' => null,
            'checklist' => null,
            'descricao_meta' => $this->faker->sentence(),
            'descricao_entrega' => $this->faker->sentence(),
        ];
    }

    public function forPlanoEntrega(PlanoEntrega $planoEntrega): static
    {
        return $this->state([
            'plano_entrega_id' => $planoEntrega->id,
            'unidade_id' => $planoEntrega->unidade_id,
        ]);
    }

    public function forEntregaCatalogo(Entrega $entrega): static
    {
        return $this->state(['entrega_id' => $entrega->id]);
    }

    public function homologado(bool $value = true): static
    {
        return $this->state(['homologado' => $value]);
    }
}
