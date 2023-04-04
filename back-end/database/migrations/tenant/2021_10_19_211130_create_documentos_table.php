<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documentos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos
            $table->enum('especie', ["TERMO_ADESAO", "SEI"])->comment("Especificação da espécie do documento (interno do sistema)");
            $table->longText('conteudo')->nullable()->comment("Conteúdo do arquivo");
            $table->json('assinatura')->nullable()->comment("Dados da assinatura, se nulo não está assinado");
            $table->json('metadados')->nullable()->comment("Metadados");
            // Chaves estrangeiras:
            $table->foreignUuid('entidade_id')->nullable()->constrained('entidades')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('plano_id')->nullable()->constrained('planos')->onDelete('restrict')->onUpdate('cascade');
        });
        // Cria o campo documento_id devido a referência cruzada
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->foreignUuid('documento_id')->nullable()->constrained()->onDelete('set null')->onUpdate('cascade')->comment("Utilizar documento de referência (Termo de adesão)");
        });
        // Cria o campo documento_id devido a referência cruzada
        Schema::table('programas', function (Blueprint $table) {
            $table->foreignUuid('documento_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Documento relacionado ao programa");
        });
        // Cria o campo documento_id devido a referência cruzada
        Schema::table('planos', function (Blueprint $table) {
            $table->foreignUuid('documento_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documentos');
    }
}
