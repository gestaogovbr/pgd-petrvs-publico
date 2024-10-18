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
        Schema::create('envio_itens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('envio_id'); 
            $table->enum('tipo', ['participante', 'trabalho', 'entrega']);
            $table->uuid('uid');
            $table->integer('fonte');
            $table->timestamps();
            $table->boolean('sucesso')->default(false);
            $table->text('erros')->nullable();
            $table->softDeletes();

            $table->foreign('envio_id')
                  ->references('id')
                  ->on('envios')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('envio_itens');
    }
};
