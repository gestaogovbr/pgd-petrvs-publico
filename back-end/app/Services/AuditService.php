<?php

namespace App\Services;

use App\Models\Audit;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Schema;

class AuditService extends ServiceBase
{
    public function listar($search) {
        $audits = Audit::with('user')->orderBy('created_at', 'desc');
        $columns = Schema::getColumnListing('audits');
        foreach ($columns as $column) {
            $audits->orWhere($column, 'LIKE', "%{$search}%");
        }
        return $audits->paginate(30);
    }
}
