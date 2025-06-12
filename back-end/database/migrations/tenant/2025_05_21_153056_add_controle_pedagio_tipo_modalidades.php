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
      Schema::table('tipos_modalidades', function (Blueprint $table) {
        $table->boolean('exige_pedagio')->default(false)->after('nome');
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::table('tipos_modalidades', function (Blueprint $table) {
        $table->dropColumn('exige_pedagio');
      });
    }
};
