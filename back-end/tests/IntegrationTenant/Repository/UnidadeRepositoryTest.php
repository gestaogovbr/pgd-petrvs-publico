<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Perfil;
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
        if (!DB::table('perfis')->where('id', 'perfil-test')->exists()) {
            DB::table('perfis')->insert([
                'id' => 'perfil-test',
                'nome' => 'Participante',
                'descricao' => 'Perfil Participante',
                'nivel' => 1,
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
            'modalidade_pgd' => 'presencial'
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
            'modalidade_pgd' => 'presencial'
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
            'modalidade_pgd' => 'presencial'
        ]);
        $this->assertFalse($this->repository->isUsuarioGestorRecursivo($filho->id, $outro->id));
    }

    public function test_ids_na_hierarquia_de_retorna_unidade_direta()
    {
        $unidade = Unidade::factory()->create();

        $result = $this->repository->idsNaHierarquiaDe([$unidade->id]);

        $this->assertContains($unidade->id, $result);
    }

    public function test_ids_na_hierarquia_de_retorna_subordinada_via_unidade_pai_id()
    {
        $pai = Unidade::factory()->create(['path' => null]);
        $filha = Unidade::factory()->create([
            'unidade_pai_id' => $pai->id,
            'path' => null,
        ]);

        $result = $this->repository->idsNaHierarquiaDe([$pai->id]);

        $this->assertContains($pai->id, $result);
        $this->assertContains($filha->id, $result);
    }

    public function test_ids_na_hierarquia_de_retorna_neta_via_unidade_pai_id()
    {
        $avo = Unidade::factory()->create(['path' => null]);
        $pai = Unidade::factory()->create([
            'unidade_pai_id' => $avo->id,
            'path' => null,
        ]);
        $neta = Unidade::factory()->create([
            'unidade_pai_id' => $pai->id,
            'path' => null,
        ]);

        $result = $this->repository->idsNaHierarquiaDe([$avo->id]);

        $this->assertContains($avo->id, $result);
        $this->assertContains($pai->id, $result);
        $this->assertContains($neta->id, $result);
    }

    public function test_ids_na_hierarquia_de_nao_retorna_unidades_fora()
    {
        $unidadeA = Unidade::factory()->create();
        $unidadeB = Unidade::factory()->create();

        $result = $this->repository->idsNaHierarquiaDe([$unidadeA->id]);

        $this->assertContains($unidadeA->id, $result);
        $this->assertNotContains($unidadeB->id, $result);
    }

    public function test_ids_na_hierarquia_de_com_multiplas_unidades()
    {
        $unidadeA = Unidade::factory()->create();
        $unidadeB = Unidade::factory()->create();
        $filhaA = Unidade::factory()->create([
            'unidade_pai_id' => $unidadeA->id,
            'path' => null,
        ]);
        $filhaB = Unidade::factory()->create([
            'unidade_pai_id' => $unidadeB->id,
            'path' => null,
        ]);

        $result = $this->repository->idsNaHierarquiaDe([$unidadeA->id, $unidadeB->id]);

        $this->assertContains($unidadeA->id, $result);
        $this->assertContains($unidadeB->id, $result);
        $this->assertContains($filhaA->id, $result);
        $this->assertContains($filhaB->id, $result);
    }

    public function test_ids_na_hierarquia_de_usa_unidade_pai_id_e_ignora_path()
    {
        $pai = Unidade::factory()->create(['path' => null]);
        $filha = Unidade::factory()->create([
            'unidade_pai_id' => $pai->id,
            'path' => null,
        ]);
        $neta = Unidade::factory()->create([
            'unidade_pai_id' => $filha->id,
            'path' => null,
        ]);
        $soPath = Unidade::factory()->create([
            'unidade_pai_id' => null,
            'path' => "/{$pai->id}/",
        ]);

        $result = $this->repository->idsNaHierarquiaDe([$pai->id]);

        $this->assertContains($pai->id, $result);
        $this->assertContains($filha->id, $result);
        $this->assertContains($neta->id, $result);
        $this->assertNotContains($soPath->id, $result);
    }
}
