<?php

use Illuminate\Support\Facades\Schema;

test('schema tenant final usa modalidade_pgd textual e remove tabelas auxiliares', function () {
    expect(Schema::connection('tenant')->hasColumn('usuarios', 'modalidade_pgd'))->toBeTrue()
        ->and(Schema::connection('tenant')->hasColumn('planos_trabalhos', 'modalidade_pgd'))->toBeTrue()
        ->and(Schema::connection('tenant')->hasColumn('entidades', 'modalidade_pgd_padrao'))->toBeTrue()
        ->and(Schema::connection('tenant')->hasColumn('usuarios', 'tipo_modalidade_id'))->toBeFalse()
        ->and(Schema::connection('tenant')->hasColumn('planos_trabalhos', 'tipo_modalidade_id'))->toBeFalse()
        ->and(Schema::connection('tenant')->hasColumn('entidades', 'tipo_modalidade_id'))->toBeFalse()
        ->and(Schema::connection('tenant')->hasTable('tipos_modalidades'))->toBeFalse()
        ->and(Schema::connection('tenant')->hasTable('tipos_modalidades_siape'))->toBeFalse();
});
