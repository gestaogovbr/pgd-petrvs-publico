<?php
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
if (!function_exists('logInfo')) {
    function logInfo($output = null) {
        if ($output === null) {
            $output = Artisan::output();
        }
        Log::info($output);
        Log::channel('daily')->info($output);
    }
}
