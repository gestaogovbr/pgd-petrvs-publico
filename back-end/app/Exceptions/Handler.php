<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\ErrorInterceptor;
use App\Models\Error;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            $config = config('log');
            if($config['errors']) {
                try {
                    $user = Auth::user();
                    $erro = new Error();
                    $erro->fill([
                        "user" => $user ? json_encode($user) : null,
                        "message" => $e->getMessage(),
                        "trace" => $e->getTraceAsString()
                    ]);
                    $erro->save();
                } catch (\Throwable $e) {}
            }
        });

        $this->renderable(function (Throwable $e, Request $request) {
            $response = response()->make('', Response::HTTP_INTERNAL_SERVER_ERROR);
            (new ErrorInterceptor())->intercept($e, $request, $response);
            return null;
        });
    }
}
