<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Traffic extends Model
{
    use HasFactory;

    protected $connection = 'log';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'date_time',
        'url',
        'request',
        'response'
    ];

    protected $casts = [
        'data_hora' => 'datetime',
    ];
}
