<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AngularController extends Controller
{
    public function index()
    {
        $app_config = config("app");
        $petrvs_config = config("petrvs");
        $google_config = config("google", []);
        $config = json_encode([
            "api_url" => $app_config["url"],
            "entidade" => $petrvs_config["entidade"],
            "suporte_url" => $petrvs_config["suporte"], 
            "logo_url" => $petrvs_config["logo"], 
            "versao" => $app_config["version"],
            "login" => [
                "google_client_id" => $google_config["client_id"] ?? '',
                "gsuit" => $petrvs_config["login"]["gsuit"],
                "azure" => $petrvs_config["login"]["azure"],
                "institucional" => $petrvs_config["login"]["institucional"],
                "firebase" => $petrvs_config["login"]["firebase"],
                "user_password" => $petrvs_config["login"]["user-password"]
            ]
        ]);
        return view('angular', ["host" => $app_config["url"], "config" => $config]);
    }
}
