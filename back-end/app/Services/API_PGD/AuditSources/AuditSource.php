<?php
namespace App\Services\API_PGD\AuditSources;

use App\Models\ViewApiPgd;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Services\API_PGD\ExportSource;

// Função da classe é obter os IDs a dados de audit a serem exportados a partir do Audit
abstract class AuditSource 
{
    protected $tipo;

    public function __construct(string $tipo = null) {
        $this->tipo = $tipo;
    }

    public function getData() {
        return ViewApiPgd::where('tipo', $this->tipo)
                ->withoutGlobalScope(SoftDeletingScope::class)
                ->cursor();
    }

    public function count() {
        return ViewApiPgd::where('tipo', $this->tipo)
                ->withoutGlobalScope(SoftDeletingScope::class)
                ->count();
    }

    public function toExportSource($data) {
        return new ExportSource($data->tipo, $data->id, $data->fonte, $data->json_audit);
    }

    /*public function getDataFromView($tipo) { 
        return ViewApiPgd::where('tipo', $tipo)
                ->withoutGlobalScope(SoftDeletingScope::class)
                ->get()
                ->map(function($data) use($tipo) {
                    return new ExportSource($tipo, $data->id, $data->fonte, $data->json_audit);
                });
    }*/
}

