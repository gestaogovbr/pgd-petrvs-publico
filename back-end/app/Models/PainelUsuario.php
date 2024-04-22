<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\MergeRelations;
use Illuminate\Database\Eloquent\SoftDeletes;

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

  public $fillable_relations = ["tenants"];

  protected $hidden = [
    'password',
    'remember_token',
  ];


  public function assignTenants($tenantIds)
  {
    $this->tenants()->sync($tenantIds);
  }

  // Has
  public function tenants()
  {
    return $this->belongsToMany(Tenant::class, 'users_panel_tenants', 'users_panel_id');
  }
}
