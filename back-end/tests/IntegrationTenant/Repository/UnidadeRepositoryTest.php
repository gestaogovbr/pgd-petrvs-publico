<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Models\TipoModalidade;
use App\Repository\UnidadeRepository;
use Tests\DatabaseTenantTestCase;
use Illuminate\Support\Facades\DB;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Support\Str;

class UnidadeRepositoryTest extends DatabaseTenantTestCase
{
    protected $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = app(UnidadeRepository::class);
        
        // Ensure constraints are satisfied
        if (DB::table('perfis')->count() == 0) {
            DB::table('perfis')->insert([
                'id' => 'perfil-test',
                'nome' => 'Participante',
                'descricao' => 'Perfil Participante',
                'nivel' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        
        if (DB::table('tipos_modalidades')->count() == 0) {
            DB::table('tipos_modalidades')->insert([
                'id' => 'modalidade-test',
                'nome' => 'Presencial',
                'exige_pedagio' => 0,
                'plano_trabalho_calcula_horas' => 1,
                'atividade_tempo_despendido' => 1,
                'atividade_esforco' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function test_has_usuario_lotacao()
    {
        $unidade = Unidade::factory()->create();
        $usuario = Usuario::factory()->create([
            'perfil_id' => 'perfil-test',
            'tipo_modalidade_id' => 'modalidade-test'
        ]);
        
        $ui = new UnidadeIntegrante();
        $ui->unidade_id = $unidade->id;
        $ui->usuario_id = $usuario->id;
        $ui->save();
        
        $uia = new UnidadeIntegranteAtribuicao();
        $uia->unidade_integrante_id = $ui->id;
        $uia->atribuicao = 'LOTADO';
        $uia->save();
            
        $this->assertTrue($this->repository->hasUsuarioLotacao($unidade->id, $usuario->id));
        $this->assertFalse($this->repository->hasUsuarioLotacao('invalid-id', $usuario->id));
    }

    public function test_is_usuario_gestor_recursivo()
    {
        $pai = Unidade::factory()->create();
        $filho = Unidade::factory()->create(['unidade_pai_id' => $pai->id]);
        
        $gestor = Usuario::factory()->create([
            'perfil_id' => 'perfil-test',
            'tipo_modalidade_id' => 'modalidade-test'
        ]);
        
        $ui = new UnidadeIntegrante();
        $ui->unidade_id = $pai->id;
        $ui->usuario_id = $gestor->id;
        $ui->save();
        
        $uia = new UnidadeIntegranteAtribuicao();
        $uia->unidade_integrante_id = $ui->id;
        $uia->atribuicao = 'GESTOR';
        $uia->save();
        
        $this->assertTrue($this->repository->isUsuarioGestorRecursivo($pai->id, $gestor->id));
        $this->assertTrue($this->repository->isUsuarioGestorRecursivo($filho->id, $gestor->id));
        
        $outro = Usuario::factory()->create([
            'perfil_id' => 'perfil-test',
            'tipo_modalidade_id' => 'modalidade-test'
        ]);
        $this->assertFalse($this->repository->isUsuarioGestorRecursivo($filho->id, $outro->id));
    }
}
