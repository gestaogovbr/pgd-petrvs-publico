<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Casts\AsJson;

class Entrega extends ModelBase
{
  protected $table = 'entregas';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* text; NOT NULL; */
    'descricao', /* text; NOT NULL; */
    'tipo_indicador', /* enum('QUANTIDADE','VALOR','PORCENTAGEM','QUALITATIVO'); NOT NULL; */ // Tipo do indicador da entrega
    'lista_qualitativos', /* json; */ // Lista de valores para entrega do tipo qualitativo
    'unidade_id', /* char(36); */
    'etiquetas', /* json; */ // Etiquetas
    'checklist', /* json; */ // Checklist
    //'deleted_at', /* timestamp; */
  ];

  protected $casts = [
    'lista_qualitativos' => AsJson::class,
    'checklist' => AsJson::class,
    'etiquetas' => AsJson::class,
  ];

  //Has
  public function entregasPlanoEntrega()
  {
    return $this->hasMany(PlanoEntregaEntrega::class);
  }

  public function entregasPlanoTrabalho()
  {
    return $this->hasMany(PlanoTrabalhoEntrega::class);
  }
  
  // Belongs
  public function unidade()
  {
    return $this->belongsTo(Unidade::class);
  }
}
