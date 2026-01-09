<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Services\SystemLogsService;
use App\Exceptions\ServerException;

/**
 * @property SystemLogsService $service
 */
class SystemLogsController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
    }

    public function index(Request $request)
    {
        return response()->json($this->service->index($request->all()));
    }
}
