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
        Schema::create('cadeias_valores', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data de início da cadeia de valores");
            $table->dateTime('data_fim')->nullable()->comment("Data final da cadeia de valores");
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento da cadeia de valores");
            $table->string('nome', 256)->comment("Nome da cadeia de valores");
            // Chaves estrangeiras:
            $table->foreignUuid('entidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Entidade da cadeia de valores");
            $table->foreignUuid('unidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade da cadeia de valores (opcional)");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cadeias_valores');

    }
};
