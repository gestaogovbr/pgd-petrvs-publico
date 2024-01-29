<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response; // Adicione esta linha
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class SeederController extends Controller
{
    public function index()
    {
        $seederPath = database_path('seeders');
        $files = \File::allFiles($seederPath);
        $seeders = [];
        $excluirSeeders = [
            'SeederExcluido1',
            'SeederExcluido2'
        ];

        foreach ($files as $file) {
            $seederName = $file->getFilenameWithoutExtension();
            if (!in_array($seederName, $excluirSeeders)) {
                $seeders[] = $seederName;
            }
        }

        return response()->json($seeders, Response::HTTP_OK);
    }

    public function execute(Request $request)
    {
        $seederName = $request->input('seeder');
        $id = $request->has('id') ? $request->input('id') : null;

        $seederClass = "Database\\Seeders\\$seederName"; 

        if (class_exists($seederClass)) {
            $diretorioAtual = getcwd();
            chdir(base_path());
            $seedCommand = 'echo yes | php artisan tenants:run db:seed --option="class=' . $seederClass . '"' . (empty($id) ? '' : ' --tenants=' . $id);
            exec($seedCommand, $output);
            chdir($diretorioAtual);

            return response()->json(['message' => "Seeder $seederName executado com sucesso.", 'output' => $output], Response::HTTP_OK);
        } else {
            return response()->json(['error' => "Seeder $seederName não existe."], Response::HTTP_BAD_REQUEST);
        }
    }
}
