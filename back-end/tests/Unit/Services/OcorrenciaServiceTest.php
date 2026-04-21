<?php

use App\DTOs\ListResult;
use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\Models\Afastamento;
use App\Models\Perfil;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\OcorrenciaService;
use App\Services\ServiceBase;
use App\Services\UnidadeService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Tests\TestCase;

uses(TestCase::class);

/** Evita `$with = ['perfil']` do Usuario que sobrescreve `setRelation('perfil', ...)`. */
class UsuarioSemEagerLoadPerfil extends Usuario
{
    protected $with = [];
}

function usuarioParticipanteParaAuth(string $id): UsuarioSemEagerLoadPerfil
{
    /** @var UsuarioSemEagerLoadPerfil&\Mockery\MockInterface $usuario */
    $usuario = Mockery::mock(UsuarioSemEagerLoadPerfil::class)->makePartial();
    $usuario->id = $id;
    $usuario->shouldReceive('hasPermissionTo')->with('MOD_OCOR_UNIDADE')->byDefault()->andReturn(false);
    $usuario->shouldReceive('hasPermissionTo')->with('MOD_OCOR_TODAS_UNIDADES')->byDefault()->andReturn(false);
    $usuario->setRelation('perfil', Perfil::make(['nivel' => PerfilEnum::PARTICIPANTE->value]));

    return $usuario;
}

beforeEach(function () {
    $this->ocorrenciaRepository = Mockery::mock(AfastamentoRepository::class);
    $this->planoTrabalhoRepository = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->app->instance(AfastamentoRepository::class, $this->ocorrenciaRepository);
    $this->app->instance(PlanoTrabalhoRepository::class, $this->planoTrabalhoRepository);
    $this->service = new OcorrenciaService();
    Session::flush();
});

afterEach(function () {
    Mockery::close();
});

describe('OcorrenciaService::insert', function () {
    test('delega persistência ao AfastamentoRepository', function () {
        $retorno = new Afastamento();
        $this->ocorrenciaRepository
            ->shouldReceive('insert')
            ->once()
            ->with(['usuario_id' => 'u1'])
            ->andReturn($retorno);

        expect($this->service->insert(['usuario_id' => 'u1']))->toBe($retorno);
    });
});

describe('OcorrenciaService::query', function () {
    test('repassa params ao findAll quando não há filtros de perfil ou unidade', function () {
        $params = ['where' => []];
        $resultado = new ListResult(collect([]), 0);
        $this->ocorrenciaRepository
            ->shouldReceive('findAll')
            ->once()
            ->with($params)
            ->andReturn($resultado);

        expect($this->service->query($params))->toBe($resultado->toArray());
    });

    test('acrescenta filtro por usuário quando perfil é participante', function () {
        $usuario = usuarioParticipanteParaAuth('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
        Auth::shouldReceive('user')->andReturn($usuario);

        $resultado = new ListResult(collect([]), 0);
        $this->ocorrenciaRepository
            ->shouldReceive('findAll')
            ->once()
            ->with([
                'where' => [
                    ['usuario_id', '==', $usuario->id],
                ],
            ])
            ->andReturn($resultado);

        expect($this->service->query(['where' => []]))->toBe($resultado->toArray());
    });

    test('acrescenta filtro por hierarquia de unidade quando MOD_OCOR_UNIDADE aplica', function () {
        $unidadeContextoId = 'cccccccc-cccc-cccc-cccc-cccccccccccc';
        Session::put('unidade_id', $unidadeContextoId);

        $usuario = Mockery::mock(UsuarioSemEagerLoadPerfil::class)->makePartial();
        $usuario->shouldReceive('hasPermissionTo')->with('MOD_OCOR_UNIDADE')->andReturn(true);
        $usuario->shouldReceive('hasPermissionTo')->with('MOD_OCOR_TODAS_UNIDADES')->andReturn(false);
        Auth::shouldReceive('user')->andReturn($usuario);

        $sub = new Unidade();
        $sub->id = 'dddddddd-dddd-dddd-dddd-dddddddddddd';
        $unidadeService = Mockery::mock(UnidadeService::class);
        $unidadeService->shouldReceive('subordinadas')->once()->with($unidadeContextoId)->andReturn(collect([$sub]));
        $this->app->instance(UnidadeService::class, $unidadeService);

        $resultado = new ListResult(collect([]), 0);
        $this->ocorrenciaRepository
            ->shouldReceive('findAll')
            ->once()
            ->with(Mockery::on(function (array $params) use ($unidadeContextoId, $sub) {
                $expected = [$unidadeContextoId, $sub->id];

                foreach ($params['where'] ?? [] as $w) {
                    if (($w[0] ?? null) === 'usuario_unidade_integrante_ids' && ($w[1] ?? null) === 'in') {
                        $ids = $w[2] ?? [];
                        sort($ids);
                        sort($expected);

                        return $ids === $expected;
                    }
                }

                return false;
            }))
            ->andReturn($resultado);

        expect($this->service->query(['where' => []]))->toBe($resultado->toArray());
    });
});

describe('OcorrenciaService::proxyStore', function () {
    test('força usuario_id do usuário logado no insert para perfil participante', function () {
        $usuario = usuarioParticipanteParaAuth('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee');
        Auth::shouldReceive('user')->andReturn($usuario);

        $data = $this->service->proxyStore(['outro' => 'x'], null, ServiceBase::ACTION_INSERT);

        expect($data['usuario_id'])->toBe($usuario->id)
            ->and($data['outro'])->toBe('x');
    });
});

describe('OcorrenciaService::validateStore', function () {
    test('lança quando plano de trabalho informado não existe', function () {
        $this->planoTrabalhoRepository
            ->shouldReceive('findById')
            ->once()
            ->with('plano-inexistente')
            ->andReturn(null);

        expect(fn () => $this->service->validateStore([
            'plano_trabalho_id' => 'plano-inexistente',
            'usuario_id' => 'user-1',
            'data_inicio' => '2024-01-01T00:00:00',
            'data_fim' => '2024-01-31T23:59:59',
        ], null, ServiceBase::ACTION_INSERT))->toThrow(ServerException::class);
    });

    test('não consulta plano quando plano_trabalho_id está vazio', function () {
        $this->planoTrabalhoRepository->shouldNotReceive('findById');

        $this->service->validateStore([
            'usuario_id' => 'user-1',
            'data_inicio' => '2024-01-01T00:00:00',
            'data_fim' => '2024-01-31T23:59:59',
        ], null, ServiceBase::ACTION_INSERT);
    });

    test('com perfil participante, nega edição de ocorrência de outro usuário', function () {
        $usuario = usuarioParticipanteParaAuth('11111111-1111-1111-1111-111111111111');
        Auth::shouldReceive('user')->andReturn($usuario);

        $existente = new Afastamento(['usuario_id' => '22222222-2222-2222-2222-222222222222']);
        $existente->syncOriginal();

        $this->ocorrenciaRepository
            ->shouldReceive('findById')
            ->once()
            ->with('oc-1')
            ->andReturn($existente);

        expect(fn () => $this->service->validateStore([
            'id' => 'oc-1',
            'usuario_id' => $usuario->id,
        ], null, ServiceBase::ACTION_EDIT))->toThrow(ServerException::class);
    });

    test('com perfil participante, exige usuario_id igual ao logado na edição', function () {
        $usuario = usuarioParticipanteParaAuth('11111111-1111-1111-1111-111111111111');
        Auth::shouldReceive('user')->andReturn($usuario);

        $existente = new Afastamento(['usuario_id' => $usuario->id]);
        $existente->syncOriginal();

        $this->ocorrenciaRepository
            ->shouldReceive('findById')
            ->once()
            ->andReturn($existente);

        expect(fn () => $this->service->validateStore([
            'id' => 'oc-1',
            'usuario_id' => '33333333-3333-3333-3333-333333333333',
        ], null, ServiceBase::ACTION_EDIT))->toThrow(ServerException::class);
    });

    test('aceita edição do participante quando registro e payload pertencem ao próprio usuário', function () {
        $usuario = usuarioParticipanteParaAuth('11111111-1111-1111-1111-111111111111');
        Auth::shouldReceive('user')->andReturn($usuario);

        $existente = new Afastamento(['usuario_id' => $usuario->id]);
        $existente->syncOriginal();

        $this->ocorrenciaRepository->shouldReceive('findById')->once()->andReturn($existente);
        $this->planoTrabalhoRepository->shouldNotReceive('findById');

        $this->service->validateStore([
            'id' => 'oc-1',
            'usuario_id' => $usuario->id,
        ], null, ServiceBase::ACTION_EDIT);
    });

    test('consulta existência do plano quando plano_trabalho_id está preenchido e dados são válidos', function () {
        $plano = new PlanoTrabalho([
            'usuario_id' => 'user-1',
            'data_inicio' => '2024-01-01 00:00:00',
            'data_fim' => '2024-12-31 23:59:59',
        ]);
        $plano->syncOriginal();

        $this->planoTrabalhoRepository
            ->shouldReceive('findById')
            ->once()
            ->with('plano-ok')
            ->andReturn($plano);

        $this->service->validateStore([
            'plano_trabalho_id' => 'plano-ok',
            'usuario_id' => 'user-1',
            'data_inicio' => '2024-01-01T00:00:00',
            'data_fim' => '2024-01-31T23:59:59',
        ], null, ServiceBase::ACTION_INSERT);
    });
});
