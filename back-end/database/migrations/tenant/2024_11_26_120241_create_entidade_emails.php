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
    if (!Schema::hasTable('entidade_emails')) {
        Schema::create('entidade_emails', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('entidade_id'); 
            $table->string('email');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('entidade_id')
                  ->references('id')
                  ->on('entidades')
                  ->onDelete('cascade');
        });
    }
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entidade_emails');
    }
};
