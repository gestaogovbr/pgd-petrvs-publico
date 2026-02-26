<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeRepository extends Command
{
    private const EXIT_SUCCESS = 0;
    private const EXIT_FAILURE = 1;
    private const PERMISSION_USER = '1000:1000';
    private const PROVIDER_PATH = 'Providers/RepositoryServiceProvider.php';
    private const MODEL_DIR = 'Models';
    private const REPOSITORY_DIR = 'Repository';

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
     *
     * @return int
     */
    public function handle(): int
    {
        $model = $this->argument('model');
        $read = $this->getOptionAsBoolean('read');
        $write = $this->getOptionAsBoolean('write');

        if (!$read && !$write) {
            $read = true;
            $write = true;
        }

        if (!$this->validateModelExistence($model)) {
            return self::EXIT_FAILURE;
        }

        $repositoryPath = app_path(self::REPOSITORY_DIR . "/{$model}");
        $contractsPath = "{$repositoryPath}/Contracts";
        $eloquentPath = "{$repositoryPath}/Eloquent";

        $this->ensureDirectories([$repositoryPath, $contractsPath, $eloquentPath]);
        
        $this->generateReadFiles($model, $contractsPath, $eloquentPath, $read);
        $this->generateWriteFiles($model, $contractsPath, $eloquentPath, $write);
        
        $this->createFileIfNotExists(
            app_path(self::REPOSITORY_DIR . "/{$model}Repository.php"),
            $this->getMainRepositoryContent($model, $read, $write)
        );

        $this->registerInProvider($model, $read, $write);
        $this->fixPermissions($model, $repositoryPath);

        $this->info("Processo de criação/verificação do repositório para {$model} concluído!");
        
        return self::EXIT_SUCCESS;
    }

    /**
     * Obtém uma opção como booleano.
     *
     * @param string $key
     * @return bool
     */
    private function getOptionAsBoolean(string $key): bool
    {
        return filter_var($this->option($key), FILTER_VALIDATE_BOOLEAN);
    }

    /**
     * Valida se o Model existe.
     *
     * @param string $model
     * @return bool
     */
    private function validateModelExistence(string $model): bool
    {
        $modelPath = app_path(self::MODEL_DIR . "/{$model}.php");
        
        if (File::exists($modelPath)) {
            return true;
        }

        $this->error("Model {$model} não encontrado em App\Models.");
        
        $models = collect(File::files(app_path(self::MODEL_DIR)))
            ->map(fn($file) => $file->getFilenameWithoutExtension())
            ->sort()
            ->values();
        
        $this->info("Models disponíveis: " . $models->implode(', '));
        
        return false;
    }

    /**
     * Garante que os diretórios existam.
     *
     * @param array $paths
     * @return void
     */
    private function ensureDirectories(array $paths): void
    {
        foreach ($paths as $path) {
            File::ensureDirectoryExists($path);
        }
    }

    /**
     * Gera os arquivos de leitura se necessário.
     *
     * @param string $model
     * @param string $contractsPath
     * @param string $eloquentPath
     * @param bool $read
     * @return void
     */
    private function generateReadFiles(string $model, string $contractsPath, string $eloquentPath, bool $read): void
    {
        if (!$read) {
            return;
        }

        $this->createFileIfNotExists(
            "{$contractsPath}/{$model}ReadRepositoryContract.php",
            $this->getReadContractContent($model)
        );
        
        $this->createFileIfNotExists(
            "{$eloquentPath}/Eloquent{$model}ReadRepository.php",
            $this->getReadImplementationContent($model)
        );
    }

    /**
     * Gera os arquivos de escrita se necessário.
     *
     * @param string $model
     * @param string $contractsPath
     * @param string $eloquentPath
     * @param bool $write
     * @return void
     */
    private function generateWriteFiles(string $model, string $contractsPath, string $eloquentPath, bool $write): void
    {
        if (!$write) {
            return;
        }

        $this->createFileIfNotExists(
            "{$contractsPath}/{$model}WriteRepositoryContract.php",
            $this->getWriteContractContent($model)
        );
        
        $this->createFileIfNotExists(
            "{$eloquentPath}/Eloquent{$model}WriteRepository.php",
            $this->getWriteImplementationContent($model)
        );
    }

    /**
     * Cria um arquivo se ele não existir.
     *
     * @param string $path
     * @param string $content
     * @return void
     */
    private function createFileIfNotExists(string $path, string $content): void
    {
        if (File::exists($path)) {
            $this->warn("Arquivo já existe: " . basename($path));
            return;
        }

        File::put($path, $content);
        $this->info("Criado: " . basename($path));
    }

    /**
     * Corrige as permissões dos arquivos gerados.
     *
     * @param string $model
     * @param string $repositoryPath
     * @return void
     */
    private function fixPermissions(string $model, string $repositoryPath): void
    {
        $pathsToChown = [
            $repositoryPath,
            app_path(self::REPOSITORY_DIR . "/{$model}Repository.php"),
            app_path(self::PROVIDER_PATH)
        ];

        foreach ($pathsToChown as $path) {
            $this->chownPath($path);
        }
    }

    /**
     * Executa chown em um caminho específico.
     *
     * @param string $path
     * @return void
     */
    private function chownPath(string $path): void
    {
        if (!File::exists($path)) {
            return;
        }
        
        $cmd = is_dir($path) 
            ? "chown -R " . self::PERMISSION_USER . " {$path}" 
            : "chown " . self::PERMISSION_USER . " {$path}";
            
        exec($cmd);
    }

    /**
     * Obtém o conteúdo do contrato de leitura.
     *
     * @param string $model
     * @return string
     */
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

    /**
     * Obtém o conteúdo do contrato de escrita.
     *
     * @param string $model
     * @return string
     */
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

    /**
     * Obtém o conteúdo da implementação de leitura.
     *
     * @param string $model
     * @return string
     */
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

    /**
     * Obtém o conteúdo da implementação de escrita.
     *
     * @param string $model
     * @return string
     */
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

    /**
     * Obtém o conteúdo do repositório principal.
     *
     * @param string $model
     * @param bool $read
     * @param bool $write
     * @return string
     */
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

    /**
     * Registra os bindings no ServiceProvider.
     *
     * @param string $model
     * @param bool $read
     * @param bool $write
     * @return void
     */
    private function registerInProvider(string $model, bool $read, bool $write): void
    {
        $providerPath = app_path(self::PROVIDER_PATH);
        
        if (!File::exists($providerPath)) {
            $this->error("RepositoryServiceProvider não encontrado em {$providerPath}");
            return;
        }

        $content = File::get($providerPath);
        $originalContent = $content;

        $content = $this->addProviderImports($content, $model, $read, $write);
        $content = $this->addProviderBindings($content, $model, $read, $write);

        if ($content === $originalContent) {
            $this->info("RepositoryServiceProvider.php já contém as configurações necessárias ou não houve alterações.");
            return;
        }

        File::put($providerPath, $content);
        $this->info("Atualizado RepositoryServiceProvider.php com novos bindings.");
    }

    /**
     * Adiciona imports ao conteúdo do provider.
     *
     * @param string $content
     * @param string $model
     * @param bool $read
     * @param bool $write
     * @return string
     */
    private function addProviderImports(string $content, string $model, bool $read, bool $write): string
    {
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
            if (str_contains($content, $import)) {
                continue;
            }
            
            $content = preg_replace(
                '/namespace App\\\\Providers;/',
                "namespace App\\Providers;\n\n{$import}",
                $content,
                1
            );
        }

        return $content;
    }

    /**
     * Adiciona bindings ao conteúdo do provider.
     *
     * @param string $content
     * @param string $model
     * @param bool $read
     * @param bool $write
     * @return string
     */
    private function addProviderBindings(string $content, string $model, bool $read, bool $write): string
    {
        $bindings = "";
        
        if ($read) {
            $bindings .= $this->generateBindingBlock($content, $model, 'Read');
        }

        if ($write) {
            $bindings .= $this->generateBindingBlock($content, $model, 'Write');
        }
        
        if (empty($bindings)) {
            return $content;
        }

        return $this->insertBindingsIntoContent($content, $bindings);
    }

    /**
     * Gera o bloco de código de binding se não existir.
     *
     * @param string $content
     * @param string $model
     * @param string $type
     * @return string
     */
    private function generateBindingBlock(string $content, string $model, string $type): string
    {
        $contractClass = "{$model}{$type}RepositoryContract::class";
        
        if (str_contains($content, $contractClass)) {
            return "";
        }

        return <<<PHP

        \$this->app->bind(
            {$contractClass},
            Eloquent{$model}{$type}Repository::class,
        );
PHP;
    }

    /**
     * Insere os bindings no local correto do conteúdo.
     *
     * @param string $content
     * @param string $bindings
     * @return string
     */
    private function insertBindingsIntoContent(string $content, string $bindings): string
    {
        if (str_contains($content, 'public function boot(): void')) {
            $search = "    }\n\n    public function boot(): void";
            if (str_contains($content, $search)) {
                return str_replace(
                    $search,
                    "{$bindings}\n    }\n\n    public function boot(): void",
                    $content
                );
            }
            
            // Fallback se a formatação não for exata
            $this->warn("Não foi possível encontrar o ponto de inserção automático exato em RepositoryServiceProvider.php.");
        }

        $pos = strrpos($content, '}');
        if ($pos !== false) {
            return substr_replace($content, "{$bindings}\n    }\n", $pos, 1);
        }

        return $content;
    }
}
