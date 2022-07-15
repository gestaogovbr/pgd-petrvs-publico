<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Error extends Model
{
    use HasFactory;

    protected $connection = 'log';

    public $timestamps = false;

    protected $fillable = [
        'date_time',
        'user',
        'message',
        'data',
        'trace',
        'type'
    ];

    protected $casts = [
        'data_hora' => 'datetime',
    ];
}
