<?php

namespace App\Console\Commands;

use App\Models\Logs;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class InsertLog extends Command
{
    protected $signature = 'db:insert-log {--level=} {--message=} {--context=} {--tenant_id=}';


    protected $description = 'Insert log into the logs table';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $level = $this->option('level');
        $message = $this->option('message');
        $context = $this->option('context');
        $tenant_id = $this->option('tenant_id');

        Logs::create([
            'level' => $level,
            'message' => $message,
            'context' => $context,
            'tenant_id' => $tenant_id,
        ]);

        $this->info('Log inserido com sucesso!');
    }
}
