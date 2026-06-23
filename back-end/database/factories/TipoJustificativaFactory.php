<?php

namespace Database\Factories;

use App\Models\TipoJustificativa;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TipoJustificativaFactory extends Factory
{
    protected $model = TipoJustificativa::class;

    public function definition()
    {
        return [
            'id'   =>  Str::uuid(),
            'nome' => $this->faker->sentence(5)
        ];
    }
}
