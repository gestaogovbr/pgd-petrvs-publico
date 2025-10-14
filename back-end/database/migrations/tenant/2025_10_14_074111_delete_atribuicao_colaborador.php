<?php

use App\Enums\Atribuicao;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $groups = UnidadeIntegranteAtribuicao::where('atribuicao', Atribuicao::COLABORADOR->value)
        ->select('unidade_integrante_id')
        ->groupBy('unidade_integrante_id')
        ->havingRaw('COUNT(*) > 1')
        ->pluck('unidade_integrante_id');

        foreach ($groups as $parentId) {
            // Get all 'Colaborador' records for this group
            $records = UnidadeIntegranteAtribuicao::where('unidade_integrante_id', $parentId)
                ->where('atribuicao', Atribuicao::COLABORADOR->value)
                ->orderBy('id') // or any other logic to choose which one to keep
                ->get();

            // Keep the first, soft delete the rest
            $records->skip(1)->each(function ($record) {
                $record->delete(); // Soft delete
            });
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
