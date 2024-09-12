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
        Schema::table('programas', function (Blueprint $table) {
            $table->foreignUuid('unidade_autorizadora_id')
            ->nullable()
            ->references('id')
            ->on('unidades')
            ->constrained('unidades')
            ->comment("Unidade que autoriza o programa");

            $table->string('link_autorizacao')->nullable()->comment("Link da normativa que autoriza o programa de gestão");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('programas', function (Blueprint $table) {
            $table->dropColumn('link_autorizacao');
            $table->dropForeign(['unidade_autorizadora_id']);
            $table->dropColumn('unidade_autorizadora_id');
        });
    }
};
