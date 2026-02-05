<?php

use App\Traits\Version;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use Version;

    public function up(): void
    {
        $this->version("2.9.12");
    }

    public function down(): void
    {
        $this->version("2.9.11");
    }
};
