<?php

declare(strict_types=1);

namespace App\V2\Home\Validators;

use Illuminate\Http\Request;

class HomeRequestValidator
{
    public static function index(Request $request): array
    {
        return $request->validate([
            'unidade_id' => ['required', 'uuid'],
            'subordinadas' => ['sometimes', 'boolean'],
        ]);
    }
}
