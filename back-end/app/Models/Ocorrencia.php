<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;

class Ocorrencia extends ModelBase
{
  protected $table = 'ocorrencias';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'data_inicio', /* datetime; NOT NULL; */ // Data inicial da consolidacão
    'data_fim', /* datetime; NOT NULL; */ // Data final da consolidação
    'descricao', /* text; NOT NULL; */ // Descrição da ocorrência
    'usuario_id', /* char(36); NOT NULL; */ // Usuário
    'plano_trabalho_id', /* char(36); NOT NULL; */ // Usuário
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $delete_cascade = [];

  // Has
  public function consolidacoes()
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoOcorrencia::class);
  }
  // Belongs
  public function usuario()
  {
    return $this->belongsTo(Usuario::class);
  }
  public function planoTrabalho()
  {
    return $this->belongsTo(PlanoTrabalho::class);
  }
}
