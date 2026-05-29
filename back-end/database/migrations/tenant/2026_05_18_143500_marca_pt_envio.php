<?php

use App\Jobs\Envio\AgendarEnvioPlanosTrabalhosJob;
use Illuminate\Database\Migrations\Migration;
use Stancl\Tenancy\Tenancy;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tenant = app(Tenancy::class)->tenant;

        AgendarEnvioPlanosTrabalhosJob::dispatch($tenant->id)
            ->onConnection('rabbitmq')
            ->onQueue('pgd_queue');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
