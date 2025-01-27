<?php

namespace App\Models;

use App\Models\ModelBase;

class EntidadeEmail extends ModelBase
{
  protected $table = 'entidade_emails';

  public $fillable = [
    'email', /* varchar(255); NOT NULL; */ // Email
    'entidadeo_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  // Belongs
  public function entidade()
  {
    return $this->belongsTo(Entidade::class);
  }
}
