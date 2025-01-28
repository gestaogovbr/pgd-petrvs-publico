<?php

use App\Models\CadeiaValor;
use App\Models\Comparecimento;
use App\Models\Entrega;
use App\Models\HistoricoLotacao;
use App\Models\Planejamento;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\ProjetoRecurso;
use App\Models\Template;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $unidades = Unidade::join('integracao_unidades as iu', 'unidades.codigo', '=', 'iu.codigo_siape')
            ->where('iu.pai_siape', '999999')
            ->select('unidades.*')
            ->get();

        $totalRegistros = $unidades->count();

        if ($totalRegistros < 2) {
            return;
        }
        $instituidoraTrue = $unidades->filter(function ($item) {
            return $item->instituidora == 1;
        });

        $instituidoraFalse = $unidades->filter(function ($item) {
            return $item->instituidora == 0;
        });

        $idsInstituidoraTrue = $instituidoraTrue->pluck('id');
        $idsInstituidoraFalse = $instituidoraFalse->pluck('id');

        if ($idsInstituidoraTrue->count() > 1) {
            $ultimoId = $idsInstituidoraTrue->pop();
            $excedentes = $idsInstituidoraTrue;

            $idsInstituidoraTrue = collect([$ultimoId]);

            $idsInstituidoraFalse = $idsInstituidoraFalse->merge($excedentes);
        }

        $idInstituidora = $idsInstituidoraTrue->first();


        UnidadeIntegrante::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        Entrega::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        PlanoTrabalho::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        Planejamento::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        Template::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        Comparecimento::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        HistoricoLotacao::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        ProjetoRecurso::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        PlanoEntregaEntrega::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        Programa::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        Programa::withTrashed()
            ->whereIn('unidade_autorizadora_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_autorizadora_id' => $idInstituidora]);

        CadeiaValor::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        PlanoEntrega::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        PlanoEntrega::withTrashed()
            ->whereIn('unidade_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_id' => $idInstituidora]);

        Unidade::withTrashed()
            ->whereIn('unidade_pai_id', $idsInstituidoraFalse->toArray())
            ->update(['unidade_pai_id' => $idInstituidora]);


        foreach ($idsInstituidoraFalse->toArray() as $idInstituidoraFalse) {
            DB::statement("UPDATE unidades SET path = REPLACE(path, ?, ?) WHERE path LIKE ?", [
                $idInstituidoraFalse,
                $idInstituidora,
                "%$idInstituidoraFalse%",
            ]);
           
        }

       
        Unidade::whereIn('id', $idsInstituidoraFalse->toArray())->forceDelete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        return;
    }
};
