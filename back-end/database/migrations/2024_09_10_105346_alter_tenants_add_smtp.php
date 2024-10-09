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
        Schema::table('tenants', function (Blueprint $table) {
            $table->string('smtp_host', 50)->nullable(true);
            $table->string('smtp_port', 6)->nullable(true);
            $table->string('smtp_user', 50)->nullable(true);
            $table->enum('smtp_encryption', ['tls', 'ssl'])->nullable(true);
            $table->string('smtp_from_address', 150)->nullable(true);
            $table->string('smtp_from_name', 150)->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn('smtp_host');
            $table->dropColumn('smtp_port');
            $table->dropColumn('smtp_user');
            $table->dropColumn('smtp_encryption');
            $table->dropColumn('smtp_from_address');
            $table->dropColumn('smtp_from_name');
        });
    }
};
