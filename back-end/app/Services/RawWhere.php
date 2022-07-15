<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Expression;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use App\Models\ModelBase;
use Carbon\Carbon;
use Throwable;
use Exception;

class RawWhere {
    public $expression;
    public $params;

    public function __construct($expression, $params) {
        $this->expression = $expression;
        $this->params = $params;
    }

    public static function raw($expression, $params = []) {
        return new RawWhere($expression, $params);
    }    
}