<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
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
                'email' => 'henrique.alves@prf.gov.br',
                'nome' => 'Carlos Henrique Alves Lopes',
                'cpf' => '26751043880',
                'apelido' => 'Carlos III',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'edson.marian@prf.gov.br',
                'nome' => 'Edson dos Santos Marian',
                'cpf' => '67703011053',
                'apelido' => 'Marian',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'genisson.albuquerque@prf.gov.br',
                'nome' => 'Genisson',
                'cpf' => '07408707425',
                'apelido' => 'Genisson',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'ricardo.farias@prf.gov.br',
                'nome' => 'Ricardo de Sousa',
                'cpf' => '25941933304',
                'apelido' => 'Ricardo',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'caroline.ribeiro@prf.gov.br',
                'nome' => 'Caroline da Costa Freire Ribeiro',
                'cpf' => '01492368164',
                'apelido' => 'Caroline',
                'perfil_id' => $perfis->where('nome', 'Administrador')->first()->id,
            ],
            [
                'email' => 'edson.franca@mj.gov.br',
                'nome' => 'Edson Dario Silva de França',
                'cpf' => '01380127416',
                'apelido' => 'Dario',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'edson.dario@gmail.com',
                'nome' => 'Edson Dario Silva de França',
                'cpf' => '01380127416',
                'apelido' => 'Dario',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'geisimar.rech87@gmail.com',
                'nome' => 'Geisimar Rech',
                'cpf' => '01798651106',
                'apelido' => 'Geisimar',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'pablorgds@gmail.com',
                'nome' => 'Pablo Roberto',
                'cpf' => '05178506138',
                'apelido' => 'Pablorgds',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'henrique.felipe100@gmail.com',
                'nome' => 'Henrique Felipe Alves',
                'cpf' => '40921185898',
                'apelido' => 'Henrique',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'guibitar@gmail.com',
                'nome' => 'Guilherme Bitar',
                'cpf' => '01914276167',
                'apelido' => 'Guilherme',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'alexdiasprojetos@gmail.com',
                'nome' => 'Alex Dias Ferreira',
                'cpf' => '94577536153', 
                'apelido' => 'Alex',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'karinahellen.eng@gmail.com',
                'nome' => 'Karina Silva',
                'cpf' => '05182319177',
                'apelido' => 'Karina',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'cimei.teixeira@gmail.com',
                'nome' => 'Cimei Teixeira',
                'cpf' => '48321770100',
                'apelido' => 'Cimei',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'diogo.paiva@prf.gov.br',
                'nome' => 'Diogo Paiva',
                'cpf' => '01710713526',
                'apelido' => 'Paiva',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'marco.coelho@firstbps.com.br',
                'nome' => 'Marco Coelho',
                'cpf' => '03400125954',
                'apelido' => 'Marco',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'jonatas.ferreira@prf.gov.br',
                'nome' => 'Jonata Cunha',
                'cpf' => '09741166702',
                'apelido' => 'Jonata',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
            [
                'email' => 'pauloflausino@gmail.com',
                'nome' => 'Paulo Flausino',
                'cpf' => '22374479854',
                'apelido' => 'Paulo',
                'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
            ],
        ];

        $unidade_pai = Unidade::first();

        foreach($usuarios as $usuario)
        {
            $user = Usuario::where('cpf', $usuario['cpf'])->first() ?? new Usuario();
            $user->fill([
                'email' => $usuario['email'],
                'nome' => $usuario['nome'],
                'cpf' => $usuario['cpf'],
                'apelido' => $usuario['apelido'],
                'perfil_id' => $usuario['perfil_id']
            ]);
            $user->save();
            $integrante = new UnidadeIntegrante([
                'unidade_id' => $unidade_pai->id,
                'usuario_id' => $user->id
            ]);
            $integrante->save();
            $lotacao = new UnidadeIntegranteAtribuicao([
                'atribuicao' => "LOTADO",
                'unidade_integrante_id' => $integrante->id
            ]);
            $lotacao->save();
        }
    }
}
