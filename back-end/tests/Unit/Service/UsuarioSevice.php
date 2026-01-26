<?php

use App\Services\UsuarioService;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

uses(TestCase::class);

describe('UsuarioService - isGestorUnidadeRecursivo', function () {
    beforeEach(function () {
        if (!Schema::hasTable('usuarios')) {
            Schema::create('usuarios', function ($table) {
                $table->char('id', 36)->primary();
                $table->string('nome');
                $table->string('email');
                $table->string('cpf');
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('unidades')) {
            Schema::create('unidades', function ($table) {
                $table->char('id', 36)->primary();
                $table->string('nome');
                $table->char('unidade_pai_id', 36)->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('unidades_integrantes')) {
            Schema::create('unidades_integrantes', function ($table) {
                $table->char('id', 36)->primary();
                $table->char('unidade_id', 36);
                $table->char('usuario_id', 36);
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('unidades_integrantes_atribuicoes')) {
            Schema::create('unidades_integrantes_atribuicoes', function ($table) {
                $table->char('id', 36)->primary();
                $table->enum('atribuicao', ['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO', 'LOTADO', 'COLABORADOR']);
                $table->char('unidade_integrante_id', 36);
                $table->timestamps();
                $table->softDeletes();
            });
        }

        $this->service = new UsuarioService();
        
        DB::table('usuarios')->insert([
            'id' => 'user-1',
            'nome' => 'Test User',
            'email' => 'test@test.com',
            'cpf' => '12345678901',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $mockUser = new Usuario();
        $mockUser->id = 'user-1';
        $this->service = Mockery::mock(UsuarioService::class)->makePartial();
        $this->service->shouldReceive('loggedUser')->andReturn($mockUser);
    });

    afterEach(function () {
        Schema::dropIfExists('unidades_integrantes_atribuicoes');
        Schema::dropIfExists('unidades_integrantes');
        Schema::dropIfExists('unidades');
        Schema::dropIfExists('usuarios');
        Mockery::close();
    });

    test('retorna true quando usuário é gestor da própria unidade', function () {
        DB::table('unidades')->insert([
            'id' => 'unidade-1',
            'nome' => 'Unidade 1',
            'unidade_pai_id' => null,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes')->insert([
            'id' => 'integrante-1',
            'unidade_id' => 'unidade-1',
            'usuario_id' => 'user-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes_atribuicoes')->insert([
            'id' => 'atribuicao-1',
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => 'integrante-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $result = $this->service->isGestorUnidadeRecursivo('unidade-1');

        expect($result)->toBeTrue();
    });

    test('retorna true quando usuário é gestor da unidade pai', function () {
        DB::table('unidades')->insert([
            ['id' => 'unidade-pai', 'nome' => 'Unidade Pai', 'unidade_pai_id' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 'unidade-filha', 'nome' => 'Unidade Filha', 'unidade_pai_id' => 'unidade-pai', 'created_at' => now(), 'updated_at' => now()]
        ]);

        DB::table('unidades_integrantes')->insert([
            'id' => 'integrante-1',
            'unidade_id' => 'unidade-pai',
            'usuario_id' => 'user-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes_atribuicoes')->insert([
            'id' => 'atribuicao-1',
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => 'integrante-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $result = $this->service->isGestorUnidadeRecursivo('unidade-filha');

        expect($result)->toBeTrue();
    });

    test('retorna true quando usuário é gestor substituto em hierarquia', function () {
        DB::table('unidades')->insert([
            ['id' => 'unidade-avo', 'nome' => 'Unidade Avô', 'unidade_pai_id' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 'unidade-pai', 'nome' => 'Unidade Pai', 'unidade_pai_id' => 'unidade-avo', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 'unidade-filho', 'nome' => 'Unidade Filho', 'unidade_pai_id' => 'unidade-pai', 'created_at' => now(), 'updated_at' => now()]
        ]);

        DB::table('unidades_integrantes')->insert([
            'id' => 'integrante-1',
            'unidade_id' => 'unidade-avo',
            'usuario_id' => 'user-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes_atribuicoes')->insert([
            'id' => 'atribuicao-1',
            'atribuicao' => 'GESTOR_SUBSTITUTO',
            'unidade_integrante_id' => 'integrante-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $result = $this->service->isGestorUnidadeRecursivo('unidade-filho');

        expect($result)->toBeTrue();
    });

    test('retorna true quando usuário é gestor delegado', function () {
        DB::table('unidades')->insert([
            'id' => 'unidade-1',
            'nome' => 'Unidade 1',
            'unidade_pai_id' => null,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes')->insert([
            'id' => 'integrante-1',
            'unidade_id' => 'unidade-1',
            'usuario_id' => 'user-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes_atribuicoes')->insert([
            'id' => 'atribuicao-1',
            'atribuicao' => 'GESTOR_DELEGADO',
            'unidade_integrante_id' => 'integrante-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $result = $this->service->isGestorUnidadeRecursivo('unidade-1');

        expect($result)->toBeTrue();
    });

    test('retorna false quando usuário não é gestor em nenhuma unidade da hierarquia', function () {
        DB::table('unidades')->insert([
            ['id' => 'unidade-pai', 'nome' => 'Unidade Pai', 'unidade_pai_id' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 'unidade-filha', 'nome' => 'Unidade Filha', 'unidade_pai_id' => 'unidade-pai', 'created_at' => now(), 'updated_at' => now()]
        ]);

        DB::table('unidades_integrantes')->insert([
            'id' => 'integrante-1',
            'unidade_id' => 'unidade-pai',
            'usuario_id' => 'user-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes_atribuicoes')->insert([
            'id' => 'atribuicao-1',
            'atribuicao' => 'COLABORADOR',
            'unidade_integrante_id' => 'integrante-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $result = $this->service->isGestorUnidadeRecursivo('unidade-filha');

        expect($result)->toBeFalse();
    });

    test('retorna false quando usuário não tem nenhuma atribuição', function () {
        DB::table('unidades')->insert([
            'id' => 'unidade-1',
            'nome' => 'Unidade 1',
            'unidade_pai_id' => null,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $result = $this->service->isGestorUnidadeRecursivo('unidade-1');

        expect($result)->toBeFalse();
    });

    test('ignora registros soft deleted', function () {
        DB::table('unidades')->insert([
            'id' => 'unidade-1',
            'nome' => 'Unidade 1',
            'unidade_pai_id' => null,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes')->insert([
            'id' => 'integrante-1',
            'unidade_id' => 'unidade-1',
            'usuario_id' => 'user-1',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => now()
        ]);

        DB::table('unidades_integrantes_atribuicoes')->insert([
            'id' => 'atribuicao-1',
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => 'integrante-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $result = $this->service->isGestorUnidadeRecursivo('unidade-1');

        expect($result)->toBeFalse();
    });

    test('funciona com usuário específico fornecido', function () {
        DB::table('usuarios')->insert([
            'id' => 'user-2',
            'nome' => 'Test User 2',
            'email' => 'test2@test.com',
            'cpf' => '12345678902',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades')->insert([
            'id' => 'unidade-1',
            'nome' => 'Unidade 1',
            'unidade_pai_id' => null,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes')->insert([
            'id' => 'integrante-1',
            'unidade_id' => 'unidade-1',
            'usuario_id' => 'user-2',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades_integrantes_atribuicoes')->insert([
            'id' => 'atribuicao-1',
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => 'integrante-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $result = $this->service->isGestorUnidadeRecursivo('unidade-1', 'user-2');

        expect($result)->toBeTrue();
    });
});
