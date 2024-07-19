<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\API_PGD\AuthenticationService;

class GetTokenCommand extends Command
{
    protected $authService;

    public function __construct(AuthenticationService $authService)
    {
        $this->authService = $authService;
        parent::__construct();
    }


    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:token {tenantId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Obter token para um Tenant';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenantId');

        if (!$tenantId) {
            abort(400, "Tenant não informado");
        }

        $token = $this->authService->authenticate($tenantId);

        echo "Token: $token\n";
    }
}
