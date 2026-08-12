<?php

namespace Database\Factories;

use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnidadeIntegranteAtribuicaoFactory extends Factory
{
    protected $model = UnidadeIntegranteAtribuicao::class;

    public function definition(): array
    {
        return [
            'unidade_integrante_id' => UnidadeIntegrante::factory(),
            'atribuicao' => 'LOTADO',
        ];
    }

    /**
     * Cria a atribuição já vinculada a um UnidadeIntegrante para o usuário/unidade informados.
     */
    public function paraUsuarioUnidade(string $usuarioId, string $unidadeId): static
    {
        return $this->state(function () use ($usuarioId, $unidadeId) {
            $integrante = UnidadeIntegrante::firstOrCreate(
                ['usuario_id' => $usuarioId, 'unidade_id' => $unidadeId],
            );

            return ['unidade_integrante_id' => $integrante->id];
        });
    }

    public function gestor(): static
    {
        return $this->state(['atribuicao' => 'GESTOR']);
    }

    public function gestorSubstituto(): static
    {
        return $this->state(['atribuicao' => 'GESTOR_SUBSTITUTO']);
    }

    public function gestorDelegado(): static
    {
        return $this->state(['atribuicao' => 'GESTOR_DELEGADO']);
    }

    public function lotado(): static
    {
        return $this->state(['atribuicao' => 'LOTADO']);
    }

    public function colaborador(): static
    {
        return $this->state(['atribuicao' => 'COLABORADOR']);
    }
}
