<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class PainelUsuario extends Authenticatable
{
  use Notifiable;

  public function __construct(array $attributes = [])
  {
    parent::__construct($attributes);

    // Define a conexão do modelo com base na configuração 'database.default'
    $this->connection = env('DB_CONNECTION', 'mysql');
  }
  protected $table = 'users_panel';
  protected $fillable = [
    'nome',
    'email',
    'cpf',
    'password',
    'nivel'
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

   // Has
   public function tenants()
   {
     return $this->hasMany(Tenant::class);
   }
}
