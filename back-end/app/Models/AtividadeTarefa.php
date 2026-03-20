<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Atividade;
use App\Models\Documento;
use App\Models\TipoTarefa;
use App\Models\Usuario;
use App\Models\Comentario;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AtividadeTarefa extends ModelBase
{
  protected $table = 'atividades_tarefas';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'descricao', /* text; */ // Descrição da tarefa
    'data_lancamento', /* datetime; NOT NULL; */ // Data hora do lançamento da tarefa
    'tempo_estimado', /* double(8,2); NOT NULL; */ // Tempo estimado para a execução da tarefa (Horas decimais)
    'data_conclusao', /* datetime; */ // Data da conclusão
    'documento_id', /* char(36); */
    'usuario_id', /* char(36); NOT NULL; */
    'tipo_tarefa_id', /* char(36); */
    'atividade_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [
    'comentarios'
  ];

  public $delete_cascade = ['comentarios'];

  // Has
  public function comentarios(): HasMany
  {
    return $this->hasMany(Comentario::class);
  }
  public function documentos(): HasMany
  {
    return $this->hasMany(Documento::class);
  }
  // Belongs
  public function documento(): BelongsTo
  {
    return $this->belongsTo(Documento::class);
  }    //nullable  
  public function usuario(): BelongsTo
  {
    return $this->belongsTo(Usuario::class);
  }
  public function tipoTarefa(): BelongsTo
  {
    return $this->belongsTo(TipoTarefa::class);
  }      //nullable
  public function atividade(): BelongsTo
  {
    return $this->belongsTo(Atividade::class);
  }
}
