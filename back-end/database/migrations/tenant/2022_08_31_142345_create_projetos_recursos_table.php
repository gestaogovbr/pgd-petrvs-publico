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
        Schema::create('projetos_recursos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do recurso");
            $table->enum('tipo', ['HUMANO', 'MATERIAL', 'SERVICO', 'CUSTO', 'DEPARTAMENTO'])->comment("Tipo do recurso");
            $table->enum('unidade_medida', ['UNIDADE', 'CAIXA', 'METRO', 'KILO', 'LITRO', 'DUZIA', 'MONETARIO', 'HORAS', 'DIAS', 'PACOTE'])->comment("Unidade do recurso");
            $table->decimal('valor', 15, 2)->comment("Valor");
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Projeto");
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário do tipo humano");
            $table->foreignUuid('unidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade do tipo departamento");
            $table->foreignUuid('material_servico_id')->nullable()->constrained("materiais_servicos")->onDelete('restrict')->onUpdate('cascade')->comment("Material do tipo material ou serviço do tipo serviço");
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
};
