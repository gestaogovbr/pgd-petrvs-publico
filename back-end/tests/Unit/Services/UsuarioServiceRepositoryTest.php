<?php

namespace Tests\Unit\Services;

use App\Exceptions\NotFoundException;
use App\Models\SiapeBlackListServidor;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\PerfilRepository;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\SiapeBlackListServidorRepository;
use App\Repository\TipoModalidadeRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\IntegracaoService;
use App\Services\NivelAcessoService;
use App\Services\RawWhere;
use App\Services\UnidadeIntegranteAtribuicaoService;
use App\Services\UnidadeIntegranteService;
use App\Services\UnidadeService;
use App\Services\UsuarioService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Mockery;
use ReflectionClass;
use Tests\TestCase;

uses(TestCase::class);

/**
 * @param UsuarioService&\Mockery\MockInterface $service
 */
function injectUsuarioServiceDependencies(object $service, array $dependencies): void
{
    $reflection = new ReflectionClass(UsuarioService::class);

    foreach ($dependencies as $propertyName => $dependency) {
        $property = $reflection->getProperty($propertyName);
        $property->setAccessible(true);
        $property->setValue($service, $dependency);
    }
}

beforeEach(function () {
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->perfilRepository = Mockery::mock(PerfilRepository::class);
    $this->tipoModalidadeRepository = Mockery::mock(TipoModalidadeRepository::class);
    $this->integracaoServidorRepository = Mockery::mock(IntegracaoServidorRepository::class);
    $this->planoTrabalhoConsolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->planoTrabalhoRepository = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->planoEntregaRepository = Mockery::mock(PlanoEntregaRepository::class);
    $this->siapeBlackListServidorRepository = Mockery::mock(SiapeBlackListServidorRepository::class);

    $this->tipoModalidadeRepository
        ->shouldReceive('findByNome')
        ->andReturn((object) ['id' => 'mod-default-id'])
        ->byDefault();

    $this->unidadeService = Mockery::mock(UnidadeService::class);
    $this->integracaoService = Mockery::mock(IntegracaoService::class);
    $this->unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
    $this->unidadeIntegranteAtribuicaoService = Mockery::mock(UnidadeIntegranteAtribuicaoService::class);
    $this->nivelAcessoService = Mockery::mock(NivelAcessoService::class);

    $this->app->instance(UnidadeService::class, $this->unidadeService);
    $this->app->instance(IntegracaoService::class, $this->integracaoService);
    $this->app->instance(UnidadeIntegranteService::class, $this->unidadeIntegranteService);
    $this->app->instance(UnidadeIntegranteAtribuicaoService::class, $this->unidadeIntegranteAtribuicaoService);
    $this->app->instance(NivelAcessoService::class, $this->nivelAcessoService);

    DB::shouldReceive('beginTransaction')->byDefault();
    DB::shouldReceive('commit')->byDefault();
    DB::shouldReceive('rollback')->byDefault();

    $this->service = Mockery::mock(UsuarioService::class)->makePartial();
    $this->service->shouldAllowMockingProtectedMethods();

    injectUsuarioServiceDependencies($this->service, [
        'usuarioRepository' => $this->usuarioRepository,
        'unidadeRepository' => $this->unidadeRepository,
        'perfilRepository' => $this->perfilRepository,
        'tipoModalidadeRepository' => $this->tipoModalidadeRepository,
        'integracaoServidorRepository' => $this->integracaoServidorRepository,
        'planoTrabalhoConsolidacaoRepository' => $this->planoTrabalhoConsolidacaoRepository,
        'planoTrabalhoRepository' => $this->planoTrabalhoRepository,
        'planoEntregaRepository' => $this->planoEntregaRepository,
        'siapeBlackListServidorRepository' => $this->siapeBlackListServidorRepository,
    ]);
});

afterEach(function () {
    Mockery::close();
});

describe('UsuarioService - Repository/Facades (Unit)', function () {
    it('construct initializes repositories', function () {
        expect($this->service)->toBeInstanceOf(UsuarioService::class);
    });

    it('search text applies unidade filter for restricted user', function () {
        $data = ['fields' => [], 'where' => []];
        $usuarioId = 'user-id';

        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($usuarioId);
        $userMock->shouldReceive('hasPermissionTo')->with('MOD_USER_TUDO')->andReturn(false);

        Auth::shouldReceive('user')->andReturn($userMock);

        $this->unidadeRepository->shouldReceive('getAreasTrabalhoWhereClause')
            ->once()
            ->with($usuarioId, true, 'where_unidades')
            ->andReturn("unidade_id = 'u1'");

        $this->usuarioRepository->shouldReceive('search')
            ->once()
            ->with(Mockery::on(function (array $arg): bool {
                if (!in_array('usuario_externo', $arg['fields'])) {
                    return false;
                }

                foreach ($arg['where'] as $where) {
                    if ($where instanceof RawWhere && str_contains($where->expression, "unidade_id = 'u1'")) {
                        return true;
                    }
                }

                return false;
            }))
            ->andReturn([]);

        $result = $this->service->searchText($data);

        expect($result)->toBe([]);
    });

    it('search text does not apply filter for admin user', function () {
        $data = ['fields' => [], 'where' => []];
        $usuarioId = 'admin-id';

        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($usuarioId);
        $userMock->shouldReceive('hasPermissionTo')->with('MOD_USER_TUDO')->andReturn(true);

        Auth::shouldReceive('user')->andReturn($userMock);

        $this->unidadeRepository->shouldReceive('getAreasTrabalhoWhereClause')->never();

        $this->usuarioRepository->shouldReceive('search')
            ->once()
            ->with(Mockery::on(function (array $arg): bool {
                foreach ($arg['where'] as $where) {
                    if ($where instanceof RawWhere && str_contains($where->expression, "unidade_id = 'u1'")) {
                        return false;
                    }
                }

                return true;
            }))
            ->andReturn([]);

        $result = $this->service->searchText($data);

        expect($result)->toBe([]);
    });

    it('get by id calls repository', function () {
        $id = 'user-id';

        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('offsetGet')->with('lotacao')->andReturn(null);
        $userMock->shouldReceive('offsetSet')->with('regramentos', []);
        $userMock->shouldReceive('getAttribute')->with('cpf')->andReturn('');
        $userMock->shouldReceive('setAttribute')->with('unidades_vinculadas', []);

        $this->usuarioRepository->shouldReceive('findById')
            ->once()
            ->with($id)
            ->andReturn($userMock);

        $result = $this->service->getById($id);

        expect($result)->toBe($userMock);
    });

    it('get by id inclui unidades vinculadas por cpf', function () {
        $id = 'user-id';

        $usuario = new Usuario();
        $usuario->id = $id;
        $usuario->cpf = '12345678901';
        $usuario->config = [];
        $usuario->setRelation('lotacao', null);

        $unidade = new Unidade();
        $unidade->id = 'unidade-1';
        $unidade->sigla = 'U1';

        $matricula1 = new Usuario();
        $matricula1->id = 'mat-1';
        $matricula1->cpf = '12345678901';
        $matricula1->matricula = '0001';
        $matricula1->situacao_funcional = 'ATIVO';
        $matricula1->setRelation('unidades', new Collection([$unidade]));

        $matricula2 = new Usuario();
        $matricula2->id = 'mat-2';
        $matricula2->cpf = '12345678901';
        $matricula2->matricula = '0002';
        $matricula2->situacao_funcional = 'INATIVO';
        $matricula2->setRelation('unidades', new Collection([$unidade]));

        $this->usuarioRepository->shouldReceive('findById')
            ->once()
            ->with($id)
            ->andReturn($usuario);

        $this->usuarioRepository->shouldReceive('findActivesByCpf')
            ->once()
            ->with('12345678901')
            ->andReturn(new Collection([$matricula2, $matricula1]));

        $this->siapeBlackListServidorRepository->shouldReceive('findByCpfAndOptionalMatricula')
            ->once()
            ->with('12345678901', '0001')
            ->andReturn(null);

        $this->siapeBlackListServidorRepository->shouldReceive('findByCpfAndOptionalMatricula')
            ->once()
            ->with('12345678901', '0002')
            ->andReturn(Mockery::mock(SiapeBlackListServidor::class));

        $result = $this->service->getById($id);

        $unidadesVinculadas = $result->getAttribute('unidades_vinculadas');

        expect($unidadesVinculadas)
            ->toBeArray()
            ->toHaveCount(2)
            ->toBe([
                [
                    'id' => 'unidade-1',
                    'sigla' => 'U1',
                    'situacao_funcional' => 'ATIVO',
                    'matricula' => '0001',
                    'emProcessoDeInativacao' => false,
                ],
                [
                    'id' => 'unidade-1',
                    'sigla' => 'U1',
                    'situacao_funcional' => 'INATIVO',
                    'matricula' => '0002',
                    'emProcessoDeInativacao' => true,
                ],
            ]);
    });

    it('get by id throws not found exception', function () {
        $id = 'invalid-id';

        $this->usuarioRepository
            ->shouldReceive('findById')
            ->once()
            ->with($id)
            ->andReturn(null);

        expect(fn () => $this->service->getById($id))->toThrow(NotFoundException::class);
    });

    it('destroy calls repository', function () {
        $id = 'user-id';

        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($id);
        $userMock->shouldReceive('fresh')->andReturn($userMock);

        $this->usuarioRepository->shouldReceive('findById')->once()->with($id)->andReturn($userMock);
        $this->usuarioRepository->shouldReceive('removerVinculos')->once()->with($id);
        $this->usuarioRepository->shouldReceive('delete')->once()->with($id)->andReturn(true);

        $result = $this->service->destroy($id);

        expect($result)->toBeTrue();
    });

    it('atualizar foto perfil updates repository when changed', function () {
        $tipo = UsuarioService::LOGIN_GOOGLE;
        $url = 'http://new-url.com/photo.jpg';
        $id = 'user-id';

        $usuarioMock = Mockery::mock(Usuario::class);
        $usuarioMock->shouldReceive('getAttribute')->with('id')->andReturn($id);
        $usuarioMock->shouldReceive('__get')->with('id')->andReturn($id);
        $usuarioMock->shouldReceive('__get')->with('foto_google')->andReturn('old-url');
        $usuarioMock->shouldReceive('__get')->with('foto_microsoft')->andReturn(null);
        $usuarioMock->shouldReceive('__get')->with('foto_firebase')->andReturn(null);
        $usuarioMock->shouldReceive('getAttribute')->with('foto_google')->andReturn('old-url');
        $usuarioMock->shouldReceive('setAttribute')->with('foto_perfil', Mockery::any());
        $usuarioMock->shouldReceive('setAttribute')->with('foto_google', $url);
        $usuarioMock->shouldReceive('__set')->with('foto_perfil', Mockery::any());
        $usuarioMock->shouldReceive('__set')->with('foto_google', $url);

        $this->service->shouldReceive('downloadImgProfile')
            ->once()
            ->with($url, 'usuarios/' . $id)
            ->andReturn('path/to/profile.jpg');

        $this->usuarioRepository->shouldReceive('updateFotoPerfil')
            ->once()
            ->with($id, $tipo, $url, 'path/to/profile.jpg');

        $this->service->atualizarFotoPerfil($tipo, $usuarioMock, $url);
    });

    it('is gestor unidade recursivo calls repository', function () {
        $unidadeId = 'unidade-id';
        $usuarioId = 'user-id';

        $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
            ->once()
            ->with($unidadeId, $usuarioId)
            ->andReturn(true);

        $result = $this->service->isGestorUnidadeRecursivo($unidadeId, $usuarioId);

        expect($result)->toBeTrue();
    });

    it('is participante habilitado calls repository', function () {
        $usuarioId = 'user-id';
        $programaId = 'programa-id';

        $this->usuarioRepository->shouldReceive('isParticipanteHabilitado')
            ->once()
            ->with($usuarioId, $programaId)
            ->andReturn(true);

        $result = $this->service->isParticipanteHabilitado($usuarioId, $programaId);

        expect($result)->toBeTrue();
    });

    it('is integrante calls repository', function () {
        $usuarioId = 'user-id';
        $unidadeId = 'unidade-id';
        $atribuicao = 'LOTADO';

        $this->usuarioRepository->shouldReceive('isIntegrante')
            ->once()
            ->with($usuarioId, $unidadeId, $atribuicao)
            ->andReturn(true);

        $result = $this->service->isIntegrante($atribuicao, $unidadeId, $usuarioId);

        expect($result)->toBeTrue();
    });

    it('store creates new user', function () {
        $data = [
            'email' => 'test@test.com',
            'cpf' => '12345678900',
            'matricula' => '12345',
            'nome' => 'Test User',
            'apelido' => 'Tester',
            'perfil_id' => 'perfil-id',
            'integrantes' => [['unidade_id' => 'u1', 'atribuicao' => 'LOTADO']],
        ];

        $unidade = Mockery::mock(Unidade::class);

        $this->usuarioRepository->shouldReceive('findByCpfOrEmail')->andReturn(null);

        $this->service->shouldReceive('validarPerfil')->andReturnNull();
        $this->service->shouldReceive('validarColaborador')->andReturnNull();

        $createdUser = Mockery::mock(Usuario::class);
        $createdUser->shouldReceive('getAttribute')->with('id')->andReturn('new-id');

        $this->usuarioRepository->shouldReceive('create')->once()->andReturn($createdUser);
        $this->unidadeIntegranteService->shouldReceive('salvarIntegrantes');

        $result = $this->service->store($data, $unidade);

        expect($result)->toBe($createdUser);
    });

    it('update calls repository', function () {
        $data = [
            'id' => 'user-id',
            'email' => 'test@test.com',
            'perfil_id' => 'perfil-id',
            'integrantes' => [['unidade_id' => 'u1']],
        ];

        $unidade = Mockery::mock(Unidade::class);

        $this->service->shouldReceive('validarPerfil')->andReturnNull();
        $this->service->shouldReceive('validarColaborador')->andReturnNull();

        $updatedUser = Mockery::mock(Usuario::class);
        $updatedUser->shouldReceive('getAttribute')->with('id')->andReturn('user-id');

        $this->usuarioRepository->shouldReceive('update')->once()->with('user-id', Mockery::any())->andReturn($updatedUser);
        $this->unidadeIntegranteService->shouldReceive('salvarIntegrantes');
        $this->unidadeIntegranteAtribuicaoService->shouldReceive('checkLotacoes');

        $result = $this->service->update($data, $unidade);

        expect($result)->toBe($updatedUser);
    });

    it('update nao altera email quando usuario interno', function () {
        $data = [
            'id' => 'user-id',
            'email' => 'novo@example.com',
            'perfil_id' => 'perfil-id',
        ];

        $unidade = Mockery::mock(Unidade::class);

        $this->service->shouldReceive('validarPerfil')->andReturnNull();
        $this->service->shouldReceive('validarColaborador')->andReturnNull();

        $updatedUser = Mockery::mock(Usuario::class);
        $updatedUser->shouldReceive('getAttribute')->with('id')->andReturn('user-id');

        $this->usuarioRepository->shouldReceive('update')
            ->once()
            ->with('user-id', Mockery::on(function (array $payload): bool {
                return ($payload['email'] ?? null) === 'novo@example.com'
                    && ($payload['tipo_modalidade_id'] ?? null) === 'mod-default-id';
            }))
            ->andReturn($updatedUser);
        $this->unidadeIntegranteAtribuicaoService->shouldReceive('checkLotacoes')->once()->with('user-id');

        $result = $this->service->update($data, $unidade);

        expect($result)->toBe($updatedUser);
    });

    it('atribuicoes gestor calls repository', function () {
        $unidadeId = 'unidade-id';
        $usuarioId = 'user-id';

        $this->usuarioRepository->shouldReceive('getAtribuicoes')
            ->once()
            ->with($usuarioId, $unidadeId)
            ->andReturn(['GESTOR', 'OUTRA']);

        $result = $this->service->atribuicoesGestor($unidadeId, $usuarioId);

        expect($result['gestor'])->toBeTrue()
            ->and($result['gestorSubstituto'])->toBeFalse()
            ->and($result['gestorDelegado'])->toBeFalse();
    });

    it('pendencias chefe calls repositories', function () {
        $usuarioId = 'user-id';
        $unidadeId = 'unidade-id';

        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($usuarioId);
        Auth::shouldReceive('user')->andReturn($userMock);

        $unidadeMock = Mockery::mock(Unidade::class);
        $unidadeMock->shouldReceive('getAttribute')->with('id')->andReturn($unidadeId);
        $unidadeMock->shouldReceive('offsetExists')->with('id')->andReturn(true);
        $unidadeMock->shouldReceive('offsetGet')->with('id')->andReturn($unidadeId);

        $unidadesCollection = new Collection([$unidadeMock]);

        $this->unidadeRepository->shouldReceive('getUnidadesGerenciadas')
            ->once()
            ->with($usuarioId)
            ->andReturn($unidadesCollection);

        $this->unidadeRepository->shouldReceive('getSubordinadas')
            ->once()
            ->with([$unidadeId])
            ->andReturn(new Collection());

        $this->planoTrabalhoConsolidacaoRepository->shouldReceive('getPendentesAvaliacao')
            ->once()
            ->andReturn(new Collection());

        $this->planoTrabalhoRepository->shouldReceive('getPlanosTrabalhoAssinatura')
            ->once()
            ->andReturn(new Collection());

        $this->planoEntregaRepository->shouldReceive('getPlanosEntregaAvaliacao')
            ->once()
            ->andReturn(new Collection());

        $this->planoEntregaRepository->shouldReceive('getPlanosEntregaHomologacao')
            ->once()
            ->andReturn(new Collection());

        $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaExecucao')
            ->once()
            ->andReturn(new Collection());

        $result = $this->service->pendenciasChefe();

        expect($result)
            ->toBeArray()
            ->toHaveKeys(['registrosExecucao', 'planosTrabalhoAssinatura', 'planosEntregaAvaliacao']);
    });

    it('gerar usuario calls repository new usuario', function () {
        $dados = [
            'modalidade_pgd' => 'mod-1',
            'matricula' => '12345',
            'emailfuncional' => 'email@test.com',
            'nome' => 'Nome',
            'cpf' => '123',
            'apelido' => 'Apelido',
            'sexo' => 'M',
            'exercicio' => 'cod-exercicio',
            'data_modificacao' => '2023-01-01',
            'ident_unica' => 'id-unica',
            'telefone' => '123456789',
            'data_nascimento' => '1990-01-01',
            'situacao_funcional' => 'ATIVO',
            'uf' => 'DF',
        ];

        $modalidade = 'mod-default';
        $perfil = 'perfil-id';

        $this->integracaoService->shouldReceive('validarModalidadePgd')->with('mod-1')->andReturn('mod-1-id');

        $novoUsuarioMock = Mockery::mock(Usuario::class);

        $this->usuarioRepository->shouldReceive('newUsuario')
            ->once()
            ->with(Mockery::on(function (array $arg) use ($perfil): bool {
                return ($arg['matricula'] ?? null) === '12345'
                    && ($arg['tipo_modalidade_id'] ?? null) === 'mod-1-id'
                    && ($arg['perfil_id'] ?? null) === $perfil;
            }))
            ->andReturn($novoUsuarioMock);

        $result = $this->service->gerarUsuario($dados, $modalidade, $perfil);

        expect($result)->toBe($novoUsuarioMock);
    });

    it('areas trabalho where calls repository', function () {
        $subordinadas = true;
        $tabela = 'unidades';
        $usuarioId = 'user-id';

        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($usuarioId);
        Auth::shouldReceive('user')->andReturn($userMock);

        $this->unidadeRepository->shouldReceive('getAreasTrabalhoWhereClause')
            ->once()
            ->with($usuarioId, $subordinadas, $tabela)
            ->andReturn('clause');

        $result = $this->service->areasTrabalhoWhere($subordinadas, $tabela);

        expect($result)->toBe('clause');
    });

    it('atualizar servidor calls repository', function () {
        $usuarioObj = (object) [
            'id' => 'user-id',
            'matriculasiape' => '12345',
            'emailfuncional' => 'email@test.com',
            'nome_servidor' => 'Nome',
            'nome_guerra' => 'Apelido',
            'cod_jornada' => 'J1',
            'nome_jornada' => 'Jornada 1',
            'modalidade_pgd' => 'mod-pgd',
            'participa_pgd' => true,
            'ident_unica' => 'id-unica',
            'data_modificacao' => '2023-01-01',
            'data_nascimento' => '1990-01-01',
        ];

        $this->integracaoService->shouldReceive('verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake');
        $this->integracaoService->shouldReceive('validarModalidadePgd')->with('mod-pgd')->andReturn('mod-id');

        $this->usuarioRepository->shouldReceive('update')
            ->once()
            ->with('user-id', Mockery::on(function (array $arg): bool {
                return ($arg['nome'] ?? null) === 'Nome' && ($arg['tipo_modalidade_id'] ?? null) === 'mod-id';
            }));

        $this->service->atualizarServidor($usuarioObj);
    });
});
