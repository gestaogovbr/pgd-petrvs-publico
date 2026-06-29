<?php

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\UsuarioService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

describe('UsuarioService - isGestorUnidadeRecursivo (Integration)', function () {

    beforeEach(function () {
        config(['database.default' => 'tenant']);
        DB::setDefaultConnection('tenant');
        $this->entidadeId = Str::uuid()->toString();
        
        try {
            DB::connection('tenant')->table('entidades')->insert([
                'id' => $this->entidadeId,
                'sigla' => 'ENT',
                'nome' => 'Entidade Teste',
                'abrangencia' => 'NACIONAL',
                'carga_horaria_padrao' => 8,
                'gravar_historico_processo' => 0,
                'layout_formulario_atividade' => 'COMPLETO',
                'forma_contagem_carga_horaria' => 'DIA',
                'expediente' => json_encode(['domingo'=>[],'segunda'=>[],'terca'=>[],'quarta'=>[],'quinta'=>[],'sexta'=>[],'sabado'=>[],'especial'=>[]]),
                'habilitar_relatos_siape' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ]);

        } catch (\Exception $e) {
            // dump('Setup Failed: ' . $e->getMessage());
            throw $e;
        }
    });

    test('retorna true quando usuário é gestor da própria unidade', function () {
        $service = new UsuarioService();
        
        $user = new Usuario();
        $user->setConnection('tenant');
        $user->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Test User',
            'email' => 'test@test.com',
            'cpf' => '12345678901',
            'password' => 'password',
            'apelido' => 'Test',
            'modalidade_pgd' => 'presencial'
        ])->save();
        
        $unidade = new Unidade();
        $unidade->setConnection('tenant');
        $unidade->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade 1',
            'codigo' => 'U1',
            'sigla' => 'U1',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $integrante = new UnidadeIntegrante();
        $integrante->setConnection('tenant');
        $integrante->forceFill([
            'id' => Str::uuid(),
            'unidade_id' => $unidade->id,
            'usuario_id' => $user->id,
        ])->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->setConnection('tenant');
        $atribuicao->forceFill([
            'id' => Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR',
        ])->save();

        $this->actingAs($user);
        
        $this->assertDatabaseHas('unidades', ['id' => $unidade->id], 'tenant');
        $this->assertDatabaseHas('unidades_integrantes', ['unidade_id' => $unidade->id, 'usuario_id' => $user->id], 'tenant');
        $this->assertDatabaseHas('unidades_integrantes_atribuicoes', ['unidade_integrante_id' => $integrante->id, 'atribuicao' => 'GESTOR'], 'tenant');

        $result = $service->isGestorUnidadeRecursivo($unidade->id);

        expect($result)->toBeTrue();
    });

    test('retorna true quando usuário é gestor da unidade pai', function () {
        $service = new UsuarioService();
        
        $user = new Usuario();
        $user->setConnection('tenant');
        $user->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Test User 2',
            'email' => 'test2@test.com',
            'cpf' => '12345678902',
            'password' => 'password',
            'apelido' => 'Test 2',
            'modalidade_pgd' => 'presencial'
        ])->save();
        
        $unidadePai = new Unidade();
        $unidadePai->setConnection('tenant');
        $unidadePai->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade Pai',
            'codigo' => 'UP',
            'sigla' => 'UP',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $unidadeFilha = new Unidade();
        $unidadeFilha->setConnection('tenant');
        $unidadeFilha->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade Filha',
            'codigo' => 'UF',
            'sigla' => 'UF',
            'instituidora' => 0,
            'unidade_pai_id' => $unidadePai->id,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $integrante = new UnidadeIntegrante();
        $integrante->setConnection('tenant');
        $integrante->forceFill([
            'id' => Str::uuid(),
            'unidade_id' => $unidadePai->id,
            'usuario_id' => $user->id,
        ])->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->setConnection('tenant');
        $atribuicao->forceFill([
            'id' => Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR',
        ])->save();

        $this->actingAs($user);

        $result = $service->isGestorUnidadeRecursivo($unidadeFilha->id);

        expect($result)->toBeTrue();
    });

    test('retorna true quando usuário é gestor substituto em hierarquia', function () {
        $service = new UsuarioService();
        
        $user = new Usuario();
        $user->setConnection('tenant');
        $user->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Test User 3',
            'email' => 'test3@test.com',
            'cpf' => '12345678903',
            'password' => 'password',
            'apelido' => 'Test 3',
            'modalidade_pgd' => 'presencial'
        ])->save();
        
        $unidadeAvo = new Unidade();
        $unidadeAvo->setConnection('tenant');
        $unidadeAvo->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade Avo',
            'codigo' => 'UA',
            'sigla' => 'UA',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $unidadePai = new Unidade();
        $unidadePai->setConnection('tenant');
        $unidadePai->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade Pai 2',
            'codigo' => 'UP2',
            'sigla' => 'UP2',
            'instituidora' => 0,
            'unidade_pai_id' => $unidadeAvo->id,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $unidadeFilho = new Unidade();
        $unidadeFilho->setConnection('tenant');
        $unidadeFilho->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade Filho',
            'codigo' => 'UF2',
            'sigla' => 'UF2',
            'instituidora' => 0,
            'unidade_pai_id' => $unidadePai->id,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $integrante = new UnidadeIntegrante();
        $integrante->setConnection('tenant');
        $integrante->forceFill([
            'id' => Str::uuid(),
            'unidade_id' => $unidadeAvo->id,
            'usuario_id' => $user->id,
        ])->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->setConnection('tenant');
        $atribuicao->forceFill([
            'id' => Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR_SUBSTITUTO',
        ])->save();

        $this->actingAs($user);

        $result = $service->isGestorUnidadeRecursivo($unidadeFilho->id);

        expect($result)->toBeTrue();
    });

    test('retorna true quando usuário é gestor delegado', function () {
        $service = new UsuarioService();
        
        $user = new Usuario();
        $user->setConnection('tenant');
        $user->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Test User 4',
            'email' => 'test4@test.com',
            'cpf' => '12345678904',
            'password' => 'password',
            'apelido' => 'Test 4',
            'modalidade_pgd' => 'presencial'
        ])->save();

        $unidade = new Unidade();
        $unidade->setConnection('tenant');
        $unidade->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade 2',
            'codigo' => 'U2',
            'sigla' => 'U2',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $integrante = new UnidadeIntegrante();
        $integrante->setConnection('tenant');
        $integrante->forceFill([
            'id' => Str::uuid(),
            'unidade_id' => $unidade->id,
            'usuario_id' => $user->id,
        ])->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->setConnection('tenant');
        $atribuicao->forceFill([
            'id' => Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR_DELEGADO',
        ])->save();

        $this->actingAs($user);

        $result = $service->isGestorUnidadeRecursivo($unidade->id);

        expect($result)->toBeTrue();
    });

    test('retorna false quando usuário não é gestor em nenhuma unidade da hierarquia', function () {
        $service = new UsuarioService();
        
        $user = new Usuario();
        $user->setConnection('tenant');
        $user->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Test User 5',
            'email' => 'test5@test.com',
            'cpf' => '12345678905',
            'password' => 'password',
            'apelido' => 'Test 5',
            'modalidade_pgd' => 'presencial'
        ])->save();
        
        $unidadePai = new Unidade();
        $unidadePai->setConnection('tenant');
        $unidadePai->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade Pai 3',
            'codigo' => 'UP3',
            'sigla' => 'UP3',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $unidadeFilha = new Unidade();
        $unidadeFilha->setConnection('tenant');
        $unidadeFilha->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade Filha 3',
            'codigo' => 'UF3',
            'sigla' => 'UF3',
            'instituidora' => 0,
            'unidade_pai_id' => $unidadePai->id,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $integrante = new UnidadeIntegrante();
        $integrante->setConnection('tenant');
        $integrante->forceFill([
            'id' => Str::uuid(),
            'unidade_id' => $unidadePai->id,
            'usuario_id' => $user->id,
        ])->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->setConnection('tenant');
        $atribuicao->forceFill([
            'id' => Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'COLABORADOR',
        ])->save();

        $this->actingAs($user);

        $result = $service->isGestorUnidadeRecursivo($unidadeFilha->id);

        expect($result)->toBeFalse();
    });

    test('retorna false quando usuário não tem nenhuma atribuição', function () {
        $service = new UsuarioService();
        
        $user = new Usuario();
        $user->setConnection('tenant');
        $user->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Test User 6',
            'email' => 'test6@test.com',
            'cpf' => '12345678906',
            'password' => 'password',
            'apelido' => 'Test 6',
            'modalidade_pgd' => 'presencial'
        ])->save();

        $unidade = new Unidade();
        $unidade->setConnection('tenant');
        $unidade->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade 3',
            'codigo' => 'U3',
            'sigla' => 'U3',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $this->actingAs($user);

        $result = $service->isGestorUnidadeRecursivo($unidade->id);

        expect($result)->toBeFalse();
    });

    test('ignora registros soft deleted', function () {
        $service = new UsuarioService();
        
        $user = new Usuario();
        $user->setConnection('tenant');
        $user->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Test User 7',
            'email' => 'test7@test.com',
            'cpf' => '12345678907',
            'password' => 'password',
            'apelido' => 'Test 7',
            'modalidade_pgd' => 'presencial'
        ])->save();

        $unidade = new Unidade();
        $unidade->setConnection('tenant');
        $unidade->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade 4',
            'codigo' => 'U4',
            'sigla' => 'U4',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $integrante = new UnidadeIntegrante();
        $integrante->setConnection('tenant');
        $integrante->forceFill([
            'id' => Str::uuid(),
            'unidade_id' => $unidade->id,
            'usuario_id' => $user->id,
        ])->save();
        $integrante->delete(); // Soft delete

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->setConnection('tenant');
        $atribuicao->forceFill([
            'id' => Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR',
        ])->save();

        $this->actingAs($user);

        $result = $service->isGestorUnidadeRecursivo($unidade->id);

        expect($result)->toBeFalse();
    });

    test('funciona com usuário específico fornecido', function () {
        $service = new UsuarioService();
        
        $user2 = new Usuario();
        $user2->setConnection('tenant');
        $user2->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Test User 8',
            'email' => 'test8@test.com',
            'cpf' => '12345678908',
            'password' => 'password',
            'apelido' => 'Test 8',
            'modalidade_pgd' => 'presencial'
        ])->save();

        $unidade = new Unidade();
        $unidade->setConnection('tenant');
        $unidade->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Unidade 5',
            'codigo' => 'U5',
            'sigla' => 'U5',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
            'entidade_id' => $this->entidadeId,
        ])->save();

        $integrante = new UnidadeIntegrante();
        $integrante->setConnection('tenant');
        $integrante->forceFill([
            'id' => Str::uuid(),
            'unidade_id' => $unidade->id,
            'usuario_id' => $user2->id,
        ])->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->setConnection('tenant');
        $atribuicao->forceFill([
            'id' => Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR',
        ])->save();

        $result = $service->isGestorUnidadeRecursivo($unidade->id, $user2->id);

        expect($result)->toBeTrue();
    });

});

describe('UsuarioService - proxyQuery filtro hierarquia (Integration)', function () {

    beforeEach(function () {
        config(['database.default' => 'tenant']);
        DB::setDefaultConnection('tenant');

        $this->entidadeId = Str::uuid()->toString();
        DB::connection('tenant')->table('entidades')->insertOrIgnore([
            'id' => $this->entidadeId,
            'sigla' => 'PQT',
            'nome' => 'Entidade ProxyQuery Test',
            'abrangencia' => 'NACIONAL',
            'carga_horaria_padrao' => 8,
            'gravar_historico_processo' => 0,
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
            'expediente' => json_encode([]),
            'habilitar_relatos_siape' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->service = new UsuarioService();

        $this->gestor = proxyQueryCriarUsuario('gestor@test.com', '00000000001');
        $this->unidadeA = proxyQueryCriarUnidade('UA', 'Unidade A', $this->entidadeId);
        $this->unidadeFilhaA = proxyQueryCriarUnidade('UFA', 'Unidade Filha A', $this->entidadeId, $this->unidadeA->id, "/{$this->unidadeA->id}/");
        $this->unidadeB = proxyQueryCriarUnidade('UB', 'Unidade B', $this->entidadeId);

        proxyQueryCriarIntegrante($this->gestor->id, $this->unidadeA->id, 'GESTOR');

        $this->usuarioSubordinado = proxyQueryCriarUsuario('sub@test.com', '00000000002');
        proxyQueryCriarIntegrante($this->usuarioSubordinado->id, $this->unidadeFilhaA->id, 'LOTADO');

        $this->usuarioDireto = proxyQueryCriarUsuario('direto@test.com', '00000000003');
        proxyQueryCriarIntegrante($this->usuarioDireto->id, $this->unidadeA->id, 'LOTADO');

        $this->usuarioFora = proxyQueryCriarUsuario('fora@test.com', '00000000004');
        proxyQueryCriarIntegrante($this->usuarioFora->id, $this->unidadeB->id, 'LOTADO');
    });

    test('com subordinadas=true retorna usuarios lotados na unidade e subordinadas', function () {
        $this->actingAs($this->gestor);

        $query = Usuario::query();
        $data = ['where' => [['subordinadas', '==', true]]];

        $this->service->proxyQuery($query, $data);

        $ids = $query->pluck('id')->all();

        expect($ids)->toContain($this->usuarioDireto->id)
            ->and($ids)->toContain($this->usuarioSubordinado->id)
            ->and($ids)->not->toContain($this->usuarioFora->id);
    });

    test('com subordinadas=false retorna apenas usuarios lotados na unidade direta', function () {
        $this->actingAs($this->gestor);

        $query = Usuario::query();
        $data = ['where' => [['subordinadas', '==', false]]];

        $this->service->proxyQuery($query, $data);

        $ids = $query->pluck('id')->all();

        expect($ids)->toContain($this->usuarioDireto->id)
            ->and($ids)->not->toContain($this->usuarioSubordinado->id)
            ->and($ids)->not->toContain($this->usuarioFora->id);
    });

    test('usuario com MOD_USER_TUDO não aplica filtro de hierarquia', function () {
        $admin = proxyQueryCriarUsuario('admin@test.com', '00000000005');

        $adminMock = Mockery::mock($admin)->makePartial();
        $adminMock->shouldReceive('hasPermissionTo')->with('MOD_USER_TUDO')->andReturn(true);
        Auth::shouldReceive('user')->andReturn($adminMock);

        $service = new UsuarioService();
        $query = Usuario::query();
        $data = ['where' => []];

        $service->proxyQuery($query, $data);

        $ids = $query->pluck('id')->all();

        expect($ids)->toContain($this->usuarioDireto->id)
            ->and($ids)->toContain($this->usuarioSubordinado->id)
            ->and($ids)->toContain($this->usuarioFora->id);
    });
});

// Helpers para proxyQuery tests

function proxyQueryCriarUsuario(string $email, string $cpf): Usuario
{
    $user = new Usuario();
    $user->setConnection('tenant');
    $user->forceFill([
        'id' => Str::uuid()->toString(),
        'nome' => "User {$cpf}",
        'email' => $email,
        'cpf' => $cpf,
        'password' => 'password',
        'apelido' => "User {$cpf}",
        'modalidade_pgd' => 'presencial',
    ])->save();
    return $user;
}

function proxyQueryCriarUnidade(string $sigla, string $nome, string $entidadeId, ?string $paiId = null, ?string $path = null): Unidade
{
    $unidade = new Unidade();
    $unidade->setConnection('tenant');
    $unidade->forceFill([
        'id' => Str::uuid()->toString(),
        'nome' => $nome,
        'codigo' => $sigla,
        'sigla' => $sigla,
        'instituidora' => 0,
        'atividades_arquivamento_automatico' => 0,
        'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
        'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
        'executora' => true,
        'entidade_id' => $entidadeId,
        'unidade_pai_id' => $paiId,
        'path' => $path,
    ])->save();
    return $unidade;
}

function proxyQueryCriarIntegrante(string $usuarioId, string $unidadeId, string $atribuicao): void
{
    $integrante = new UnidadeIntegrante();
    $integrante->setConnection('tenant');
    $integrante->forceFill([
        'id' => Str::uuid()->toString(),
        'unidade_id' => $unidadeId,
        'usuario_id' => $usuarioId,
    ])->save();

    $attr = new UnidadeIntegranteAtribuicao();
    $attr->setConnection('tenant');
    $attr->forceFill([
        'id' => Str::uuid()->toString(),
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => $atribuicao,
    ])->save();
}
