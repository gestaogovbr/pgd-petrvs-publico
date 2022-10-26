<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;

class Change extends Model
{
    use HasFactory;

    protected $connection = 'log';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'date_time',
        'table_name',
        'row_id',
        'type',
        'delta'
    ];

    protected $casts = [
        'data_hora' => 'datetime',
    ];

}
