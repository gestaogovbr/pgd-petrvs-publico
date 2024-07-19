<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Services\API_PGD\AuthenticationService;

class GetUsersCommand extends Command
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
    protected $signature = 'app:users {tenantId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Obter lista de Usuários';

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

        $response = Http::baseUrl(config('pgd.host'))
            ->withToken($token)
            ->get("/users");

        if ($response->successful()) {
            $users = $response->json();
            var_dump($users);
        } else {
            if ($response->status() == 422) {
                $data = $response->json();
                $detail = json_decode($data['detail'], true);
                echo "Erro ao obter Usuários: ".$detail[0]['msg'];
            } else {
                $response->throw();
            }
        }
    }
}
