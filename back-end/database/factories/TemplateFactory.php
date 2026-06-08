<?php

namespace Database\Factories;

use App\Models\Template;
use Illuminate\Database\Eloquent\Factories\Factory;

class TemplateFactory extends Factory
{
    protected $model = Template::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'especie' => 'TCR',
            'titulo' => 'Template TCR Teste',
            'conteudo' => '<p>Plano de trabalho do usuário {{usuario.nome}} na unidade {{unidade.sigla}}</p>',
        ];
    }
}
