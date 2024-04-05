<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Documento;
use App\Models\Entidade;
use Illuminate\Support\Facades\DB;

class Template extends ModelBase
{
  protected $table = 'templates';

  protected $with = [];

  protected static function booted()
  {
    static::creating(function ($template) {
      $number = 1;
      $results = DB::select("CALL sequence_template_numero()");
      if (!empty($results)) {
        $number = $results[0]->number;
      }

      $template->numero = $number;
    });
  }

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'especie', /* enum('SEI','TCR','OUTRO','NOTIFICACAO'); NOT NULL; */ // Especificação da espécie do template (interno do sistema)
    'codigo', /* varchar(255); */ // Código opcional para o template
    'titulo', /* varchar(256); NOT NULL; */ // Título do template
    'conteudo', /* text; */ // Comentário predefinida para a tarefa
    'entidade_id', /* char(36); */
    'unidade_id', /* char(36); */
    'dataset', /* json; */ // Dados da parametrização
    //'deleted_at', /* timestamp; */
    //'numero', /* int; NOT NULL; */// Número do template (Gerado pelo sistema)
  ];

  // Casting
  protected $casts = [
    'dataset' => AsJson::class
  ];

  // Has
  public function programas()
  {
    return $this->hasMany(Programa::class);
  }
  public function documentos()
  {
    return $this->hasMany(Documento::class);
  }
  // Belongs
  public function entidade()
  {
    return $this->belongsTo(Entidade::class);
  }      //nullable
  public function unidade()
  {
    return $this->belongsTo(Unidade::class);
  }        //nullable

}
