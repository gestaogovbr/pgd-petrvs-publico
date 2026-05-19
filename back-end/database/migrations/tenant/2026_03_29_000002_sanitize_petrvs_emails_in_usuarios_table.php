<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::connection('tenant')->table('usuarios')
            ->whereNotNull('email')
            ->whereRaw('LOWER(email) LIKE ?', ['%@petrvs.%'])
            ->update(['email' => null]);
    }

    public function down(): void
    {
    }
};
