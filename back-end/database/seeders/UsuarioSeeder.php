<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Perfil;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $perfis = Perfil::all();
        //
        $usuarios = [
            [
                'email' => 'edson.marian@prf.gov.br',
                'nome' => 'Edson dos Santos Marian',
                'cpf' => '67703011053',
                'apelido' => 'Marian',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
                'data_inicio' => Carbon::now()
            ],
            [
                'email' => 'genisson.albuquerque@prf.gov.br',
                'nome' => 'Genisson',
                'cpf' => '07408707425',
                'apelido' => 'Genisson',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
                'data_inicio' => Carbon::now()
            ],
            [
                'email' => 'ricardo.farias@prf.gov.br',
                'nome' => 'Ricardo de Sousa',
                'cpf' => '25941933304',
                'apelido' => 'Ricardo',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
                'data_inicio' => Carbon::now()
            ],
            [
                'email' => 'caroline.ribeiro@prf.gov.br',
                'nome' => 'Caroline da Costa Freire Ribeiro',
                'cpf' => '01492368164',
                'apelido' => 'Caroline',
                'perfil_id' => $perfis->where('nome', 'Administrador')->first()->id,
                'data_inicio' => Carbon::now()
            ],
            [
                'email' => 'edson.franca@mj.gov.br',
                'nome' => 'Edson Dario Silva de França',
                'cpf' => '01380127416',
                'apelido' => 'Edson',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
                'data_inicio' => Carbon::now()
            ],
            [
                'email' => 'geisimar.rech87@gmail.com',
                'nome' => 'Geisimar Rech',
                'cpf' => '01798651106',
                'apelido' => 'Geisimar',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
                'data_inicio' => Carbon::now()
            ],
            [
                'email' => 'pablorgds@gmail.com',
                'nome' => 'Pablo Roberto',
                'cpf' => '05178506138',
                'apelido' => 'Pablorgds',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
                'data_inicio' => Carbon::now()
            ]
        ];

        foreach($usuarios as $usuario)
        {
            $user = Usuario::where('cpf', $usuario['cpf'])->first() ?? new Usuario();
            $user->fill([
                'email' => $usuario['email'],
                'nome' => $usuario['nome'],
                'cpf' => $usuario['cpf'],
                'apelido' => $usuario['apelido'],
                'data_inicio' => Carbon::now(),
                'perfil_id' => $usuario['perfil_id']
            ]);
            $user->save();
        }
    }
}
