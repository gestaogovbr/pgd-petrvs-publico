<?php

use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Perfil;
use App\Repository\UsuarioRepository;
use Illuminate\Support\Facades\DB;
use App\Services\UsuarioService;

beforeEach(function () {
    DB::statement('SET FOREIGN_KEY_CHECKS=0');
    $this->repository = app(UsuarioRepository::class);
    
    // Setup TipoModalidade
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

    // Setup Entidade
    if (DB::table('entidades')->count() == 0) {
        DB::table('entidades')->insert([
            'id' => 'entidade-1',
            'sigla' => 'ENT',
            'nome' => 'Entidade Teste',
            'abrangencia' => 'NACIONAL',
            'carga_horaria_padrao' => 8,
            'gravar_historico_processo' => 0,
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
            'expediente' => json_encode(['domingo'=>[],'segunda'=>[],'terca'=>[],'quarta'=>[],'quinta'=>[],'sexta'=>[],'sabado'=>[],'especial'=>[]]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    // Setup basic profile
    if (Perfil::count() == 0) {
        DB::table('perfis')->insert([
            'id' => 'perfil-1',
            'nome' => 'Participante',
            'descricao' => 'Perfil Participante',
            'nivel' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
});

afterEach(function () {
    DB::statement('SET FOREIGN_KEY_CHECKS=1');
});

describe('UsuarioRepository', function () {
    
    describe('#create', function () {
        test('cria usuario com sucesso', function () {
            $data = [
                'email' => 'teste@teste.com',
                'nome' => 'Teste Usuario',
                'cpf' => '12345678900',
                'matricula' => '123456',
                'perfil_id' => 'perfil-1',
                'tipo_modalidade_id' => 'modalidade-1'
            ];
            
            $usuario = $this->repository->create($data);
            
            expect($usuario)->toBeInstanceOf(Usuario::class);
            expect($usuario->email)->toBe('teste@teste.com');
            expect($usuario->cpf)->toBe('12345678900');
            
            $dbUser = DB::table('usuarios')->where('id', $usuario->id)->first();
            expect($dbUser)->not->toBeNull();
        });
    });

    describe('#update', function () {
        test('atualiza usuario com sucesso', function () {
            $id = 'user-1';
            DB::table('usuarios')->insert([
                'id' => $id,
                'email' => 'old@teste.com',
                'nome' => 'Old Name',
                'cpf' => '11111111111',
                'perfil_id' => 'perfil-1',
                'tipo_modalidade_id' => 'modalidade-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            $data = [
                'nome' => 'New Name',
                'email' => 'new@teste.com'
            ];
            
            $usuario = $this->repository->update($id, $data);
            
            expect($usuario->nome)->toBe('New Name');
            expect($usuario->email)->toBe('new@teste.com');
            
            $dbUser = DB::table('usuarios')->where('id', $id)->first();
            expect($dbUser->nome)->toBe('New Name');
        });
    });

    describe('#findById', function () {
        test('retorna usuario por id', function () {
            $id = 'user-find';
            DB::table('usuarios')->insert([
                'id' => $id,
                'email' => 'find@teste.com',
                'nome' => 'Find Me',
                'cpf' => '22222222222',
                'perfil_id' => 'perfil-1',
                'tipo_modalidade_id' => 'modalidade-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            $usuario = $this->repository->findById($id);
            expect($usuario)->not->toBeNull();
            expect($usuario->id)->toBe($id);
        });

        test('retorna null se nao encontrar', function () {
            $usuario = $this->repository->findById('non-existent');
            expect($usuario)->toBeNull();
        });
    });

    describe('#findByCpfOrEmail', function () {
        test('encontra por cpf', function () {
            $cpf = '33333333333';
            DB::table('usuarios')->insert([
                'id' => 'user-cpf',
                'email' => 'cpf@teste.com',
                'nome' => 'CPF User',
                'cpf' => $cpf,
                'perfil_id' => 'perfil-1',
                'tipo_modalidade_id' => 'modalidade-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            $usuario = $this->repository->findByCpfOrEmail($cpf, 'other@mail.com');
            expect($usuario)->not->toBeNull();
            expect($usuario->cpf)->toBe($cpf);
        });

        test('encontra por email', function () {
            $email = 'email@teste.com';
            DB::table('usuarios')->insert([
                'id' => 'user-email',
                'email' => $email,
                'nome' => 'Email User',
                'cpf' => '44444444444',
                'perfil_id' => 'perfil-1',
                'tipo_modalidade_id' => 'modalidade-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            $usuario = $this->repository->findByCpfOrEmail('00000000000', $email);
            expect($usuario)->not->toBeNull();
            expect($usuario->email)->toBe($email);
        });
    });
    
    describe('#isGestorUnidadeRecursivo', function () {
        test('verifica gestor recursivo', function () {
            // Unidade Pai
            DB::table('unidades')->insert([
                'id' => 'unidade-pai',
                'nome' => 'Pai',
                'codigo' => '1',
                'sigla' => 'PAI',
                'path' => '/unidade-pai/',
                'entidade_id' => 'entidade-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            // Unidade Filho
            DB::table('unidades')->insert([
                'id' => 'unidade-filho',
                'nome' => 'Filho',
                'codigo' => '2',
                'sigla' => 'FILHO',
                'unidade_pai_id' => 'unidade-pai',
                'path' => '/unidade-pai/unidade-filho/',
                'entidade_id' => 'entidade-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            // Usuario Gestor Pai
            $gestorId = 'gestor-pai';
            DB::table('usuarios')->insert([
                'id' => $gestorId,
                'email' => 'gestor@pai.com',
                'nome' => 'Gestor Pai',
                'cpf' => '55555555555',
                'perfil_id' => 'perfil-1',
                'tipo_modalidade_id' => 'modalidade-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            // Atribuicao Gestor na Unidade Pai
            DB::table('unidades_integrantes')->insert([
                'id' => 'integrante-1',
                'unidade_id' => 'unidade-pai',
                'usuario_id' => $gestorId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            DB::table('unidades_integrantes_atribuicoes')->insert([
                'id' => 'atribuicao-1',
                'unidade_integrante_id' => 'integrante-1',
                'atribuicao' => 'GESTOR',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            // Verifica se é gestor da unidade pai
            expect($this->repository->isGestorUnidadeRecursivo($gestorId, 'unidade-pai'))->toBeTrue();
            
            // Verifica se é gestor da unidade filho (recursivo)
            // Note: The implementation of isGestorUnidadeRecursivo relies on CTEs or recursive logic.
            // If the implementation uses path logic or parent relationships, this should work.
            expect($this->repository->isGestorUnidadeRecursivo($gestorId, 'unidade-filho'))->toBeTrue();
            
            // Usuario Comum
            $comumId = 'usuario-comum';
            DB::table('usuarios')->insert([
                'id' => $comumId,
                'email' => 'comum@teste.com',
                'nome' => 'Comum',
                'cpf' => '66666666666',
                'perfil_id' => 'perfil-1',
                'tipo_modalidade_id' => 'modalidade-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            expect($this->repository->isGestorUnidadeRecursivo($comumId, 'unidade-pai'))->toBeFalse();
        });
    });
});
