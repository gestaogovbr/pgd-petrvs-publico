<?php

namespace App\Exceptions;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\Error;
use Exception;

class LogError extends Exception
{
    public static function newError($message, $exception = null, $data = null, $throwWith = 200) {
        $config = config('log');
        if(!empty($exception) && $config['errors']) {
            $user = Auth::user();
            $erro = new Error();
            $erro->fill([
                "user" => $user ? json_encode($user) : null,
                "message" => $message . ":" . $exception->getMessage(),
                "data" => substr(json_encode($data), 0, 65000),
                "trace" => $exception->getTraceAsString()
            ]);
            $erro->save();
        }
        if($throwWith == 200) {
            return response()->json(['error' => $message]);
        } else if($throwWith != false) {
            return ValidationException::withMessages([
                'error' => $message
            ])->status(401);
        }
    }

    public static function newWarn($message, $data = null) {
        $user = Auth::user();
        $erro = new Error();
        $erro->fill([
            "user" => $user ? json_encode(["id" => $user->id, "nome" => $user->nome, "email" => $user->email]) : null,
            "message" => $message,
            "data" => substr(json_encode($data), 0, 65000),
            "type" => "WARNING"
        ]);
        $erro->save();
    }

}