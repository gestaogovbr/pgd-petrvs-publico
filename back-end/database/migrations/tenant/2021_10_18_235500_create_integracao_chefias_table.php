<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIntegracaoChefiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('integracao_chefias', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("ID da Unidade");
            $table->foreignUuid('gestor_id_siape')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("ID do usuário gestor, segundo a última informação do SIAPE");
            $table->foreignUuid('gestor_id_petrvs')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("ID do usuário gestor, segundo a última informação do PETRVS");
            $table->foreignUuid('gestor_substituto_id_siape')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("ID do usuário gestor substituto, segundo a última informação do SIAPE");
            $table->foreignUuid('gestor_substituto_id_petrvs')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("ID do usuário gestor substituto, segundo a última informação do PETRVS");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('integracao_chefias');
    }
}
