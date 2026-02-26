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

        $modelPath = app_path("Models/{$model}.php");
        if (!File::exists($modelPath)) {
            $this->error("Model {$model} não encontrado em App\Models.");
            
            $models = collect(File::files(app_path('Models')))
                ->map(fn($file) => $file->getFilenameWithoutExtension())
                ->sort()
                ->values();
            
            $this->info("Models disponíveis: " . $models->implode(', '));
            return 1;
        }

        $repositoryPath = app_path("Repository/{$model}");
        $contractsPath = "{$repositoryPath}/Contracts";
        $eloquentPath = "{$repositoryPath}/Eloquent";

        File::ensureDirectoryExists($repositoryPath);
        File::ensureDirectoryExists($contractsPath);
        File::ensureDirectoryExists($eloquentPath);

        if ($read) {
            $this->createReadContract($model, $contractsPath);
            $this->createReadImplementation($model, $eloquentPath);
        }

        if ($write) {
            $this->createWriteContract($model, $contractsPath);
            $this->createWriteImplementation($model, $eloquentPath);
        }

        $this->createMainRepository($model, $read, $write);

        $this->registerInProvider($model, $read, $write);

        // Ajustar permissões para o usuário do sistema (1000:1000)
        // Isso é necessário pois o comando roda como root no container
        $pathsToChown = [
            $repositoryPath,
            app_path("Repository/{$model}Repository.php"),
            app_path('Providers/RepositoryServiceProvider.php')
        ];

        foreach ($pathsToChown as $path) {
            if (File::exists($path)) {
                // Executa chown recursivo se for diretório
                $cmd = is_dir($path) ? "chown -R 1000:1000 {$path}" : "chown 1000:1000 {$path}";
                exec($cmd);
            }
        }

        $this->info("Repositório para {$model} criado com sucesso!");
        return 0;
    }

    protected function createReadContract(string $model, string $path): void
    {
        $content = <<<PHP
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
        File::put("{$path}/{$model}ReadRepositoryContract.php", $content);
        $this->info("Criado {$model}ReadRepositoryContract.php");
    }

    protected function createWriteContract(string $model, string $path): void
    {
        $content = <<<PHP
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
        File::put("{$path}/{$model}WriteRepositoryContract.php", $content);
        $this->info("Criado {$model}WriteRepositoryContract.php");
    }

    protected function createReadImplementation(string $model, string $path): void
    {
        $content = <<<PHP
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
        File::put("{$path}/Eloquent{$model}ReadRepository.php", $content);
        $this->info("Criado Eloquent{$model}ReadRepository.php");
    }

    protected function createWriteImplementation(string $model, string $path): void
    {
        $content = <<<PHP
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
        File::put("{$path}/Eloquent{$model}WriteRepository.php", $content);
        $this->info("Criado Eloquent{$model}WriteRepository.php");
    }

    protected function createMainRepository(string $model, bool $read, bool $write): void
    {
        $imports = [];
        $constructorParams = [];

        $imports[] = "use App\Models\\{$model};"; 

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

        $content = <<<PHP
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
        File::put(app_path("Repository/{$model}Repository.php"), $content);
        $this->info("Criado {$model}Repository.php");
    }

    protected function registerInProvider(string $model, bool $read, bool $write): void
    {
        $providerPath = app_path('Providers/RepositoryServiceProvider.php');
        $content = File::get($providerPath);

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
                 $this->warn("Não foi possível encontrar o ponto de inserção em RepositoryServiceProvider.php. Por favor, adicione os bindings manualmente.");
            }
        } else {
             $pos = strrpos($content, '}');
             if ($pos !== false) {
                 $content = substr_replace($content, "{$bindings}\n    }\n", $pos, 1);
             }
        }

        File::put($providerPath, $content);
        $this->info("Atualizado RepositoryServiceProvider.php");
    }
}
