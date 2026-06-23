<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const NOTAS_APROVAM = ['Excepcional', 'Alto desempenho', 'Adequado'];
    private const NOTAS_REPROVAM = ['Inadequado', 'Não executado'];

    public function up(): void
    {
        foreach (self::NOTAS_APROVAM as $nota) {
            DB::table('tipos_avaliacoes_notas')
                ->where('nota', 'LIKE', "%{$nota}%")
                ->update(['aprova' => 1]);
        }

        foreach (self::NOTAS_REPROVAM as $nota) {
            DB::table('tipos_avaliacoes_notas')
                ->where('nota', 'LIKE', "%{$nota}%")
                ->update(['aprova' => 0]);
        }
    }

    public function down(): void
    {
        foreach (array_merge(self::NOTAS_APROVAM, self::NOTAS_REPROVAM) as $nota) {
            DB::table('tipos_avaliacoes_notas')
                ->where('nota', 'LIKE', "%{$nota}%")
                ->update(['aprova' => 0]);
        }
    }
};
