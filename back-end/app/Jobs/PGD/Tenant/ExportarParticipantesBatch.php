<?php

namespace App\Jobs\PGD\Tenant;

use App\Services\API_PGD\AuditSources\ParticipanteAuditSource;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Models\ViewPgdParticipantes;

class ExportarParticipantesBatch extends ExportarBatch
{
    public function __construct(
        private readonly ExportarEntregasBatch $exportarEntregasBatch
    )
    {
        $this->proximoBatch = $exportarEntregasBatch;
    }

    public static function getBatchName() {
        $numero = static::getEnvioNumero();
        return "Envio #{$numero} - Exportar Participantes";
    }

    protected static function getCacheName() {
        return "pgd_envio_part";
    }

    public function send() {

        static::log("Consultando participantes a exportar...");

        $auditSource = new ParticipanteAuditSource();

        static::resetCache();

        $n = 0;
        $data = [];

        $participantes = ViewPgdParticipantes::withoutGlobalScope(SoftDeletingScope::class)->get();

        static::log($participantes->count().' participantes a exportar');

        foreach($participantes as $auditData) {
            if (array_key_exists($auditData->id, $data)) {
                continue;
            }

            $n++;
            $source = $auditSource->toExportSource($auditData);
            $data[$auditData->id] = $source;
            static::log("Calculando job de participante nº$n");
        }
        unset($participantes);

        static::log(count($data).' participantes a exportar');

        $collection = collect($data);
        unset($data);

        $n = 0;
        $tenant = static::getTenant();
        $envioId = static::getEnvioId();
        $envioNumero = static::getEnvioNumero();

        $collection->chunk(50)->each(
            function ($chunk) use (&$n, $tenant, $envioId, $envioNumero) {
                $jobs = [];
                foreach($chunk as $item) {
                    $n++;
                    $jobs[] = new ExportarParticipanteJob(
                        $n,
                        $item
                    );
                }

                static::log("Total atual de jobs: $n");
                $this->getBatch()->add($jobs);
                unset($jobs);
            }
        );
        unset($collection);

        static::doneAddingJobs();
        parent::send();

        if ($n > 0) {
            static::log($n." participante(s) em andamento");
        } else {
            static::log("finalizada sem dados a exportar");
            $this->startNextBatch();
        }
    }
}
