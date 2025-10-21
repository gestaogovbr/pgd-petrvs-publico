<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Services\NivelAcessoService;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;

class UsuarioAdminSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public $timenow;
  public $nivelAcessoService;

  public function __construct()
  {
    $this->timenow = now();
    $this->nivelAcessoService = new NivelAcessoService();
  }

  public function run()
  {
    $perfilDevId = $this->nivelAcessoService->getPerfilDesenvolvedor()->id;
    $unidadePaiId = Unidade::where('unidade_pai_id', null)
      ->first()
      ->id;

    $usuarios = [
      [
        'email' => 'gabriel.s.domingos@gestao.gov.br',
        'nome' => 'Gabriel Marcos da Silva Domingos',
        'cpf' => '99775708094',
        'matricula' => str_pad(rand(100000, 9999999), 7, '0', STR_PAD_LEFT),
        'apelido' => 'Gabriel',
        'perfil_id' => $perfilDevId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      [
        'email' => '3472974@petrvs.gov.br',
        'nome' => 'Gabriel Marcos da Silva Domingos',
        'cpf' => '06737232167',
        'matricula' => str_pad(rand(100000, 9999999), 7, '0', STR_PAD_LEFT),
        'apelido' => 'Gabriel',
        'perfil_id' => $perfilDevId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      
      [
        'email' => 'gabrieldnb7@gmail.com',
        'nome' => 'Gabriel Marcos da Silva Domingos',
        'cpf' => '99775708095',
        'matricula' => str_pad(rand(100000, 9999999), 7, '0', STR_PAD_LEFT),
        'apelido' => 'Gabriel',
        'perfil_id' => $perfilDevId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
    ];

    foreach ($usuarios as $usuarioData) {
      $usuario = Usuario::where('email', $usuarioData['email'])->first();

      if ($usuario) {
        if (!$usuario->is_admin) {
          $usuario->is_admin = true;
          $usuario->updated_at = $this->timenow;
          $usuario->save();
        }
        continue;
      }

      $usuario = Usuario::create([
        'email' => $usuarioData['email'],
        'nome' => $usuarioData['nome'],
        'cpf' => $usuarioData['cpf'],
        'matricula' => $usuarioData['matricula'],
        'apelido' => $usuarioData['apelido'],
        'perfil_id' => $usuarioData['perfil_id'],
        'sexo' => $usuarioData['sexo'],
        'is_admin' => $usuarioData['is_admin'],
        'created_at' => $this->timenow,
        'updated_at' => $this->timenow,
      ]);

      $integrante = UnidadeIntegrante::firstOrCreate([
        'unidade_id' => $unidadePaiId,
        'usuario_id' => $usuario->id,
      ]);

      UnidadeIntegranteAtribuicao::firstOrCreate([
        'atribuicao' => 'LOTADO',
        'unidade_integrante_id' => $integrante->id,
      ]);
    }
  }
}


