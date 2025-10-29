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
      // Verificar se usuário já existe por email ou CPF
      $usuario = Usuario::where('email', $usuarioData['email'])
        ->orWhere('cpf', $usuarioData['cpf'])
        ->first();

      if ($usuario) {
        if (!$usuario->is_admin) {
          $usuario->is_admin = true;
          $usuario->updated_at = $this->timenow;
          $usuario->save();
        }
        
        // Verificar se já existe UnidadeIntegrante para este usuário
        $integranteExistente = UnidadeIntegrante::where('usuario_id', $usuario->id)
          ->where('unidade_id', $unidadePaiId)
          ->first();
          
        if (!$integranteExistente) {
          $integrante = UnidadeIntegrante::create([
            'unidade_id' => $unidadePaiId,
            'usuario_id' => $usuario->id,
          ]);

          UnidadeIntegranteAtribuicao::create([
            'atribuicao' => 'LOTADO',
            'unidade_integrante_id' => $integrante->id,
          ]);
        }
        continue;
      }

      // Criar usuário usando new e save para garantir que o ID seja gerado
      $usuario = new Usuario();
      $usuario->email = $usuarioData['email'];
      $usuario->nome = $usuarioData['nome'];
      $usuario->cpf = $usuarioData['cpf'];
      $usuario->matricula = $usuarioData['matricula'];
      $usuario->apelido = $usuarioData['apelido'];
      $usuario->perfil_id = $usuarioData['perfil_id'];
      $usuario->sexo = $usuarioData['sexo'];
      $usuario->is_admin = $usuarioData['is_admin'];
      $usuario->created_at = $this->timenow;
      $usuario->updated_at = $this->timenow;
      
      $usuario->save();

      $integrante = UnidadeIntegrante::create([
        'unidade_id' => $unidadePaiId,
        'usuario_id' => $usuario->id,
      ]);

      UnidadeIntegranteAtribuicao::create([
        'atribuicao' => 'LOTADO',
        'unidade_integrante_id' => $integrante->id,
      ]);
    }
  }
}


