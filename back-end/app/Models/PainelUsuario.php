<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class PainelUsuario extends Authenticatable
{
    use Notifiable;
    protected $table = 'painel_usuarios';
    protected $fillable = [
        'nome',
        'email',
        'cpf',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
