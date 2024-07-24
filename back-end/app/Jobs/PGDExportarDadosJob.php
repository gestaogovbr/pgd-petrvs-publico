<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\API_PGD\AuthenticationService;
use App\Services\API_PGD\Contracts\ExportarService;
use App\Services\API_PGD\OrgaoCentralService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use ReflectionClass;
use Symfony\Component\Finder\Finder;
use Illuminate\Support\Facades\App;

class PGDExportarDadosJob implements ShouldQueue, ShouldBeUnique, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    public function __construct(private readonly ?string $tenantId = null)
    {
    }

    public static function getDescricao(): string
    {
        return "Envia Dados para API do PGD";
    }


    public function handle()
    {
        $instances = $this->carregarClassesEstendidas('app/Services/API_PGD/', 'App\Services\API_PGD');
        $authService = new AuthenticationService();
        foreach ($instances as $instance) {
            $orgaoCentralService = new OrgaoCentralService(
                $authService,
                $instance
            );
            $orgaoCentralService->exportarDados($this->tenantId);
        }
    }


    /**
     *
     * @param string $diretorio
     * @param string $namespaceAbstrato
     * @return ExportarService[]
     */
    private function carregarClassesEstendidas(string $diretorio, string $namespaceAbstrato): array
    {
        $finder = new Finder();
        $finder->files()->in($diretorio)->name('*.php');
        $instances = [];
        foreach ($finder as $file) {
            $className = $this->getClassNameFromFile($file->getRealPath(), $namespaceAbstrato);
            if ($className && is_subclass_of($className, ExportarService::class)) {
                $reflectionClass = new ReflectionClass($className);
                $constructor = $reflectionClass->getConstructor();
                $dependencies = $constructor ? $constructor->getParameters() : [];
                $resolvedDependencies = [];

                foreach ($dependencies as $dependency) {
                    $resolvedDependencies[] = App::make($dependency->getClass()->name);
                }

                array_push($instances, $reflectionClass->newInstanceArgs($resolvedDependencies));
            }
        }
        return $instances;
    }

    private function getClassNameFromFile($filePath, $namespaceAbstrato)
    {
        $content = file_get_contents($filePath);
        if (preg_match('/namespace\s+(.+);/', $content, $matches)) {
            $namespace = $matches[1];
        } else {
            $namespace = $namespaceAbstrato;
        }

        if (preg_match('/class\s+(\w+)\s+extends\s+ExportarService/', $content, $matches)) {
            return $namespace . '\\' . $matches[1];
        }

        return null;
    }
}
