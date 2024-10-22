<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Models\EnvVariable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Throwable;

class EnvController extends Controller {

    public function query(Request $request)
    {
        try {
            $envVariables = EnvVariable::all();

            $envPath = base_path('.env');

            if (!File::exists($envPath)) {
                return response()->json(['error' => 'Arquivo .env não encontrado.'], 404);
            }

            $envContent = File::get($envPath);

            $envValues = [];
            foreach (explode("\n", $envContent) as $line) {
                if (strpos($line, '=') !== false) {
                    [$key, $value] = explode('=', $line, 2);
                    $envValues[trim($key)] = trim($value);
                }
            }

            // 5. Substitua o valor do banco de dados pelo valor do .env
            foreach ($envVariables as $variable) {
                if (array_key_exists($variable->name, $envValues)) {
                    $variable->value = $envValues[$variable->name];
                }
            }

            // 6. Retorne a resposta com os valores atualizados
            return response()->json(['success' => true, 'data' => $envVariables]);

        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }


    public function update(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            'value' => 'required|string',
        ]);

        $envVariable = EnvVariable::where('name', $request->name)->first();

        if (!$envVariable) {
            return response()->json(['error' => 'Env variable not found'], 404);
        }

        $envVariable->value = $request->value;
        $envVariable->save();

        $key = $request->input('name');
        $newValue = $request->input('value');
        $envPath = base_path('.env');

        if (!File::exists($envPath)) {
            return response()->json(['error' => 'Arquivo .env não encontrado.'], 404);
        }

        $envContent = File::get($envPath);
        $pattern = "/^{$key}=.*/m";
        if (preg_match($pattern, $envContent, $matches)) {
            $envContent = preg_replace($pattern, "{$key}={$newValue}", $envContent);
        } else {
            $envContent .= "\n{$key}={$newValue}\n";
        }

        try {
            File::put($envPath, $envContent);
            Artisan::call('config:clear');
            return response()->json(['success' => "Variável '{$key}' atualizada com sucesso. Novo valor: {$newValue}"]);
        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
        return response()->json(['message' => 'Env alterado!']);

    }
}
