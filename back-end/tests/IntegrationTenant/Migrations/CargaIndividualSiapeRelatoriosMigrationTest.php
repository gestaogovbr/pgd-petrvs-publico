<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

test('migration cria tabela tenant de relatorios de carga individual SIAPE com colunas e indices esperados', function () {
    $table = 'cargas_individuais_siape_relatorios';

    if (!Schema::connection('tenant')->hasTable($table)) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_04_22_000000_create_cargas_individuais_siape_relatorios_table.php',
            '--database' => 'tenant',
            '--force' => true,
        ]);
    }

    expect(Schema::connection('tenant')->hasTable($table))->toBeTrue();
    expect(Schema::connection('tenant')->hasColumns($table, [
        'id',
        'processamento_id',
        'tipo',
        'chave',
        'status',
        'entrada_valida',
        'mensagem_usuario',
        'orientacoes',
        'secoes',
        'solicitante_id',
        'processado_em',
        'expira_em',
        'created_at',
        'updated_at',
        'deleted_at',
    ]))->toBeTrue();

    $indexes = collect(DB::connection('tenant')->select("SHOW INDEX FROM {$table}"))
        ->pluck('Key_name')
        ->unique()
        ->values()
        ->all();

    expect($indexes)->toContain('ci_siape_rel_processamento_unique');
    expect($indexes)->toContain('ci_siape_rel_tipo_chave_idx');
    expect($indexes)->toContain('ci_siape_rel_processado_idx');
    expect($indexes)->toContain('ci_siape_rel_expira_idx');
});

test('retencao padrao do relatorio de carga individual SIAPE e de 30 dias', function () {
    expect(config('integracao.siape_relatorio_carga_individual.retencao_dias'))->toBe(30);
});
