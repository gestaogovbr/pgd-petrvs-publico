<?php

use App\Models\Capacidade;
use App\Models\CargaIndividualSiapeRelatorio;
use App\Models\Perfil;
use App\Models\TipoCapacidade;
use App\Models\Usuario;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

beforeEach(function () {
    if (!Schema::connection('tenant')->hasTable('cargas_individuais_siape_relatorios')) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_04_22_000000_create_cargas_individuais_siape_relatorios_table.php',
            '--database' => 'tenant',
            '--force' => true,
        ]);
    }
});

test('endpoint retorna relatorio de carga individual por id para usuario autorizado', function () {
    $perfil = Perfil::factory()->create();
    $tipoCapacidade = TipoCapacidade::create([
        'id' => (string) Str::uuid(),
        'codigo' => 'MOD_SIAPE_RELATORIO_CARGA',
        'descricao' => 'Relatorio de carga individual SIAPE',
    ]);
    Capacidade::create([
        'id' => (string) Str::uuid(),
        'perfil_id' => $perfil->id,
        'tipo_capacidade_id' => $tipoCapacidade->id,
    ]);
    $usuario = Usuario::factory()->create(['perfil_id' => $perfil->id]);

    $relatorio = CargaIndividualSiapeRelatorio::create([
        'processamento_id' => (string) Str::uuid(),
        'tipo' => 'servidor',
        'chave' => '11122233344',
        'status' => 'sucesso',
        'entrada_valida' => true,
        'mensagem_usuario' => 'Carga individual concluida.',
        'orientacoes' => ['Orientacao'],
        'secoes' => [],
        'processado_em' => CarbonImmutable::now(),
        'expira_em' => CarbonImmutable::now()->addDays(30),
    ]);

    Sanctum::actingAs($usuario);
    $this->withoutExceptionHandling();

    $response = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/siape/relatorio-carga-individual', [
            'id' => $relatorio->id,
        ]);

    $response->assertOk();
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('relatorio.id', $relatorio->id);
    $response->assertJsonPath('relatorio.tipo', 'servidor');
});

test('endpoint bloqueia relatorio de carga individual para usuario sem permissao', function () {
    $perfil = Perfil::factory()->create();
    $usuario = Usuario::factory()->create(['perfil_id' => $perfil->id]);

    Sanctum::actingAs($usuario);

    $response = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/siape/relatorio-carga-individual', [
            'id' => (string) Str::uuid(),
        ]);

    $response->assertForbidden();
    $response->assertJsonPath('success', false);
});
