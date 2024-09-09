<?php
namespace App\Services\API_PGD\AuditSources;

use App\Models\ViewApiPgd;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Services\API_PGD\ExportSource;

// Função da classe é obter os IDs a dados de audit a serem exportados a partir do Audit
abstract class AuditSource 
{
    abstract public function getData();

    public function getDataFromView($tipo) { 
        return ViewApiPgd::where('tipo', $tipo)
                ->withoutGlobalScope(SoftDeletingScope::class)
                ->get()
                ->map(function($data) use($tipo) {
                    return new ExportSource($tipo, $data->id, $data->json_audit);
                });
    }
}

