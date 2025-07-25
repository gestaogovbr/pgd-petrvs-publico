<?php

use App\Traits\Version;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use Version;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->version("2.5.2");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        throw new Exception("Impossível retornar para versões já atualizadas");
    }
};
