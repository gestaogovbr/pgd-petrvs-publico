<?php

namespace App\Jobs\PGD\Tenant;

use App\Services\API_PGD\AuditSources\PlanoEntregaAuditSource;
use Illuminate\Support\Facades\Log;

class ExportarEntregasBatch extends ExportarBatch
{
    public function __construct(
        private readonly ExportarTrabalhosBatch $exportarTrabalhosBatch
    )
    {
        $this->proximoBatch = $exportarTrabalhosBatch;
    }

    public static function getBatchName() {
        $numero = static::getEnvioNumero();
        return "Envio #{$numero} - Exportar Planos de Entrega";
    }

    protected static function getCacheName() {
        return "pgd_envio_entregas";
    }

    public function send() {

        static::log("Consultando planos de Entrega a exportar...");

        $auditSource = new PlanoEntregaAuditSource();

        static::resetCache();

        $n = 0;
        $jobs = [];
        foreach($auditSource->getData() as $auditData) {
            $n++;
            $source = $auditSource->toExportSource($auditData);
            $jobs[] = new ExportarEntregaJob(
                $n,
                $source
            );
        }

        $this->getBatch()->add($jobs);
        static::doneAddingJobs();

        parent::send();

        if ($n > 0) {
            static::log($n." planos de entrega(s) em andamento");
        } else {
            static::log("Finalizada sem dados para exportar");
            $this->startNextBatch();
        }
    }
}
