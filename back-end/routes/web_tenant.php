<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use App\Http\Controllers\ImpersonationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$actions = config('petrvs')['actions']['web'];

/* Rotas do Angular *
Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api|web|download|environment-config).*$');
*/

/* Rotas do login/logout */
Route::post('/web/login-user-password', [LoginController::class, $actions['login-user-password']]);
Route::post('/web/login-firebase-token', [LoginController::class, $actions['login-firebase-token']]);
Route::post('/web/login-google-token', [LoginController::class, $actions['login-google-token']]);
Route::post('/web/login-institucional', [LoginController::class, $actions['login-institucional']]);
// Route::post('/web/login-unico', [LoginController::class, $actions['login-unico']]);
Route::post('/web/login-session', [LoginController::class, 'authenticateSession']);
Route::get('/web/logout', [LoginController::class, 'logout']);

////////////////////////////////////////////////////////////////////////////////////////////////////
/* Rotas Login Azure* */
Route::view('/web/login-azure-popup', 'azure');
Route::get('/web/login-azure-redirect', [LoginController::class, 'signInAzureRedirect']);

/* Perdeu uso por motivo do tenancy */
// Route::get('/web/login-azure-callback', [LoginController::class, 'signInAzureCallback']);

Route::middleware([InitializeTenancyByPath::class])
    ->get('/login-azure-callback/{tenant}',
          [LoginController::class, 'signInAzureCallback']);

// Rota criada para teste por algum desenvolvedor.
Route::get('/web/login-azure-simulate-callback', [LoginController::class, 'simulateAzureCallback']);
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
/* Rotas GOVBR */
Route::view('/web/login-govbr-popup', 'govbr');
Route::get('/web/login-govbr-redirect', [LoginController::class, 'signInGovBrRedirect']);

/* Perdeu usou por motivo do tenancy */
// Route::get('/web/login-azure-callback', [LoginController::class, 'signInAzureCallback']);

Route::middleware([InitializeTenancyByPath::class])
    ->get('/login-govbr-callback/{tenant}',
          [LoginController::class, 'signInGovBrCallback']);
//////////////////////////////////////////////////////////////////
Route::middleware([InitializeTenancyByPath::class])
    ->get('/login-unico/{tenant}',
          [LoginController::class, 'signInGovBrCallback']);
////////////////////////////////////////////////////////////////////////////////////////////////////


Route::middleware(['auth'])->group(function () {
    Route::get('/impersonate/{userId}', [ImpersonationController::class, 'impersonate'])->name('impersonate.start');
    Route::get('/impersonate/stop', [ImpersonationController::class, 'stopImpersonating'])->name('impersonate.stop');
});



Route::view('/web/erro-500', 'erros.500')->name('erro.500');