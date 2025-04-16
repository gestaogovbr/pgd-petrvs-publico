<?php
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
if (!function_exists('logInfo')) {
    function logInfo($output = null) {
        if ($output === null) {
            $output = Artisan::output();
        }
        Log::info($output);
        //Log::channel('daily')->info($output);
    }
}

if (!function_exists('getClassNameFromPath')) {
    function getClassNameFromPath(string $filePath) :  ?string{
        $namespace = str_replace(['app/', '/'], ['App\\', '\\'], $filePath);
        $namespace = rtrim($namespace, '.php'); 

        if (class_exists($namespace)) {
            return class_basename($namespace); 
        }

        return null;
    }
}

if (!function_exists('imprimeNoTerminal')) {

    function imprimeNoTerminal(string $str) :  void{
        passthru("echo " . $str);
        }
    }
