<?php

use App\Jobs\Envio\AgendarEnvioParticipantesJob;
use App\Jobs\Envio\ExportarParticipanteJob;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
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
