<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetosRecursosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projetos_recursos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('nome', 256)->comment("Nome do recurso");
            $table->enum('tipo', ['HUMANO', 'MATERIAL', 'SERVICO', 'CUSTO', 'DEPARTAMENTO'])->comment("Tipo do recurso");
            $table->enum('unidade_medida', ['UNIDADE', 'CAIXA', 'METRO', 'KILO', 'LITRO', 'DUZIA', 'FARDO', 'HORAS', 'DIAS', 'PACOTE', 'FRASCO'])->comment("Unidade do recurso");
            $table->decimal('valor', 15, 2)->comment("Valor");
            $table->dateTime('data_inicio')->comment("Data de criação");
            $table->dateTime('data_fim')->nullable()->comment("Data final do registro");
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('unidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('material_servico_id')->nullable()->constrained("materiais_servicos")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_recursos');
    }
}
