<?php

namespace Tests\Unit\V2\MuralAviso;

use App\Enums\MuralAvisoDestinatario;
use App\Enums\MuralAvisoRemetenteTipo;
use App\Models\MuralAviso;
use App\Models\MuralAvisoLeitura;
use App\Repository\MuralAviso\MuralAvisoRepository;
use App\Repository\MuralAvisoLeitura\MuralAvisoLeituraRepository;
use App\Repository\TenantRepository;
use App\V2\MuralAviso\DTOs\MuralAvisoDestroyDTO;
use App\V2\MuralAviso\DTOs\MuralAvisoPendenteDTO;
use App\V2\MuralAviso\DTOs\MuralAvisoQueryDTO;
use App\V2\MuralAviso\DTOs\MuralAvisoStoreDTO;
use App\V2\MuralAviso\MuralAvisoService;
use App\V2\MuralAviso\Validators\MuralAvisoAuthorizationValidator;
use App\V2\MuralAviso\Validators\MuralAvisoStoreValidator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repository = Mockery::mock(MuralAvisoRepository::class);
    $this->leituraRepository = Mockery::mock(MuralAvisoLeituraRepository::class);
    $this->tenantRepository = Mockery::mock(TenantRepository::class);
    $this->storeValidator = Mockery::mock(MuralAvisoStoreValidator::class);
    $this->authValidator = Mockery::mock(MuralAvisoAuthorizationValidator::class);

    $this->service = new MuralAvisoService(
        $this->repository,
        $this->leituraRepository,
        $this->tenantRepository,
        $this->storeValidator,
        $this->authValidator,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('MuralAvisoService::index', function () {

    test('órgão central consulta sem filtro de tenant', function () {
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->repository->shouldReceive('paginateForPainel')
            ->once()
            ->with([], 15)
            ->andReturn($paginator);

        $dto = new MuralAvisoQueryDTO(
            nivelUsuario: 1,
            tenantIds: ['tenant-1'],
            perPage: 15,
        );

        $result = $this->service->index($dto);

        expect($result)->toBe($paginator);
    });

    test('usuário não-central consulta filtrado por tenants', function () {
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->repository->shouldReceive('paginateForPainel')
            ->once()
            ->with(['tenant-1', 'tenant-2'], 10)
            ->andReturn($paginator);

        $dto = new MuralAvisoQueryDTO(
            nivelUsuario: 2,
            tenantIds: ['tenant-1', 'tenant-2'],
            perPage: 10,
        );

        $result = $this->service->index($dto);

        expect($result)->toBe($paginator);
    });
});

describe('MuralAvisoService::store', function () {

    test('cria aviso chamando validator e repository', function () {
        $dto = MuralAvisoStoreDTO::fromArray(
            ['titulo' => 'Teste', 'conteudo' => 'Conteúdo', 'destinatario' => MuralAvisoDestinatario::TODOS->value, 'tenant_id' => null, 'data_publicacao' => '2026-08-20', 'data_expiracao' => '2026-09-20'],
            'user-1',
            1,
            [],
        );

        $this->storeValidator->shouldReceive('validar')
            ->once()
            ->with($dto);

        $aviso = Mockery::mock(MuralAviso::class)->makePartial();
        $aviso->id = 'aviso-new';

        $this->repository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function (array $data) {
                return $data['titulo'] === 'Teste'
                    && $data['conteudo'] === 'Conteúdo'
                    && $data['destinatario'] === MuralAvisoDestinatario::TODOS->value
                    && $data['tenant_id'] === null
                    && $data['remetente_tipo'] === MuralAvisoRemetenteTipo::ORGAO_CENTRAL->value
                    && $data['remetente_tenant_id'] === null
                    && $data['publicado_por_user_panel_id'] === 'user-1'
                    && $data['data_publicacao'] === '2026-08-20'
                    && $data['data_expiracao'] === '2026-09-20';
            }))
            ->andReturn($aviso);

        $result = $this->service->store($dto);

        expect($result->id)->toBe('aviso-new');
    });

    test('define remetente_tipo TENANT para usuário não-central', function () {
        $dto = MuralAvisoStoreDTO::fromArray(
            ['titulo' => 'Teste', 'conteudo' => 'Conteúdo', 'destinatario' => 'TENANT_ESPECIFICO', 'tenant_id' => 'tenant-1', 'data_publicacao' => '2026-08-20', 'data_expiracao' => '2026-09-20'],
            'user-2',
            2,
            ['tenant-1'],
        );

        $this->storeValidator->shouldReceive('validar')
            ->once()
            ->with($dto);

        $aviso = Mockery::mock(MuralAviso::class)->makePartial();

        $this->repository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function (array $data) {
                return $data['remetente_tipo'] === MuralAvisoRemetenteTipo::TENANT->value
                    && $data['remetente_tenant_id'] === 'tenant-1'
                    && $data['tenant_id'] === 'tenant-1';
            }))
            ->andReturn($aviso);

        $this->service->store($dto);
    });
});

describe('MuralAvisoService::update', function () {

    test('valida autorização e atualiza', function () {
        $dto = MuralAvisoStoreDTO::fromArray(
            ['titulo' => 'Atualizado', 'conteudo' => 'Novo conteúdo', 'destinatario' => MuralAvisoDestinatario::TODOS->value, 'tenant_id' => null, 'data_publicacao' => '2026-08-20', 'data_expiracao' => '2026-09-20'],
            'user-1',
            1,
            [],
        );

        $avisoExistente = Mockery::mock(MuralAviso::class)->makePartial();
        $avisoExistente->id = 'aviso-1';

        $this->authValidator->shouldReceive('validar')
            ->once()
            ->with('aviso-1', 1, [])
            ->andReturn($avisoExistente);

        $this->storeValidator->shouldReceive('validar')
            ->once()
            ->with($dto);

        $avisoAtualizado = Mockery::mock(MuralAviso::class)->makePartial();
        $avisoAtualizado->id = 'aviso-1';
        $avisoAtualizado->titulo = 'Atualizado';

        $this->repository->shouldReceive('update')
            ->once()
            ->with('aviso-1', Mockery::on(function (array $data) {
                return $data['titulo'] === 'Atualizado'
                    && $data['data_publicacao'] === '2026-08-20'
                    && $data['data_expiracao'] === '2026-09-20';
            }))
            ->andReturn($avisoAtualizado);

        $result = $this->service->update('aviso-1', $dto);

        expect($result->titulo)->toBe('Atualizado');
    });
});

describe('MuralAvisoService::destroy', function () {

    test('valida autorização e deleta', function () {
        $aviso = Mockery::mock(MuralAviso::class)->makePartial();
        $aviso->id = 'aviso-1';

        $this->authValidator->shouldReceive('validar')
            ->once()
            ->with('aviso-1', 2, ['tenant-1'])
            ->andReturn($aviso);

        $this->repository->shouldReceive('delete')
            ->once()
            ->with('aviso-1')
            ->andReturn(true);

        $dto = new MuralAvisoDestroyDTO(
            id: 'aviso-1',
            nivelUsuario: 2,
            tenantIds: ['tenant-1'],
        );

        $this->service->destroy($dto);

        expect(true)->toBeTrue();
    });
});

describe('MuralAvisoService::pendentes', function () {

    test('retorna DTOs de avisos pendentes quando usuário nunca confirmou', function () {
        $this->leituraRepository->shouldReceive('findByUsuarioId')
            ->once()
            ->with('user-1')
            ->andReturn(null);

        $this->repository->shouldReceive('findPendentes')
            ->once()
            ->with('tenant-1', null)
            ->andReturn([
                [
                    'id' => 'aviso-1',
                    'titulo' => 'Aviso 1',
                    'conteudo' => 'Conteúdo 1',
                    'remetente_tipo' => MuralAvisoRemetenteTipo::ORGAO_CENTRAL->value,
                    'remetente_tenant_id' => null,
                    'data_publicacao' => '2026-01-01 10:00:00',
                ],
            ]);

        $result = $this->service->pendentes('user-1', 'tenant-1');

        expect($result)->toHaveCount(1);
        expect($result[0])->toBeInstanceOf(MuralAvisoPendenteDTO::class);
        expect($result[0]->remetente)->toBe('Órgão Central');
    });

    test('usa data_confirmacao quando leitura existe', function () {
        $leitura = Mockery::mock(MuralAvisoLeitura::class)->makePartial();
        $leitura->data_confirmacao = now()->subDay();

        $this->leituraRepository->shouldReceive('findByUsuarioId')
            ->once()
            ->with('user-1')
            ->andReturn($leitura);

        $this->repository->shouldReceive('findPendentes')
            ->once()
            ->with('tenant-1', Mockery::type(\DateTimeInterface::class))
            ->andReturn([]);

        $result = $this->service->pendentes('user-1', 'tenant-1');

        expect($result)->toBeEmpty();
    });

    test('resolve remetente como nome do tenant quando tipo TENANT', function () {
        $this->leituraRepository->shouldReceive('findByUsuarioId')->andReturn(null);

        $this->repository->shouldReceive('findPendentes')
            ->andReturn([
                [
                    'id' => 'aviso-1',
                    'titulo' => 'Aviso',
                    'conteudo' => 'Conteúdo',
                    'remetente_tipo' => MuralAvisoRemetenteTipo::TENANT->value,
                    'remetente_tenant_id' => 'tenant-x',
                    'data_publicacao' => '2026-01-01 10:00:00',
                ],
            ]);

        $tenant = Mockery::mock(\App\Models\Tenant::class)->makePartial();
        $tenant->id = 'tenant-x';
        $this->tenantRepository->shouldReceive('findById')
            ->once()
            ->with('tenant-x')
            ->andReturn($tenant);

        $result = $this->service->pendentes('user-1', 'tenant-1');

        expect($result[0]->remetente)->toBe('tenant-x');
    });
});

describe('MuralAvisoService::confirmarLeitura', function () {

    test('chama upsert no leituraRepository', function () {
        $this->leituraRepository->shouldReceive('upsert')
            ->once()
            ->with('user-1', Mockery::type(\DateTimeInterface::class));

        $this->service->confirmarLeitura('user-1');

        expect(true)->toBeTrue();
    });
});
