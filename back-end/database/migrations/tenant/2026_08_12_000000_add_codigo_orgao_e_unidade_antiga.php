<?php

use App\Services\CodigoOrgaoService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const TABELAS = [
        'unidades',
        'integracao_unidades',
        'integracao_servidores',
        'siape_blacklist_unidades',
        'siape_listaUORG',
        'siape_dadosUORG',
    ];

    public function up(): void
    {
        $tenantId = (string) (tenant('id') ?? 'desconhecido');
        $codigoOrgao = CodigoOrgaoService::normalizar(tenant('integracao_siape_codorgao'));

        if ($codigoOrgao === null) {
            throw new \RuntimeException(
                "Tenant {$tenantId}: o Código do Órgão da API Consulta SIAPE deve ser configurado antes da migration."
            );
        }

        if (mb_strlen($codigoOrgao) > 20) {
            throw new \RuntimeException(
                "Tenant {$tenantId}: o Código do Órgão da API Consulta SIAPE deve ter no máximo 20 caracteres."
            );
        }

        foreach (self::TABELAS as $tabela) {
            if (!Schema::hasTable($tabela)) {
                throw new \RuntimeException(
                    "Tenant {$tenantId}: a tabela {$tabela} não existe; nenhuma alteração foi aplicada."
                );
            }

            if (Schema::hasColumn($tabela, 'codigo_orgao')) {
                throw new \RuntimeException(
                    "Tenant {$tenantId}: a coluna {$tabela}.codigo_orgao já existe; revise o estado da migration."
                );
            }
        }

        if (Schema::hasColumn('unidades', 'unidade_antiga')) {
            throw new \RuntimeException(
                "Tenant {$tenantId}: a coluna unidades.unidade_antiga já existe; revise o estado da migration."
            );
        }

        $duplicidades = DB::table('unidades')
            ->select('codigo')
            ->whereNotNull('codigo')
            ->groupBy('codigo')
            ->havingRaw('COUNT(*) > 1')
            ->exists();

        if ($duplicidades) {
            throw new \RuntimeException(
                "Tenant {$tenantId}: existem códigos de unidade duplicados; corrija-os antes da migration."
            );
        }

        foreach (self::TABELAS as $tabela) {
            Schema::table($tabela, function (Blueprint $table) use ($codigoOrgao): void {
                $table->string('codigo_orgao', 20)->default($codigoOrgao)->index();
            });
        }

        Schema::table('unidades', function (Blueprint $table): void {
            $table->boolean('unidade_antiga')->default(false)->index();
            $table->unique(['codigo_orgao', 'codigo'], 'unidades_codigo_orgao_codigo_unique');
        });

        foreach (self::TABELAS as $tabela) {
            DB::statement("ALTER TABLE `{$tabela}` ALTER COLUMN `codigo_orgao` DROP DEFAULT");
        }
    }

    public function down(): void
    {
        Schema::table('unidades', function (Blueprint $table): void {
            $table->dropUnique('unidades_codigo_orgao_codigo_unique');
            $table->dropIndex(['unidade_antiga']);
            $table->dropColumn('unidade_antiga');
        });

        foreach (self::TABELAS as $tabela) {
            Schema::table($tabela, function (Blueprint $table): void {
                $table->dropIndex(['codigo_orgao']);
                $table->dropColumn('codigo_orgao');
            });
        }
    }
};
