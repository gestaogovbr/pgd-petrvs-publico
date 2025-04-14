<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Stancl\Tenancy\Tenancy;

// CHAMADO #1144
// https://github.com/gestaogovbr/petrvs-pgd/issues/1144

return new class extends Migration {
    public function up(): void
    {
        $tenant = app(Tenancy::class)->tenant;

        if (!$tenant || $tenant->id !== 'MGI') {
            return;
        }

        DB::table('unidades_integrantes')
            ->whereIn('id', [
                '5dbd7e4c-da73-4e6f-b55c-894f8f57a43c',
                '5dbd7e4c-da73-4e6f-b55c-894f8f57a43c'
            ])
            ->update(['unidade_id' => '85446480-79a5-4904-97f2-1157e8c4e355']);

        DB::table('unidades_integrantes')
            ->whereIn('id', [
                '1a8c2a6e-2739-452d-8f6b-eff2e8429442',
                '1a8c2a6e-2739-452d-8f6b-eff2e8429442'
            ])
            ->update(['unidade_id' => 'e8c99bbb-6e5b-4c16-bad8-d01cd82ac50d']);
    }

    public function down(): void
    {
        // Reverter as alterações, se necessário
    }
};
