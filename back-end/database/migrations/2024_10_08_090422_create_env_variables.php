<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('env_variables', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('value');
            $table->timestamps();
            $table->softDeletes();
        });

        // Popula a tabela com um seeder básico
        DB::table('env_variables')->insert([
            ['name' => 'APP_ENV', 'value' => 'local', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'APP_DEBUG', 'value' => 'false', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'CENTRAL_DOMAINS', 'value' => '', 'created_at' => now(), 'updated_at' => now()]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('env_variables');
    }
};
