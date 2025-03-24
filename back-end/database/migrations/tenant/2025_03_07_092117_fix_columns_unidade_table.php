<?php

use App\Jobs\SincronizarSiapeJob;
use App\Models\Entidade;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $resultados = DB::select("SELECT u.codigo AS codigo FROM unidades AS u
            INNER JOIN integracao_unidades AS ui ON u.codigo = ui.codigo_siape
            WHERE unidade_pai_id IS NULL OR `path` = ''
            AND ui.pai_siape != '999999'");

        if (empty($resultados)) {
            return;
        }

        $codigos = collect($resultados)->pluck('codigo')->toArray();

        DB::table('unidades')
        ->whereIn('codigo', $codigos)
        ->update(['nome' => 'alter']);

        $entidade = Entidade::first();

        if(is_null($entidade)){
            return;
        }

        SincronizarSiapeJob::dispatch($entidade->sigla);


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
