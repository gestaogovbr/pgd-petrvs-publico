<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class PainelUsuarioTenant extends Model
{
  protected $table = 'users_panel_tenants';

  protected $with = [];

  public $fillable = [
    'users_panel_id',
    'tenant_id',
  ];

  public function tenant()
  {
    return $this->belongsTo(Tenant::class, 'tenant_id');
  }

  public function usuario()
  {
    return $this->belongsTo(PainelUsuario::class, 'users_panel_id');
  }

}
