<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Models\Tenant;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ExportarBatch
{
    protected string $tenantId;
    protected string $envioId;
    protected string $envioNumero;
    protected $batch;
    public $proximoBatch;

    public static function getTenantId() {
        return Cache::get('pgd_tenantId');
    }

    public static function getEnvioId() {
        return Cache::get('pgd_envioId');
    }

    public static function getEnvioNumero() {
        return Cache::get('pgd_envioNumero');
    }

    public static function getTenant() {
        $tenantId = static::getTenantId();

        tenancy()->end();

        $tenant = Tenant::find($tenantId);

        $tenancy = tenancy()->find($tenantId);
        tenancy()->initialize($tenancy);

        return $tenant;
    }

    public static function getEnvio() {
        $envioId = static::getEnvioId();
        return Envio::find($envioId);
    }
    public static function getBatchName() {
        $numero = static::getEnvioNumero();
        return "Envio #{$numero}";
    }

    protected static function getCacheName() {
    }

    protected static function getOnBatchEndMessage() {
        $numero = static::getEnvioNumero();
        return "Finalizado. Envio #".$numero;
    }

    public static function resetCache() {
        Cache::forget(static::getCacheName());
    }

    public static function doneAddingJobs() {
        Cache::put(static::getCacheName(), true);
    }

    public function send() {
        gc_collect_cycles();
        $this->getBatch()->dispatch();
    }

    protected static function onAfterFinish() {
        static::log(static::getOnBatchEndMessage());
    }

    protected static function allJobsAdded() {
        $cacheName = static::getCacheName();
        $flag = Cache::get($cacheName, false);
        static::log('cache ['.$cacheName.'] = '.$flag);
        return $flag;
    }

    protected function getBatch() {
        if ($this->batch) return $this->batch;

        $batchName = static::getBatchName();
        $class = static::class;
        $proximoBatch = $this->proximoBatch;

        $this->batch = Bus::batch([])
            ->name($batchName)
            ->finally(function () use ($class, $proximoBatch)
            {
                $class::log('finally');
                if ($class::allJobsAdded()) {
                    $class::resetCache();
                    $class::onAfterFinish();

                    gc_collect_cycles();

                    if ($proximoBatch) {
                        $proximoBatch->send();
                    }
                }
            })
            ->allowFailures()
            ->onQueue('pgd_queue');

        return $this->batch;
    }

    public static function log(string $msg) {
        //$tenantId = static::getTenantId();
        $batchName = static::getBatchName();
        Log::info("$batchName - $msg");
    }

    protected function startNextBatch() {
        gc_collect_cycles();
        $nextBatch = $this->proximoBatch;

        if ($nextBatch) {
            $nextBatch->send();
        }
    }
}
