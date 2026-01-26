<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('integracao_unidades', function (Blueprint $table) {
            $table->string('cpf_titular_autoridade_uorg', 14)->nullable();
            $table->string('cpf_substituto_autoridade_uorg', 14)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('integracao_unidades', function (Blueprint $table) {
            $table->dropColumn(['cpf_titular_autoridade_uorg', 'cpf_substituto_autoridade_uorg']);
        });
    }
};
