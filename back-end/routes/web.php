<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PetrvsController;
use App\Http\Controllers\AngularController;
use App\Http\Controllers\DownloadController;
use Illuminate\Http\Request;
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

/* Rotas do Angular */
Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api|sanctum|config|web|download|environment-config|login-unico).*$');

/* Rotas diversas */
Route::get('environment-config', [PetrvsController::class, 'environmentConfig']);
/*
    ->withoutMiddleware([
        StartSession::class,
        VerifyCsrfToken::class,
        SubstituteBindings::class
    ]);*/
// Route::middleware(['signed.relative'])->get('/download/{tenant}/{file}', [DownloadController::class, 'download'])->name('download')->where('file', '.*');



