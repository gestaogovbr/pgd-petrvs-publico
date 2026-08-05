<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sipec_servidores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 20)->nullable()->index();
            $table->string('matricula', 50)->nullable()->index();
            $table->longText('response');
            $table->boolean('processado')->default(false)->index();
            $table->dateTime('data_modificacao')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sipec_servidores');
    }
};
