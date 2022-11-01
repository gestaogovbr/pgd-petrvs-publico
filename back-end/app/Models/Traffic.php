<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Traffic extends Model
{
    use HasFactory;

    protected $connection = 'log';

    protected $table = "traffic";

    protected $with = [];

    public $fillable = [
        'user_id',
        'date_time',
        'url',
        'request',
        'response'
    ];

    public $timestamps = false;

    protected $casts = [
        'data_hora' => 'datetime',
    ];
}
