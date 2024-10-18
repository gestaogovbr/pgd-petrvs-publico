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
        Schema::table('siape_consultaDadosPessoais', function (Blueprint $table) {
            $table->string('cpf', 50)->after('response')->nullable(false);
        });

        Schema::table('siape_consultaDadosFuncionais', function (Blueprint $table) {
            $table->string('cpf', 50)->after('response')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('siape_consultaDadosPessoais', function (Blueprint $table) {
            $table->dropColumn('cpf');
        });

        Schema::table('siape_consultaDadosFuncionais', function (Blueprint $table) {
            $table->dropColumn('cpf');
        });
    }
};
