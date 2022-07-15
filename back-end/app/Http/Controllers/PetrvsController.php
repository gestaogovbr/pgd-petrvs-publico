<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;

class PetrvsController extends Controller
{
    public function environmentConfig(Request $request) {
        return response()->view('environment-config', ['entidade' => config('petrvs')['entidade']])
            ->header('Content-Type', 'application/javascript');
    }    
}
