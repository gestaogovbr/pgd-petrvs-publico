<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoEntrega;
use App\Models\Entidade;
use App\Models\Unidade;
use App\Models\CadeiaValorProcesso;

class CadeiaValor extends ModelBase
{
  protected $table = 'cadeias_valores';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'data_inicio', /* datetime; NOT NULL; */ // Data de início da cadeia de valores
    'data_fim', /* datetime; */ // Data final da cadeia de valores
    'nome', /* varchar(256); NOT NULL; */ // Nome da cadeia de valores
    'unidade_id', /* char(36); */
    'entidade_id', /* char(36); NOT NULL; */
    'data_arquivamento', /* datetime; */ // Data de arquivamento da cadeia de valores
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $fillable_relations = ["processos"];

  public $delete_cascade = ["processos"];

  // Has
  public function processos()
  {
    return $this->hasMany(CadeiaValorProcesso::class);
  }
  public function planosEntrega()
  {
    return $this->hasMany(PlanoEntrega::class);
  }
  // Belongs
  public function unidade()
  {
    return $this->belongsTo(Unidade::class);
  }    //nullable
  public function entidade()
  {
    return $this->belongsTo(Entidade::class);
  }
    public function getAuditRelations(): array
    {
        return [
            [
                'model' => \App\Models\PlanoEntrega::class,
                'foreign_key' => 'cadeia_valor_id',
            ],
            [
                'model' => \App\Models\CadeiaValorProcesso::class,
                'foreign_key' => 'cadeia_valor_id',
            ],
            [
                'model' => \App\Models\CadeiaValorProcesso::class,
                'foreign_key' => 'processo_pai_id',
                'via' => [
                    'model' => \App\Models\CadeiaValorProcesso::class,
                    'foreign_key' => 'cadeia_valor_id',
                ]
            ],
            [
                'model' => \App\Models\PlanoEntregaEntregaProcesso::class,
                'foreign_key' => 'cadeia_processo_id',
                'via' => [
                    'model' => \App\Models\CadeiaValorProcesso::class,
                    'foreign_key' => 'cadeia_valor_id',
                ]
            ],
            [
                'model' => \App\Models\Entidade::class,
                'foreign_key' => 'id',
                'via' => [
                    'model' => \App\Models\CadeiaValor::class,
                    'foreign_key' => 'id',
                    'local_key' => 'entidade_id',
                ]
            ],
            [
                'model' => \App\Models\Unidade::class,
                'foreign_key' => 'id',
                'via' => [
                    'model' => \App\Models\CadeiaValor::class,
                    'foreign_key' => 'id',
                    'local_key' => 'unidade_id',
                ]
            ],
        ];
    }


}
