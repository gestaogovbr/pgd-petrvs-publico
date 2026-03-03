<?php

namespace Database\Factories;

use App\Models\ProgramaParticipante;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProgramaParticipanteFactory extends Factory
{
    protected $model = ProgramaParticipante::class;

    public function definition()
    {
        return [
            'id' => $this->faker->uuid,
            'habilitado' => true,
            'programa_id' => \App\Models\Programa::factory(),
            'usuario_id' => \App\Models\Usuario::factory(),
        ];
    }
}
