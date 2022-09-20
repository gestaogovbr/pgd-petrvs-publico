<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use App\Services\PetrvsService;

class PetrvsController extends Controller
{
    public function environmentConfig(Request $request) {
        return response()->view('environment-config', ['entidade' => config('petrvs')['entidade']])
            ->header('Content-Type', 'application/javascript');
    }

    public function showTables(Request $request) {
        try {
            return response()->json([
                'success' => true,
                'tabelas' => $this->service->showTables()
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}


