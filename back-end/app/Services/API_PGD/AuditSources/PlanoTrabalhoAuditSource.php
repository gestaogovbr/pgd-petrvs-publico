<?php
namespace App\Services\API_PGD\AuditSources;

use App\Models\ViewPgdPlanosTrabalho;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PlanoTrabalhoAuditSource extends AuditSource
{
    public function __construct() {
        parent::__construct('trabalho');
    }

    public function getData() {
        return ViewPgdPlanosTrabalho::withoutGlobalScope(SoftDeletingScope::class)
                ->cursor();
    }

    public function count() {
        return ViewPgdPlanosTrabalho::withoutGlobalScope(SoftDeletingScope::class)
                ->count();
    }
}

