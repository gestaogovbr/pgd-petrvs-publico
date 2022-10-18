<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AngularController extends Controller
{
    public function index()
    {
        $app_config = config("app");
        $petrvs_config = config("petrvs");
        $config = json_encode([
            "api_url" => $app_config["url"],
            "entidade" => $petrvs_config["entidade"],
            "suporte_url" => $petrvs_config["suporte"], 
            "logo_url" => $petrvs_config["logo"], 
            "versao" => $app_config["version"],
            "login" => $petrvs_config["login"]
        ]);
        return view('angular', ["host" => $app_config["url"], "config" => $config]);
    }
}
