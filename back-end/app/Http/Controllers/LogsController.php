<?php

namespace App\Http\Controllers;


use App\Models\Logs;
use Illuminate\Http\Request;

class LogsController extends Controller {

    public function index(Request $request)
    {

        $query = Logs::query();

        // Filtrar por data de criação, se fornecida
        if ($request->has('created_at')) {
            $query->createdAt($request->input('created_at'));
        }

        // Filtrar por tenant_id, se fornecido
        if ($request->has('tenant_id')) {
            $query->tenantId($request->input('tenant_id'));
        }

        $consoleErrors = $query->get();

        return response()->json(['success' => true, 'data' => $consoleErrors]);
    }
}
