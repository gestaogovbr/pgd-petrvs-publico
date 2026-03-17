<?php

namespace Database\Factories;

use App\Models\Entidade;
use App\Models\Cidade;
use App\Models\TipoModalidade;
use Illuminate\Database\Eloquent\Factories\Factory;

class EntidadeFactory extends Factory
{
    protected $model = Entidade::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'sigla' => $this->faker->unique()->lexify('????'),
            'nome' => $this->faker->company(),
            'abrangencia' => $this->faker->randomElement(['NACIONAL', 'ESTADUAL', 'MUNICIPAL']),
            'codigo_ibge' => $this->faker->numerify('#######'),
            'carga_horaria_padrao' => 8,
            'gravar_historico_processo' => 0,
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
            'habilitar_relatos_siape' => 0,
        ];
    }
}
