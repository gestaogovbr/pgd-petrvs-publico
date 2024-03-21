<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\HistoricoAtividadeExterna;
use App\Models\HistoricoCursoExterno;
use App\Models\HistoricoDocenciaExterna;

class AreaAtividadeExterna extends ModelBase
{

  protected $table = 'areas_atividades_externas';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome da área
    'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */ // area ativo ou inativo
    //'deleted_at', /* timestamp; */
  ];

  // Has
  public function historicosAtividadesExternas()
  {
    return $this->hasMany(HistoricoAtividadeExterna::class);
  }
  public function historicosCursosExternos()
  {
    return $this->hasMany(HistoricoCursoExterno::class);
  }
  public function historicosDocenciasExternas()
  {
    return $this->hasMany(HistoricoDocenciaExterna::class);
  }
}
