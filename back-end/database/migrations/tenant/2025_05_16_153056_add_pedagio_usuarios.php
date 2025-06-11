<?php

use App\Traits\Version;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use Version;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::table('usuarios', function (Blueprint $table) {
        $table->date('data_inicial_pedagio')->nullable();
        $table->date('data_final_pedagio')->nullable()->after('data_inicial_pedagio');
        $table->unsignedTinyInteger('tipo_pedagio')->nullable()->after('data_final_pedagio');
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::table('usuarios', function (Blueprint $table) {
        // Remove as colunas de datas, inicial e final do pedagio
        $table->dropColumn('data_inicial_pedagio');
        $table->dropColumn('data_final_pedagio');
        $table->dropColumn('tipo_pedagio');
      });
    }
};
