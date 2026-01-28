<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
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
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->enum('participa_pgd', ["sim","não"])
            ->comment('Indica se o usuário participa do PGD.');
        });

    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->dropColumn('participa_pgd');
        });
    }
};
