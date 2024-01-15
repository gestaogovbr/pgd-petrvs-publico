<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Request;
use Artisan;
use Exception;

class SeederController extends Controller
{
    public function index()
    {
        $seederPath = database_path('seeders');
        $files = File::allFiles($seederPath);
        $seeders = [];

        foreach ($files as $file) {
            $seeders[] = $file->getFilenameWithoutExtension();
        }

        return response()->json($seeders, Response::HTTP_OK);
    }

    public function execute(Request $request)
    {
        $seederName = $request->input('seeder');

        try {
            Artisan::call('db:seed', ['--class' => $seederName]);
            return response()->json(['message' => "Seeder $seederName executado com sucesso."], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
