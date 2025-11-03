<?php

use App\Enums\Atribuicao;
use App\Models\UnidadeIntegranteAtribuicao;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $lotadoGroups = UnidadeIntegranteAtribuicao::where('atribuicao', Atribuicao::LOTADO->value)
            ->pluck('unidade_integrante_id');
        $deleted_at = Carbon::now();
        
        // Step 2: Soft delete all 'COLABORADOR' records in those groups
        $records = UnidadeIntegranteAtribuicao::whereIn('unidade_integrante_id', $lotadoGroups)
            ->where('atribuicao', Atribuicao::COLABORADOR->value)
            ->update(['deleted_at' => $deleted_at]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
