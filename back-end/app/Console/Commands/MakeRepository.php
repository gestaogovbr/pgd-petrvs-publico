<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {model} {--read=true} {--write=true}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new repository structure following the Repository Pattern';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $model = $this->argument('model');
        $read = filter_var($this->option('read'), FILTER_VALIDATE_BOOLEAN);
        $write = filter_var($this->option('write'), FILTER_VALIDATE_BOOLEAN);

        // 1. Validate Model Existence
        $modelPath = app_path("Models/{$model}.php");
        if (!File::exists($modelPath)) {
            $this->error("Model {$model} not found in App\Models.");
            
            $models = collect(File::files(app_path('Models')))
                ->map(fn($file) => $file->getFilenameWithoutExtension())
                ->sort()
                ->values();
            
            $this->info("Available models: " . $models->implode(', '));
            return 1;
        }

        $repositoryPath = app_path("Repository/{$model}");
        $contractsPath = "{$repositoryPath}/Contracts";
        $eloquentPath = "{$repositoryPath}/Eloquent";

        // Create Directories
        File::ensureDirectoryExists($repositoryPath);
        File::ensureDirectoryExists($contractsPath);
        File::ensureDirectoryExists($eloquentPath);

        // 2. Generate Files
        if ($read) {
            $this->createReadContract($model, $contractsPath);
            $this->createReadImplementation($model, $eloquentPath);
        }

        if ($write) {
            $this->createWriteContract($model, $contractsPath);
            $this->createWriteImplementation($model, $eloquentPath);
        }

        $this->createMainRepository($model, $read, $write);

        // 3. Register in Provider
        $this->registerInProvider($model, $read, $write);

        $this->info("Repository for {$model} created successfully!");
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
        $this->info("Created {$model}ReadRepositoryContract.php");
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
        $this->info("Created {$model}WriteRepositoryContract.php");
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
        $this->info("Created Eloquent{$model}ReadRepository.php");
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
        $this->info("Created Eloquent{$model}WriteRepository.php");
    }

    protected function createMainRepository(string $model, bool $read, bool $write): void
    {
        $imports = [];
        $properties = [];
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
        $this->info("Created {$model}Repository.php");
    }

    protected function registerInProvider(string $model, bool $read, bool $write): void
    {
        $providerPath = app_path('Providers/RepositoryServiceProvider.php');
        $content = File::get($providerPath);

        // Add imports
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

        // Add bindings
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
            File::put($providerPath, $content);
            $this->info("RepositoryServiceProvider.php updated (imports only).");
            return;
        }

        if (str_contains($content, 'public function boot(): void')) {
            // Check if there is a closing brace before boot()
            // We want to insert before the LAST closing brace of register()
            // Assuming register() is followed by boot()
            
            // Regex to match "}\s*public function boot"
            // But we want to insert BEFORE "}"
            
            // Simpler: Replace "    }\n\n    public function boot(): void"
            // This assumes standard formatting.
            
            $search = "    }\n\n    public function boot(): void";
            if (str_contains($content, $search)) {
                $content = str_replace(
                    $search,
                    "{$bindings}\n    }\n\n    public function boot(): void",
                    $content
                );
            } else {
                 // Try looser match or fallback
                 // Maybe the user has different spacing
                 // We can search for `public function boot(): void` and verify previous lines
                 
                 // Let's assume the file is well formatted as we just wrote it.
                 // If not, we append to end of class? No, must be in register.
                 
                 // If we can't find the insertion point, we warn the user.
                 $this->warn("Could not find insertion point in RepositoryServiceProvider.php. Please add bindings manually.");
            }
        } else {
             // Fallback: insert before the last closing brace of the class
             $pos = strrpos($content, '}');
             if ($pos !== false) {
                 $content = substr_replace($content, "{$bindings}\n    }\n", $pos, 1);
             }
        }

        File::put($providerPath, $content);
        $this->info("Updated RepositoryServiceProvider.php");
    }
}
