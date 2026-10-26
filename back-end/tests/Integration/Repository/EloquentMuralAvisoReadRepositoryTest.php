<?php

declare(strict_types=1);

use App\Enums\MuralAvisoDestinatario;
use App\Enums\MuralAvisoRemetenteTipo;
use App\Models\MuralAviso;
use App\Models\PainelUsuario;
use App\Models\Tenant;
use App\Repository\MuralAviso\MuralAvisoRepository;
use Illuminate\Support\Str;

/**
 * Cria um aviso diretamente no banco central para os cenários de listagem.
 *
 * @param array<string, mixed> $overrides
 */
function criarMuralAviso(string $publicadoPorId, array $overrides = []): MuralAviso
{
    return MuralAviso::withoutEvents(function () use ($publicadoPorId, $overrides) {
        $aviso = new MuralAviso(array_merge([
            'titulo' => 'Aviso ' . uniqid(),
            'conteudo' => 'Conteúdo do aviso',
            'destinatario' => MuralAvisoDestinatario::TENANT_ESPECIFICO->value,
            'tenant_id' => null,
            'remetente_tipo' => MuralAvisoRemetenteTipo::ORGAO_CENTRAL->value,
            'remetente_tenant_id' => null,
            'publicado_por_user_panel_id' => $publicadoPorId,
            'data_publicacao' => now(),
            'data_expiracao' => now()->addMonth(),
        ], $overrides));

        $aviso->id = (string) Str::uuid();
        $aviso->save();

        return $aviso;
    });
}

beforeEach(function () {
    $this->tenantA = Tenant::withoutEvents(fn () => Tenant::create(['id' => 'mural_tenant_a_' . uniqid()]));
    $this->tenantB = Tenant::withoutEvents(fn () => Tenant::create(['id' => 'mural_tenant_b_' . uniqid()]));

    $this->publicador = PainelUsuario::withoutEvents(fn () => PainelUsuario::create([
        'nome' => 'Publicador',
        'email' => 'publicador_' . uniqid() . '@exemplo.com',
        'cpf' => '00000000000',
        'password' => md5('senha'),
        'nivel' => 1,
    ]));

    $this->avisoGlobal = criarMuralAviso((string) $this->publicador->id, [
        'destinatario' => MuralAvisoDestinatario::TODOS->value,
        'tenant_id' => null,
        'remetente_tipo' => MuralAvisoRemetenteTipo::ORGAO_CENTRAL->value,
    ]);
    $this->avisoTenantA = criarMuralAviso((string) $this->publicador->id, [
        'tenant_id' => $this->tenantA->id,
        'remetente_tipo' => MuralAvisoRemetenteTipo::TENANT->value,
        'remetente_tenant_id' => $this->tenantA->id,
    ]);
    $this->avisoTenantB = criarMuralAviso((string) $this->publicador->id, [
        'tenant_id' => $this->tenantB->id,
        'remetente_tipo' => MuralAvisoRemetenteTipo::TENANT->value,
        'remetente_tenant_id' => $this->tenantB->id,
    ]);
    // Aviso direcionado ao tenant A, porém emitido pelo Órgão Central.
    $this->avisoCentralParaTenantA = criarMuralAviso((string) $this->publicador->id, [
        'tenant_id' => $this->tenantA->id,
        'remetente_tipo' => MuralAvisoRemetenteTipo::ORGAO_CENTRAL->value,
        'remetente_tenant_id' => null,
    ]);

    $this->repository = app(MuralAvisoRepository::class);
});

test('configurador vê apenas avisos dos seus tenants, sem avisos globais', function () {
    $result = $this->repository->paginateForPainel([$this->tenantA->id], 15);

    $ids = collect($result->items())->pluck('id')->all();

    expect($ids)->toContain($this->avisoTenantA->id)
        ->and($ids)->not->toContain($this->avisoGlobal->id)
        ->and($ids)->not->toContain($this->avisoTenantB->id);
});

test('configurador não vê avisos do seu tenant emitidos pelo Órgão Central', function () {
    $result = $this->repository->paginateForPainel([$this->tenantA->id], 15);

    $ids = collect($result->items())->pluck('id')->all();

    expect($ids)->toContain($this->avisoTenantA->id)
        ->and($ids)->not->toContain($this->avisoCentralParaTenantA->id);
});

test('configurador com múltiplos tenants vê todos os seus, mas não os globais', function () {
    $result = $this->repository->paginateForPainel([$this->tenantA->id, $this->tenantB->id], 15);

    $ids = collect($result->items())->pluck('id')->all();

    expect($ids)->toContain($this->avisoTenantA->id)
        ->and($ids)->toContain($this->avisoTenantB->id)
        ->and($ids)->not->toContain($this->avisoGlobal->id);
});

test('órgão central (filtro vazio) vê avisos globais e de todos os tenants', function () {
    $result = $this->repository->paginateForPainel([], 15);

    $ids = collect($result->items())->pluck('id')->all();

    expect($ids)->toContain($this->avisoGlobal->id)
        ->and($ids)->toContain($this->avisoTenantA->id)
        ->and($ids)->toContain($this->avisoTenantB->id)
        ->and($ids)->toContain($this->avisoCentralParaTenantA->id);
});
