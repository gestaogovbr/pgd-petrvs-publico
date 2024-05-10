<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public $timenow;

  public function __construct()
  {
    $this->timenow = now();
  }

  public function run()
  {
    $perfis = Perfil::all();
    $usuarios_desenvolvedores = [
      [
        'email' => 'geisimar.rech87@gmail.com',
        'nome' => 'Geisimar Rech',
        'cpf' => '01798651106',
        'apelido' => 'Geisimar',
        'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
        'sexo' => 'MASCULINO',
      ],
      [
        'email' => 'henrique.felipe100@gmail.com',
        'nome' => 'Henrique Felipe Alves',
        'cpf' => '40921185898',
        'apelido' => 'Henrique',
        'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
        'sexo' => 'MASCULINO',
      ],
      [
        'email' => 'guibitar@gmail.com',
        'nome' => 'Guilherme Bitar',
        'cpf' => '01914276167',
        'apelido' => 'Guilherme',
        'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
        'sexo' => 'MASCULINO',
      ],
      [
        'email' => 'karinahellen.eng@gmail.com',
        'nome' => 'Karina Silva',
        'cpf' => '05182319177',
        'apelido' => 'Karina',
        'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
        'sexo' => 'FEMININO',
      ],
      [
        'email' => 'cimei.teixeira@gmail.com',
        'nome' => 'Cimei Teixeira',
        'cpf' => '48321770100',
        'apelido' => 'Cimei',
        'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
        'sexo' => 'MASCULINO',
      ],
      [
        'email' => 'marco.coelho@firstbps.com.br',
        'nome' => 'Marco Coelho',
        'cpf' => '03400125954',
        'apelido' => 'Marco',
        'perfil_id' => $perfis->where('nome', 'Desenvolvedor')->first()->id,
        'sexo' => 'MASCULINO',
      ]
    ];

    // Operação de inserção de usuários desenvolvedores
    $unidade_pai = Unidade::where('SIGLA', 'MGI')->first();

    foreach ($usuarios_desenvolvedores as $usuario) {
      $user = Usuario::where('cpf', $usuario['cpf'])->first() ?? new Usuario();
      $user->fill([
        'email' => $usuario['email'],
        'nome' => $usuario['nome'],
        'cpf' => $usuario['cpf'],
        'apelido' => $usuario['apelido'],
        'perfil_id' => $usuario['perfil_id'],
        'matricula' => str_pad(
          rand(1000000, 9999999),
          7,
          0,
          STR_PAD_LEFT
        ),
        'uf' => 'DF',
        'sexo' => $usuario['sexo'],
        'data_modificacao' => $this->timenow,
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
