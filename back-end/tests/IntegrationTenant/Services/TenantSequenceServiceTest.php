<?php

use App\Enums\SequenceType;
use App\Models\PlanoTrabalho;
use App\Models\Template;
use App\Services\TenantSequenceService;
use Illuminate\Support\Facades\DB;

test('reconstroi os contadores quando o dump deixa a tabela de sequencias vazia', function () {
    $primeiroTemplate = Template::create([
        'especie' => 'OUTRO',
        'titulo' => 'Template anterior ao dump',
    ]);

    DB::connection('tenant')->table('sequences')->delete();

    $numeroPlano = app(TenantSequenceService::class)->nextNumber(SequenceType::PLANO_TRABALHO);
    $segundoTemplate = Template::create([
        'especie' => 'OUTRO',
        'titulo' => 'Template posterior ao dump',
    ]);

    expect($numeroPlano)->toBe(1)
        ->and($segundoTemplate->numero)->toBe($primeiroTemplate->numero + 1)
        ->and(DB::connection('tenant')->table('sequences')->count())->toBe(1);
});

test('preserva os contadores existentes quando a tabela ja tem registro', function () {
    $connection = DB::connection('tenant');
    $connection->table('sequences')->update(['plano_trabalho_numero' => 42]);

    $numero = app(TenantSequenceService::class)->nextNumber(SequenceType::PLANO_TRABALHO);

    expect($numero)->toBe(43)
        ->and($connection->table('sequences')->count())->toBe(1);
});

test('cria plano de trabalho depois de restaurar a sequencia ausente', function () {
    $planoAnterior = PlanoTrabalho::factory()->create();

    DB::connection('tenant')->table('sequences')->delete();

    $novoPlano = PlanoTrabalho::factory()->create();

    expect($novoPlano->numero)->toBe($planoAnterior->numero + 1)
        ->and(DB::connection('tenant')->table('sequences')->count())->toBe(1);
});

test('inicializa cada tipo de sequencia quando a tabela esta vazia', function () {
    $connection = DB::connection('tenant');
    $service = app(TenantSequenceService::class);

    foreach (SequenceType::cases() as $type) {
        $connection->table('sequences')->delete();

        expect($service->nextNumber($type))->toBeGreaterThan(0);
    }
});

test('migration reconstroi contadores e pode ser repetida', function () {
    $connection = DB::connection('tenant');
    $plano = PlanoTrabalho::factory()->create();
    $connection->table('sequences')->delete();

    $migration = require database_path('migrations/tenant/2026_09_22_120000_repair_tenant_sequences.php');
    $migration->up();
    $migration->up();

    expect($connection->table('sequences')->count())->toBe(1)
        ->and((int) $connection->table('sequences')->value('plano_trabalho_numero'))->toBe($plano->numero)
        ->and(app(TenantSequenceService::class)->nextNumber(SequenceType::PLANO_TRABALHO))->toBe($plano->numero + 1);
});
