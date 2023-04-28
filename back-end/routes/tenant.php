<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\InitializeTenancyBySubdomain;
use Stancl\Tenancy\Middleware\InitializeTenancyByRequestData;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

$config = config('petrvs')['tenant'];
$middle = $config['type'] == 'domain' ? InitializeTenancyByDomain::class : 
    ($config['type'] == 'subdomain' ? InitializeTenancyBySubdomain::class : 
    ($config['type'] == 'request' ? InitializeTenancyByRequestData::class : null)); 

Route::middleware(array_filter([
    'web',
    $middle,
    $config['type'] != 'request' ? PreventAccessFromCentralDomains::class : null,
]))->group(base_path('routes/web_tenant.php'));

Route::prefix('api')->middleware(array_filter([
    'api',
    $middle,
    $config['type'] != 'request' ? PreventAccessFromCentralDomains::class : null,
]))->group(base_path('routes/api_tenant.php'));

Route::group(['prefix' => config('sanctum.prefix', 'sanctum')], static function () use ($middle) {
    Route::get('/csrf-cookie', [CsrfCookieController::class, 'show'])->middleware([
        'web',
        $middle    
    ])->name('sanctum.csrf-cookie');
});