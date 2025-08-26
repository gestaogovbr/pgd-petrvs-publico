<?php

namespace App\Jobs\PGD\Tenant;

use App\Jobs\PGD\Tenant\ExportarBatch;
use App\Jobs\PGD\Tenant\ExportarTrabalhoJob;
use App\Models\Envio;
use App\Models\ViewPgdPlanosTrabalho;
use App\Services\API_PGD\AuditSources\PlanoTrabalhoAuditSource;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PDO;
use Throwable;

class ExportarTrabalhosBatch extends ExportarBatch
{
    public function __construct()
    {
        $this->proximoBatch = null;
    }

    public static function getBatchName() {
        $numero = static::getEnvioNumero();
        return "Envio #{$numero} - Exportar Planos de Trabalho";
    }

    protected static function getCacheName() {
        return "pdg_envio_trabalhos";
    }

    public function send() {
        // DB::connection()->getPdo()->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

        $tenantId = static::getTenantId();

        static::log("Consultando planos de Trabalho a exportar...");

        $auditSource = new PlanoTrabalhoAuditSource();

        static::resetCache();

        $trabalhos = ViewPgdPlanosTrabalho::withoutGlobalScope(SoftDeletingScope::class)->get();
        $n = 0;
        $data = [];
        try{
            foreach($trabalhos as $auditData) {
                if (array_key_exists($auditData->id, $data)) {
                    continue;
                }

                $n++;
                $source = $auditSource->toExportSource($auditData);
                $data[$auditData->id] = $source;
                static::log("Calculando job de plano de Trabalho nº$n");
            }
        }catch(Throwable $e) {
            Log::error("Erro ao obter dados.".$e->getMessage());
            Log::error($e);
            throw $e;
        }
        unset($trabalhos);

        static::log(count($data).' planos a exportar');

        try{
            $collection = collect($data);
            unset($data);

            $n = 0;
            $collection->chunk(50)->each(function ($chunk) use (&$n) {
                $jobs = [];
                foreach($chunk as $item) {
                    $n++;
                    $jobs[] = new ExportarTrabalhoJob(
                        $n,
                        $item
                    );
                }

                static::log("Total atual de jobs: $n");
                $this->getBatch()->add($jobs);
                unset($jobs);
            });
        } catch(Throwable $e) {
            Log::error("Erro ao coletar dados.".$e->getMessage());
            Log::error($e);
            throw $e;
        }

        static::log("[$tenantId] Adicionados $n jobs de plano de Trabalho");
        static::doneAddingJobs();

        parent::send();

        if ($n > 0) {
            static::log($n." plano de trabalho(s) em andamento");
        } else {
            static::log("Finalizada sem dados a exportar");
            static::onAfterFinish();
        }
    }

    protected static function onAfterFinish() {
        parent::onAfterFinish();

        $tenantId   = static::getTenantId();
        $envioId    = static::getEnvioId();
        $envioNumero = static::getEnvioNumero();

        Log::info("[{$tenantId}] Exportação finalizada! Envio #".$envioNumero);

        $envio = Envio::find($envioId);

        $envio->finished_at = now();
        $envio->sucesso = true;
        $envio->save();

        Cache::forget('pgd_tenantId');
        Cache::forget('pgd_envioId');
        Cache::forget('pgd_envioNumero');
        Cache::forget('pgd_autorizadora');
    }
}
