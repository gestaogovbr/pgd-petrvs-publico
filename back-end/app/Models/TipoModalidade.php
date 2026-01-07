<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\Entidade;

class TipoModalidade extends ModelBase
{
  protected $table = 'tipos_modalidades';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome da modalidade
    'exige_pedagio', /* tinyint; NOT NULL; */ // Se exige a política de pedágio
    'plano_trabalho_calcula_horas', /* tinyint; NOT NULL; */ // Se o plano de trabalho calcula horas (considerando a carga horária e os dias)
    'atividade_tempo_despendido', /* tinyint; NOT NULL; */ // Se calcula tempo despendido na atividade
    'atividade_esforco', /* tinyint; NOT NULL; */ // Se utiliza esforço (tempo para execução) na atividade
    //'deleted_at', /* timestamp; */
  ];

  public $delete_cascade = ['documento'];

  // Has
  public function planosTrabalho()
  {
    return $this->hasMany(PlanoTrabalho::class);
  }
  public function entidades()
  {
    return $this->hasMany(Entidade::class);
  }
  public function modalidadeSiape()
  {
    return $this->hasOne(TipoModalidadeSiape::class);
  }
}
