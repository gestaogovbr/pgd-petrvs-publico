<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class TenantsLogs extends Model
{
  use HasDatabase, HasDomains;

  protected $table = "tenants_logs";

  public $fillable = [
    'id',
    'tenant_id',
    'log_type',
    'output',
  ];
}
