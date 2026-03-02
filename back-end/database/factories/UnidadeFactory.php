<?php

namespace Database\Factories;

use App\Models\Unidade;
use App\Models\Cidade;
use App\Models\Entidade;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnidadeFactory extends Factory
{
    protected $model = Unidade::class;

    public function definition(): array
    {            
        $entidade = Entidade::firstOrCreate(
            ['sigla' => 'TEST'],
            [
                'id' => $this->faker->uuid(),
                'nome' => 'Test Entidade',
                'abrangencia' => 'NACIONAL'
            ]
        ); // TODO: criar factory

        return [
            'id' => $this->faker->uuid(),
            'codigo' => $this->faker->optional()->numerify('############'),
            'sigla' => $this->faker->lexify('???'),
            'nome' => $this->faker->company(),
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'atividades_avaliacao_automatico' => 0,
            'planos_prazo_comparecimento' => 10,
            'planos_tipo_prazo_comparecimento' => 'DIAS',
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'autoedicao_subordinadas' => 1,
            'entidade_id' => $entidade->id,
        ];
    }

    public function instituidora(): static
    {
        return $this->state(['instituidora' => 1]);
    }
}
