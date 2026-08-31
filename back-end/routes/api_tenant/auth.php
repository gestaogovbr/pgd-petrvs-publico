<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RotinaDiariaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

$actions = config('petrvs')['actions']['api'];

Route::get('/teste', function (Request $request) {
    return ["OK"];
});

Route::get('/rotinas-diarias', [RotinaDiariaController::class, 'run']);

Route::post('/login-user-password', [LoginController::class, $actions['login-user-password']]);
Route::post('/login-firebase-token', [LoginController::class, $actions['login-firebase-token']]);
Route::post('/login-google-token', [LoginController::class, $actions['login-google-token']]);
Route::post('/login-institucional', [LoginController::class, $actions['login-institucional']]);
Route::post('/generate-session-token', [LoginController::class, $actions['generate-session-token']]);
Route::get('/logout', [LoginController::class, 'logout']);
Route::middleware(['auth:sanctum'])->post('/horario', [LoginController::class, 'horarioUnidade']);
Route::middleware(['auth:sanctum'])->post('/seleciona-unidade', [LoginController::class, 'selecionaUnidade']);
Route::middleware(['auth:sanctum'])->get('/validate-token', [LoginController::class, 'validateApiToken']);
Route::middleware(['auth:sanctum'])->post('/login-session', [LoginController::class, 'authenticateApiSession']);
