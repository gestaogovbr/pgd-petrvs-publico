<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Traits\Version;

return new class extends Migration
{
    use Version;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->version("2.3.3");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        throw new Exception("Impossível retornar para versões já atualizadas");
    }
};
