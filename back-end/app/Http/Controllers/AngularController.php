<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AngularController extends Controller
{
    public function index()
    {
        $app_config = config("app");
        $pretrvs_config = config("petrvs");
        return view('angular', [
            "entidade" => $pretrvs_config["entidade"], 
            "suporte" => $pretrvs_config["suporte"], 
            "logo" => $pretrvs_config["logo"], 
            "host" => $app_config["url"], 
            "version" => $app_config["version"]
        ]);
    }
}
