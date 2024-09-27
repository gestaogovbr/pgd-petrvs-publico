<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tabela listaUORG
        Schema::create('siape_listaUORG', function (Blueprint $table) {
            $table->id(); // Chave primária
            $table->longText('response'); // Coluna para armazenar a resposta com tipo LONGTEXT
            $table->timestamps(); // Colunas created_at e updated_at
        });

        // Tabela dadosUORG
        Schema::create('siape_dadosUORG', function (Blueprint $table) {
            $table->id(); // Chave primária
            $table->longText('response'); // Coluna para armazenar a resposta com tipo LONGTEXT
            $table->timestamps(); // Colunas created_at e updated_at
        });

        // Tabela listaServidores
        Schema::create('siape_listaServidores', function (Blueprint $table) {
            $table->id(); // Chave primária
            $table->longText('response'); // Coluna para armazenar a resposta com tipo LONGTEXT
            $table->timestamps(); // Colunas created_at e updated_at
        });

        // Tabela consultaDadosPessoais
        Schema::create('siape_consultaDadosPessoais', function (Blueprint $table) {
            $table->id(); // Chave primária
            $table->longText('response'); // Coluna para armazenar a resposta com tipo LONGTEXT
            $table->timestamps(); // Colunas created_at e updated_at
        });

        // Tabela consultaDadosFuncionais
        Schema::create('siape_consultaDadosFuncionais', function (Blueprint $table) {
            $table->id(); // Chave primária
            $table->longText('response'); // Coluna para armazenar a resposta com tipo LONGTEXT
            $table->timestamps(); // Colunas created_at e updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siape_listaUORG');
        Schema::dropIfExists('siape_dadosUORG');
        Schema::dropIfExists('siape_listaServidores');
        Schema::dropIfExists('siape_consultaDadosPessoais');
        Schema::dropIfExists('siape_consultaDadosFuncionais');
    }
};
