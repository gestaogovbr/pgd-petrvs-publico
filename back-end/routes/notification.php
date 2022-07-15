<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificacaoController;

/*
|--------------------------------------------------------------------------
| Notifications Routes
|--------------------------------------------------------------------------
|
| Used to define routes to notification endpoint
*/

Route::post('find-by-phone', [NotificacaoController::class, 'findByPhone']);
Route::post('session', [NotificacaoController::class, 'session']);
