<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PetrvsController;
use App\Http\Controllers\AngularController;
use Laravel\Socialite\Facades\Socialite;

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

/* Rotas do Angular */
Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api|web|download|environment-config).*$');

/* Rotas do login/logout */
Route::post('/web/login-user-password', [LoginController::class, $actions['login-user-password']]);
Route::post('/web/login-firebase-token', [LoginController::class, $actions['login-firebase-token']]);
Route::post('/web/login-gapi-token', [LoginController::class, $actions['login-gapi-token']]);
Route::post('/web/login-institucional', [LoginController::class, $actions['login-institucional']]);
Route::post('/web/login-session', [LoginController::class, 'authenticateSession']);
Route::get('/web/logout', [LoginController::class, 'logout']);

/* Rotas Login Azure*/
Route::view('web/login-azure-popup', 'azure');
Route::get('/web/login-azure-redirect', [LoginController::class, 'signInAzureRedirect']);
Route::get('/web/login-azure-callback', [LoginController::class, 'signInAzureCallback']);

/* Rotas diversas */
Route::get('environment-config', [PetrvsController::class, 'environmentConfig']);
Route::middleware(['signed'])->get('/download/{file}', [ControllerBase::class, 'download'])->name('download')->where('file', '.*');
