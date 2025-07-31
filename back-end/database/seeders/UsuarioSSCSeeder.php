<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Services\NivelAcessoService;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
class UsuarioSSCSeeder extends Seeder
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
      $perfilMasterId =$this->nivelAcessoService->getPerfilAdministradorGeral()->id;
      $unidadePaiId = Unidade::where('unidade_pai_id', null)
        ->first()
        ->id;

      $usuarios_master = [
        [
          'email' => 'adriana.s.carvalho@gestao.gov.br',
          'nome' => 'Adriana Souza de Carvalho',
          'cpf' => '01472652150',
          'apelido' => 'Adriana',
          'perfil_id' => $perfilMasterId,
          'sexo' => 'FEMININO',
          'is_admin' => false,
        ],
        [
          'email' => 'mariana.costa@gestao.gov.br',
          'nome' => 'Mariana Gomes Moreira Costa',
          'cpf' => '12448344671',
          'apelido' => 'Mariana',
          'perfil_id' => $perfilMasterId,
          'sexo' => 'FEMININO',
          'is_admin' => false,
        ],
        [
          'email' => 'geilza.silva@gestao.gov.br',
          'nome' => 'Geilza de Jesus Silva',
          'cpf' => '01222338165',
          'apelido' => 'Geilza',
          'perfil_id' => $perfilMasterId,
          'sexo' => 'FEMININO',
          'is_admin' => false,
        ],
      ];

      // Cria os usuários se não existirem
      foreach ($usuarios_master as $usuarioData) {
        $usuario = Usuario::firstOrCreate(
          ['email' => $usuarioData['email']],
          [
            'nome' => $usuarioData['nome'],
            'cpf' => $usuarioData['cpf'],
            'apelido' => $usuarioData['apelido'],
            'perfil_id' => $usuarioData['perfil_id'],
            'sexo' => $usuarioData['sexo'],
            'is_admin' => $usuarioData['is_admin'],
            'created_at' => $this->timenow,
            'updated_at' => $this->timenow,
          ]
        );
        // Verifica se o usuário foi criado ou atualizado
        if ($usuario->wasRecentlyCreated) {
          $integrante = UnidadeIntegrante::firstOrCreate(
            [
              'unidade_id' => $unidadePaiId,
              'usuario_id' => $usuario->id
            ]
          );

          UnidadeIntegranteAtribuicao::firstOrCreate([
            'atribuicao' => "LOTADO",
            'unidade_integrante_id' => $integrante->id
          ]);  
        }     
      }
    }
  }