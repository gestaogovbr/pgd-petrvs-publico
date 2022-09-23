<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AngularController extends Controller
{
    public function index()
    {
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
        return view('angular', ["host" => $app_config["url"], "config" => $config]);
    }
}
