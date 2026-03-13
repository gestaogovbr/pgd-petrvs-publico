<?php

namespace Database\Factories;

use App\Models\Usuario;
use App\Models\TipoModalidade;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UsuarioFactory extends Factory
{
    protected $model = Usuario::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'email' => $this->faker->unique()->safeEmail(),
            'nome' => $this->faker->name(),
            'password' => Hash::make('password'),
            'cpf' => $this->faker->numerify('###########'),
            'matricula' => $this->faker->optional()->numerify('##########'),
            'apelido' => $this->faker->firstName(),
            'telefone' => $this->faker->optional()->phoneNumber(),
            'data_nascimento' => $this->faker->optional()->date(),
            'sexo' => $this->faker->randomElement(['MASCULINO', 'FEMININO']),
            'situacao_funcional' => 'APOSENTADO',
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (Usuario $usuario) {
            $tipoModalidade = TipoModalidade::factory()->create();
            $usuario->tipo_modalidade_id = $tipoModalidade->id;
        });
    }

}
