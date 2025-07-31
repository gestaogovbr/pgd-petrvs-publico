<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Entidade;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Database\Seeder;
use App\Services\NivelAcessoService;
class UsuarioSeeder extends Seeder
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
    $perfilDesenvolvedorId =$this->nivelAcessoService->getPerfilDesenvolvedor()->id;
    $usuarios_desenvolvedores = [
      [
        'email' => 'geisimar.rech87@gmail.com',
        'nome' => 'Geisimar Rech',
        'cpf' => '01798651106',
        'apelido' => 'Geisimar',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      [
        'email' => 'rickgrana@gmail.com',
        'nome' => 'Ricardo Grana de Lima',
        'cpf' => '74065505291',
        'apelido' => 'Grana',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      [
        'email' => 'guibitar@gmail.com',
        'nome' => 'Guilherme Bitar',
        'cpf' => '01914276167',
        'apelido' => 'Guilherme',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      [
        'email' => 'cimei.teixeira@gmail.com',
        'nome' => 'Cimei Teixeira',
        'cpf' => '48321770100',
        'apelido' => 'Cimei',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      [
        'email' => 'marco.coelho@firstbps.com.br',
        'nome' => 'Marco Coelho',
        'cpf' => '03400125954',
        'apelido' => 'Marco',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      [
        'email' => 'juliane.perini@mds.gov.br',
        'nome' => 'Juliane Helriguel de Melo Perini',
        'cpf' => '78232848120',
        'apelido' => 'Juliane',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'FEMININO',
        'is_admin' => true,
      ],
      [
        'email' => 'thais.brito@economia.gov.br',
        'nome' => 'Thaís Barral de Oliveira Brito',
        'cpf' => '82162492504',
        'apelido' => 'Thais',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'FEMININO',
        'is_admin' => true,
      ],
      [
        'email' => 'bruno.santos@firstbps.com.br',
        'nome' => 'Bruno',
        'cpf' => '11555557759',
        'apelido' => 'Bruno',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      [
        'email' => 'keilla.oliveira@gestao.gov.br',
        'nome' => 'Keilla Terumi Nishi de Oliveira',
        'cpf' => '01837409129',
        'apelido' => 'Keilla',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'FEMININO',
        'is_admin' => true,
      ],
      [
        'email' => 'gabriel.s.domingos@gestao.gov.br',
        'nome' => ' Gabriel Marcos da Silva',
        'cpf' => '44239586003',
        'apelido' => 'Gabriel',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
      [
        'email' => 'diego.braga@gestao.gov.br',
        'nome' => ' Diego Braga',
        'cpf' => '02559875101',
        'apelido' => 'Diego',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ],
       [
        'email' => 'rafaelstibery@gmail.com',
        'nome' => ' Rafael Tibery',
        'cpf' => '05210244121',
        'apelido' => 'Rafael',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
       ],
       [
        'email' => 'rhuan.rodrigues@gestao.gov.br',
        'nome' => ' Rhuan Maciel Rodrigues',
        'cpf' => '13968027469',
        'apelido' => 'Rhuan',
        'perfil_id' => $perfilDesenvolvedorId,
        'sexo' => 'MASCULINO',
        'is_admin' => true,
      ]
    ];

    $cpfsParaExcluir = ['05182319177'];
    Usuario::whereIn('cpf', $cpfsParaExcluir)->delete();

    $usuario = Usuario::onlyTrashed()->where('cpf', '40921185898')->first();
    if ($usuario) {
      $usuario->restore();
    }

    $entidade = Entidade::first();
    // Operação de inserção de usuários desenvolvedores
    if ($entidade) {
        $unidade_pai = Unidade::where('entidade_id', $entidade->id)->first();
    }

    foreach ($usuarios_desenvolvedores as $usuario) {
      try {
      
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
          'is_admin' => $usuario['is_admin'],
        ]);
        $user->save();

        if(empty($user->lotacoes())){
          # criar se não existir
          if ($unidade_pai) {
              $integrante = UnidadeIntegrante::firstOrCreate(
              [
                  'unidade_id' => $unidade_pai->id,
                  'usuario_id' => $user->id
              ]
              );

              UnidadeIntegranteAtribuicao::firstOrCreate([
              'atribuicao' => "LOTADO",
              'unidade_integrante_id' => $integrante->id
              ]);
          }
        }
      } catch (\Exception $e) {
        continue;
      }

    }

    try {
      $rafael = Usuario::where('email', 'rafaelstibery@gmail.com')->first();
      if ($rafael) {
        $rafael->update(['cpf' => '05210244121']);
      }

      $gabriel = Usuario::where('email', 'gabriel.s.domingos@gestao.gov.br')->first();
      if ($gabriel) {
        $gabriel->update(['cpf' => '06737232167']);
      }
    } catch (\Exception $e) {
      // Tratar exceção se necessário, mas continuar o processo
    }
  }
}
