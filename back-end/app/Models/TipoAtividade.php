<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Atividade;

class TipoAtividade extends ModelBase
{
  protected $table = 'tipos_atividades';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome do tipo de atividade
    'esforco', /* double(8,2); NOT NULL; */ // Tempo previsto para a execução da atividade (Horas decimais)
    'dias_planejado', /* double(8,2); NOT NULL; */ // Sugestão de dias para conclusão da atividade independente de quando iniciado (influência no prazo da atividade)
    'etiquetas', /* json; */ // Nome das etiquetas para a atividade
    'checklist', /* json; */ // Nome dos checklist para a atividade
    'comentario', /* text; */ // Comentário predefinido para a atividade
    //'deleted_at', /* timestamp; */
  ];

  protected static function booted()
  {
    static::creating(function ($tipoAtividade) {
      $tipoAtividade->etiquetas = $tipoAtividade->etiquetas ?? [];
      $tipoAtividade->checklist = $tipoAtividade->checklist ?? [];
    });
  }

  // Casting
  protected $casts = [
    'checklist' => AsJson::class,
    'etiquetas' => AsJson::class,
  ];

  // Has
  public function atividades()
  {
    return $this->hasMany(Atividade::class);
  }
  // Belongs
}
