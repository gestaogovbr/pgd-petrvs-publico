<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use Tests\DatabaseTenantTestCase;
use Illuminate\Support\Facades\DB;

class UsuarioRepositoryTest extends DatabaseTenantTestCase
{
    /** @var UsuarioRepository */
    protected $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = app(UsuarioRepository::class);
        
        // Setup TipoModalidade and Perfil as they are needed for Usuario creation
        if (DB::table('tipos_modalidades')->count() == 0) {
            DB::table('tipos_modalidades')->insert([
                'id' => 'modalidade-1',
                'nome' => 'Presencial',
                'exige_pedagio' => 0,
                'plano_trabalho_calcula_horas' => 1,
                'atividade_tempo_despendido' => 1,
                'atividade_esforco' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        if (DB::table('perfis')->count() == 0) {
            DB::table('perfis')->insert([
                'id' => 'perfil-1',
                'nome' => 'Participante',
                'descricao' => 'Perfil Participante',
                'nivel' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function test_create_and_find_user()
    {
        $data = [
            'email' => 'test@example.com',
            'nome' => 'Test User',
            'cpf' => '11111111111',
            'perfil_id' => 'perfil-1',
            'tipo_modalidade_id' => 'modalidade-1',
        ];

        /** @var Usuario $user */
        $user = $this->repository->create($data);
        
        $this->assertInstanceOf(Usuario::class, $user);
        $this->assertEquals('Test User', $user->nome);
        $this->assertNotEmpty($user->id);
        
        /** @var Usuario $found */
        $found = $this->repository->findById($user->id);
        $this->assertNotNull($found);
        $this->assertEquals('Test User', $found->nome);
    }

    public function test_update_user()
    {
        $data = [
            'email' => 'test@example.com',
            'nome' => 'Test User',
            'cpf' => '11111111111',
            'perfil_id' => 'perfil-1',
            'tipo_modalidade_id' => 'modalidade-1',
        ];
        
        /** @var Usuario $user */
        $user = $this->repository->create($data);
        
        $this->repository->update($user->id, ['nome' => 'Updated User']);
        
        /** @var Usuario $found */
        $found = $this->repository->findById($user->id);
        $this->assertEquals('Updated User', $found->nome);
    }
    
    public function test_delete_user()
    {
        $data = [
            'email' => 'test@example.com',
            'nome' => 'Test User',
            'cpf' => '11111111111',
            'perfil_id' => 'perfil-1',
            'tipo_modalidade_id' => 'modalidade-1',
        ];
        
        /** @var Usuario $user */
        $user = $this->repository->create($data);
        
        $this->repository->delete($user->id);
        
        $found = $this->repository->findById($user->id);
        $this->assertNull($found);
    }
}
