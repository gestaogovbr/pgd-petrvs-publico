<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CadeiaValor;
use App\Models\PlanoEntregaEntregaProcesso;

class CadeiaValorProcesso extends ModelBase
{
  protected $table = 'cadeias_valores_processos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'sequencia', /* int; NOT NULL; */ // Sequência do processo dentro do grupo
    'path', /* text; */ // Path dos nós pais separados por /, ou NULL caso sejam nós raiz
    'nome', /* varchar(256); NOT NULL; */ // Nome do processo
    'cadeia_valor_id', /* char(36); NOT NULL; */
    'processo_pai_id', /* char(36); */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $fillable_relations = [];

  public $delete_cascade = [];
  // Has
  public function processosEntrega()
  {
    return $this->hasMany(PlanoEntregaEntregaProcesso::class, 'cadeia_processo_id');
  }
  public function processos()
  {
    return $this->hasMany(CadeiaValorProcesso::class, 'processo_pai_id');
  }
  // Belongs
  public function cadeiaValor()
  {
    return $this->belongsTo(CadeiaValor::class);
  }  //ok
  public function processoPai()
  {
      return $this->belongsTo(CadeiaValorProcesso::class, 'processo_pai_id');
  }    //nullable
    public function getSequenciaCompleta()
    {
        $sequencia = [];
        $processo = $this;

        while ($processo) {
            array_unshift($sequencia, $processo->sequencia); // insere no início
            $processo = $processo->processoPai;
        }

        return implode('.', $sequencia);
    }
    public function getAuditRelations(): array
    {
        return [
            [
                'model' => \App\Models\PlanoEntregaEntregaProcesso::class,
                'foreign_key' => 'cadeia_processo_id',
            ],
            [
                'model' => \App\Models\CadeiaValorProcesso::class,
                'foreign_key' => 'processo_pai_id',
            ],
        ];
    }


}
