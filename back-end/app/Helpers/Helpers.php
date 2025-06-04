<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

if (!function_exists('logInfo')) {
    function logInfo($output = null)
    {
        if ($output === null) {
            $output = Artisan::output();
        }
        Log::info($output);
        //Log::channel('daily')->info($output);
    }
}

if (!function_exists('getClassNameFromPath')) {
    function getClassNameFromPath(string $filePath): ?string
    {
        $namespace = str_replace(['app/', '/'], ['App\\', '\\'], $filePath);
        $namespace = rtrim($namespace, '.php');

        if (class_exists($namespace)) {
            return class_basename($namespace);
        }

        return null;
    }
}

if (!function_exists('imprimeNoTerminal')) {

    function imprimeNoTerminal(string $str): void
    {
        passthru("echo " . $str);
    }
}

if (!function_exists('simpleXmlElementToArray')) {

    function simpleXmlElementToArray(SimpleXMLElement $element): array
    {
        $array = [];
        foreach ($element as $key => $value) {
            $array[$key] = (string) $value;
        }
        return $array;
    }
}

if (! function_exists('simpleXmlElementToArrayComNamespace')) {
   
    function simpleXmlElementToArrayComNamespace(SimpleXMLElement $element): array
    {
        $array = [];

        foreach ($element->attributes() as $atributo => $valor) {
            $array['@attributes'][$atributo] = (string) $valor;
        }

        $namespaces = $element->getDocNamespaces(true);

        $nsFilhos = $namespaces[''] ?? null;

        if ($nsFilhos === null) {
            return [ '_value' => trim((string) $element) ];
        }

        foreach ($element->children($nsFilhos) as $chave => $filho) {

            $valor = trim((string) $filho);

            if (isset($array[$chave])) {
                if (! is_array($array[$chave]) || array_keys($array[$chave]) !== range(0, count($array[$chave]) - 1)) {
                    $array[$chave] = [ $array[$chave] ];
                }
                $array[$chave][] = $valor;
            } else {
                $array[$chave] = $valor;
            }
        }

        return $array;
    }
}
