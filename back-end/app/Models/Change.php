<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ModelBase;
use App\Models\Usuario;

class Change extends ModelBase
{
    use HasFactory;

    protected $connection = 'log';

    protected $table = 'changes';

    protected $with = [];

    public $fillable = [
        'user_id',
        'date_time',
        'table_name',
        'row_id',
        'type',
        'delta'
    ];

    public $timestamps = false;

    protected $casts = [
        'data_hora' => 'datetime',
    ];

}
