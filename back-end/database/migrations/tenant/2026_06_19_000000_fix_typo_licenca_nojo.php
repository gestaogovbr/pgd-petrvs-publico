<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $tipoCorreto = DB::table('tipos_motivos_afastamentos')
            ->where('nome', 'Licença nojo (falecimento de pessoa da família)')
            ->first();

        $tipoComTypo = DB::table('tipos_motivos_afastamentos')
            ->where('nome', 'Liença nojo (falecimento de pessoa da família)')
            ->first();

        if ($tipoComTypo === null) {
            return;
        }

        if ($tipoCorreto !== null) {
            DB::table('afastamentos')
                ->where('tipo_motivo_afastamento_id', $tipoComTypo->id)
                ->update(['tipo_motivo_afastamento_id' => $tipoCorreto->id]);

            DB::table('tipos_motivos_afastamentos')
                ->where('id', $tipoComTypo->id)
                ->delete();
        } else {
            DB::table('tipos_motivos_afastamentos')
                ->where('id', $tipoComTypo->id)
                ->update(['nome' => 'Licença nojo (falecimento de pessoa da família)']);
        }
    }

    public function down(): void
    {
        // Irreversível - dados já migrados
    }
};
