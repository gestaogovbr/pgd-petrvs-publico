<?php

use App\Http\Controllers\TemplateController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('Template')->group(function () {
    defaultRoutes(TemplateController::class);
    Route::post('teste', [TemplateController::class, 'teste']);
    Route::post('gera-relatorio', [TemplateController::class, 'geraRelatorio']);
    Route::post('carrega-dataset', [TemplateController::class, 'carregaDataset']);
});
