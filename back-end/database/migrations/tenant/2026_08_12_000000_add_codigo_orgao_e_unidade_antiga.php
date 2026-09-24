<?php

use App\Services\CodigoOrgaoService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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

    private const CODIGO_UNIDADE_MAX_CARACTERES = 12;
    private const SUFIXOS_CODIGO_DUPLICADO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

        $correcoes = $this->planejarCorrecoes('unidades', $tenantId);

        foreach (self::TABELAS as $tabela) {
            Schema::table($tabela, function (Blueprint $table) use ($codigoOrgao): void {
                $table->string('codigo_orgao', 20)->default($codigoOrgao)->index();
            });
        }

        Schema::table('unidades', function (Blueprint $table): void {
            $table->boolean('unidade_antiga')->default(false)->index();
        });

        DB::transaction(function () use ($correcoes, $tenantId): void {
            foreach ($correcoes as $correcao) {
                $atualizados = DB::table('unidades')
                    ->where('id', $correcao['id'])
                    ->where('codigo', $correcao['codigo_antigo'])
                    ->update(['codigo' => $correcao['codigo_novo']]);

                if ($atualizados !== 1) {
                    throw new \RuntimeException(
                        "Tenant {$tenantId}: a unidade {$correcao['id']} mudou durante a migração; correções de código revertidas."
                    );
                }
            }
        });

        Schema::table('unidades', function (Blueprint $table): void {
            $table->unique(['codigo_orgao', 'codigo'], 'unidades_codigo_orgao_codigo_unique');
        });

        foreach ($correcoes as $correcao) {
            Log::warning('Código de unidade duplicado corrigido na migração da chave composta.', [
                'tenant_id' => $tenantId,
                'unidade_id' => $correcao['id'],
                'codigo_antigo' => $correcao['codigo_antigo'],
                'codigo_novo' => $correcao['codigo_novo'],
            ]);
        }

        foreach (self::TABELAS as $tabela) {
            DB::statement("ALTER TABLE `{$tabela}` ALTER COLUMN `codigo_orgao` DROP DEFAULT");
        }
    }

    private function planejarCorrecoes(string $tabela, string $tenantId): array
    {
        $codigosDuplicados = DB::table($tabela)
            ->select('codigo')
            ->whereNotNull('codigo')
            ->groupBy('codigo')
            ->havingRaw('COUNT(*) > 1')
            ->pluck('codigo');

        $correcoes = [];
        $codigosReservados = [];

        foreach ($codigosDuplicados as $codigo) {
            $unidades = DB::table($tabela)
                ->select('id', 'codigo', 'data_inativacao', 'created_at')
                ->where('codigo', $codigo)
                ->orderByRaw('CASE WHEN data_inativacao IS NOT NULL THEN 0 ELSE 1 END')
                ->orderBy('created_at')
                ->orderBy('id')
                ->get();

            // A última unidade conserva o código SIAPE: ativa, se houver, e a mais recente.
            foreach ($unidades->slice(0, -1) as $unidade) {
                $novoCodigo = $this->codigoLivre($tabela, (string) $unidade->codigo, $codigosReservados, $tenantId);
                $correcoes[] = ['id' => $unidade->id, 'codigo_antigo' => $unidade->codigo, 'codigo_novo' => $novoCodigo];
                $codigosReservados[mb_strtolower($novoCodigo)] = true;
            }
        }

        return $correcoes;
    }

    private function codigoLivre(string $tabela, string $codigo, array $codigosReservados, string $tenantId): string
    {
        if (mb_strlen($codigo) >= self::CODIGO_UNIDADE_MAX_CARACTERES) {
            throw new \RuntimeException(
                "Tenant {$tenantId}: o código duplicado {$codigo} já ocupa os 12 caracteres de unidades.codigo; nenhuma correção foi aplicada."
            );
        }

        foreach (str_split(self::SUFIXOS_CODIGO_DUPLICADO) as $sufixo) {
            $novoCodigo = $codigo . $sufixo;

            if (!isset($codigosReservados[mb_strtolower($novoCodigo)])
                && !DB::table($tabela)->where('codigo', $novoCodigo)->exists()) {
                return $novoCodigo;
            }
        }

        throw new \RuntimeException(
            "Tenant {$tenantId}: não há sufixo de um caractere livre para o código duplicado {$codigo}; nenhuma correção foi aplicada."
        );
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
