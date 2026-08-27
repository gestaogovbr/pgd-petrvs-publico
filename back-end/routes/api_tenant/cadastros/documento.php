<?php

use App\Http\Controllers\DocumentoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Documento')->group(function () {
    defaultRoutes(DocumentoController::class);
    Route::post('pendente-sei', [DocumentoController::class, 'pendenteSei']);
    Route::post('assinar', [DocumentoController::class, 'assinar']);
    Route::get('gerarPDF', [DocumentoController::class, 'gerarPDF']);
});
