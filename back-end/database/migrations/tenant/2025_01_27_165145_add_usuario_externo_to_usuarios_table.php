<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->boolean('usuario_externo')->default(false)->after('situacao_funcional')->comment('Indica se o usuário é externo');
            // retira obrigatoriaedade do campo apelido
            $table->string('apelido', 255)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('usuario_externo');
            $table->string('apelido', 255)->nullable(false)->change();
        });
    }
};
