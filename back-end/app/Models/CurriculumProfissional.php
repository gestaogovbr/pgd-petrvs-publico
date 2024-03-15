<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Curriculum;
use App\Models\CentroTreinamento;
use App\Models\Cargo;
use App\Models\GrupoEspecializado;
use App\Models\Unidade;
use App\Casts\AsJson;

class CurriculumProfissional extends ModelBase
{
  protected $table = 'curriculuns_profissionais';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'ano_ingresso',
    'lotacao_atual', /* varchar(255); */ // Lotação atual
    'especifique_habilidades', /* json; */ // Especifique suas habilidades: (Ex: Desenvolvo em JavaScript)
    'viagem_nacional', /* tinyint; NOT NULL; */ // Já fez viagem nacional a trabalho
    'viagem_internacional', /* tinyint; NOT NULL; */ // Já fez viagem internacional a trabalho
    'interesse_bnt', /* tinyint; NOT NULL; */ // Você tem interesse na participação do Banco Nacional de Talentos
    'pgd_inserido', /* varchar(255); */ // Você está inserido no programa de gestão da Instituição
    'pgd_interesse', /* varchar(255); */ // Você tem interesse em participar do programa de gestão da Instituição
    'telefone', /* varchar(64); */ // Telefone do chefe imediato
    'remocao', /* tinyint; NOT NULL; */ // Você tem interesse em remoção
    'curriculum_id', /* char(36); NOT NULL; */
    'centro_treinamento_id', /* char(36); NOT NULL; */
    'cargo_id', /* char(36); NOT NULL; */
    'grupo_especializado_id', /* char(36); NULL; */
    //'deleted_at', /* timestamp; */
    //'ano_ingresso', /* tinyint; NOT NULL; */// Ano de ingresso
  ];

  protected $casts = [
    'especifique_habilidades' => AsJson::class,
  ];

  public $fillable_changes = [
    'historicosAtividadesInternas', 'historicosAtividadesExternas', 'historicosCursosInternos', 'historicosCursosExternos', 'historicosDocenciasInternas',
    'historicosDocenciasExternas', 'historicosFuncoes', 'historicosLotacoes'
  ];

  // Belongs
  public function curriculum()
  {
    return $this->belongsTo(Curriculum::class);
  }
  public function centroTreinamento()
  {
    return $this->belongsTo(CentroTreinamento::class);
  }
  public function cargo()
  {
    return $this->belongsTo(Cargo::class);
  }
  public function grupoEspecializado()
  {
    return $this->belongsTo(GrupoEspecializado::class);
  }
  // HasOne
  public function unidadeAtual()
  {
    return $this->hasOne(Unidade::class);
  }
  // HasMany
  public function historicosAtividadesInternas()
  {
    return $this->hasMany(HistoricoAtividadeInterna::class);
  }
  public function historicosAtividadesExternas()
  {
    return $this->hasMany(HistoricoAtividadeExterna::class);
  }
  public function historicosCursosInternos()
  {
    return $this->hasMany(HistoricoCursoInterno::class);
  }
  public function historicosCursosExternos()
  {
    return $this->hasMany(HistoricoCursoExterno::class);
  }
  public function historicosDocenciasInternas()
  {
    return $this->hasMany(HistoricoDocenciaInterna::class);
  }
  public function historicosDocenciasExternas()
  {
    return $this->hasMany(HistoricoDocenciaExterna::class);
  }
  public function historicosFuncoes()
  {
    return $this->hasMany(HistoricoFuncao::class);
  }
  public function historicosLotacoes()
  {
    return $this->hasMany(HistoricoLotacao::class);
  }
}
