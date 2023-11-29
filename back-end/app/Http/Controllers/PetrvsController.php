<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use App\Services\PetrvsService;
use App\Http\Controllers\ControllerBase;
use Stancl\Tenancy\Database\Models\Domain;
use Throwable;

class PetrvsController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) { }

    public function environmentConfig(Request $request) {
        $url = $request->url();
        $parsedUrl = parse_url($url);
        // Obtém o host (domínio) do URL
        $domain = $parsedUrl['host'];

        if($domain=="petrvs_php") $domain="localhost";

        $tenant = Domain::where('domain', $domain)->with('tenant')->first();

        if(!$tenant){
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
                    "user_password" => $petrvs_config["login"]["user-password"],
                    "login_unico" => $petrvs_config["login"]["login-unico"]
                ]
            ]);
            return response()->view('environment-config', ["config" => $config])
                ->header('Content-Type', 'application/javascript');
        }

        $tenant=json_decode($tenant['tenant'],true);

        $config = json_encode([
            "api_url" => "https://".$tenant["dominio_url"],
            "app_env" => config("app.env"),
            "entidade" => $tenant["id"],
            "suporte_url" =>$tenant["dominio_url"],
            "logo_url" => null,
            "versao" => $tenant["version"],
            "login" => [
                "google_client_id" =>   $tenant["login_google_client_id"],
                "gsuit" =>              $tenant["login_google"],
                "azure" =>              $tenant["login_azure"],
                "institucional" =>      false,
                "firebase" =>           $tenant["login_google"],
                "user_password" =>      false,
                "login_unico" =>        $tenant["login_login_unico"],
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


