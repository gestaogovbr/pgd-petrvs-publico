<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('envios', function (Blueprint $table) {            
            $table->bigInteger('numero')->unsigned()->nullable(true);
        });

        DB::statement("UPDATE envios SET numero = (@seq := coalesce(@seq, 0) + 1) ORDER BY id");

        Schema::table('envios', function (Blueprint $table) {            
            $table->bigInteger('numero')->unsigned()->nullable(false)->change();
            $table->unique(['numero']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('envios', function (Blueprint $table) {            
            $table->dropColumn('numero');
        });
    }
};
