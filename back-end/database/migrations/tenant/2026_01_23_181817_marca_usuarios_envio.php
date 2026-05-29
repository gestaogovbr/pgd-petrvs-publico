<?php

use App\Jobs\Envio\AgendarEnvioParticipantesJob;
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

        AgendarEnvioParticipantesJob::dispatch($tenant->id)
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
