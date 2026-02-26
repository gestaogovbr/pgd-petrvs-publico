<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeRepository extends Command
{
    /**
     * O nome e assinatura do comando console.
     *
     * @var string
     */
    protected $signature = 'make:repository {model} {--read=true} {--write=true}';

    /**
     * A descrição do comando console.
     *
     * @var string
     */
    protected $description = 'Cria uma nova estrutura de repositório seguindo o padrão Repository Pattern';

    /**
     * Executa o comando console.
     */
    public function handle()
    {
        $model = $this->argument('model');
        $read = filter_var($this->option('read'), FILTER_VALIDATE_BOOLEAN);
        $write = filter_var($this->option('write'), FILTER_VALIDATE_BOOLEAN);

        if (!$read && !$write) {
            $read = true;
            $write = true;
        }

        if (!$this->validateModel($model)) {
            return 1;
        }

        $repositoryPath = app_path("Repository/{$model}");
        $contractsPath = "{$repositoryPath}/Contracts";
        $eloquentPath = "{$repositoryPath}/Eloquent";

        $this->ensureDirectories([$repositoryPath, $contractsPath, $eloquentPath]);

        if ($read) {
            $this->createFileIfNotExists(
                "{$contractsPath}/{$model}ReadRepositoryContract.php",
                $this->getReadContractContent($model)
            );
            $this->createFileIfNotExists(
                "{$eloquentPath}/Eloquent{$model}ReadRepository.php",
                $this->getReadImplementationContent($model)
            );
        }

        if ($write) {
            $this->createFileIfNotExists(
                "{$contractsPath}/{$model}WriteRepositoryContract.php",
                $this->getWriteContractContent($model)
            );
            $this->createFileIfNotExists(
                "{$eloquentPath}/Eloquent{$model}WriteRepository.php",
                $this->getWriteImplementationContent($model)
            );
        }

        $this->createFileIfNotExists(
            app_path("Repository/{$model}Repository.php"),
            $this->getMainRepositoryContent($model, $read, $write)
        );

        $this->registerInProvider($model, $read, $write);
        $this->fixPermissions($model, $repositoryPath);

        $this->info("Processo de criação/verificação do repositório para {$model} concluído!");
        return 0;
    }

    private function validateModel(string $model): bool
    {
        $modelPath = app_path("Models/{$model}.php");
        if (File::exists($modelPath)) {
            return true;
        }

        $this->error("Model {$model} não encontrado em App\Models.");
        
        $models = collect(File::files(app_path('Models')))
            ->map(fn($file) => $file->getFilenameWithoutExtension())
            ->sort()
            ->values();
        
        $this->info("Models disponíveis: " . $models->implode(', '));
        return false;
    }

    private function ensureDirectories(array $paths): void
    {
        foreach ($paths as $path) {
            File::ensureDirectoryExists($path);
        }
    }

    private function createFileIfNotExists(string $path, string $content): void
    {
        if (File::exists($path)) {
            $this->warn("Arquivo já existe: " . basename($path));
            return;
        }

        File::put($path, $content);
        $this->info("Criado: " . basename($path));
    }

    private function fixPermissions(string $model, string $repositoryPath): void
    {
        $pathsToChown = [
            $repositoryPath,
            app_path("Repository/{$model}Repository.php"),
            app_path('Providers/RepositoryServiceProvider.php')
        ];

        foreach ($pathsToChown as $path) {
            if (!File::exists($path)) {
                continue;
            }
            
            $cmd = is_dir($path) ? "chown -R 1000:1000 {$path}" : "chown 1000:1000 {$path}";
            exec($cmd);
        }
    }

    private function getReadContractContent(string $model): string
    {
        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repository\\{$model}\Contracts;

/**
 * @see \App\Repository\\{$model}\Eloquent\Eloquent{$model}ReadRepository
 */
interface {$model}ReadRepositoryContract
{
    //
}
PHP;
    }

    private function getWriteContractContent(string $model): string
    {
        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repository\\{$model}\Contracts;

/**
 * @see \App\Repository\\{$model}\Eloquent\Eloquent{$model}WriteRepository
 */
interface {$model}WriteRepositoryContract
{
    //
}
PHP;
    }

    private function getReadImplementationContent(string $model): string
    {
        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repository\\{$model}\Eloquent;

use App\Models\\{$model};
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\\{$model}\Contracts\\{$model}ReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<{$model}>
 */
class Eloquent{$model}ReadRepository extends AbstractEloquentReadRepository implements {$model}ReadRepositoryContract
{
    public function __construct({$model} \$model)
    {
        \$this->model = \$model;
    }
}
PHP;
    }

    private function getWriteImplementationContent(string $model): string
    {
        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repository\\{$model}\Eloquent;

use App\Models\\{$model};
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\\{$model}\Contracts\\{$model}WriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<{$model}>
 */
class Eloquent{$model}WriteRepository extends AbstractEloquentWriteRepository implements {$model}WriteRepositoryContract
{
    public function __construct({$model} \$model)
    {
        \$this->model = \$model;
    }
}
PHP;
    }

    private function getMainRepositoryContent(string $model, bool $read, bool $write): string
    {
        $imports = ["use App\Models\\{$model};"];
        $constructorParams = [];

        if ($read) {
            $imports[] = "use App\Repository\\{$model}\Contracts\\{$model}ReadRepositoryContract;";
            $constructorParams[] = "private readonly {$model}ReadRepositoryContract \$readRepository";
        }
        if ($write) {
            $imports[] = "use App\Repository\\{$model}\Contracts\\{$model}WriteRepositoryContract;";
            $constructorParams[] = "private readonly {$model}WriteRepositoryContract \$writeRepository";
        }

        $importsStr = implode("\n", $imports);
        $constructorParamsStr = implode(",\n        ", $constructorParams);

        if (!empty($constructorParamsStr)) {
            $constructorParamsStr .= ",";
        }

        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repository;

{$importsStr}

class {$model}Repository
{
    public function __construct(
        {$constructorParamsStr}
    ) {
    }
}
PHP;
    }

    private function registerInProvider(string $model, bool $read, bool $write): void
    {
        $providerPath = app_path('Providers/RepositoryServiceProvider.php');
        
        if (!File::exists($providerPath)) {
            $this->error("RepositoryServiceProvider não encontrado em {$providerPath}");
            return;
        }

        $content = File::get($providerPath);
        $originalContent = $content;

        $imports = [];
        if ($read) {
            $imports[] = "use App\Repository\\{$model}\Contracts\\{$model}ReadRepositoryContract;";
            $imports[] = "use App\Repository\\{$model}\Eloquent\Eloquent{$model}ReadRepository;";
        }
        if ($write) {
            $imports[] = "use App\Repository\\{$model}\Contracts\\{$model}WriteRepositoryContract;";
            $imports[] = "use App\Repository\\{$model}\Eloquent\Eloquent{$model}WriteRepository;";
        }

        foreach ($imports as $import) {
            if (!str_contains($content, $import)) {
                $content = preg_replace(
                    '/namespace App\\\\Providers;/',
                    "namespace App\\Providers;\n\n{$import}",
                    $content,
                    1
                );
            }
        }

        $bindings = "";
        if ($read && !str_contains($content, "{$model}ReadRepositoryContract::class")) {
            $bindings .= <<<PHP

        \$this->app->bind(
            {$model}ReadRepositoryContract::class,
            Eloquent{$model}ReadRepository::class,
        );
PHP;
        }

        if ($write && !str_contains($content, "{$model}WriteRepositoryContract::class")) {
            $bindings .= <<<PHP

        \$this->app->bind(
            {$model}WriteRepositoryContract::class,
            Eloquent{$model}WriteRepository::class,
        );
PHP;
        }
        
        if (empty($bindings)) {
            if ($content !== $originalContent) {
                File::put($providerPath, $content);
                $this->info("RepositoryServiceProvider.php atualizado (apenas imports).");
            } else {
                $this->info("RepositoryServiceProvider.php já contém os registros necessários.");
            }
            return;
        }

        if (str_contains($content, 'public function boot(): void')) {
            $search = "    }\n\n    public function boot(): void";
            if (str_contains($content, $search)) {
                $content = str_replace(
                    $search,
                    "{$bindings}\n    }\n\n    public function boot(): void",
                    $content
                );
            } else {
                 $this->warn("Não foi possível encontrar o ponto de inserção automático em RepositoryServiceProvider.php.");
                 return;
            }
        } else {
             $pos = strrpos($content, '}');
             if ($pos !== false) {
                 $content = substr_replace($content, "{$bindings}\n    }\n", $pos, 1);
             }
        }

        File::put($providerPath, $content);
        $this->info("Atualizado RepositoryServiceProvider.php com novos bindings.");
    }
}
