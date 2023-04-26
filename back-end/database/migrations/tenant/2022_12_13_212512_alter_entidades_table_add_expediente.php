<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Entidade;

class AlterEntidadesTableAddExpediente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $expedientesJson = '{"domingo":[],"segunda":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"terca":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"quarta":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"quinta":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"sexta":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"sabado":[],"especial":[]}';
        Schema::table('entidades', function (Blueprint $table) {
            $table->json('expediente')->default(new Expression("('{\"domingo\":[],\"segunda\":[],\"terca\":[],\"quarta\":[],\"quinta\":[],\"sexta\":[],\"sabado\":[],\"especial\":[]}')"))->comment("Configuração de expediente");
        });
        Entidade::query()->update(['expediente' => $expedientesJson]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('entidades', function (Blueprint $table) {
            $table->dropColumn('expediente');
        });
    }
}
