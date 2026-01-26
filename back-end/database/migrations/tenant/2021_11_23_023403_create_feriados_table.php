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
        Schema::create('feriados', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string("nome", 250)->comment("Descrição do feriado");
            $table->integer("dia")->comment("Dia do mês (1~31) ou dia da semana (1-7)");
            $table->integer("mes")->comment("Mês");
            $table->integer("ano")->nullable()->comment("Ano do feriado caso seja data não recorrente");
            $table->enum("tipoDia", ["MES", "SEMANA"])->comment("Se o campo dia representa o dia da semana");
            $table->tinyInteger("recorrente")->comment("Se é uma data única ou repete todos os anos");
            $table->enum("abrangencia", ["NACIONAL", "ESTADUAL", "MUNICIPAL"])->comment("Abrangência do feriado");
            $table->string("codigo_ibge", 8)->nullable()->comment("Código da UF ou do município (IBGE)");
            $table->string("uf", 2)->nullable()->comment("UF para feriados estaduais");
            // Chaves estrangeiras:
            $table->foreignUuid('entidade_id')->nullable()->constrained('entidades')->onDelete('restrict')->onUpdate('cascade')->comment('Entidade');
            $table->foreignUuid('cidade_id')->nullable()->constrained('cidades')->onDelete('restrict')->onUpdate('cascade')->comment('Cidade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feriados');
    }
};
