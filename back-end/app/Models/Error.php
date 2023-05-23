<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Casts\AsJson;
class Error extends Model
{
    use HasFactory;

    protected $connection = 'log';

    protected $table = 'errors';

    protected $with = [];

    public $fillable = [
        'date_time',
        'user',
        'message',
        'data',
        'trace',
        'type'
    ];

    public $timestamps = false;

    protected $casts = [
        'date_time' => 'datetime',
        'user' => AsJson::class
    ];
}
