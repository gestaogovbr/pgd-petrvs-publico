<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('failed_jobs', function (Blueprint $table) {
            $table->bigIncrements('id')->change();
        });
    }

    public function down(): void
    {
        Schema::table('failed_jobs', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->change();
        });
    }
};
