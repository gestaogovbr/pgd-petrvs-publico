<?php

namespace Database\Factories;

use App\Models\Entidade;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EntidadeFactory extends Factory
{
    protected $model = Entidade::class;

    public function definition(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'sigla' => 'ENT_' . strtoupper($this->faker->lexify('???')),
            'nome' => 'Entidade ' . $this->faker->company(),
            'abrangencia' => 'NACIONAL',
            'carga_horaria_padrao' => 8,
            'gravar_historico_processo' => 0,
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
        ];
    }
}
