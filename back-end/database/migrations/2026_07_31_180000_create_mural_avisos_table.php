<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mural_avisos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('titulo', 255);
            $table->text('conteudo');
            $table->enum('destinatario', ['TODOS', 'TENANT_ESPECIFICO']);
            $table->string('tenant_id')->nullable();
            $table->enum('remetente_tipo', ['ORGAO_CENTRAL', 'TENANT']);
            $table->string('remetente_tenant_id')->nullable();
            $table->bigInteger('publicado_por_user_panel_id')->unsigned();
            $table->dateTime('data_publicacao');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('set null');
            $table->foreign('remetente_tenant_id')->references('id')->on('tenants')->onDelete('set null');
            $table->foreign('publicado_por_user_panel_id')->references('id')->on('users_panel')->onDelete('cascade');

            $table->index('destinatario');
            $table->index('tenant_id');
            $table->index('data_publicacao');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mural_avisos');
    }
};
