<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Erro extends Model
{
    use HasFactory;

    public $fillable = [
        'usuario',
        'message',
        'data',
        'trace'
    ];
}
