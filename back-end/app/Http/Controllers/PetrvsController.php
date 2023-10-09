<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use App\Services\PetrvsService;
use App\Http\Controllers\ControllerBase;
use Throwable;

class PetrvsController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) { }

    public function environmentConfig(Request $request) {
        $app_config = config("app");
        $petrvs_config = config("petrvs");
        $google_config = config("google");
        $config = json_encode([
            "api_url" => $app_config["url"],
            "app_env" => $app_config["env"],
            "entidade" => $petrvs_config["entidade"],
            "suporte_url" => $petrvs_config["suporte"],
            "logo_url" => $petrvs_config["logo"],
            "versao" => $app_config["version"],
            "login" => [
                "google_client_id" => $google_config["client_id"],
                "gsuit" => $petrvs_config["login"]["gsuit"],
                "azure" => $petrvs_config["login"]["azure"],
                "institucional" => $petrvs_config["login"]["institucional"],
                "firebase" => $petrvs_config["login"]["firebase"],
                "user_password" => $petrvs_config["login"]["user-password"]
            ]
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}


