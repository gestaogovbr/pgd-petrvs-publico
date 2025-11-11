<?php
use Illuminate\Support\Facades\Route;

if (!function_exists('defaultRoutes')) {
    function defaultRoutes($controllerClass, $capacidades = [])
    {
        Route::post('search-text', [$controllerClass, 'searchText']);
        Route::post('search-key', [$controllerClass, 'searchKey']);
        Route::post('store', [$controllerClass, 'store']);
        Route::post('update', [$controllerClass, 'update']);
        Route::post('update-json', [$controllerClass, 'updateJson']);
        Route::post('destroy', [$controllerClass, 'destroy']);
        Route::post('validate-destroy', [$controllerClass, 'validateDestroy']);
        Route::post('get-by-id', [$controllerClass, 'getById']);
        Route::post('get-all-ids', [$controllerClass, 'getAllIds']);
        Route::post('query', [$controllerClass, 'query']);
        Route::post('upload', [$controllerClass, 'upload']);
        Route::post('download-url', [$controllerClass, 'downloadUrl']);
        Route::post('delete-file', [$controllerClass, 'deleteFile']);
    }
}
