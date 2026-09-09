<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mural_avisos', function (Blueprint $table) {
            $table->dateTime('data_expiracao')->nullable()->after('data_publicacao');
            $table->index('data_expiracao');
        });

        DB::table('mural_avisos')->update([
            'data_expiracao' => DB::raw("DATE_ADD(data_publicacao, INTERVAL 30 DAY)"),
        ]);

        Schema::table('mural_avisos', function (Blueprint $table) {
            $table->dateTime('data_expiracao')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('mural_avisos', function (Blueprint $table) {
            $table->dropIndex(['data_expiracao']);
            $table->dropColumn('data_expiracao');
        });
    }
};
