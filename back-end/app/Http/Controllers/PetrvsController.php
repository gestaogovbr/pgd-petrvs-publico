<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use App\Services\PetrvsService;
use App\Http\Controllers\ControllerBase;

class PetrvsController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) { }

    public function environmentConfig(Request $request) {
        $app_config = config("app");
        $pretrvs_config = config("petrvs");
        $config = json_encode([
            "api_url" => $app_config["url"],
            "entidade" => $pretrvs_config["entidade"],
            "suporte_url" => $pretrvs_config["suporte"], 
            "logo_url" => $pretrvs_config["logo"], 
            "versao" => $app_config["version"],
            "login" => $pretrvs_config["login"]
        ]);
        return response()->view('environment-config', ["config" => $config])
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


