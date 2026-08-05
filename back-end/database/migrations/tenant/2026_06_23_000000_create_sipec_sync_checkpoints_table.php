<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sipec_sync_checkpoints', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tenant_id', 36)->nullable();
            $table->enum('etapa', ['unidades', 'servidores', 'completo'])->default('unidades');
            $table->unsignedInteger('ultima_pagina')->default(0);
            $table->unsignedInteger('total_paginas')->nullable();
            $table->timestamps();

            $table->unique('tenant_id', 'uk_sipec_checkpoint_tenant');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sipec_sync_checkpoints');
    }
};
