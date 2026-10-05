<?php

use App\Services\PlanoEntregaService;
use App\Services\PlanoTrabalhoService;
use App\Services\UsuarioService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tenant = tenant();
        $codUnidadeAutorizadora = $tenant?->api_cod_unidade_autorizadora;

        if (!filled($codUnidadeAutorizadora)) {
            Log::warning('Migration set_cod_unidade_autorizadora_from_tenant: tenant sem api_cod_unidade_autorizadora; nada a atualizar.', [
                'tenant_id' => $tenant?->getTenantKey(),
            ]);

            return;
        }

        $cod = (string) $codUnidadeAutorizadora;

        app(UsuarioService::class)->atualizarCodUnidadeAutorizadora($cod);
        app(PlanoTrabalhoService::class)->atualizarCodUnidadeAutorizadora($cod);
        app(PlanoEntregaService::class)->atualizarCodUnidadeAutorizadora($cod);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Não reverte: o valor anterior por registro não foi preservado.
    }
};
