<?php

namespace App\Console\Commands;

use App\Models\Tenant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateModelCommand extends Command
{
    protected $ignoreTables = [
        "changes",
        "sequences",
        "migrations",
        "traffic",
        "errors",
        "logs",
        "failed_jobs",
        "api_siape_uorgs",
        "tenants"
    ];

    protected $ignoreFields = [
        "id",
        "created_at",
        "updated_at",
    ];

    protected $ignoreFiles = [
        "ModelBase.php",
        "DocumentoLink.php",
        "HistoricoAtividadeExternaCurriculum.php",
        "HistoricoFuncaoCurriculum.php",
        "HistoricoLotacaoCurriculum.php",
        "NotificacaoConfig.php"
    ];

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'models:update {--C|create}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update models $fillables with database structure';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $tenant = Tenant::find(config('petrvs')['entidade']);
        tenancy()->initialize($tenant);
        DB::reconnect('tenant');
        $create = $this->option('create');
        //$tables = array_map(fn($row) => $row->TABLE_NAME, DB::select("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = :database", [":database" => env('DB_DATABASE')]));
        $tables = array_map(fn($row) => $row->TABLE_NAME, DB::select("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = :database", [":database" => $tenant->tenancy_db_name]));
        $models = array_map(fn($file) => str_replace(base_path() . '/app/Models/', "", $file), array_filter(glob(base_path() . '/app/Models/*.php'), 'is_file'));
        $updated = "";
        foreach($models as $file) {
            if(!in_array($file, $this->ignoreFiles)) {
                $model = file_get_contents(base_path() . '/app/Models/' . $file);
                $match = [];
                preg_match('/protected \$table = [\'"]([\w_\d]+?)[\'"]/', $model, $match);
                if(count($match) != 2) {
                    $this->error('Arquivo ' . $file . ' não possui a propriedade protected $table');
                    return 1;
                }
                $table = $match[1];
                if(!in_array($table, $this->ignoreTables)) {
                    if(!in_array($table, $tables)) {
                        $this->error('Tabela ' . $table . ' não consta no banco de dados');
                        return 1;
                    }
                    $match = [];
                    preg_match('/^\s*public \$fillable = \[(\C*?)\];/m', $model, $match);
                    if(count($match) != 2) {
                        $this->error('Arquivo ' . $file . ' não possui a propriedade public $fillable');
                        return 1;
                    }
                    $fillable = $match[1];
                    $match = [];
                    preg_match_all('/^\s*[\'"](\w+?)[\'"]/m', $fillable, $match);
                    $fields = count($match) == 2 ? $match[1] : []; /* Campos marcados como fillable no arquivo */
                    preg_match_all('/^\s*\/\*[\'"](\w+?)[\'"],\*\/\/\/ REMOVED/m', $fillable, $match);
                    $removed = count($match) == 2 ? $match[1] : []; /* Campos removidos */
                    /* Cria novo vetor de $fillable */
                    //$columns = DB::select("SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_DEFAULT, COLUMN_TYPE, COLUMN_KEY, COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = :table AND TABLE_SCHEMA = :database ORDER BY ORDINAL_POSITION", [":database" => env('DB_DATABASE'), ":table" => $table]);
                    $columns = DB::select("SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_DEFAULT, COLUMN_TYPE, COLUMN_KEY, COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = :table AND TABLE_SCHEMA = :database ORDER BY ORDINAL_POSITION", [":database" => $tenant->tenancy_db_name, ":table" => $table]);
                    $result = [];
                    $added = [];
                    /* Adiciona primeiro os campos que já estavam como fillable no arquivo original */
                    foreach($fields as $field) {
                        $field = strtolower($field);
                        $column = array_values(array_filter($columns, fn($row) => strtolower($row->COLUMN_NAME) == $field))[0] ?? null;
                        if(!empty($column)) {
                            $result[] = $this->fillableField((array) $column);
                        } else if(!in_array($field, $removed)) {
                            $removed[] = $field;
                        }
                        $added[] = $field;
                    }
                    /* Adiciona os outros campos que não estão como fillable no arquivo original mas que estão no banco */
                    foreach($columns as $column) {
                        if(!in_array(strtolower($column->COLUMN_NAME), $added) && !in_array($column->COLUMN_NAME, $this->ignoreFields)) $result[] = "//" . $this->fillableField((array) $column);
                    }
                    /* Adiciona os campos removidos */
                    foreach($removed as $field) if(in_array($field, $added)) $result[] = "/*'{$field}',*/// REMOVED\n";
                    /* Grava alteração no arquivo */
                    $replace = "\n    public \$fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT\n";
                    foreach($result as $field) {
                        $replace .= "        {$field}";
                    }
                    $replace .= "    ];";
                    $toWrite = preg_replace('/^\s*public \$fillable = \[(\C*?)\];/m', $replace, $model);
                    if($toWrite != $model) {
                        file_put_contents(base_path() . '/app/Models/' . $file, $toWrite);
                        $updated .= "{$file}\n";
                    }
                }
            }
        }
        if(!empty($updated)) $this->line("Arquivos atualizados: \n" . $updated);
        return 0;
    }

    public function fillableField($column) {
        $type = $column["COLUMN_TYPE"] ?: "unknow";
        $nullable = $column["IS_NULLABLE"] == "YES" ? "" : " NOT NULL;";
        $default = !empty($column["COLUMN_DEFAULT"]) ? " DEFAULT: '{$column["COLUMN_DEFAULT"]}';" : "";
        $comment = !empty($column["COLUMN_COMMENT"]) ? " */// {$column["COLUMN_COMMENT"]}" : " */";
        return "'{$column["COLUMN_NAME"]}', /* {$type};{$nullable}{$default}{$comment}\n";
    }
}
