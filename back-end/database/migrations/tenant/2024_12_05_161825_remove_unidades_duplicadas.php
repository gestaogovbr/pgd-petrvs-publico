<?php

use App\Models\Unidade;
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
        $resultado = DB::select("
            SELECT   
                CASE 
                    WHEN u1.instituidora = 0 THEN u1.id
                    WHEN u2.instituidora = 0 THEN u2.id
                END AS id_instituicao
            FROM unidades AS u1
            INNER JOIN unidades AS u2 ON u1.sigla = u2.sigla AND u1.codigo != u2.codigo
            INNER JOIN integracao_unidades AS ui ON u1.codigo = ui.codigo_siape
            WHERE ui.pai_servo = 999999
        ");

        if(empty($resultado)){
            return;
        }
        Schema::disableForeignKeyConstraints();
        $idInstituicao = $resultado[0]->id_instituicao; 
        $unidade = Unidade::find($idInstituicao);
        $unidade->forceDelete();
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
